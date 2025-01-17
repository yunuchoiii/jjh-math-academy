'use client'

import { CONTACT_INFO } from '@/app/_constants/constants';
import { useMenu } from '@/app/_hooks/menu';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer () {
  const pathname = usePathname();

  const { menuList } = useMenu();
  const parentMenuList = menuList.filter(menu => menu.parentId === null);
  const childrenMenuList = menuList.filter(menu => menu.parentId !== null);

  return <>
    <div className={`bg-[#505050] xl:px-32 xl:py-16 lg:px-12 lg:py-12 px-10 py-6 flex items-center lg:justify-center justify-start ${pathname !== '/' ? 'mt-20' : 'mt-0'}`}>
      <div className="w-full flex flex-col lg:flex-row items-start justify-between">
        <div className="flex items-center justify-center flex-row lg:flex-col h-full">
          <img src="/images/logos/logo_white_outlined.png" alt="logo" className="xl:w-16 lg:w-12 w-7 mb-0 lg:mb-5 mr-4 lg:mr-0"/>
          <div className="xl:text-lg text-sm font-bold NanumSquare text-white">
            조재현 수학학원
          </div>
        </div>
        <div className="mt-4 lg:mt-0">
          <ul className="xl:text-sm text-xs leading-relaxed text-[#BCBCBC]">
            <li>전화번호 : 010-8955-8180</li>
            <li>운영시간 : 평일 13:00 - 21:00, 토요일 09:30 - 16:00</li>
            <li>주소 : 서울 노원구 노원로 434 . 상가동 201호</li>
            <li>교습소신고번호 : 제2016-95호</li>
          </ul>
          <div className="xl:w-[154px] lg:w-32 hidden lg:flex justify-between mt-4">
            {Object.values(CONTACT_INFO).map(item => (
              item.sort !== 1 ? 
              <a href={item.link} key={`footer-${item.sort}`}>
                <img src={item.icon} alt={item.title} className="xl:w-7 lg:w-5 invert opacity-80"/>
              </a> : 
              null
            ))}
          </div>
        </div>
        <div className="hidden lg:flex xl:gap-16 lg:gap-12 last:gap-10">
          {parentMenuList.map(menu => (
            <div className="flex flex-col" key={`footer-menu-${menu.sort}`}>
              {!menu.link ? <div className="xl:text-base lg:text-sm font-semibold text-[#DDD] opacity-90 xl:mb-4 lg:mb-3">
                {menu.title}
              </div> : <Link href={menu.link} className="xl:text-base lg:text-sm font-semibold text-[#DDD] opacity-90 xl:mb-4 lg:mb-3">
                {menu.title}
              </Link>}
              {childrenMenuList.filter(item => item.parentId === menu.id).map(item => <Link href={item.link!} className="xl:text-sm lg:text-xs xl:mb-2.5 lg:mb-2 last:mb-0 text-[#BCBCBC] hover:text-white" key={`footer-menu-${item.sort}`}>
                {item.title}
              </Link>)}
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="h-10 bg-[#454545] flex justify-center items-center text-[#CBCBCB] lg:text-xs text-[10px]">
      Copyright © 2023 조재현 수학학원 (JJH Math Academy). All Right Reserved
    </div>
  </>
}