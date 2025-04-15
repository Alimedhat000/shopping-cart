// components/SizeSelector.tsx
import { cn } from '../../lib/utils';

type SizeOption = 'S' | 'M' | 'L' | 'XL';

interface SizeAvailability {
  S: {
    availability?: boolean;
  };
  M: {
    availability?: boolean;
  };
  L: {
    availability?: boolean;
  };
  XL: {
    availability?: boolean;
  };
}

interface SizeSelectorProps {
  sizes: SizeAvailability;
  selectedSize: SizeOption;
  setSelectedSize: (size: SizeOption) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) {
  const sizeOptions: SizeOption[] = ['S', 'M', 'L', 'XL'];

  return (
    <div className="font-condensed mb-6">
      <div className="mb-2">
        <span className="font-normal text-zinc-700">Size:</span>
        <span className="ml-2 font-semibold">{selectedSize}</span>
      </div>
      <div className="flex gap-2">
        {sizeOptions.map((size) => {
          const isAvailable = sizes[size].availability;
          console.log(size, isAvailable);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => isAvailable && setSelectedSize(size)}
              disabled={!isAvailable}
              aria-pressed={isSelected}
              className={cn(
                'relative flex h-10 w-12 items-center justify-center rounded-full border-2 transition-colors',
                isSelected ? 'border-black bg-zinc-100' : 'border-gray-300',
                !isAvailable &&
                  'cursor-not-allowed border-red-600 text-gray-400'
              )}
            >
              {size}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-1/9 w-10 -rotate-45 bg-zinc-300"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
