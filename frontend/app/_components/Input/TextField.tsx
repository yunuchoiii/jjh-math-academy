import { HTMLInputTypeAttribute } from "react";
import styles from "./Input.module.css";

interface TextFieldProps {
  label: string;
  placeholder: string;
  inputType: HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
}

const TextField = ({ label, placeholder, inputType, value, onChange }: TextFieldProps) => {
  return (
    <div className="w-full">
      <label className="text-sm Montserrat ml-1">{label}</label>
      <input 
        type={inputType} 
        className={`w-full h-10 px-3 rounded-[5px] mb-2.5 mt-1 bg-white ${styles.textfield}`} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
}

export default TextField;