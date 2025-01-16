import { CONTACT_INFO, HEADER_HEIGHT_MOBILE } from '@/app/_constants/constants';
import { IMenu } from '@/app/_service/menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import ReactiveButton from '../Button/ReactiveButton';
import styles from './Layout.module.css';

interface MobileHeaderProps {
  menuList: IMenu[];
  hamburger: boolean;
  setHamburger: (hamburger: boolean) => void;
}

const MobileHeader = ({menuList, hamburger, setHamburger}: MobileHeaderProps) => {
  const router = useRouter();

  const handleClick = (link: string) => {
    setHamburger(false)
    router.push(link)
  }

  const parentMenuList = menuList.filter(menu => !menu.parentId);
  const getChildMenuList = useCallback((parentId: number) => {
    return menuList.filter(menu => menu.parentId === parentId);
  }, [menuList]);

  const [menuOpenedStates, setMenuOpenedStates] = useState<boolean[]>(parentMenuList.map(() => false));

  const toggleMenuOpened = (index: number) => {
    setMenuOpenedStates(prevStates => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return <div className="flex lg:hidden w-screen fixed inset-x-0 top-0 z-[9999]">
    <div 
      className={`${styles.header} w-screen flex items-center justify-between fixed inset-x-0 top-0`} 
      style={{height: HEADER_HEIGHT_MOBILE}}
    >
      <img src="/images/logos/logo_green.png" alt="logo" width={30} style={{marginTop: -3}}/>
      <Link href={'/'} className="NanumSquare text-xl font-extrabold text-green-1">
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
          <div className="overflow-scroll pb-10" style={{height: "calc(100% - 5rem)"}}>
            {parentMenuList.map((parentMenu, index) => {
              const menuOpened = menuOpenedStates[index];
              const handleMenuClick = () => {
                if (getChildMenuList(parentMenu.id).length > 0) {
                  toggleMenuOpened(index);
                } else {
                  handleClick(parentMenu.link || '');
                }
              };
              return <div key={`mobile-parent-menu-${parentMenu.sort}`}>
                <div className="overflow-hidden" style={{
                  height: menuOpened ? `calc(4.875rem + ${getChildMenuList(parentMenu.id).length * 2.875}rem)` : '3.5rem',
                  transition: 'height 0.25s ease-in-out'
                }}>
                  <div 
                    className={`${styles.mobileParentMenu} w-full h-14 rounded-xl px-6 flex items-center justify-between mb-1 active:bg-[#F0F0F0] ${menuOpened ? 'bg-[#F0F0F0]' : 'bg-transparent'}`}
                    onClick={handleMenuClick}
                  > 
                    <span className="text-green-1 text-xl leading-none font-bold">
                      {parentMenu.title}
                    </span>
                    {getChildMenuList(parentMenu.id).length > 0 && <img 
                      src="/images/icons/arrow_rounded.png" 
                      alt="close" className={`filter-green-1 ${!menuOpened && 'rotate-180'}`}
                      width={20} 
                    />}
                  </div>
                  <div className="pb-2.5 pt-1.5">
                    {getChildMenuList(parentMenu.id).map(childMenu => 
                      <ReactiveButton
                        key={`mobile-child-menu-${childMenu.sort}`} 
                        props={{
                          className:'py-3.5 pl-7 flex items-center w-full rounded-[15px] active:bg-[#F3F3F3]',
                          onClick: () => handleClick(childMenu.link || '')
                        }}
                      >
                        <div className="w-2 h-2 rounded-full bg-yellow-1 mr-3.5"></div>
                        <div className="text-lg leading-none decoration-neutral-700">
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