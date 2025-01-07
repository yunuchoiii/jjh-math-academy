'use client'

import useUser from "@/app/_hooks/user";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header () {
  const { user, isLoading, logout } = useUser()
  const [hamburger, setHamburger] = useState<boolean>(false);

  const handleContactMenu = () => {
    setHamburger(false)
  
    const contactSection = document.getElementById('contact-section');
    contactSection!.scrollIntoView({ behavior: 'smooth' })
  }

  const isMobile = !useMediaQuery('(min-width: 1024px)');
  
  useEffect(() => {
    if (isMobile) {
      // 모바일 메뉴 열때 스크롤 방지
      document.body.style.overflow = hamburger ? 'hidden' : 'auto';
      return () => {
        document.body.style.overflow = 'auto';
      };
    } else {
      // 데스크톱 메뉴 열때 스크롤하면 메뉴 닫힘
      const handleScroll = () => {
        setHamburger(false);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [hamburger, isMobile]);

  return <>
    {/* 데스크톱 */}
    <DesktopHeader
      hamburger={hamburger} 
      setHamburger={setHamburger} 
      handleContactMenu={handleContactMenu} 
      user={user} 
      isLoading={isLoading} 
      logout={logout} 
    />
    {/* 모바일 및 태블릿 */}
    <MobileHeader
      hamburger={hamburger} 
      setHamburger={setHamburger} 
      handleContactMenu={handleContactMenu} 
    />
  </>

}