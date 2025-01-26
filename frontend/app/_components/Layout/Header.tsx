'use client'

import { useMenu } from "@/app/_hooks/useMenu";
import useUser from "@/app/_hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header () {
  const router = useRouter();
  const { user, userInfoByType, isLoading, logout, getUserPermission } = useUser()
  const { currentMenu, isLoading: menuLoading } = useMenu()

  // 유저 접근 권한
  const [userPermission, setUserPermission] = useState<"anonymous" | "admin" | "teacher" | "parent" | "student" | null>(null);

  // 권한 오류 표시 여부(한번만 뜨도록)
  const [hasShownPermissionError, setHasShownPermissionError] = useState(false);

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
      if (!hasShownPermissionError) {
        alert("해당 메뉴에 접근할 수 있는 권한이 없습니다.");
        setHasShownPermissionError(true);
        // router.push('/error/403');
        // console.log("해당 메뉴에 접근할 수 있는 권한이 없습니다.");
      }
    };

    // 유저 접근 권한 검증 핸들러
    const authenticatePermission = () => {
      console.log(userPermission)
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
      if (!currentMenu) {
        // TODO: 등록되지 않은 메뉴 처리
        // alert("메뉴를 찾을 수 없습니다.");
        // router.back();
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
    />
  </>

}