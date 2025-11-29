import axios, { AxiosError } from "axios";
import { INITIAL_MENU_LIST } from "../_constants/menu";

export interface IMenu {
  id: number; 
  parentId: number | null; 
  title: string; 
  link: string | null; 
  sort: number; 
  isActive: boolean; 
  isShown: boolean; 
  isExternal: boolean; 
  isOpenInNewTab: boolean; 
  permission: 'anonymous' | 'admin' | 'teacher' | 'parent' | 'student' | 'user'; 
  description: string | null; 
  createdAt: Date; 
  updatedAt: Date; 
}

export interface MenuSavePayload extends Partial<IMenu> {}

export interface MenuPayload {
  callback: () => any
  errorCallback: (error: AxiosError) => void
  data?: MenuSavePayload
  menuId?: number
}

const MENU_SERVICE_URL = `${process.env.SERVER_URL}/menu`;

export const menuService = {
  /** 메뉴 조회
   * @returns {Promise<any>} - 메뉴 정보 응답 데이터
   */
  getMenuList: async () => {
    // 현재는 백엔드 대신 상수로 정의된 메뉴 데이터를 사용합니다.
    // 추후 API 연동 시 아래 주석을 복구하면 됩니다.
    // try {
    //   const url = `${MENU_SERVICE_URL}/list`;
    //   const response = await axios.get(url);
    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // }
    return INITIAL_MENU_LIST;
  },
  getMenu: async (id: string) => {
    // 상수 기반 메뉴 데이터에서 단일 메뉴 조회
    const numericId = Number(id);
    const menu = INITIAL_MENU_LIST.find((item) => item.id === numericId) || null;
    return menu;
  },
  createMenu: async ({callback, errorCallback, data}: MenuPayload) => {
    try {
      const url = `${MENU_SERVICE_URL}`;
      const response = await axios.post(url, data);
      callback();
      return response.data;
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  },
  updateMenu: async ({callback, errorCallback, data, menuId}: MenuPayload) => {
    console.log(data);
    try {
      const url = `${MENU_SERVICE_URL}/${menuId}`;
      const response = await axios.put(url, data);
      callback();
      return response.data;
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  },
  deleteMenu: async ({callback, errorCallback, menuId}: MenuPayload) => {
    try {
      const url = `${MENU_SERVICE_URL}/${menuId}`;
      const response = await axios.delete(url);
      callback();
      return response.data;
    } catch (error) {
      errorCallback(error as AxiosError);
      throw error;
    }
  }
};