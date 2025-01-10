import axios, { AxiosError } from "axios";

export interface IUser extends UserSavePayload {
  userId: number;
  refreshToken?: string; 
  createdAt: Date; 
}

export interface UserSavePayload {
  username: string;
  password: string;
  confirmPassword?: string; // 회원가입 시 비밀번호 확인을 위한 필드 (실제 사용 X)
  email: string;
  phoneNumber?: string;
  userType: 'teacher' | 'parent' | 'student';
}

export interface ITeacher extends TeacherSavePayload {
  teacherId: number;
}

export interface TeacherSavePayload {
  userId: number;
  isActive: boolean;
  isAdmin: boolean;
}

export interface IParent extends ParentSavePayload {
  parentId: number;
}

export interface ParentSavePayload {
  userId: number;
  isActive: boolean;
}

export interface IStudent extends StudentSavePayload {
  studentId: number;
}

export interface StudentSavePayload {
  userId: number;
  isActive: boolean;
  parentId: number;
  gradeLevel: number; /** 1 ~ 12 */
  schoolName: string;
}

export interface UserPayload {
  callback?: () => any
  errorCallback?: (error: AxiosError) => void
  data?: UserSavePayload | TeacherSavePayload | ParentSavePayload | StudentSavePayload
  userType?: 'user' | 'teacher' | 'parent' | 'student',
  userId?: number
}

const AUTH_SERVICE_URL = `${process.env.SERVER_URL}/auth`;
const USER_SERVICE_URL = `${process.env.SERVER_URL}/user`;

export const userService = {
  /** 회원가입
   * @param {UserPayload} payload - 회원가입 요청 데이터
   * @returns {Promise<any>} - 회원가입 응답 데이터
   * userType: 'user' | 'teacher' | 'parent' | 'student'
   */
  join: async ({callback, errorCallback, data, userType}: UserPayload) => {
    try {
      const url = `${AUTH_SERVICE_URL}/join${userType !== 'user' ? `/${userType}` : ''}`;
      const response = await axios.post(url, data);
      callback && callback();
      return response.data;
    } catch (error) {
      console.error(error);
      errorCallback && errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 이메일 중복 체크
   * @param {string} email - 이메일
   * @returns {Promise<any>} - 이메일 중복 체크 응답 데이터
   */
  checkEmail: async (email: string) => {
    const url = `${AUTH_SERVICE_URL}/check-email`;
    const response = await axios.post(url, { email });
    return response.data;
  },
  /** 유저 정보 조회
   * @returns {Promise<any>} - 유저 정보 응답 데이터
   */
  getMyInfo: async () => {
    const url = `${USER_SERVICE_URL}/myinfo`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 유저 정보 조회
   * @param {number} userId - 유저 ID
   * @returns {Promise<any>} - 유저 정보 응답 데이터
   */
  getUserInfo: async (userId: number) => {
    const url = `${USER_SERVICE_URL}/info/${userId}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 선생님 정보 조회
   * @param {number} userId - 유저 ID
   * @returns {Promise<any>} - 선생님 정보 응답 데이터
   */
  getTeacherInfo: async (userId: number) => {
    const url = `${USER_SERVICE_URL}/info/teacher/${userId}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 부모 정보 조회
   * @param {number} userId - 유저 ID
   * @returns {Promise<any>} - 부모 정보 응답 데이터
   */
  getParentInfo: async (userId: number) => {
    const url = `${USER_SERVICE_URL}/info/parent/${userId}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 학생 정보 조회
   * @param {number} userId - 유저 ID
   * @returns {Promise<any>} - 학생 정보 응답 데이터
   */
  getStudentInfo: async (userId: number) => {
    const url = `${USER_SERVICE_URL}/info/student/${userId}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 유저 목록 조회
   * @returns {Promise<any>} - 유저 목록 응답 데이터
   */
  getList: async () => {
    const url = `${USER_SERVICE_URL}/list`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 학생 목록 조회
   * @returns {Promise<any>} - 학생 목록 응답 데이터
   */
  getStudentList: async () => {
    const url = `${USER_SERVICE_URL}/list/student`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 선생님 목록 조회
   * @returns {Promise<any>} - 선생님 목록 응답 데이터
   */
  getTeacherList: async () => {
    const url = `${USER_SERVICE_URL}/list/teacher`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 부모 목록 조회
   * @returns {Promise<any>} - 부모 목록 응답 데이터
   */
  getParentList: async () => {
    const url = `${USER_SERVICE_URL}/list/parent`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  },
  /** 유저 정보 업데이트
   * @param {string} userId - 유저 ID
   * @body {UserSavePayload} data - 업데이트할 유저 데이터
   * @returns {Promise<any>} - 업데이트된 유저 정보 응답 데이터
   */
  updateUser: async ({userId, data, callback, errorCallback}: UserPayload) => {
    try {
      const url = `${USER_SERVICE_URL}/update/${userId}`;
      const response = await axios.put(url, data, { withCredentials: true });
      callback && callback();
      return response.data;
    } catch (error) {
      console.error(error);
      errorCallback && errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 선생님 정보 업데이트
   * @param {number} userId - 선생님 ID
   * @body {TeacherSavePayload} data - 업데이트할 선생님 데이터
   * @returns {Promise<any>} - 업데이트된 선생님 정보 응답 데이터
   */
  updateTeacher: async ({userId, data, callback, errorCallback}: UserPayload) => {
    try {
      const url = `${USER_SERVICE_URL}/update/teacher/${userId}`;
      const response = await axios.put(url, data, { withCredentials: true });
      callback && callback();
      return response.data;
    } catch (error) {
      console.error(error);
      errorCallback && errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 학생 정보 업데이트
   * @param {string} userId - 학생 ID
   * @body {StudentSavePayload} data - 업데이트할 학생 데이터
   * @returns {Promise<any>} - 업데이트된 학생 정보 응답 데이터
   */
  updateStudent: async ({userId, data, callback, errorCallback}: UserPayload) => {
    try {
      const url = `${USER_SERVICE_URL}/update/student/${userId}`;
      const response = await axios.put(url, data, { withCredentials: true });
      callback && callback();
      return response.data;
    } catch (error) {
      console.error(error);
      errorCallback && errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 부모 정보 업데이트
   * @param {string} userId - 부모 ID
   * @body {ParentSavePayload} data - 업데이트할 부모 데이터
   * @returns {Promise<any>} - 업데이트된 부모 정보 응답 데이터
   */
  updateParent: async ({userId, data, callback, errorCallback}: UserPayload) => {
    try {
      const url = `${USER_SERVICE_URL}/update/parent/${userId}`;
      const response = await axios.put(url, data, { withCredentials: true });
      callback && callback();
      return response.data;
    } catch (error) {
      console.error(error);
      errorCallback && errorCallback(error as AxiosError);
      throw error;
    }
  }
};
