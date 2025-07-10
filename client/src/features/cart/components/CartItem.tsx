import CartItemImage from './CartItemImage';
import CartItemDetails from './CartItemDetails';
import CartItemQuantityControl from './CartItemQuantityControl';
import { CartItem as CartItemType } from '@/features/cart/types/cart';

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
}) => (
  <div
    className={`${borders ? 'border-b' : ''} font-condensed flex gap-4 border-zinc-300 py-4 md:grid md:grid-cols-[2.5fr_1fr_1fr]`}
  >
    <div className="flex items-center gap-4 self-center">
      <CartItemImage src={item.image} alt={item.name} />
      <CartItemDetails
        item={item}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
    <CartItemQuantityControl
      item={item}
      updateQuantity={updateQuantity}
      removeFromCart={removeFromCart}
    />
    <div className="mb-5 hidden self-center text-right text-zinc-700 md:block">
      {(item.price * item.quantity).toFixed(2)}
    </div>
  </div>
);

export default CartItem;
