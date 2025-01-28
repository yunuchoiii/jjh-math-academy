import axios, { AxiosError } from "axios";

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
    try {
      const url = `${MENU_SERVICE_URL}/list`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
  getMenu: async (id: string) => {
    try {
      const url = `${MENU_SERVICE_URL}/${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
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