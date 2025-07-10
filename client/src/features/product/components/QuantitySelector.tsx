// components/QuantitySelector.tsx
import { LuMinus, LuPlus } from 'react-icons/lu';

interface QuantitySelectorProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

export default function QuantitySelector({
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: QuantitySelectorProps) {
  return (
    <div className="mb-8">
      <div className="font-condensed mb-2 font-normal text-zinc-700">
        Quantity:
      </div>
      <div className="inline-flex h-12 items-center justify-between rounded-full border border-gray-300 px-4">
        <button
          onClick={decreaseQuantity}
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          aria-label="Decrease quantity"
        >
          <LuMinus className="h-5 w-5" />
        </button>
        <div className="mx-6 text-base font-medium">{quantity}</div>
        <button
          onClick={increaseQuantity}
          className="flex h-6 w-6 cursor-pointer items-center justify-center"
          aria-label="Increase quantity"
        >
          <LuPlus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
