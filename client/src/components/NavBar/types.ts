export interface ButtonGroupProps {
  count?: number;
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
