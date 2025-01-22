"use client";

import { ButtonHTMLAttributes } from "react";

export interface RoundButtonProps {
  label: string;
  onClick?: () => void;
  color?: "yellow" | "green";
  isActive?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const RoundButton = ({ label, onClick, color = "green", isActive = false, props } : RoundButtonProps) => {
  // 버튼 색상에 따라 클래스 적용
  const colorClassMap = {
    yellow: {
      activeClass: "bg-yellow-3 text-black",
      reactedClass: "hover:bg-yellow-3 hover:text-black active:bg-yellow-3 active:text-black",
    },
    green: {
      activeClass: "bg-green-1 text-white",
      reactedClass: "hover:bg-green-1 hover:text-white active:bg-green-1 active:text-white",
    },
  };

  return <button 
    className={`
      font-semibold text-sm px-[10px] py-[5px] rounded-full w-[130px] text-center transition-all duration-300 NanumSquare whitespace-nowrap 
      ${colorClassMap[color].reactedClass}
      ${isActive ? colorClassMap[color].activeClass : "bg-[#F3F3F3] text-[#555]"}
    `}
    onClick={onClick ? onClick : () => {}}
    {...props}
  >
    {label}
  </button>
}

export default RoundButton;