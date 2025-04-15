import { IconType } from 'react-icons';

export interface ButtonProps {
  icon: IconType;
  size?: number;
  onClick?: () => void;
  color?: string;
  to?: string;
  count?: number;
}

export interface ButtonGroupProps {
  buttons: ButtonProps[];
  className?: string;
}

export interface AnnouncementItem {
  text: string;
  link: string;
  isariahidden?: boolean;
  dotColor?: string;
  dotSize?: string;
  className?: string;
}

export interface AnnouncementBarProps {
  items: AnnouncementItem[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
  marqueeClassName?: string;
  itemClassName?: string;
  dotColor?: string;
  dotSize?: string;
  showDots?: boolean;
}
