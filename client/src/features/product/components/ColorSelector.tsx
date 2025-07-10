// components/ColorSelector.tsx
import { cn } from '@/lib/utils';

interface ColorOption {
  name: string;
  hex: string;
  availability?: boolean;
}

interface ColorSelectorProps {
  colors: ColorOption[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

export default function ColorSelector({
  colors,
  selectedColor,
  setSelectedColor,
}: ColorSelectorProps) {
  return (
    <div className="font-condensed mb-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-zinc-700">Color:</span>
        <span className="capitalize">{selectedColor}</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => {
          const isAvailable = color.availability !== false;

          return (
            <button
              key={color.name}
              onClick={() => isAvailable && setSelectedColor(color.name)}
              className={cn(
                'relative h-8 w-8 rounded-full border-2',
                selectedColor === color.name
                  ? 'border-black'
                  : 'border-transparent',
                !isAvailable && 'cursor-not-allowed border-red-600'
              )}
              disabled={!isAvailable}
              style={{
                backgroundColor: color.hex,
                boxShadow:
                  color.name === 'white' ? 'inset 0 0 0 1px #e5e5e5' : 'none',
              }}
              aria-label={`Select ${color.name} color${!isAvailable ? ' (unavailable)' : ''}`}
            >
              {/* Overlay for unavailable colors */}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-1/9 w-10 -rotate-45 bg-white"></div>
                </div>
              )}

              {/* Checkmark for selected */}
              {selectedColor === color.name && (
                <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
