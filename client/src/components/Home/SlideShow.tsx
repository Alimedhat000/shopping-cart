import { Link } from 'react-router-dom';
import FirstSlideBig from '../../assets/imgs/hero_slide_1_big.png';
import FirstSlideSmall from '../../assets/imgs/hero_slide_1_small.png';
import SecondSlideBig from '../../assets/imgs/hero_slide_2_big.png';
import SecondSlideSmall from '../../assets/imgs/hero_slide_2_small.png';
import { useState, useEffect, useRef, useCallback } from 'react';

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = [
    <Link to={'/'} key="slide1">
      <img
        src={isMobile ? FirstSlideSmall : FirstSlideBig}
        className="h-auto w-screen"
        alt="First Slide"
      />
    </Link>,

    <Link to={'/'} key="slide2">
      <img
        src={isMobile ? SecondSlideSmall : SecondSlideBig}
        className="h-auto w-screen"
        alt="Second Slide"
      />
    </Link>,
  ];

  // Memoize the startTimer function
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000);
  }, [slides.length]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [startTimer]);

  const handleDotClick = (index: number) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setCurrentSlide(index);
    startTimer();
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slide Content */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>

      {/* Custom Dot Navigation */}
      <div className="absolute right-5 bottom-8 z-10 flex items-center space-x-4 md:right-15">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="flex items-center justify-center"
          >
            <div
              className={`transition-all duration-300 ease-in-out ${
                currentSlide === index
                  ? 'h-3 w-8 rounded-full bg-white md:h-2 md:w-10'
                  : 'h-3 w-3 rounded-full bg-white opacity-40 md:h-2 md:w-2'
              } `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
