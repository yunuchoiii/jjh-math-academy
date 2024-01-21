'use client'

import { BLOG_LINK, HEADER_HEIGHT, NAVER_MAP_LINK, childMenu, CONTACT_INFO, MENU_INFO, HEADER_HEIGHT_MOBILE } from "@/constants";
import styles from './Layout.module.css'
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { allowScroll, preventScroll } from "@/app/utils/scroll";

export default function Header () {
  const router = useRouter()
  const [hamburger, setHamburger] = useState<boolean>(false);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);

  const ChilrenMenus = ({childrenMenus}:{childrenMenus:Array<childMenu>}) => {
    return <div className={`flex flex-col items-center rounded-3xl absolute ${styles.childrenMenuBox} slide-in-blurred-top`}
    style={{top: HEADER_HEIGHT - 15}}>
      {childrenMenus.map(item => 
      <Link href={item.link} key={`children-menu-${item.title}`} className={`${styles.childMenu} flex items-center justify-center`}>
        <span>{item.title}</span>
      </Link>)}
    </div>
  }

  const handleContactMenu = () => {
    setHamburger(false)
  
    const contactSection = document.getElementById('contact-section');
    contactSection!.scrollIntoView({ behavior: 'smooth' })
  }

  return <>
    <div className="hidden lg:block">
      <div 
        className={`${styles.header} w-full flex items-center justify-between fixed inset-x-0 top-0`}
        style={{height: HEADER_HEIGHT}}
      >
        <div className="flex">
          <button 
            className={`${styles.menuHamburger} hover:bg-zinc-100 active:bg-zinc-200 rounded-full flex items-center justify-center`}
            onClick={()=>setHamburger(!hamburger)}
          >
            <img src="/images/icons/hamburger_bar.png" alt="menu" width={22} className="opacity-80"/>
          </button>
          <Link href={'/'} className="flex items-center ml-8">
            <img src="/images/logos/logo_green.png" alt="logo" width={34} style={{marginTop: -4}}/>
            <span className="NanumSquare xl:text-2xl lg:text-xl font-extrabold ml-4 text-green-1">
              조재현 수학학원
            </span>
          </Link>
        </div>
        <div className="lg:flex items-center hidden">
          {Object.values(MENU_INFO).map(item => {
            const [showChildren, setShowChildren] = useState<boolean>(false);
            return <div 
              key={`menu-${item.title}`} 
              onMouseLeave={()=>setShowChildren(false)}
            >
              <button 
                className={`${styles.menu} xl:text-lg lg:text-base font-semibold text-gray-600 hover:text-green-1`} 
                onClick={item.link ? handleContactMenu : ()=>{}}
                onMouseOver={item.link ? ()=>{} : ()=>setShowChildren(true)}
              >
                {item.title}
              </button>
              {showChildren && item.children && <ChilrenMenus childrenMenus={item.children || []}></ChilrenMenus>}
            </div>
          })}
          <a 
            href={'https://blog.naver.com/lllqueen8180'} 
            target="_blank" 
            className={`flex items-center bg-green-1 py-2 px-4 rounded-full h-fit ml-6 ${styles.blogButton}`}
          >
            <img src="/images/icons/blog-white.png" alt="blog" width={20}/>
            <span className="xl:text-base lg:text-sm ml-3 text-white">블로그 바로가기</span>
          </a>
        </div>
      </div>
      {<div 
        className={`${styles.fullMenuBox} w-full flex items-start justify-center fixed inset-x-0 py-12`}
        style={{top: hamburger ? HEADER_HEIGHT : -250}}>
          <div className="mr-16">
            <div className="Montserrat text-lg text-green-1 pb-5 px-1 uppercase">menu</div>
            <div className="pt-5 flex justify-between border-t border-green-1 px-1">
              {Object.values(MENU_INFO).map (menu => (
                <div 
                  key={`fullmenu-${menu.title}`} 
                  className="flex flex-col items-start"
                  style={{width: menu.sort !== 4 ? 186 : 'unset'}}
                >
                  <button 
                    className="text-green-1 text-lg mb-4 font-semibold"
                    onClick={menu.link ? handleContactMenu : ()=>{}}
                  >
                    {menu.title}
                  </button>
                  {menu.children?.map(item => (
                    <Link href={item.link} key={`fullmenu-${item.sort}`} className={`${styles.fullMenuUnit} mb-3 last:mb-0`}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div style={{width: 200}}>
            <div className="Montserrat text-lg text-green-1 pb-5 px-1 uppercase">contact</div>
            <div className="pt-5 flex flex-col justify-between border-t border-green-1 px-1">
              {Object.values(CONTACT_INFO).map(item => {
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
    </div>
    <div className="flex lg:hidden w-screen fixed inset-x-0 top-0 z-50">
      <div 
        className={`${styles.header} w-screen flex items-center justify-between fixed inset-x-0 top-0`} 
        style={{height: HEADER_HEIGHT_MOBILE}}
      >
        <img src="/images/logos/logo_green.png" alt="logo" width={30} style={{marginTop: -3}}/>
        <Link href={'/'} className="NanumSquare text-xl font-bold text-green-1">
          조재현 수학학원
        </Link>
        <button 
          className={`${styles.menuHamburger}`}
          onClick={()=>setHamburger(!hamburger)}
        >
          <img src="/images/icons/hamburger_bar.png" alt="menu" width={25}/>
        </button>
      </div> 
      <div 
        className={`${styles.mobileMenuBg} w-screen fixed inset-x-0 top-0 bg-darkgray-1`}
        style={{
          backgroundColor: hamburger ? 'rgba(0,0,0,0.25)' : 'transparent',
        }}
      >
          <div 
            className={`${styles.mobileMenuBox} w-screen fixed inset-x-0 flex flex-col`}
            style={{
              top: hamburger ? 50 : '-100%'
            }}
          >
            <div className="overflow-scroll" style={{height: "calc(100% - 5rem)"}}>
              {Object.values(MENU_INFO).map(parentMenu => {
                const [menuOpened, setMenuOpened] = useState<boolean>(false);
                const handleMenuClick = () => {
                  if (parentMenu.children) {
                    setMenuOpened(!menuOpened)
                  } else {
                    handleContactMenu()
                  }
                }
                return <div key={`mobile-parent-menu-${parentMenu.sort}`}>
                  <div className="overflow-hidden" style={{
                    height: menuOpened ? `calc(4.875rem + ${parentMenu.children!.length * 2.875}rem)` : '3.5rem',
                    transition: 'height 0.25s ease-in-out'
                  }}>
                    <div 
                      className={`${styles.mobileParentMenu} w-full h-14 rounded-xl px-6 flex items-center justify-between mb-1`}
                      style={{
                        backgroundColor: menuOpened ? '#F0F0F0' : 'transparent'
                      }}
                      onClick={handleMenuClick}
                    > 
                      <span className="text-green-1 text-xl leading-none font-bold">
                        {parentMenu.title}
                      </span>
                      {parentMenu.children && <img 
                        src="/images/icons/arrow_rounded.png" 
                        alt="close" className={`filter-green-1 ${!menuOpened && 'rotate-180'}`}
                        width={20} 
                      />}
                    </div>
                    <div className="pb-2.5 pt-1.5">
                      {parentMenu.children?.map(childMenu => 
                        <Link
                          href={childMenu.link}
                          key={`mobile-child-menu-${childMenu.sort}`} 
                          className='py-3.5 pl-7 flex items-center'
                        >
                          <div className="w-2 h-2 rounded-full bg-yellow-1 mr-3.5"></div>
                          <div className="text-lg leading-none decoration-neutral-700">
                            {childMenu.title}
                          </div>
                        </Link>
                      )}  
                    </div>
                  </div>
                </div>
              })}              
            </div>
            <div className="w-10/12 h-20 rounded-3xl bg-green-gradient absolute bottom-12 left-2/4 flex items-center justify-evenly" style={{transform: 'translateX(-50%)'}}>
              {Object.values(CONTACT_INFO).map(contact => <a href={contact.link} target="_blank" key={`mobile-contact-${contact.sort}`}>
                <img src={contact.icon} alt={contact.title} width={30} className="invert"/>
              </a>)}
            </div>
            <div className={`${styles.mobileMenuClose} w-11 h-11 bg-green-3 rounded-full flex items-center justify-center`} onClick={()=>setHamburger(false)}>
              <img src="/images/icons/arrow_rounded.png" alt="close" className="invert"/>
            </div>
          </div>
      </div>
    </div>
  </>

}