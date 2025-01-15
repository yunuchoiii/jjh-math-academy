import { atom, selector } from "recoil";
import { IMenu, menuService } from "../_service/menu";

export const menuState = atom<IMenu[]>({
  key: 'menuState',
  default: [],
});

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
    set(menuState, newValue);
  },
});
