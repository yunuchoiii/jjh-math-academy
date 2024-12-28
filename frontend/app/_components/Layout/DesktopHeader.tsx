import { childMenu, HEADER_HEIGHT, MENU_INFO } from '@/constants';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import styles from './Layout.module.css';

interface DesktopHeaderProps {
  hamburger: boolean;
  setHamburger: (hamburger: boolean) => void;
  handleContactMenu: () => void;
  user: any;
  isLoading: boolean;
  logout: () => void;
}

const DesktopHeader = ({hamburger, setHamburger, handleContactMenu, user, isLoading, logout}: DesktopHeaderProps) => {

  // 스크롤 높이 감지
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHamburger(false);
      }
    };

    // 데스크탑 화면에서만 스크롤 이벤트 추가
    if (window.innerWidth >= 1024) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setHamburger]);

  const ChildrenMenus = ({childrenMenus}:{childrenMenus:Array<childMenu>}) => {
    return <div className={`flex flex-col items-center rounded-3xl absolute ${styles.childrenMenuBox} slide-in-blurred-top`}
    style={{top: HEADER_HEIGHT - 15}}>
      {childrenMenus.map(item => 
      <Link href={item.link} key={`children-menu-${item.title}`} className={`${styles.childMenu} flex items-center justify-center`}>
        <span>{item.title}</span>
      </Link>)}
    </div>
  }

  return <div className="hidden lg:block">
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
            className="relative"
          >
            <button 
              className={`${styles.menu} xl:text-lg lg:text-base font-semibold text-gray-600 hover:text-green-1`} 
              onClick={item.link ? handleContactMenu : ()=>{}}
              onMouseOver={item.link ? ()=>{} : ()=>setShowChildren(true)}
            >
              {item.title}
            </button>
            {showChildren && item.children && <ChildrenMenus childrenMenus={item.children || []}></ChildrenMenus>}
          </div>
        })}
        {!isLoading && <div className="flex items-center ml-6">
          <Tooltip title={user ? "마이페이지" : "로그인"}>
            <Link 
              href={user ? '/user' : '/auth/login'} 
              className="flex items-center py-1.5 px-4 hover:text-green-1 hover:cursor-pointer"
            >
              <i title={user ? "마이페이지" : "로그인"} className="far fa-user"></i>
            </Link>
          </Tooltip>
          {user && (
            <Tooltip title="로그아웃">
              <div 
                className="flex items-center py-1.5 px-4 hover:text-green-1 hover:cursor-pointer" 
                onClick={logout}
            >
                <i title="로그아웃" className="fas fa-sign-out-alt"></i>
              </div>
            </Tooltip>
          )}
        </div>}
      </div>
    </div>
  </div>
}

export default DesktopHeader;