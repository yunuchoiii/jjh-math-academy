import styled from "styled-components";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

const StyledToggle = styled.div`
  & .fas {
    line-height: 0;
  }
`

const Toggle = ({ checked, onChange, label }: ToggleProps) => {
  return <StyledToggle 
    className="Toggle-container h-10 flex items-center justify-between gap-4 mb-4 cursor-pointer px-1" 
    onClick={() => onChange(!checked)}
  >
    <span className="Toggle-label text-sm">{label}</span>
    <div 
      className={`Toggle-switch relative w-[60px] h-[30px] rounded-full shadow-2 ${checked ? "bg-green-1" : "bg-[#C9C9C9]"} transition-all duration-300`}
    >
      <div className={`flex items-center justify-center absolute w-[24px] h-[24px] top-1/2 -translate-y-1/2 ${checked ? "left-[33px]" : "left-[3px]"} rounded-full bg-white text-xs text-green-1 shadow-2 transition-all duration-300`}>
        {checked ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>}
      </div>
    </div>
  </StyledToggle>
}

export default Toggle;