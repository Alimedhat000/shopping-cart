import { ButtonProps, ButtonGroupProps } from './types';
import { Link } from 'react-router-dom';

const IconButton = ({
  icon: Icon,
  size = 15,
  onClick,
  color,
  to = '/',
}: ButtonProps) => (
  <Link to={to}>
    <button onClick={onClick}>
      <Icon size={size} color={color} strokeWidth={2} />
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
