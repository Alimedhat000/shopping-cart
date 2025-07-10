import { CartItem } from '@/features/cart/types';

interface Props {
  item: CartItem;
  updateQuantity: (id: number, qty: number) => void;
  removeFromCart: (id: number) => void;
}

const CartItemDetails = ({ item, updateQuantity, removeFromCart }: Props) => (
  <div>
    <h3 className="font-medium">{item.name}</h3>
    <p className="text-sm text-zinc-700">
      {(item.price * item.quantity).toFixed(2)}
    </p>
    <p className="text-sm text-zinc-700">
      {item.color} / {item.size}
    </p>
    <div className="mt-2 flex md:hidden">
      <div className="flex items-center justify-center gap-2">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => {
            if (e.target.value === '') return;
            updateQuantity(item.id, parseInt(e.target.value));
          }}
          className="h-9 w-12 rounded-lg border border-zinc-400 text-center focus:outline-none"
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-sm text-zinc-500 underline hover:text-black"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartItemDetails;
