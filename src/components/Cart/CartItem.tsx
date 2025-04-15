// components/Cart/CartItem.tsx
import React from 'react';
import { CartItem as CartItemType } from '@util/CartProvider';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  updateQuantity,
  removeFromCart,
}) => {
  return (
    <div className="font-condensed grid grid-cols-1 gap-4 border-b border-zinc-300 py-4 md:grid-cols-[2.5fr_1fr_1fr]">
      {/* Product info */}
      <div className="flex items-center gap-4 self-center">
        <div className="h-30 w-20 bg-gray-100">
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-zinc-700">{item.price.toFixed(2)}</p>
          <p className="text-sm text-zinc-700">
            {item.color} / {item.size}
          </p>
        </div>
      </div>

      {/* Quantity */}
      <div className="flex justify-center self-center">
        <div className="flex flex-col items-center justify-center gap-2">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            className="h-10 w-12 rounded-lg border border-zinc-400 text-center"
          />
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-sm text-zinc-500 underline hover:text-black"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="mb-5 self-center text-right text-zinc-700">
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
