import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CartItem as CartItemType } from '@util/CartProvider';
import CartItem from './CartItem';

interface CartItemListProps {
  cartItems: CartItemType[];
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
}) => {
  const navigate = useNavigate();
  if (cartItems.length === 0) {
    navigate('/cart');
  }

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      ))}
    </div>
  );
};

export default CartItemList;
