import axios, { AxiosError } from "axios";

export interface LoginPayload {
  callback: () => any
  errorCallback: (error: AxiosError) => void
  data: {email: string, password: string}
}

const LOGIN_SERVICE_URL = `${process.env.SERVER_URL}/auth`;

export const loginService = {
  /** 로그인
   * @param {LoginPayload} payload - 로그인 요청 데이터
   * @returns {Promise<any>} - 로그인 응답 데이터
   */
  login: async ({callback, errorCallback, data}: LoginPayload) => {
    try {
      const response = await axios.post(`${LOGIN_SERVICE_URL}/login`, data, {withCredentials: true});
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      callback();
      return response.data;
    } catch (error) {
      console.error(error);
      errorCallback(error as AxiosError);
      throw error;
    }
  },
  logout: async () => {
    try {
      const response = await axios.get(`${LOGIN_SERVICE_URL}/logout`, { withCredentials: true });
      if (response.status === 200) {
        axios.defaults.headers.common['Authorization'] = null;
        return response.data;
      } else {
        throw new Error('로그아웃 실패');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
