import axios, { AxiosError } from "axios";
import { IPaginatedResponse, PaginationPayload } from "./common";
import { IPost } from "./post";

export enum BoardSlugEnum {
  NOTICE = "notice",
  COMMON_MATH = "common-math",
  YORISU = "yorisu",
  SIGMA_CLASS = "sigma-class",
}

export interface IBoard {
  id: number; 
  name: string; 
  slug: BoardSlugEnum; 
  description: string;
  isActive: boolean; 
  createdAt: Date; 
  updatedAt: Date; 
}

export interface BoardSavePayload {
  title: string;
  slug: BoardSlugEnum;
  description: string;
  isActive: boolean;
}

export interface BoardPayload {
  callback: () => any
  errorCallback: (error: AxiosError) => void
  data?: BoardSavePayload
  boardId?: number
  slug?: BoardSlugEnum
}

export interface BoardPostPayload extends PaginationPayload {
  boardId: number
}

const BOARD_SERVICE_URL = `${process.env.SERVER_URL}/board`;

export const boardService = {
  /** 게시판 조회
   * @returns {Promise<any>} - 게시판 정보 응답 데이터
   */
  getBoardList: async () :Promise<IBoard[]> => {
    try {
      const url = `${BOARD_SERVICE_URL}/`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /** 게시판 정보 조회 (ID)
   * @param {number} boardId - 게시판 ID
   * @returns {Promise<any>} - 게시판 정보 응답 데이터
   */
  getBoardInfoById: async (boardId: number) :Promise<IBoard> => {
    try {
      const url = `${BOARD_SERVICE_URL}/${boardId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /** 게시판 정보 조회 (slug)
   * @param {BoardSlugEnum} slug - 게시판 slug
   * @returns {Promise<any>} - 게시판 정보 응답 데이터
   */
  getBoardInfoBySlug: async (slug: BoardSlugEnum) :Promise<IBoard> => {
    try {
      const url = `${BOARD_SERVICE_URL}/slug/${slug}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /** 게시판 게시글 목록 조회
   * @param {number} boardId - 게시판 ID
   * @param {PaginationPayload} payload - 페이지 번호, 페이지 당 게시글 수
   * @returns {Promise<IPaginatedResponse<IPost>>} - 게시글 목록 응답 데이터
   */
  getPostListByBoardId: async ({boardId, page, size}: BoardPostPayload) :Promise<IPaginatedResponse<IPost>> => {
    try {
      const url = `${BOARD_SERVICE_URL}/${boardId}/posts?page=${page}&size=${size}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /** 게시판 생성
   * @param {BoardPayload} payload - 게시판 생성 요청 데이터
   * @returns {Promise<any>} - 게시판 정보 응답 데이터
   */
  createBoard: async ({callback, errorCallback, data}: BoardPayload) :Promise<IBoard> => {
    try {
      const url = `${BOARD_SERVICE_URL}/`;
      const response = await axios.post(url, data);
      callback();
      return response.data;
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 게시판 수정
   * @param {BoardPayload} payload - 게시판 수정 요청 데이터
   * @returns {Promise<any>} - 게시판 정보 응답 데이터
   */
  updateBoard: async ({callback, errorCallback, boardId, data}: BoardPayload) :Promise<IBoard> => {
    try {
      const url = `${BOARD_SERVICE_URL}/${boardId}`;
      const response = await axios.put(url, data);
      callback();
      return response.data;
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;  
    }
  },
  /** 게시판 삭제
   * @param {BoardPayload} payload - 게시판 삭제 요청 데이터
   * @returns {Promise<any>} - 게시판 정보 응답 데이터
   */
  deleteBoard: async ({callback, errorCallback, boardId}: BoardPayload) :Promise<void> => {
    try {
      const url = `${BOARD_SERVICE_URL}/${boardId}`;
      await axios.delete(url);
      callback();
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  }
};
