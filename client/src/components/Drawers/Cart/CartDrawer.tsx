import {
  Drawer,
  DrawerContent,
  DrawerClose,
  useDrawer,
} from '@/components/Util/Drawer';
import { Link } from 'react-router-dom';
import { useCart } from '@/features/cart/hooks/useCart';
import { LuShoppingBag } from 'react-icons/lu';
import CartItemList from '@/features/cart/components/CartItemList';
import EmptyCartContent from './EmptyCartContent';

export const CartDrawer = () => {
  const { openDrawer, closeDrawer } = useDrawer();
  const { cartItems, removeFromCart, updateQuantity, subtotal, itemCount } =
    useCart();

  return (
    <>
      <button onClick={openDrawer} className="relative">
        <LuShoppingBag size={22} color={'#fff'} strokeWidth={2} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-black">
            {itemCount}
          </span>
        )}
      </button>

      <Drawer width="100%" className="lg:!w-[50%]" height="100%">
        {cartItems.length === 0 ? (
          <DrawerContent>
            <EmptyCartContent />
          </DrawerContent>
        ) : (
          <DrawerContent className="font-oswald">
            <div className="flex h-full w-full flex-col justify-between">
              <div className="overflow-y-auto px-10 py-8">
                <div className="flex items-center justify-between pb-8">
                  <div className="flex items-center gap-2 text-xl tracking-tighter">
                    <h2>CART</h2>
                    <p className="ml-2 h-5 w-5 rounded-full bg-black pr-0.5 text-sm text-white">
                      {itemCount}
                    </p>
                  </div>
                  <DrawerClose className="text-gray-500 hover:text-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </DrawerClose>
                </div>

                <CartItemList
                  cartItems={cartItems}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  borders={false}
                />
              </div>
              <footer className="border-t border-gray-200 px-10 py-8 pt-6">
                <div className="mb-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="">Total:</span>
                    <span className="">${subtotal.toFixed(2)}</span>
                  </div>
                  <p className="font-condensed text-left text-sm text-gray-500">
                    Tax included.{' '}
                    <Link to="/" className="underline hover:text-black">
                      Shipping
                    </Link>{' '}
                    calculated at checkout.
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Link
                    to="/cart"
                    className="bg-primary mt-4 w-full rounded-full px-8 py-4 text-center text-white hover:opacity-90"
                    onClick={closeDrawer}
                  >
                    View Cart
                  </Link>
                  <Link
                    to="/"
                    className="mt-4 w-full rounded-full bg-black px-8 py-4 text-center text-white hover:opacity-90"
                    onClick={closeDrawer}
                  >
                    Checkout
                  </Link>
                </div>
              </footer>
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </>
  );
};
