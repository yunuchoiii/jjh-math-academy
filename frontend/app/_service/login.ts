import axios, { AxiosError } from "axios";

export interface LoginPayload {
  callback: () => any;
  errorCallback: (error: AxiosError) => void;
  data: { email: string; password: string };
}

const LOGIN_SERVICE_URL = `${process.env.SERVER_URL}/auth`;
const JWT_EXPIRED_TIME = 1800000; // 30분
const CLIENT_REFRESH_URL = `${LOGIN_SERVICE_URL}/refresh-token`;

const onSuccessLogin = (result: any) => {
  // Authorization 헤더 설정
  axios.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;

  // Silent Refresh 설정 (만료 1분 전에 실행)
  setTimeout(loginService.silentRefresh, JWT_EXPIRED_TIME - 60000);
};

export const loginService = {
  /** 로그인
   * @param {LoginPayload} payload - 로그인 요청 데이터
   * @returns {Promise<any>} - 로그인 응답 데이터
   */
  login: async ({ callback, errorCallback, data }: LoginPayload) => {
    try {
      const response = await axios.post(`${LOGIN_SERVICE_URL}/login`, data, {
        withCredentials: true,
      });

      // 로그인 성공 처리
      onSuccessLogin(response.data);
      callback();

      return response.data;
    } catch (error) {
      console.error(error);
      errorCallback(error as AxiosError);
      throw error;
    }
  },

  /** 로그아웃 */
  logout: async () => {
    try {
      const response = await axios.get(`${LOGIN_SERVICE_URL}/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = null; // Authorization 헤더 초기화
        return response.data;
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  /** Silent Refresh (Access Token 갱신) */
  silentRefresh: async () => {
    try {
      const response = await axios.put(CLIENT_REFRESH_URL, {}, {
        withCredentials: true,
      });

      if (response.status === 200) {
        // 갱신된 토큰으로 로그인 성공 처리
        onSuccessLogin(response.data);
      }
    } catch (error) {
      console.warn('Refresh Token 만료로 로그아웃 처리됨');
      loginService.logout(); // 만료 시 자동 로그아웃
    }
  },
};