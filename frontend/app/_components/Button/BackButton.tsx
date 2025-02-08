"use client"

import { useRouter } from "next/navigation";

interface BackButtonProps {
  text?: string; /** 버튼 텍스트 (없으면 "뒤로 가기") */
  link?: string;
  hideText?: boolean;
  hideIcon?: boolean;
  fontSize?: string;
  fontWeight?: 300 | 400 | 500 | 600 | 700 | 800 | 900;
  fullRound?: boolean;
  fullWidth?: boolean;
  color?: string;
  backgroundColor?: string;
}

const BackButton = ({ text, link, hideText, hideIcon, fontSize, fontWeight, fullRound, fullWidth, color, backgroundColor }: BackButtonProps) => {
  const router = useRouter();
  return <button 
    className="flex items-center gap-5 px-5 py-2 md:hover:brightness-95 md:active:brightness-90 active:brightness-90 transition-all duration-100"
    style={{
      width: fullWidth ? "100%" : "auto",
      fontSize: fontSize ? fontSize : "14px",
      fontWeight: fontWeight ? fontWeight : 500,
      borderRadius: fullRound ? "999px" : "8px",
      backgroundColor: backgroundColor ? backgroundColor : "#E9E9E9",
      color: color ? color : "#333",
    }} 
    onClick={() => link ? router.push(link) : router.back()}
  >
    <i className={hideIcon ? "hidden" : "fas fa-arrow-left"}></i>
    <span className={hideText ? "hidden" : "block"}>{text ? text : "뒤로 가기"}</span>
  </button>
}

export default BackButton;