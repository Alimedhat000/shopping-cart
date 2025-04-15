import React, { useState } from 'react';
import { useCart } from '@util/CartProvider';
import CartHeader from '@components/Cart/CartHeader';
import CartItemList from '@components/Cart/CartItemList';
import OrderSummary from '@components/Cart/OrderSummary';
import { LuShoppingBag } from 'react-icons/lu';
import { Link } from 'react-router-dom';

// import ShippingEstimator from '@components/Cart/ShippingEstimator';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const [orderNote, setOrderNote] = useState<string>('');
  if (cartItems.length === 0) {
    return (
      <div className="font-condensed flex h-150 flex-col items-center justify-center">
        <div className="relative mb-8">
          <LuShoppingBag className="text-6xl" />
          <div className="absolute -top-1/3 left-3/4 h-10 w-10 rounded-full bg-black p-2 text-center text-white">
            0
          </div>
        </div>
        <p className="mb-8 text-center text-2xl font-bold">
          YOUR CART IS EMPTY
        </p>
        <Link to="/collections/all">
          <button className="text-md rounded-4xl bg-black px-8 py-5 font-semibold text-white transition duration-200 hover:bg-black/90">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="site-padding mb-50">
      <h1 className="mb-8 text-center text-3xl font-bold">CART</h1>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-2/3">
          {/* Cart headers */}
          <CartHeader />

          {/* Cart items */}
          <CartItemList
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
          {/* Shipping estimator */}
          {/* <ShippingEstimator /> */}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-1/3">
          <OrderSummary
            subtotal={subtotal}
            orderNote={orderNote}
            setOrderNote={setOrderNote}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
