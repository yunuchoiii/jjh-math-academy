"use client";

import { ButtonHTMLAttributes } from "react";

export interface RoundButtonProps {
  label: string;
  onClick?: () => void;
  color?: "yellow" | "green";
  isActive?: boolean;
  width?: string | undefined;
  height?: string | undefined;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const RoundButton = ({ label, onClick, color = "green", isActive = false, width, height, props } : RoundButtonProps) => {
  // 버튼 색상에 따라 클래스 적용
  const colorClassMap = {
    yellow: {
      activeClass: "bg-yellow-3 text-black",
      reactedClass: "md:hover:bg-yellow-3 md:hover:text-black active:bg-yellow-3 active:text-black",
    },
    green: {
      activeClass: "bg-green-1 text-white",
      reactedClass: "md:hover:bg-green-1 md:hover:text-white active:bg-green-1 active:text-white",
    },
  };

  return <button 
    className={`
      flex items-center justify-center font-semibold text-sm px-[15px] py-[5px] rounded-full text-center transition-all duration-300 NanumSquare whitespace-nowrap 
      ${colorClassMap[color].reactedClass}
      ${isActive ? colorClassMap[color].activeClass : "bg-[#F3F3F3] text-[#555]"}
    `}
    style={{
      width: width ? width : "130px",
      height: height ? height : "auto",
    }}
    onClick={onClick ? onClick : () => {}}
    {...props}
  >
    {label}
  </button>
}

export default RoundButton;