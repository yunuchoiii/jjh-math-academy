import { CONTACT_INFO, HEADER_HEIGHT } from '@/app/_constants/constants';
import { useMenu } from '@/app/_hooks/menu';
import { IMenu } from '@/app/_service/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();

  const { currentMenu, currentParentMenu, parentMenuList, getChildMenuList } = useMenu();

  const [hoveredMenuId, setHoveredMenuId] = useState<number | null>(null);

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

  useEffect(() => {
    setHamburger(false)
  }, [pathname]);

  const ChildrenMenus = ({childrenMenus}:{childrenMenus:IMenu[]}) => {
    return <div className={`flex flex-col items-center rounded-3xl absolute ${styles.childrenMenuBox} slide-in-blurred-top`}
    style={{top: HEADER_HEIGHT - 15}}>
      {childrenMenus.map(item => 
      <Link href={item.link!} key={`children-menu-${item.title}`} className={`${styles.childMenu} flex items-center justify-center ${item.id === currentMenu?.id ? 'text-green-1 font-bold' : 'text-black'}`}>
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
        {parentMenuList.map(item => {
          return <div 
            key={`menu-${item.title}`} 
            onMouseLeave={()=>setHoveredMenuId(null)}
            className="relative"
          >
            <Link 
              href={item.link || getChildMenuList(item.id)[0].link || ''}
              className={`${styles.menu} xl:text-lg lg:text-base font-semibold hover:text-green-1 ${item.id === currentParentMenu?.id ? 'text-green-1' : 'text-black'}`} 
              onMouseOver={item.link ? ()=>{} : ()=>setHoveredMenuId(item.id)}
            >
              {item.title}
            </Link>
            {hoveredMenuId === item.id && getChildMenuList(item.id).length > 0 && <ChildrenMenus childrenMenus={getChildMenuList(item.id)}></ChildrenMenus>}
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
      style={{top: hamburger ? HEADER_HEIGHT : "-50%"}}
    >
        <div className="mr-16">
          <div className="Montserrat text-lg text-green-1 pb-5 px-1 uppercase">menu</div>
          <div className="pt-5 flex justify-between border-t border-green-1 px-1">
            {parentMenuList.map (menu => (
              <div 
                key={`fullmenu-${menu.title}`} 
                className="flex flex-col gap-3 items-start w-[166px] last:w-auto"
              >
                <button 
                  className="text-green-1 text-lg mb-1 font-semibold"
                  onClick={menu.link ? handleContactMenu : ()=>{}}
                >
                  {menu.title}
                </button>
                {getChildMenuList(menu.id).map(item => (
                  <Link 
                    href={item.link!} 
                    key={`fullmenu-${item.sort}`} 
                    className={styles.fullMenuUnit}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="Montserrat text-lg text-green-1 pb-5 px-1 uppercase">contact</div>
          <div className="pt-5 flex flex-col justify-between border-t border-green-1 px-1 pr-2.5">
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