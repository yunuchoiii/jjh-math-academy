import { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  color: "yellow" | "green";
  textSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl";
  fullWidth?: boolean;
  fullRounded?: boolean;
  shadow?: boolean;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}

const Button = ({ children, type="button", onClick, disabled, color="green", textSize="base", fullWidth=false, fullRounded=false, shadow=false, props }: ButtonProps) => {

  const colorClass = {
    yellow: "bg-yellow-gradient text-white",
    green: "bg-green-gradient text-white",
  }

  const textSizeClass = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        text-white px-5 py-3 NanumSquare font-bold sm:hover:brightness-95 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-default disabled:sm:hover:brightness-100 disabled:active:scale-100
        ${colorClass[color]} 
        ${textSizeClass[textSize]}
        ${fullWidth ? "w-full" : ""}
        ${fullRounded ? "rounded-full" : "rounded-2xl"}
        ${shadow ? "shadow-1" : ""}
      `}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;