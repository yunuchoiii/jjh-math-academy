"use client";

import { ButtonHTMLAttributes } from "react";

export interface StickyButtonProps {
  label: string;
  onClick?: () => void;
  color?: "yellow" | "green";
  isActive?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const StickyButtons = ({ buttons } : {buttons: StickyButtonProps[]}) => {
  return <div className="fixed sm:sticky z-10 top-16 lg:top-[88px] 2xl:top-24 left-1/2 -translate-x-1/2 flex justify-center items-center gap-[5px] p-[5px] rounded-full bg-white shadow-3 NanumSquare">
    {buttons.map((button, index) => (
      <button 
        key={`sticky-button-${index}`}
        className={`font-semibold text-sm px-[10px] py-[5px] rounded-full w-[150px] text-center transition-all duration-300
          ${button.isActive ? 
            (button.color === "yellow" ? "bg-yellow-5 text-white" : "bg-green-1 text-white") : 
            "bg-white text-[#555]"
          }
          ${button.color === "yellow" ? "lg:hover:bg-yellow-3 lg:hover:text-white active:bg-yellow-3 active:text-white" : "lg:hover:bg-green-3 lg:hover:text-white active:bg-green-3 active:text-white"}
        `}
        onClick={button.onClick ? button.onClick : () => {}}
      >
        {button.label}
      </button>
    ))}
  </div>
}

export default StickyButtons;