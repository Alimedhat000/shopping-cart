import { Link } from 'react-router-dom';
import { FirstSlideShowCard, SecondSlideShowCard } from './SlideShowCard';
import { useState } from 'react';
export default function SlideShow() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    <Link to={'/'} key="slide1">
      <SecondSlideShowCard />
    </Link>,
    <Link to={'/'} key="slide2">
      <FirstSlideShowCard />
    </Link>,
  ];

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full">
      {/* Slide Content */}
      {slides[currentSlide]}

      {/* Custom Dot Navigation */}
      <div className="absolute right-35 bottom-8 flex items-center space-x-2">
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
