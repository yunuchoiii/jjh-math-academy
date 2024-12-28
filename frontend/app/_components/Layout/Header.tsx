'use client'

import useUser from "@/app/_hooks/user";
import { useState } from "react";
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