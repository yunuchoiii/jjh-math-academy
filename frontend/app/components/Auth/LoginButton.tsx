import styles from "./Auth.module.css";

interface LoginButtonProps {
  label: string;
  icon: string;
  color?: "light" | "dark";
  bgFrom?: string;
  bgTo?: string;
  onClick?: () => void;
}

const LoginButton = ({label, icon, color, bgFrom, bgTo, onClick}: LoginButtonProps) => {
  return <button 
      className={`relative w-full h-10 rounded-[5px] text-white font-bold mb-2.5 ${styles.loginButton}`} 
      style={{background: `linear-gradient(to right, ${bgFrom}, ${bgTo})`}}
      onClick={onClick}
    >
    <i className={`${icon} ${color === "light" ? "text-white" : "text-black"} absolute left-[15px] top-1/2 -translate-y-1/2 text-xl`}/>
    <span className={`${color === "light" ? "text-white" : "text-black"} text-base`}>
      {label}
    </span>
  </button>
}

export default LoginButton;