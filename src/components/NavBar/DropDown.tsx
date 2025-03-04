import { LuChevronDown } from "react-icons/lu";

export default function DropDown({ text }: { text: string }) {
  return (
    <button className="flex items-center gap-1">
      <span>{text}</span>
      <LuChevronDown />
    </button>
  );
}
