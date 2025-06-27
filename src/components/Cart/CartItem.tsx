// components/Cart/CartItem.tsx
import React from 'react';
import { CartItem as CartItemType } from '@util/CartProvider';

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  borders?: boolean;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  updateQuantity,
  removeFromCart,
  borders,
}) => {
  return (
    <div
      className={`${borders ? 'border-b' : ''} font-condensed flex gap-4 border-zinc-300 py-4 md:grid md:grid-cols-[2.5fr_1fr_1fr]`}
    >
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
                  if (e.target.value === '') {
                    return;
                  }
                  updateQuantity(item.id, parseInt(e.target.value));
                }}
                className="h-9 w-12 [appearance:textfield] rounded-lg border border-zinc-400 text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
      </div>

      {/* Quantity */}
      <div className="hidden justify-center self-center md:flex">
        <div className="flex flex-col items-center justify-center gap-2">
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
            className="h-10 w-12 [appearance:textfield] rounded-lg border border-zinc-400 text-center focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
      <div className="mb-5 hidden self-center text-right text-zinc-700 md:block">
        {(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
