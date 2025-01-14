import { childMenu, CONTACT_INFO, HEADER_HEIGHT, MENU_INFO } from '@/app/_constants/constants';
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
      className={`${styles.header} w-full flex items-center justify-between fixed inset-x-0 top-0 z-[9999]`}
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
            <Link 
              href={item.link || item.children?.[0].link || ''}
              className={`${styles.menu} xl:text-lg lg:text-base font-semibold text-gray-600 hover:text-green-1`} 
              onMouseOver={item.link ? ()=>{} : ()=>setShowChildren(true)}
            >
              {item.title}
            </Link>
            {showChildren && item.children && <ChildrenMenus childrenMenus={item.children || []}></ChildrenMenus>}
          </div>
        })}
        {!isLoading && <div className="flex items-center ml-6 gap-10">
          <Tooltip title={user ? "마이페이지" : "로그인"}>
            <Link 
              href={user ? '/user/mypage' : '/auth/login'} 
              className="flex items-center py-1.5 hover:text-green-1 hover:cursor-pointer"
            >
              <i className="fas fa-user-circle text-xl"></i>
            </Link>
          </Tooltip>
          {user && (
            <Tooltip title="로그아웃">
              <div 
                className="flex items-center py-1.5 hover:text-green-1 hover:cursor-pointer" 
                onClick={logout}
            >
                <i className="fas fa-sign-out-alt text-xl"></i>
              </div>
            </Tooltip>
          )}
        </div>}
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
                <a 
                  href={item.link} 
                  target={item.link.startsWith('/') ? undefined : "_blank"} 
                  rel="noopener noreferrer" 
                  key={`contact-info-${item.sort}`} 
                  className="flex items-center mb-3 last:mb-0"
                >
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
}

export default DesktopHeader;