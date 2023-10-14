'use client'

import { BLOG_LINK, HEADER_HEIGHT, NAVER_MAP_LINK, childMenu, CONTACT_INFO, MENU_INFO } from "@/constants";
import styles from './Layout.module.css'
import Link from "next/link";
import { useState } from "react";

export default function Header () {
  const [hamburger, setHamburger] = useState<boolean>(false);

  const ChilrenMenus = ({childrenMenus}:{childrenMenus:Array<childMenu>}) => {
    return <div className={`flex flex-col items-center rounded-3xl absolute ${styles.childrenMenuBox} slide-in-blurred-top`}
    style={{top: HEADER_HEIGHT - 15}}>
      {childrenMenus.map(item => 
      <Link href={item.link} key={`children-menu-${item.title}`} className={`${styles.childMenu} flex items-center justify-center`}>
        <span>{item.title}</span>
      </Link>)}
    </div>
  }
  
  return <>
    <div 
      className={`${styles.header} w-full flex items-center justify-between fixed inset-x-0 top-0`}
      style={{height: HEADER_HEIGHT}}
    >
      <div className="flex">
        <button 
          className={`${styles.menuHamburger} hover:bg-zinc-100 rounded-full flex items-center justify-center`}
          onClick={()=>setHamburger(!hamburger)}
        >
          <img src="/images/icons/hamburger_bar.png" alt="menu" width={22} className="opacity-80"/>
        </button>
        <Link href={'/'} className="flex items-center ml-8">
          <img src="/images/logos/logo_green.png" alt="logo" width={34} style={{marginTop: -4}}/>
          <span className="NanumSquare text-xl font-bold ml-4 green-1">
            조재현 수학학원
          </span>
        </Link>
      </div>
      <div className="flex items-center">
        {MENU_INFO.map(item => {
          const [showChildren, setShowChildren] = useState<boolean>(false);
          return <div 
            key={`menu-${item.title}`} 
            onMouseLeave={()=>setShowChildren(false)}
          >
            {item.link ? 
              <Link href={item.link} className={`${styles.menu} ${showChildren && 'green-1'} font-semibold text-gray-600`} >
                {item.title}
              </Link> :
              <button 
                className={`${styles.menu} ${showChildren && 'green-1'} font-semibold text-gray-600`} 
                onMouseOver={()=>setShowChildren(true)}
              >
                {item.title}
              </button>
            }
            {showChildren && item.children && <ChilrenMenus childrenMenus={item.children || []}></ChilrenMenus>}
          </div>
        })}
        <a 
          href={'https://blog.naver.com/lllqueen8180'} 
          target="_blank" 
          className="flex items-center bg-green-1 py-2 px-4 rounded-full h-fit ml-6"
        >
          <img src="/images/icons/blog-white.png" alt="blog" width={20}/>
          <span className="text-sm ml-3 text-white">블로그 바로가기</span>
        </a>
      </div>
    </div>
    {<div 
      className={`${styles.fullMenuBox} w-full flex items-start justify-center fixed inset-x-0 py-12`}
      style={{top: hamburger ? HEADER_HEIGHT : -250}}>
        <div className="mr-16">
          <div className="Montserrat text-lg green-1 pb-5 px-1 uppercase">menu</div>
          <div className="pt-5 flex justify-between border-t border-green-1 px-1">
            {MENU_INFO.map (menu => (
              <div 
                key={`fullmenu-${menu.title}`} 
                className="flex flex-col items-start"
                style={{width: menu.sort !== 4 ? 186 : 'unset'}}
              >
                <div className="green-1 text-lg mb-4 font-semibold">{menu.title}</div>
                {menu.children?.map(item => (
                  <Link href={item.link} className={`${styles.fullMenuUnit} mb-3 last:mb-0`}>
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{width: 200}}>
          <div className="Montserrat text-lg green-1 pb-5 px-1 uppercase">contact</div>
          <div className="pt-5 flex flex-col justify-between border-t border-green-1 px-1">
            {CONTACT_INFO.map(item => {
              const Content = (
                <>
                  <img src={item.icon} alt={item.title} className="opacity-50 mr-4" style={{width: 15, height: 15}}/>
                  <div className={styles.fullMenuUnit}>{item.title}</div>
                </>
              );

              return item.link !== "" ? (
                <a href={item.link} target="_blank" rel="noopener noreferrer" key={`contact-info-${item.sort}`} className="flex items-center mb-3 last:mb-0">
                  {Content}
                </a>
              ) : (
                <div key={`contact-info-${item.sort}`} className="flex items-center mb-3 last:mb-0">
                  {Content}
                </div>
              );
            })}
          </div>
        </div>
    </div>}
  </>
}