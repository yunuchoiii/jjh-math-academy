import axios, { AxiosError } from "axios";
import { IPaginatedResponse, PaginationPayload } from "./common";

export interface IPost {
  id: number;
  boardId: number;
  title: string;
  content: string;
  authorId: number;
  isNotice: boolean;
  isActive: boolean;
  views: number;
  attachmentGroupId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostSavePayload {
  boardId: number;
  title: string;
  content: string;
  authorId: number;
  isNotice: boolean;
  isActive: boolean;
  views?: number;
  attachmentGroupId?: number;
}

export interface PostPayload {
  callback: () => any
  errorCallback: (error: AxiosError) => void
  data?: PostSavePayload
  postId?: number
}

export interface PostListPayload extends PaginationPayload {
  isActive?: boolean
  isNotice?: boolean
}

const POST_SERVICE_URL = `${process.env.SERVER_URL}/post`;

export const postService = {
  /** 게시판 조회
   * @returns {Promise<any>} - 게시판 정보 응답 데이터
   */
  getPostList: async ({page, size, isActive, isNotice, searchKeyword, searchType}: PostListPayload) :Promise<IPaginatedResponse<IPost>> => {
    // 쿼리 파라미터 생성
    const queryParams = new URLSearchParams();
    queryParams.append("page", page.toString());
    queryParams.append("size", size.toString());
    if (isActive !== undefined) queryParams.append("isActive", isActive.toString());
    if (isNotice !== undefined) queryParams.append("isNotice", isNotice.toString());
    if (searchKeyword !== undefined) queryParams.append("searchKeyword", searchKeyword);
    if (searchType !== undefined) queryParams.append("searchType", searchType);

    try {
      const url = `${POST_SERVICE_URL}?${queryParams.toString()}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /** 게시글 상세 조회
   * @param {number} postId - 게시글 ID
   * @returns {Promise<IPost>} - 게시글 정보 응답 데이터
   */
  getPost: async (postId: number): Promise<IPost> => {
    try {
      const url = `${POST_SERVICE_URL}/${postId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  /** 게시글 생성
   * @param {PostPayload} payload - 게시글 생성 요청 데이터
   * @returns {Promise<IPost>} - 생성된 게시글 정보 응답 데이터
   */
  createPost: async ({callback, errorCallback, data}: PostPayload): Promise<IPost> => {
    try {
      const url = `${POST_SERVICE_URL}/`;
      const response = await axios.post(url, data);
      callback();
      return response.data;
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 게시글 수정
   * @param {PostPayload} payload - 게시글 수정 요청 데이터
   * @returns {Promise<IPost>} - 수정된 게시글 정보 응답 데이터
   */
  updatePost: async ({callback, errorCallback, postId, data}: PostPayload): Promise<IPost> => {
    try {
      const url = `${POST_SERVICE_URL}/${postId}`;
      const response = await axios.put(url, data);
      callback();
      return response.data;
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 게시글 삭제
   * @param {PostPayload} payload - 게시글 삭제 요청 데이터
   * @returns {Promise<void>} - 삭제 완료 응답
   */
  deletePost: async ({callback, errorCallback, postId}: PostPayload): Promise<void> => {
    try {
      const url = `${POST_SERVICE_URL}/${postId}`;
      await axios.delete(url);
      callback();
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  },
  /** 게시글 조회수 증가
   * @param {number} postId - 게시글 ID
   * @returns {Promise<void>} - 조회수 증가 완료 응답
   */
  updateViewCount: async (postId: number): Promise<void> => {
    try {
      const url = `${POST_SERVICE_URL}/${postId}/view`;
      await axios.put(url);
    } catch (error) {
      throw error;
    }
  }
};
