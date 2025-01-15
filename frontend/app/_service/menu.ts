import axios from "axios";

export interface IMenu {
  /** 메뉴 ID (Primary Key) */
  id: number; 
  /** 부모 메뉴 ID (null이면 최상위 메뉴) */
  parentId: number | null; 
  /** 메뉴 제목 */
  title: string; 
  /** 메뉴 링크 (null이면 하위 메뉴만 가짐) */
  link: string | null; 
  /** 정렬 순서 */
  sort: number; 
  /** 활성화 여부 (true: 활성화, false: 비활성화) */
  isActive: boolean; 
  /** 메뉴에서 보이는 여부 (true: 보임, false: 숨김) */
  isShown: boolean; 
  /** 외부 링크 여부 (true: 외부 링크, false: 내부 링크) */
  isExternal: boolean; 
  /** 새 탭에서 열기 여부 (true: 새 탭 열기, false: 현재 탭 열기) */
  isOpenInNewTab: boolean; 
  /** 접근 권한 (anonymous: 비로그인, admin: 관리자, teacher: 선생님, parent: 학부모, student: 학생) */
  permission: 'anonymous' | 'admin' | 'teacher' | 'parent' | 'student'; 
  /** 메뉴 설명 (툴팁 등) */
  description: string | null; 
  /** 생성일 */
  createdAt: Date; 
  /** 수정일 */
  updatedAt: Date; 
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
};
