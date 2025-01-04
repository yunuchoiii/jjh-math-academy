import { ButtonHTMLAttributes, DetailedHTMLProps, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import ReactiveButton from "../Button/ReactiveButton";
import FormError from "../Error/FormError";
import styles from "./Input.module.css";

interface TextFieldProps {
  label: string;
  placeholder: string;
  inputType: HTMLInputTypeAttribute;
  value?: string;
  onChange?: (value: string) => void;
  buttonLabel?: string;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>
  register?: any;
  error?: FieldError;
  props?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const TextField = ({ label, placeholder, inputType, value, onChange, buttonLabel, buttonProps, register, error, props }: TextFieldProps) => {

  return (
    <div className="w-full">
      <label className="text-sm Montserrat ml-1">{label}</label>
      <div className="flex items-center mb-4 mt-1">
        <input 
          type={inputType} 
          className={`flex-1 h-10 px-3 rounded-[8px] bg-white shadow-2 border-[2px] border-transparent ${styles.textfield} ${error ? 'border-red-2' : ''}`} 
          placeholder={placeholder} 
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          {...register}
          {...props}
        />
        {buttonProps && (
          <ReactiveButton 
            props={{
              ...buttonProps, 
              className: "bg-green-1 text-white shadow-2 px-3 py-2 rounded-[8px] whitespace-nowrap ml-2 max-w-[100px]"
            }}
          >
              {buttonLabel}
          </ReactiveButton>
        )}
      </div>
      {error && error.message && 
        <FormError errorMessage={error.message} />
      }
    </div>
  );
}

export default TextField;