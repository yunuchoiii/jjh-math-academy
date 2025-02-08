import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

type ToastProps = {
  sort: number;
  type?: 'success' | 'error' | 'info' | 'warning' | 'default';
  message?: string;
  component?: React.ReactNode;
  onClose: () => void;
  duration?: number;
};

const Toast = ({ sort, type = 'default', message, component, onClose, duration = 3000 }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const isMobile = !useMediaQuery('(min-width: 640px)');

  useEffect(() => {
    const hideTimeout = setTimeout(() => setIsVisible(false), duration);

    return () => clearTimeout(hideTimeout);
  }, [duration]);

  useEffect(() => {
    if (!isVisible) {
      // 애니메이션이 끝난 후 실제로 제거
      const removeTimeout = setTimeout(() => onClose(), 300); // 0.3s
      return () => clearTimeout(removeTimeout);
    }
  }, [isVisible, onClose]);

  const toastType = {
    success: {
      bg: 'bg-green-1',
      text: 'text-white',
      icon: 'fas fa-check'
    },
    error: {
      bg: 'bg-red-1',
      text: 'text-white',
      icon: 'fas fa-times'
    },
    info: {
      bg: 'bg-blue-3',
      text: 'text-white',
      icon: 'fas fa-info-circle'
    },
    warning: {
      bg: 'bg-yellow-3',
      text: 'text-black',
      icon: 'fas fa-exclamation'
    },
    default: {
      bg: 'bg-white',
      text: 'text-black',
      icon: 'fas fa-info-circle'
    }
  }

  return (
    <div
      className={`
        w-full absolute sm:max-w-[400px] mx-2 p-4 rounded-xl shadow-1 bg-opacity-90 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden 
        ${toastType[type].bg}
        ${toastType[type].text}
        ${isVisible ? "fade-in-bottom" : "fade-out-bottom"}
      `}
      style={{ 
        bottom: `${sort * 10 + 20}px`,
        width: `calc(${isMobile ? '90%' : '400px'} - ${sort * 10}px)`
      }}
    >
      <div className="flex justify-between items-center">
        {component}
        {message && <div className="flex items-center">
          <i className={`${toastType[type].icon} mr-4`}></i>
          <div className="text-sm font-medium">{message}</div>
        </div>}
      </div>
    </div>
  );
};

export default Toast;