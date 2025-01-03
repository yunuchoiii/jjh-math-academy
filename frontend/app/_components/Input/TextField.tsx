import { DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes, useEffect } from "react";
import { FieldError } from "react-hook-form";
import FormError from "../Error/FormError";
import styles from "./Input.module.css";

interface TextFieldProps {
  label: string;
  placeholder: string;
  inputType: HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
  register?: any;
  error?: FieldError;
  props?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const TextField = ({ label, placeholder, inputType, value, onChange, register, error, props }: TextFieldProps) => {

  useEffect(() => {
    console.log(error);
  }, [error])

  return (
    <div className="w-full">
      <label className="text-sm Montserrat ml-1">{label}</label>
      <input 
        type={inputType} 
        className={`w-full h-10 px-3 rounded-[8px] mb-4 mt-1 bg-white shadow-2 border-[2px] border-transparent ${styles.textfield} ${error ? 'border-red-2' : ''}`} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        {...register}
        {...props}
      />
      {error && error.message && 
        <FormError errorMessage={error.message} />
      }
    </div>
  );
}

export default TextField;