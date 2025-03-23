import { useState, useRef } from 'react';
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoMdArrowRoundForward,
  IoMdArrowRoundBack,
} from 'react-icons/io';
import ProductCard from '../ProductCard';
import ViewAllButton from '../ViewAllButton';

// ProgressBar Component
interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="relative mr-6 h-1 w-full bg-gray-200 md:h-0.5">
      <div
        className="absolute left-0 h-1 rounded-xl bg-gray-800 transition-all ease-in-out md:h-0.5"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// NavigationButton Component
interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: 'prev' | 'next';
  ariaLabel: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  disabled,
  direction,
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const showHoverIcon = isHovered && !disabled;

  return (
    <button
      onClick={onClick}
      className={disabled ? 'cursor-not-allowed opacity-20' : 'cursor-pointer'}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="rounded-full border-1 border-gray-500 p-3.5 transition-all duration-200 hover:border-gray-500">
        {direction === 'prev' ? (
          showHoverIcon ? (
            <IoMdArrowRoundBack className="h-5 w-5 text-gray-700" />
          ) : (
            <IoIosArrowBack
              className="h-5 w-5 text-gray-700"
              strokeWidth={'20'}
            />
          )
        ) : showHoverIcon ? (
          <IoMdArrowRoundForward className="h-5 w-5 text-gray-700" />
        ) : (
          <IoIosArrowForward
            className="h-5 w-5 text-gray-700"
            strokeWidth={'20'}
          />
        )}
      </div>
    </button>
  );
};

// SliderControls Component
interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

const SliderControls: React.FC<SliderControlsProps> = ({
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}) => {
  return (
    <div className="flex space-x-4">
      <NavigationButton
        onClick={onPrev}
        disabled={isPrevDisabled}
        direction="prev"
        ariaLabel="Previous slide"
      />

      <NavigationButton
        onClick={onNext}
        disabled={isNextDisabled}
        direction="next"
        ariaLabel="Next slide"
      />
    </div>
  );
};

// ProductContainer Component
interface ProductContainerProps {
  currentSlide: number;
  totalSlides: number;
  visibleSlides: number;
  sliderRef: React.RefObject<HTMLDivElement | null>;
}

const ProductContainer: React.FC<ProductContainerProps> = ({
  currentSlide,
  totalSlides,
  visibleSlides,
  sliderRef,
}) => {
  return (
    <div
      className="grid grid-flow-col grid-rows-[16fr_6fr] gap-x-6 overflow-hidden"
      ref={sliderRef}
      style={{
        transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
        transition: 'transform 0.6s ease',
        display: 'grid',
        width: `${(totalSlides / visibleSlides) * 100}%`,
      }}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <ProductCard
          key={index}
          image="https://placehold.co/500x700"
          title="Comfy Pants"
          brand="Woke"
          price={750}
          oldPrice={855}
          discountText="Save 105.00"
          link="/"
          classname="min-w-60 lg:min-w-50 "
        />
      ))}
    </div>
  );
};

// Main ProductSlider Component
const ProductSlider: React.FC = () => {
  const totalSlides = 24;
  const visibleSlides = 4;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate progress as percentage of viewed content
  const progressPercentage = Math.min(
    100,
    ((currentSlide + visibleSlides) / totalSlides) * 100
  );

  const handleNext = (): void => {
    if (currentSlide < totalSlides - visibleSlides) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = (): void => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = currentSlide >= totalSlides - visibleSlides;

  return (
    <div className="space-y-12 overflow-hidden px-5 md:px-9 lg:px-12">
      <ViewAllButton />

      <ProductContainer
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        visibleSlides={visibleSlides}
        sliderRef={sliderRef}
      />

      <div className="flex items-center justify-between">
        <ProgressBar percentage={progressPercentage} />
        <SliderControls
          onPrev={handlePrev}
          onNext={handleNext}
          isPrevDisabled={isPrevDisabled}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
};

export default ProductSlider;
