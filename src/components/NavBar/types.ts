import { IconType } from "react-icons";

export interface ButtonProps {
  icon: IconType;
  size?: number;
  onClick?: () => void;
}

export interface ButtonGroupProps {
  buttons: ButtonProps[];
  className?: string;
}

export interface AnnouncementItem {
  text: string;
  link: string;
  isariahidden?: boolean;
}

export interface AnnouncementBarProps {
  items: AnnouncementItem[];
  speed?: number;
  direction?: "left" | "right";
}
