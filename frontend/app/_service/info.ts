import axios from "axios";

export interface IMathProgram {
  id: number;
  category: 'common_math' | 'advanced_math';
  title: string;
  subtitle?: string;
  targetAge: string;
  description: string[];
  books: string;
  schedule: string;
  themeColor: string;
  url: string;
}

export interface ITuition {
  id: number;
  level: 'elementary' | 'middle';
  classLevel: string;
  subject: string;
  monthlyHours: string;
  monthlyFee: number;
}

const INFO_SERVICE_URL = `${process.env.SERVER_URL}/info`;

export const infoService = {
  /** 프로그램 정보 조회
   * @returns {Promise<any>} - 프로그램 정보 응답 데이터
   */
  getPrograms: async () => {
    try {
      const url = `${INFO_SERVICE_URL}/programs`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /** 수업료 정보 조회
   * @returns {Promise<any>} - 수업료 정보 응답 데이터
   */
  getTuitions: async () => {
    try {
      const url = `${INFO_SERVICE_URL}/tuition`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};
