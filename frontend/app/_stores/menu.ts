import { atom, selector } from "recoil";
import { IMenu, menuService } from "../_service/menu";

/** 메뉴 리스트 */
export const menuListState = atom<IMenu[]>({
  key: 'menuListState',
  default: [],
});

/** 현재 메뉴 */
export const currentMenuState = atom<IMenu | null>({
  key: 'currentMenuState',
  default: null,
});

/** 현재 상위 메뉴 */
export const currentParentMenuState = atom<IMenu | null>({
  key: 'currentParentMenuState',
  default: null,
});

/** 메뉴 리스트 셀렉터 */
export const menuListSelector = selector<IMenu[]>({
  key: 'menuListSelector',
  get: async ({ get }) => {
    try {
      const menuList = await menuService.getMenuList();
      return menuList;
    } catch (error) {
      console.error("Failed to fetch menu list", error);
      return [];
    }
  },
  set: ({ set }, newValue) => {
    set(menuListState, newValue);
  },
});
