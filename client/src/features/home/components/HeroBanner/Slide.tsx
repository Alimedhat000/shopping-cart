import { Link } from 'react-router-dom';

interface SlideProps {
  to: string;
  imgSrc: string;
  alt: string;
}

export default function Slide({ to, imgSrc, alt }: SlideProps) {
  return (
    <Link to={to}>
      <img
        src={imgSrc}
        alt={alt}
        className="h-auto w-screen object-cover"
        loading="lazy"
      />
    </Link>
  );
}
