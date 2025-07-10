// src/features/cart/components/CartItemQuantityControl.tsx
import { CartItem } from '@/features/cart/types';

interface Props {
  item: CartItem;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}

const CartItemQuantityControl = ({
  item,
  updateQuantity,
  removeFromCart,
}: Props) => (
  <div className="hidden justify-center self-center md:flex">
    <div className="flex flex-col items-center justify-center gap-2">
      <input
        type="number"
        min="1"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
        className="h-10 w-12 rounded-lg border border-zinc-400 text-center focus:outline-none"
      />
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-sm text-zinc-500 underline hover:text-black"
      >
        Remove
      </button>
    </div>
  </div>
);

export default CartItemQuantityControl;
