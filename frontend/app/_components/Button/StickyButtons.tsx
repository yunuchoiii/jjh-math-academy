"use client";

import useScrollDirection from "@/app/_hooks/useScrollDirection";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

export interface StickyButtonProps {
  label: string;
  link?: string;
  color: "yellow" | "green";
  isActive?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const StickyButtons = ({ buttons } : {buttons: StickyButtonProps[]}) => {
  const scrollDirection = useScrollDirection();
  const router = useRouter();

  // 버튼 색상에 따라 클래스 적용
  const colorClassMap = {
    yellow: {
      activeClass: "bg-[#ebbb17] text-white",
      reactedClass: "hover:bg-[#ebbb17] hover:text-white active:bg-[#ebbb17] active:text-white",
    },
    green: {
      activeClass: "bg-green-1 text-white",
      reactedClass: "hover:bg-green-1 hover:text-white active:bg-green-1 active:text-white",
    },
  };

  const handleClick = (link: string) => {
    if (link) {
      router.push(link);
    }
  };

  return <div className={`fixed sm:sticky z-10 2xl:top-24 left-1/2 -translate-x-1/2 flex justify-center items-center gap-[5px] p-[5px] rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] NanumSquare transition-all duration-300 ${scrollDirection === "down" ? "opacity-0 -top-[100px]" : "opacity-100 top-16 lg:top-[88px]"}`}>
    {buttons.map((button, index) => (
      <button 
        key={`sticky-button-${index}`}
        className={`
          font-semibold text-sm px-[10px] py-[5px] rounded-full w-[130px] text-center transition-all duration-300
          ${colorClassMap[button.color].reactedClass}
          ${button.isActive ? colorClassMap[button.color].activeClass : "bg-white text-[#555]"}
        `}
        onClick={() => handleClick(button.link ?? "")}
        {...button.props}
      >
        {button.label}
      </button>
    ))}
  </div>
}

export default StickyButtons;