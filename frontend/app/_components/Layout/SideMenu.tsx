"use client"

import { useMenu } from "@/app/_hooks/useMenu"
import { IMenu } from "@/app/_service/menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const MenuButton = ({menu, isActive}: {menu: IMenu, isActive: boolean}) => {
  const activeClass = "text-[#000]";
  const inactiveClass = "text-[#777]";

  return <Link 
    href={menu.link || ""} 
    className={`flex items-center font-bold NanumSquare rounded-md px-0 hover:px-2 py-1 hover:bg-[#F3F3F3] transition-all duration-300 ${isActive ? activeClass : inactiveClass}`}
  >
    <div className={`w-1.5 h-1.5 bg-yellow-1 rounded-full transition-all duration-300 mr-2 ${isActive ? "opacity-100" : "opacity-0"}`}/>
    {menu.title}
  </Link>
}

const SideMenu = () => {
  const pathname = usePathname()
  const {currentParentMenu, getChildMenuList} = useMenu()

  const [menuList, setMenuList] = useState<IMenu[]>([])

  useEffect(() => {
    if (currentParentMenu) {
      setMenuList(
        getChildMenuList({parentId: currentParentMenu.id, isShown: true, isActive: true}).sort((a, b) => a.sort - b.sort)
      )
    }
  }, [currentParentMenu])

  const useSideMenu = ["/user/mypage", "/admin", "/board", "/post"]
  const isSideMenu = useSideMenu.some(menu => pathname.includes(menu))

  const renderMenu = (menus: IMenu[], depth: number = 0) => {
    return (
      <ul className="flex flex-col gap-1.5">
        {menus.map(menu => {
          const childMenuList = getChildMenuList({parentId: menu.id, isShown: true, isActive: true})
          return <li key={menu.id} style={{paddingLeft: `${depth * 10}px`}}>
            <MenuButton 
              menu={menu} 
              isActive={menu.link ? pathname.includes(menu.link) : false}
            />
            {childMenuList.length > 0 && renderMenu(childMenuList, depth + 1)}
          </li>
        })}
      </ul>
    )
  }

  return <section className={`${isSideMenu ? "hidden lg:block" : "hidden"}`}>
    <div className={`w-[160px] flex-shrink-0 sticky top-28`}>
      <h2 className="text-xl font-extrabold NanumSquare text-green-1 mb-2.5">
        {currentParentMenu?.title}
      </h2>
      {renderMenu(menuList)}
    </div>
  </section>
}

export default SideMenu