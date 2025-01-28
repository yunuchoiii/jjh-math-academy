import { useEffect, useState } from "react";
import { FieldError } from "react-hook-form";
import ReactiveButton from "../Button/ReactiveButton";
import FormError from "../Error/FormError";

interface SelectProps {
  label: string;
  defaultValue?: any;
  options: { value: any; label: string }[];
  onChange?: (value: any) => void;
  buttonLabel?: string;
  onButtonClick?: () => void;
  error?: FieldError;
  position?: "vertical" | "horizontal";
}

const Select = ({ label, defaultValue, options, onChange, buttonLabel, onButtonClick, error, position = "vertical" }: SelectProps) => {
  const [optionsVisible, setOptionsVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue ?? options[0]?.value);

  const handleSearchType = (value: any) => {
    setSelectedOption(value);
    if (onChange) {
      onChange(value);
    }
    setOptionsVisible(false);
  };

  useEffect(() => {
    setSelectedOption(defaultValue ?? options[0]?.value);
  }, [defaultValue, options]);

  return (<div>
    <div className={`w-full mb-4 flex ${position === "vertical" ? "flex-col" : "flex-row items-center gap-4"}`}>
      <label className="text-sm Montserrat ml-1">{label}</label>
      <div className="relative mt-1 flex-1 flex">
        <div className="relative flex flex-row items-center flex-1">
          <button
            className={`w-full h-[40px] bg-white text-sm font-semibold rounded-lg shadow-2`}
            onClick={(e) => {
              e.preventDefault();
              setOptionsVisible(!optionsVisible)
            }}
          >
            <span className="text-center">
              {options.find(option => option.value === selectedOption)?.label}
            </span>
            <i className={`absolute right-1.5 top-1/2 -translate-y-1/2 fas fa-caret-down px-3 text-lg ${optionsVisible ? "rotate-180" : ""}`}></i>
          </button>
          <div 
            className={`absolute z-50 w-full top-12 left-0 right-0 bg-white rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_16px_rgba(0,0,0,0.15)]`}
            style={{
              height: optionsVisible ? `${options.length * 40 + 20}px` : "0px",
              padding: optionsVisible ? "5px 10px" : "0px 10px",
            }}
          >
            {options.map((option, index) => (
              <div key={option.value} className={`${optionsVisible ? "opacity-100" : "opacity-0"} transition-all duration-300 flex flex-col justify-center`}>
                <button 
                  key={option.value} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleSearchType(option.value);
                  }}
                  className={`h-10 flex items-center justify-center text-sm font-semibold md:hover:text-green-1 ${selectedOption === option.value ? "text-green-1" : "text-black"}`}
                >
                  {option.label}
                </button>
                {index !== options.length - 1 && 
                  <hr className="w-full h-[1px] text-[#DDD]"/>
                }
              </div>
            ))}
          </div>
        </div>
        {buttonLabel && (
          <ReactiveButton 
            props={{
              onClick: (e) => {
                e.preventDefault();
                if (onButtonClick) {
                  onButtonClick();
                }
              },
              className: "bg-green-1 text-white text-sm font-semibold shadow-2 px-3 py-2 rounded-[8px] ml-2 whitespace-nowrap"
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
  </div>);
}

export default Select;