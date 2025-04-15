import React, { useState } from 'react';
import { useCart } from '@util/CartProvider';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const [orderNote, setOrderNote] = useState<string>('');

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-8 text-center text-3xl font-bold">CART</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-2/3">
          {/* Cart headers */}
          <div className="mb-4 hidden grid-cols-3 border-b pb-2 font-medium md:grid">
            <div>Product</div>
            <div className="text-center">Quantity</div>
            <div className="text-right">Total</div>
          </div>

          {/* Cart items */}
          {cartItems.length === 0 ? (
            <div className="py-8 text-center">Your cart is empty</div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 gap-4 border-b py-4 md:grid-cols-3"
                >
                  {/* Product info */}
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.color} / {item.size}
                      </p>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                        className="h-10 w-16 border text-center"
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-sm text-gray-500 hover:text-black"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-right">
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-1/3">
          <div className="border p-6">
            <div className="mb-2 flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>

            <div className="my-4 border-t border-b py-4">
              <div className="flex justify-between font-bold">
                <span>TOTAL</span>
                <span>{subtotal.toFixed(2)} EGP</span>
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Tax included. <span className="underline">Shipping</span>{' '}
                calculated at checkout.
              </div>
            </div>

            <div className="mb-4">
              <textarea
                placeholder="Order note"
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                className="w-full border p-2"
                rows={3}
              />
            </div>

            <button className="flex w-full items-center justify-center gap-2 bg-black py-3 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-lock"
                viewBox="0 0 16 16"
              >
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
              </svg>
              Checkout
            </button>
          </div>

          {/* Shipping estimator */}
          <div className="mt-6 border-t pt-6">
            <details className="cursor-pointer">
              <summary className="flex items-center gap-2 font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-box"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.961 14.154 3.5 8.186 1.113zM15 4.239l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z" />
                </svg>
                ESTIMATE SHIPPING
              </summary>
              <div className="pt-4">
                {/* Shipping calculator form would go here */}
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
