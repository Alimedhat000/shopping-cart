import { LuChevronDown } from 'react-icons/lu';

export default function DropDown({
  text,
  color,
}: {
  text: string;
  color: string;
}) {
  return (
    <button className="flex items-center gap-1">
      <span style={{ color }}>{text}</span>
      <LuChevronDown color={color} />
    </button>
  );
}
