import NavigationButton from './NavigationButton';

interface SliderControlsProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
}

const SliderControls = ({
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
}: SliderControlsProps) => (
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

export default SliderControls;
