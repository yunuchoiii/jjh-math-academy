import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useReducer } from "react";
import { IParent, IStudent, ITeacher, userService } from "../_service/user";

// 사용자 유형을 정의하는 타입
type UserType = IParent | IStudent | ITeacher | null;

// 사용자 상태를 정의하는 인터페이스
interface UserState {
  user: any; // 현재 사용자 정보
  accessToken: string | null; // 액세스 토큰
  userInfoByType: UserType; // 사용자 유형에 따른 정보
  isLoading: boolean; // 로딩 상태
  isLoggedIn: boolean; // 로그인 상태
}

// 상태 변경을 위한 액션 타입 정의
type Action =
  | { type: "START_LOADING" }
  | { type: "SET_USER"; payload: { user: any; accessToken: string } }
  | { type: "SET_USER_INFO"; payload: UserType }
  | { type: "LOGOUT" }
  | { type: "FINISH_LOADING" };

// 초기 상태 설정
const initialState: UserState = {
  user: null,
  accessToken: null,
  userInfoByType: null,
  isLoading: true,
  isLoggedIn: false,
};

// 리듀서 함수: 상태와 액션을 받아 새로운 상태를 반환
const reducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    // 로딩 시작
    case "START_LOADING":
      return { ...state, isLoading: true };
    // 사용자 정보 설정
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isLoggedIn: true,
      };
    // 사용자 유형에 따른 정보 설정
    case "SET_USER_INFO":
      return {
        ...state,
        userInfoByType: action.payload,
        isLoading: false,
      };
    // 로그아웃
    case "LOGOUT":
      return { ...initialState, isLoading: false };
    // 로딩 완료
    case "FINISH_LOADING":
      return { ...state, isLoading: false };
    // 기본 상태 반환
    default:
      return state;
  }
};

// 사용자 관련 기능을 제공하는 커스텀 훅
const useUser = () => {
  const router = useRouter();
  const [state, dispatch] = useReducer(reducer, initialState);
  const LOGIN_SERVICE_URL = `${process.env.SERVER_URL}/auth`;

  // 로그인 함수
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
        dispatch({ type: "SET_USER", payload: { user, accessToken } });
        router.back();
        router.refresh();
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [router]
  );

  // 로그아웃 함수
  const logout = useCallback(async () => {
    try {
      await axios.get(`${LOGIN_SERVICE_URL}/logout`, { withCredentials: true });
      axios.defaults.headers.common["Authorization"] = null;
      localStorage.removeItem("accessToken");
      dispatch({ type: "LOGOUT" });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }, [router]);

  // 사용자 인증 함수
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
        const userResponse = await userService.getMyInfo();
        dispatch({
          type: "SET_USER",
          payload: { user: userResponse.user, accessToken },
        });
      } else {
        dispatch({ type: "FINISH_LOADING" });
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  // 사용자 유형에 따른 정보 가져오기
  const fetchUserInfoByType = useCallback(async () => {
    if (state.user?.userType && state.user?.userId) {
      try {
        const userType = state.user.userType;
        let userInfo: UserType = null;

        if (userType === "teacher") {
          const res = await userService.getTeacherInfo(state.user.userId);
          userInfo = res.data;
        } else if (userType === "parent") {
          const res = await userService.getParentInfo(state.user.userId);
          userInfo = res.data;
        } else if (userType === "student") {
          const res = await userService.getStudentInfo(state.user.userId);
          userInfo = res.data;
        }

        dispatch({ type: "SET_USER_INFO", payload: userInfo });
      } catch (error) {
        console.error("Fetching user info failed:", error);
        dispatch({ type: "FINISH_LOADING" });
      }
    } else {
      dispatch({ type: "FINISH_LOADING" });
    }
  }, [state.user]);

  // 컴포넌트가 마운트될 때 인증 및 사용자 정보 가져오기 실행
  useEffect(() => {
    authenticate();
  }, [authenticate]);

  useEffect(() => {
    if (state.user?.userId) {
      fetchUserInfoByType();
    }
  }, [state.user, fetchUserInfoByType]);

  // 사용자 권한 가져오기
  const getUserPermission = useCallback(() => {
    if (state.user?.userType === "teacher") {
      return (state.userInfoByType as ITeacher)?.isAdmin ? "admin" : "teacher";
    } else if (state.user?.userType === "parent") {
      return "parent";
    } else if (state.user?.userType === "student") {
      return "student";
    } else {
      return "anonymous";
    }
  }, [state.user, state.userInfoByType]);

  // 훅에서 제공하는 기능들 반환
  return {
    login,
    logout,
    user: state.user,
    userInfoByType: state.userInfoByType,
    accessToken: state.accessToken,
    isLoading: state.isLoading,
    isLoggedIn: state.isLoggedIn,
    getUserPermission,
  };
};

export default useUser;