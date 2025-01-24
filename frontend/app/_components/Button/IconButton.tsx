"use client";

import { useRouter } from "next/navigation";
import styled from "styled-components";

interface IconButtonProps {
  children: React.ReactNode;
  title?: string;
  size?: number;
  backgroundColor?: string;
  iconColor?: string;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton = ({ children, title, size, backgroundColor, iconColor , link, onClick, disabled }: IconButtonProps) => {
  const router = useRouter();

  const onClickHandler = link ? () => router.push(link) : onClick;

  const Button = styled.button`
    width: ${size}px;
    height: ${size}px;
    background-color: ${backgroundColor};
    color: ${iconColor};
  `

  return <Button 
    title={title}
    className={`flex justify-center items-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-green-1 text-white shadow-lg text-lg lg:text-2xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:grayscale disabled:cursor-default disabled:hover:scale-100 disabled:active:scale-100`} 
    onClick={onClickHandler}
    aria-label={title}
    disabled={disabled}
  >
    {children}
  </Button>
}

export default IconButton;