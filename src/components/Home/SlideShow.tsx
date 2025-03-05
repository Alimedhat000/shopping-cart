import { Link } from 'react-router-dom';
import { FirstSlideShowCard, SecondSlideShowCard } from './SlideShowCard';
import { useState, useEffect } from 'react';

export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <Link to={'/'} key="slide2">
      <FirstSlideShowCard />
    </Link>,

    <Link to={'/'} key="slide1">
      <SecondSlideShowCard />
    </Link>,
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 10000); // 10 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
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
      <div className="absolute right-35 bottom-8 z-1 flex items-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="flex items-center justify-center"
          >
            <div
              className={`transition-all duration-300 ease-in-out ${
                currentSlide === index
                  ? 'h-2 w-8 rounded-full bg-white'
                  : 'h-2 w-2 rounded-full bg-[#FF4500]'
              } `}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
