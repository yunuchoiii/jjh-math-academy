import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer } from "react";
import { useRecoilState } from "recoil";
import { IParent, IStudent, ITeacher, userService } from "../_service/user";
import { accessTokenState, userInfoByTypeState, userState } from "../_stores/user";

type UserType = IParent | IStudent | ITeacher | null;

interface UserState {
  isLoading: boolean;
  isLoggedIn: boolean;
}

type Action =
  | { type: "START_LOADING" }
  | { type: "FINISH_LOADING" };

const initialState: UserState = {
  isLoading: true,
  isLoggedIn: false,
};

const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "START_LOADING":
      return { ...state, isLoading: true };
    case "FINISH_LOADING":
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState); // Recoil user 상태
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState); // Recoil accessToken 상태
  const [userInfoByType, setUserInfoByType] = useRecoilState(userInfoByTypeState); // Recoil userInfoByType 상태
  const [state, dispatch] = useReducer(reducer, initialState);

  const LOGIN_SERVICE_URL = `${process.env.SERVER_URL}/auth`;

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      try {
        dispatch({ type: "START_LOADING" });
        const response = await axios.post(
          `${LOGIN_SERVICE_URL}/login`,
          { email, password },
          { withCredentials: true }
        );
        const { user, accessToken } = response.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        localStorage.setItem("accessToken", accessToken);
        setUser(user);
        setAccessToken(accessToken);
        router.back();
        router.refresh();
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [router, setUser, setAccessToken]
  );

  const logout = useCallback(async () => {
    try {
      await axios.get(`${LOGIN_SERVICE_URL}/logout`, { withCredentials: true });
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("accessToken");
      setUser(null);
      setAccessToken(null);
      dispatch({ type: "FINISH_LOADING" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }, [router, setUser, setAccessToken]);

  const authenticate = useCallback(async () => {
    try {
      dispatch({ type: "START_LOADING" });
      const storedToken = localStorage.getItem("accessToken");

      if (storedToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
        const response = await axios.post(
          `${LOGIN_SERVICE_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        setAccessToken(accessToken);
        const userResponse = await userService.getMyInfo();
        setUser(userResponse.user);
      } else {
        dispatch({ type: "FINISH_LOADING" });
      }
    } catch (error) {
      // console.error("Authentication failed:", error);
      setUser(null);
      setAccessToken(null);
      dispatch({ type: "FINISH_LOADING" });
    }
  }, [setUser, setAccessToken]);

  const fetchUserInfoByType = useCallback(async () => {
    if (user?.userType && user?.userId) {
      try {
        const userType = user.userType;
        let userInfo: UserType = null;

        if (userType === "teacher") {
          const res = await userService.getTeacherInfo(user.userId);
          userInfo = res.data;
        } else if (userType === "parent") {
          const res = await userService.getParentInfo(user.userId);
          userInfo = res.data;
        } else if (userType === "student") {
          const res = await userService.getStudentInfo(user.userId);
          userInfo = res.data;
        }

        setUserInfoByType(userInfo);
        dispatch({ type: "FINISH_LOADING" });
      } catch (error) {
        console.error("Fetching user info failed:", error);
        dispatch({ type: "FINISH_LOADING" });
      }
    } else {
      dispatch({ type: "FINISH_LOADING" });
    }
  }, [user]);

  const refreshToken = useCallback(async () => {
    try {
      const response = await axios.post(
        `${LOGIN_SERVICE_URL}/refresh-token`,
        {},
        { withCredentials: true }
      );
      const { accessToken } = response.data;
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setAccessToken(accessToken);
    } catch (error) {
      console.error("Refresh token failed:", error);
      setUser(null);
      setAccessToken(null);
      dispatch({ type: "FINISH_LOADING" });
    }
  }, [setUser, setAccessToken]);

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  useEffect(() => {
    if (user?.userId) {
      fetchUserInfoByType();
    }
  }, [user, fetchUserInfoByType]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshToken();
    }, 25 * 60 * 1000); // 25분마다 refreshToken 호출

    return () => clearInterval(interval);
  }, [refreshToken]);

  const getUserPermission = useCallback(() => {
    if (user?.userType === "teacher") {
      return (userInfoByType as ITeacher)?.isAdmin ? "admin" : "teacher";
    } else if (user?.userType === "parent") {
      return "parent";
    } else if (user?.userType === "student") {
      return "student";
    } else {
      return "anonymous";
    }
  }, [user, userInfoByType]);

  return {
    login,
    logout,
    user,
    accessToken,
    userInfoByType,
    isLoading: state.isLoading,
    isLoggedIn: !!user && !!accessToken && !!userInfoByType,
    getUserPermission,
  };
};

export default useUser;