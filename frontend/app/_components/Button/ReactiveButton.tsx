import { ButtonHTMLAttributes } from "react";

interface ReactiveButtonProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>
}

const ReactiveButton = ({ children, props, fullWidth }: ReactiveButtonProps) => {
  const { className, ...restProps } = props || {};
  return <button 
    className={`${fullWidth ? 'w-full' : ''} block transition-all duration-150 md:hover:scale-105 active:scale-95 md:active:scale-95 disabled:opacity-50 disabled:cursor-default disabled:scale-100 ${className}`} 
    {...restProps}
  >
    {children}
  </button>
}

export default ReactiveButton;