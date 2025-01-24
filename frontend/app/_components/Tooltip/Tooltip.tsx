import { useState } from 'react';

interface TooltipProps {
    children: React.ReactNode;
    title: string;
    position?: "top" | "bottom";
}

const Tooltip = ({children, title, position = "bottom"}: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return <div className={`relative`}>
      <div className='block' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      <div 
        className={`absolute ${position === "bottom" ? "top-[120%]" : "bottom-[120%]"} left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap backdrop-blur-sm shadow-md ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      >
        <p className='text-[#444] text-center text-xs'>{title}</p>
      </div>
  </div>
}

export default Tooltip;