// components/SizeSelector.tsx
import { cn } from '../../lib/utils';

type SizeOption = 'S' | 'M' | 'L' | 'XL';

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: SizeOption;
  setSelectedSize: (size: SizeOption) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) {
  return (
    <div className="font-condensed mb-6">
      <div className="mb-2">
        <span className="font-normal text-zinc-700">Size:</span>
        <span className="ml-2">{selectedSize}</span>
      </div>
      <div className="flex gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={cn(
              'flex h-10 w-12 items-center justify-center rounded-full border-2',
              selectedSize === size ? 'border-black' : 'border-gray-300'
            )}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
