import { useState } from 'react';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowRoundForward,
  IoMdArrowRoundBack,
} from 'react-icons/io';

interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: 'prev' | 'next';
  ariaLabel: string;
}

const NavigationButton = ({
  onClick,
  disabled,
  direction,
  ariaLabel,
}: NavigationButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const showHoverIcon = isHovered && !disabled;

  const icon = direction === 'prev'
    ? showHoverIcon ? <IoMdArrowRoundBack /> : <IoIosArrowBack strokeWidth="20" />
    : showHoverIcon ? <IoMdArrowRoundForward /> : <IoIosArrowForward strokeWidth="20" />;

  return (
    <button
      onClick={onClick}
      className={disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-full border border-gray-500 p-3.5 transition-all duration-200">
        <span className="text-gray-700 h-5 w-5">{icon}</span>
      </div>
    </button>
  );
};

export default NavigationButton;
