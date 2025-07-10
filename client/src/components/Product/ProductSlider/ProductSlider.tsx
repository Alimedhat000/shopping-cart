import { useState, useRef } from 'react';
import ViewAllButton from '@/components/Util/ViewAllButton';
import { Product } from '@/types/products';
import ProductContainer from './ProductSliderContainer';
import ProgressBar from './ProgressBar';
import SliderControls from './ProductSliderControls';

interface ProductSliderProps {
  title?: string;
  showViewAll?: boolean;
  className?: string;
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const ProductSlider = ({
  title,
  showViewAll,
  className = '',
  products,
  isLoading,
  isError,
}: ProductSliderProps) => {
  const totalSlides = products.length;
  const visibleSlides = 4;
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const progressPercentage = Math.min(
    100,
    ((currentSlide + visibleSlides) / totalSlides) * 100
  );

  const handleNext = () => {
    if (currentSlide < totalSlides - visibleSlides) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  return (
    <div className={`space-y-12 overflow-hidden ${className}`}>
      <div className="flex items-center justify-between">
        {title && <h2 className="font-oswald text-3xl">{title}</h2>}
        {showViewAll && <ViewAllButton />}
      </div>

      <ProductContainer
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        visibleSlides={visibleSlides}
        sliderRef={sliderRef}
        products={products}
        isLoading={isLoading}
        isError={isError}
      />

      <div className="flex items-center justify-between">
        <ProgressBar percentage={progressPercentage} />
        <SliderControls
          onPrev={handlePrev}
          onNext={handleNext}
          isPrevDisabled={currentSlide === 0}
          isNextDisabled={currentSlide >= totalSlides - visibleSlides}
        />
      </div>
    </div>
  );
};

export default ProductSlider;
