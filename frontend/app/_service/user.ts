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
  gradeLevel: string;
}

export interface UserPayload {
  callback?: () => any
  errorCallback?: (error: AxiosError) => void
  data?: UserSavePayload | TeacherSavePayload | ParentSavePayload | StudentSavePayload
  userType?: 'user' | 'teacher' | 'parent' | 'student'
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
  get: async () => {
    const url = `${USER_SERVICE_URL}`;
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  }
};