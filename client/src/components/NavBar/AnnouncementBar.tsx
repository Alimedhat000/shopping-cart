import Marquee from 'react-fast-marquee';
import { Link } from 'react-router-dom';
import { AnnouncementItem, AnnouncementBarProps } from './types';

// Reusable AnnouncementBarItem Component
function AnnouncementBarItem({
  text,
  link,
  isariahidden = false,
  dotColor = 'bg-white',
  dotSize = 'w-1 h-1',
  className = '',
}: AnnouncementItem) {
  return (
    <div
      className={`flex items-center gap-10 pl-10 ${className}`}
      aria-hidden={isariahidden}
    >
      <Link to={link}>{text}</Link>
      <span
        className={`inline-block rounded-full ${dotSize} ${dotColor}`}
      ></span>
    </div>
  );
}

// Reusable AnnouncementBar Component
export default function AnnouncementBar({
  items,
  speed = 80,
  direction = 'left',
  className = '',
  marqueeClassName = '',
  itemClassName = '',
  dotColor = 'bg-white',
  dotSize = 'w-1 h-1',
  showDots = true,
}: AnnouncementBarProps) {
  return (
    <div
      className={`overflow-hidden bg-black p-3 text-xs text-white ${className}`}
    >
      <Marquee speed={speed} direction={direction} className={marqueeClassName}>
        {items.map((item, index) => (
          <AnnouncementBarItem
            key={index}
            text={item.text}
            link={item.link}
            dotColor={showDots ? dotColor : 'transparent'} // Hide dot if showDots is false
            dotSize={dotSize}
            className={itemClassName}
          />
        ))}
        {items.map((item, index) => (
          <AnnouncementBarItem
            key={index}
            text={item.text}
            link={item.link}
            isariahidden={true}
            dotColor={showDots ? dotColor : 'transparent'} // Hide dot if showDots is false
            dotSize={dotSize}
            className={itemClassName}
          />
        ))}
      </Marquee>
    </div>
  );
}
