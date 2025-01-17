import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { menuService } from '../_service/menu';
import { currentMenuState, currentParentMenuState, menuListState } from '../_stores/menu';

export const useMenu = () => {
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState(true);
  const [menuList, setMenuList] = useRecoilState(menuListState);
  const [currentMenu, setCurrentMenu] = useRecoilState(currentMenuState);
  const [currentParentMenu, setCurrentParentMenu] = useRecoilState(currentParentMenuState);
  const [error, setError] = useState<Error | null>(null);

  const parentMenuList = menuList.filter(menu => !menu.parentId);
  const getChildMenuList = useCallback((parentId: number) => {
    return menuList.filter(menu => menu.parentId === parentId);
  }, [menuList]);

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        setIsLoading(true);
        const list = await menuService.getMenuList();
        setMenuList(list);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch menu list", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuList();
  }, []);

  useEffect(() => {
    if (menuList.length > 0) {
      const current = menuList.find(menu => menu.link?.includes(pathname));
      if (current) {
        setCurrentMenu(current);
        if (current.parentId) {
          setCurrentParentMenu(menuList.find(menu => menu.id === current.parentId) || null);
        }
      }
    }
  }, [menuList, pathname]);

  return { 
    menuList, 
    currentMenu, 
    currentParentMenu,
    parentMenuList, 
    getChildMenuList,
    error, 
    isLoading 
  };
};
