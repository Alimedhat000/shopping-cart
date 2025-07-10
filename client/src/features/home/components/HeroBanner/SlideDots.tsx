interface SlideDotsProps {
  count: number;
  activeIndex: number;
  onDotClick: (index: number) => void;
}

export default function SlideDots({
  count,
  activeIndex,
  onDotClick,
}: SlideDotsProps) {
  return (
    <div className="absolute right-5 bottom-8 z-10 flex items-center space-x-4 md:right-15">
      {Array.from({ length: count }).map((_, index) => (
        <button key={index} onClick={() => onDotClick(index)}>
          <div
            className={`transition-all duration-300 ease-in-out ${
              activeIndex === index
                ? 'h-3 w-8 rounded-full bg-white md:h-2 md:w-10'
                : 'h-3 w-3 rounded-full bg-white opacity-40 md:h-2 md:w-2'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
