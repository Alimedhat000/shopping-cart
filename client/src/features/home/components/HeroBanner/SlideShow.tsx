import { useState, useRef, useEffect, useCallback } from 'react';
import Slide from './Slide';
import SlideDots from './SlideDots';
import { useIsMobile } from '../../hooks/useIsMobile';

import FirstSlideBig from '/imgs/hero_slide_1_big.png';
import FirstSlideSmall from '/imgs/hero_slide_1_small.png';
import SecondSlideBig from '/imgs/hero_slide_2_big.png';
import SecondSlideSmall from '/imgs/hero_slide_2_small.png';

const slideData = [
  {
    to: '/',
    alt: 'First Slide',
    desktopSrc: FirstSlideBig,
    mobileSrc: FirstSlideSmall,
  },
  {
    to: '/',
    alt: 'Second Slide',
    desktopSrc: SecondSlideBig,
    mobileSrc: SecondSlideSmall,
  },
];

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();
  const timerRef = useRef<number | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 10000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleDotClick = (index: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentSlide(index);
    startTimer();
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slideData.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <Slide
              to={slide.to}
              imgSrc={isMobile ? slide.mobileSrc : slide.desktopSrc}
              alt={slide.alt}
            />
          </div>
        ))}
      </div>

      <SlideDots
        count={slideData.length}
        activeIndex={currentSlide}
        onDotClick={handleDotClick}
      />
    </div>
  );
}
