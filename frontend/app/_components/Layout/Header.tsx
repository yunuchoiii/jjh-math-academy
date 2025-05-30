'use client'

import { useMenu } from "@/app/_hooks/useMenu";
import useUser from "@/app/_hooks/useUser";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useToast } from "../Toast/ToastProvider";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header () {
  const router = useRouter();
  const pathname = usePathname();
  const {addToast} = useToast();
  const { user, userInfoByType, isLoading, getUserPermission } = useUser()
  const { currentMenu, isLoading: menuLoading } = useMenu()

  // 유저 접근 권한
  const [userPermission, setUserPermission] = useState<"anonymous" | "admin" | "teacher" | "parent" | "student" | null>(null);

  // 유저 접근 권한 설정
  useEffect(() => {
    if (!isLoading) {
      if (user && userInfoByType) {
        setUserPermission(getUserPermission())
      } else {
        setUserPermission("anonymous")
      }
    }
  }, [user, userInfoByType, isLoading])

  // 유저 접근 권한 검증
  useEffect(() => {
    const showPermissionError = () => {
      addToast({
        type: "error",
        message: "해당 메뉴에 접근할 수 있는 권한이 없습니다."
      })
      router.back()
    };

    // 유저 접근 권한 검증 핸들러
    const authenticatePermission = () => {
      switch (currentMenu?.permission) {
        case "anonymous":
          return;
        case "user":
          if (!["teacher", "parent", "student", "admin"].includes(userPermission!)) {
            showPermissionError();
          }
          break;
        default:
          if (userPermission !== currentMenu?.permission) {
            showPermissionError();
          }
          break;
      }
    }

    if (!menuLoading ) {
      if (currentMenu && !pathname.includes(currentMenu.link!)) {
        // addToast({
        //   type: "error",
        //   message: "메뉴를 찾을 수 없습니다."
        // })
        // router.back();
        console.log("메뉴를 찾을 수 없습니다.", currentMenu.link, pathname)
      }
      if (currentMenu && userPermission) {
        authenticatePermission();
      }
    }
  }, [currentMenu, userPermission, router, menuLoading])

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

  return <header>
    {/* 데스크톱 */}
    <DesktopHeader
      hamburger={hamburger} 
      setHamburger={setHamburger} 
      handleContactMenu={handleContactMenu} 
      user={user} 
      isLoading={isLoading} 
    />
    {/* 모바일 및 태블릿 */}
    <MobileHeader
      hamburger={hamburger} 
      setHamburger={setHamburger} 
    />
  </header>

}