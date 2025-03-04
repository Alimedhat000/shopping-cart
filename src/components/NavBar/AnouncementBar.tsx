import Marquee from "react-fast-marquee";
import { AnnouncementItem, AnnouncementBarProps } from "./types";
import { Link } from "react-router-dom";

function AnnouncementBarItem({
  text,
  link,
  isariahidden = false,
}: AnnouncementItem) {
  return (
    <div className="flex items-center gap-7 px-7" aria-hidden={isariahidden}>
      <Link to={link}>{text}</Link>
      <span className="inline-block w-1 h-1 bg-white rounded-full"></span>
    </div>
  );
}

export default function AnnouncementBar({
  items,
  speed = 80,
  direction = "left",
}: AnnouncementBarProps) {
  return (
    <div className="overflow-hidden bg-black text-white p-3 text-xs">
      <Marquee speed={speed} direction={direction}>
        {items.map((item, index) => (
          <AnnouncementBarItem key={index} text={item.text} link={item.link} />
        ))}
        {items.map((item, index) => (
          <AnnouncementBarItem
            key={index}
            text={item.text}
            link={item.link}
            isariahidden={true}
          />
        ))}
      </Marquee>
    </div>
  );
}
