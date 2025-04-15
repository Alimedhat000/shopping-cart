import { ButtonProps, ButtonGroupProps } from './types';
import { Link } from 'react-router-dom';

const IconButton = ({
  icon: Icon,
  size = 15,
  onClick,
  color,
  to = '/',
  count,
}: ButtonProps & { count?: number }) => (
  <Link to={to} className="relative">
    <button onClick={onClick}>
      <Icon size={size} color={color} strokeWidth={2} />
      {count !== undefined && count > 0 && (
        <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-black">
          {count}
        </span>
      )}
    </button>
  </Link>
);

export default function ButtonGroup({
  buttons,
  className = '',
}: ButtonGroupProps) {
  return (
    <div className={`flex items-center justify-center gap-6 ${className}`}>
      {buttons.map((buttonProps, index) => (
        <IconButton key={index} {...buttonProps} />
      ))}
    </div>
  );
}
