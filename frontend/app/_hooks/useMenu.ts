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
  const getParentMenuList = useCallback(({
    isShown, 
    isActive
  }: {
    isShown?: boolean, 
    isActive?: boolean
  }) => {
    if (isShown) {
      return parentMenuList.filter(menu => menu.isShown === isShown && menu.isActive === isActive);
    } else if (isActive) {
      return parentMenuList.filter(menu => menu.isActive === isActive);
    } else {
      return parentMenuList;
    }
  }, [menuList]);

  const getChildMenuList = useCallback(({
    parentId,
    isShown,
    isActive
  }: {
    parentId: number,
    isShown?: boolean,
    isActive?: boolean
  }) => {
    const childMenuList = menuList.filter(menu => menu.parentId === parentId);
    if (isShown) {
      return childMenuList.filter(menu => menu.isShown === isShown && menu.isActive === isActive);
    } else if (isActive) {
      return childMenuList.filter(menu => menu.isActive === isActive);
    } else {
      return childMenuList;
    }
  }, [menuList]);

  const fetchMenuList = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    if (menuList.length > 0) {
      if (pathname === '/') {
        const current = menuList.find(menu => menu.link === pathname);
        setCurrentMenu(current || null);
        setCurrentParentMenu(current || null);
      } else {
        const current = menuList.find(menu => pathname.includes(menu.link!));
        if (current) {
          setCurrentMenu(current);
          if (current.parentId) {
            setCurrentParentMenu(parentMenuList.find(menu => menu.id === current.parentId) || null);
          }
        }
      }
    }
  }, [menuList, pathname]);

  return { 
    menuList, 
    currentMenu, 
    currentParentMenu,
    parentMenuList, 
    getParentMenuList,
    getChildMenuList,
    error, 
    isLoading,
    refresh: fetchMenuList
  };
};
