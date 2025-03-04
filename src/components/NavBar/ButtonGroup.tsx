import { ButtonProps, ButtonGroupProps } from "./types";

const IconButton = ({ icon: Icon, size = 15, onClick }: ButtonProps) => (
  <button onClick={onClick}>
    <Icon size={size} />
  </button>
);

export default function ButtonGroup({
  buttons,
  className = "",
}: ButtonGroupProps) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {buttons.map((buttonProps, index) => (
        <IconButton key={index} {...buttonProps} />
      ))}
    </div>
  );
}
