import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { menuService } from '../_service/menu';
import { menuState } from '../_stores/menu';

export const useMenu = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [menus, setMenus] = useRecoilState(menuState);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        setIsLoading(true);
        const list = await menuService.getMenuList();
        setMenus(list);
      } catch (err) {
        setError(err as Error);
        console.error("Failed to fetch menu list", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuList();
  }, []);

  return { menus, error, isLoading };
};