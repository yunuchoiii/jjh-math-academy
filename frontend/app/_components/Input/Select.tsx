import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";
import ReactiveButton from "../Button/ReactiveButton";
import FormError from "../Error/FormError";

interface SelectProps {
  label: string;
  options: { value: any; label: string }[];
  onChange?: (value: any) => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
  register?: any;
  error?: FieldError;
  props?: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const Select = ({ label, options, onChange, buttonLabel, onButtonClick, register, error, props }: SelectProps) => {

  return (
    <div className="w-full">
      <label className="text-sm Montserrat ml-1">{label}</label>
      <div className="flex items-center mb-4 mt-1">
        <select 
          // className="w-full h-10 px-3 rounded-[8px] bg-white shadow-2 border-[2px] border-transparent"
          // style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
          {...register}
          {...props}
          onChange={(e) => onChange && onChange(e.target.value)}
        >
          <option value="" disabled selected>{label} 선택</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div>
          {buttonLabel && (
            <ReactiveButton 
              props={{
                onClick: onButtonClick,
                className: "bg-green-1 text-white shadow-2 px-3 py-2 rounded-[8px] ml-2 whitespace-nowrap"
              }}
            >
                {buttonLabel}
            </ReactiveButton>
          )}
        </div>
      </div>
      {error && error.message && 
        <FormError errorMessage={error.message} />
      }
    </div>
  );
}

export default Select;