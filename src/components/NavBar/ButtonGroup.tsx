import { ButtonProps, ButtonGroupProps } from './types';

const IconButton = ({ icon: Icon, size = 15, onClick, color }: ButtonProps) => (
  <button onClick={onClick}>
    <Icon size={size} color={color} strokeWidth={2} />
  </button>
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
