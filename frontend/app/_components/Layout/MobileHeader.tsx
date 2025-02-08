import { CONTACT_INFO, HEADER_HEIGHT_MOBILE, LOGO_GREEN_SRC } from '@/app/_constants/constants';
import { useMenu } from '@/app/_hooks/useMenu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactiveButton from '../Button/ReactiveButton';
import styles from './Layout.module.css';

interface MobileHeaderProps {     
  hamburger: boolean;
  setHamburger: (hamburger: boolean) => void;
}

const MobileHeader = ({hamburger, setHamburger}: MobileHeaderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentMenu, currentParentMenu, getParentMenuList, getChildMenuList } = useMenu();

  const parentMenuList = getParentMenuList({isShown: true, isActive: true}).sort((a, b) => a.sort - b.sort);

  const handleClick = (link: string) => {
    setHamburger(false)
    router.push(link)
  }

  const [menuOpenedStates, setMenuOpenedStates] = useState<boolean[]>(parentMenuList.map((_) => false));

  useEffect(() => {
    setMenuOpenedStates(parentMenuList.map((menu) => menu.id === currentParentMenu?.id ? true : false));
  }, [currentParentMenu]);

  const toggleMenuOpened = (index: number) => {
    setMenuOpenedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return <div className="flex lg:hidden w-screen fixed inset-x-0 top-0 z-[9999]">
    <div 
      className={`${styles.header} w-screen flex items-center justify-between fixed inset-x-0 top-0 z-[10000] bg-white shadow-[0px_-10px_30px_0px_rgba(0,0,0,0.3)]`} 
      style={{height: HEADER_HEIGHT_MOBILE}}
    >
      <Link href={'/'}>
        <Image src={LOGO_GREEN_SRC} alt="logo" width={30} height={30} style={{marginTop: -3}}/>
      </Link>
      {!currentMenu ? 
        <Link href={'/'} className="NanumSquare text-xl font-extrabold text-green-1">
          조재현 수학학원
        </Link> :
        <Link href={currentMenu?.link || ''} className="NanumSquare text-xl font-extrabold text-green-1">
          {currentMenu?.title}
        </Link>
      }
      <button 
        className={`${styles.menuHamburger}`}
        onClick={()=>setHamburger(!hamburger)}
      >
        <Image src="/images/icons/hamburger_bar.png" alt="menu" width={25} height={25} className="aspect-square"/>
      </button>
    </div> 
    <div 
      className={`${styles.mobileMenuBg} ${hamburger ? "h-screen" : ""} w-screen fixed inset-x-0 top-0 bg-darkgray-1`}
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
          <div className="overflow-scroll pb-10" style={{height: "calc(100% - 5rem)"}}>
            {parentMenuList.map((parentMenu, index) => {
              const menuOpened = menuOpenedStates[index];
              const handleMenuClick = () => {
                if (getChildMenuList({parentId: parentMenu.id, isShown: true, isActive: true}).length > 0) {
                  toggleMenuOpened(index);
                } else {
                  handleClick(parentMenu.link || '');
                }
              };
              if (!parentMenu.isShown) return null;
              return <div key={`mobile-parent-menu-${parentMenu.sort}`}>
                <div className="overflow-hidden" style={{
                  height: menuOpened ? `calc(4.875rem + ${getChildMenuList({parentId: parentMenu.id, isShown: true, isActive: true}).length * 2.875}rem)` : '3.5rem',
                  transition: 'height 0.25s ease-in-out'
                }}>
                  <div 
                    className={`${styles.mobileParentMenu} w-full h-14 rounded-xl px-6 flex items-center justify-between mb-1 active:bg-[#F0F0F0] ${menuOpened ? 'bg-[#F0F0F0]' : 'bg-transparent'}`}
                    onClick={handleMenuClick}
                  > 
                    <span className="text-green-1 text-lg leading-none font-bold">
                      {parentMenu.title}
                    </span>
                    {getChildMenuList({parentId: parentMenu.id, isShown: true, isActive: true}).length > 0 && <img 
                      src="/images/icons/arrow_rounded.png" 
                      alt="close" className={`filter-green-1 ${!menuOpened && 'rotate-180'}`}
                      width={20} 
                    />}
                  </div>
                  <div className="pb-2.5 pt-1.5">
                    {getChildMenuList({parentId: parentMenu.id, isShown: true, isActive: true}).sort((a, b) => a.sort - b.sort).map(childMenu => 
                      <ReactiveButton
                        key={`mobile-child-menu-${childMenu.sort}`} 
                        props={{
                          className:'py-3.5 pl-7 flex items-center w-full rounded-[15px] active:bg-[#F3F3F3]',
                          onClick: () => handleClick(childMenu.link || '')
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-yellow-1 mr-3.5"></div>
                        <div className={`text-base leading-none decoration-neutral-700 ${childMenu.id === currentMenu?.id ? 'text-[#000]' : 'text-[#666]'}`}>
                          {childMenu.title}
                        </div>
                      </ReactiveButton>
                    )}  
                  </div>
                </div>
              </div>
            })}              
          </div>
          <div className="w-10/12 h-20 rounded-3xl bg-green-gradient absolute bottom-12 left-2/4 flex items-center justify-evenly" style={{transform: 'translateX(-50%)'}}>
            {Object.values(CONTACT_INFO).map(contact => (
              <a 
                href={contact.link} 
                target={contact.link.startsWith('/') ? undefined : "_blank"} 
                key={`mobile-contact-${contact.sort}`}
              > 
                <img src={contact.icon} alt={contact.title} width={30} className="invert"/>
              </a>
            ))}
          </div>
          <div className={`${styles.mobileMenuClose} w-11 h-11 bg-green-3 rounded-full flex items-center justify-center`} onClick={()=>setHamburger(false)}>
            <img src="/images/icons/arrow_rounded.png" alt="close" className="invert"/>
          </div>
        </div>
    </div>
  </div>
}

export default MobileHeader;