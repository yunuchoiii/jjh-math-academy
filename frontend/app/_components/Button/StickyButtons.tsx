"use client";

import { ButtonHTMLAttributes } from "react";

export interface StickyButtonProps {
  label: string;
  onClick?: () => void;
  color: "yellow" | "green";
  isActive?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const StickyButtons = ({ buttons } : {buttons: StickyButtonProps[]}) => {
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

  return <div className="fixed sm:sticky z-10 top-16 lg:top-[88px] 2xl:top-24 left-1/2 -translate-x-1/2 flex justify-center items-center gap-[5px] p-[5px] rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] NanumSquare">
    {buttons.map((button, index) => (
      <button 
        key={`sticky-button-${index}`}
        className={`
          font-semibold text-sm px-[10px] py-[5px] rounded-full w-[130px] text-center transition-all duration-300
          ${colorClassMap[button.color].reactedClass}
          ${button.isActive ? colorClassMap[button.color].activeClass : "bg-white text-[#555]"}
        `}
        onClick={button.onClick ? button.onClick : () => {}}
        {...button.props}
      >
        {button.label}
      </button>
    ))}
  </div>
}

export default StickyButtons;