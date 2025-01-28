"use client"

import Title from "@/app/_components/Title/Title";
import { useMenu } from "@/app/_hooks/useMenu";

const AdminHome = () => {
  const { currentParentMenu, getChildMenuList } = useMenu()
  // const adminMenuList =  currentParentMenu ? getChildMenuList(currentParentMenu.id).filter(menu => menu.isShown) : []
  return <div>
    <Title title="관리자 페이지입니다." />
    <div>
    </div>
  </div>;
}

export default AdminHome;