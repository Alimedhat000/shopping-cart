import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CartItem as CartItemType } from '@util/CartProvider';
import CartItem from './CartItem';

interface CartItemListProps {
  cartItems: CartItemType[];
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  borders?: boolean;
}

const CartItemList: React.FC<CartItemListProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  borders = true,
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
          borders={borders}
        />
      ))}
    </div>
  );
};

export default CartItemList;
