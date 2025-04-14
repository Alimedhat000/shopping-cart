// components/ProductActions.tsx
import { Button } from '@/components/Util/Button';

export default function ProductActions({
  onAddToCart,
  onBuyNow,
}: {
  onAddToCart: () => void;
  onBuyNow: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <Button
        onClick={onAddToCart}
        className="bg-primary hover:bg-primary/80 h-12 flex-1 rounded-3xl text-white"
      >
        Add to cart
      </Button>
      <Button
        onClick={onBuyNow}
        className="h-12 flex-1 rounded-3xl bg-black text-white hover:bg-black/90"
      >
        Buy it now
      </Button>
    </div>
  );
}
