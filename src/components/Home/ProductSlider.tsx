import { useState, useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ProductCard from '../ProductCard';

// ViewAllButton Component
const ViewAllButton: React.FC = () => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-3 font-light">
        <span>View all</span>
        <div className="rounded-full bg-gray-300 p-1">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

// ProgressBar Component
interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="relative mr-6 h-0.5 w-full bg-gray-200">
      <div
        className="absolute left-0 h-0.5 rounded-xl bg-gray-800 transition-all ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
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
    <div className="flex space-x-3">
      <button
        onClick={onPrev}
        className={isPrevDisabled ? 'opacity-50' : ''}
        disabled={isPrevDisabled}
        aria-label="Previous slide"
      >
        <div className="rounded-full border-2 border-gray-300 p-4 hover:border-gray-500">
          <IoIosArrowBack />
        </div>
      </button>
      <button
        onClick={onNext}
        className={isNextDisabled ? 'opacity-50' : ''}
        disabled={isNextDisabled}
        aria-label="Next slide"
      >
        <div className="rounded-full border-2 border-gray-300 p-4 hover:border-gray-500">
          <IoIosArrowForward />
        </div>
      </button>
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
      className="grid grid-flow-col grid-rows-[16fr_5fr] gap-x-6 overflow-hidden"
      ref={sliderRef}
      style={{
        transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
        transition: 'transform 0.3s ease',
        display: 'grid',
        width: `${(totalSlides / visibleSlides) * 100}%`,
      }}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <ProductCard key={index} />
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
    <div className="space-y-12 overflow-hidden px-12">
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
