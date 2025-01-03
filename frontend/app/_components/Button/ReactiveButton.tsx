import { ButtonHTMLAttributes } from "react";

interface ReactiveButtonProps {
  children: React.ReactNode;
  props?: ButtonHTMLAttributes<HTMLButtonElement>
}

const ReactiveButton = ({ children, props }: ReactiveButtonProps) => {
  return <button 
    className="w-full block transition-all duration-150 active:scale-95" 
    {...props}
  >
    {children}
  </button>
}

export default ReactiveButton;