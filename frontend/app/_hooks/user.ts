import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userService } from '../_service/user';
import { accessTokenState, userState } from '../_stores/user';

const useUser = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isLoading, setIsLoading] = useState(true);

  const LOGIN_SERVICE_URL = `${process.env.SERVER_URL}/auth`;

  const login = async ({email, password}: {email: string, password: string}) => {
    try {
      const response = await axios.post(`${LOGIN_SERVICE_URL}/login`, {email, password}, {withCredentials: true});
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      router.back();
      router.refresh();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const logout = async () => {
    try {
      const response = await axios.get(`${LOGIN_SERVICE_URL}/logout`, { withCredentials: true });
      axios.defaults.headers.common['Authorization'] = null;
      setUser(null);
      setAccessToken(null);
      router.push('/');
      router.refresh();
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const authenticate = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.SERVER_URL}/auth/refresh-token`, {}, { withCredentials: true });
      if (response.status === 200) {
        const { accessToken } = response.data;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setAccessToken(accessToken);
        const userResponse = await userService.getMyInfo();
        setUser(userResponse.user);
      }
    } catch (error) {
      // console.error('Authentication error:', error);
      console.log("authenticate token failed!")
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    authenticate()
  }, []);

  return { 
    login,
    logout,
    user, 
    setUser,
    accessToken, 
    setAccessToken,
    isLoading,
    isLoggedIn: !!user && !!accessToken
  };
};

export default useUser;