import {
  Drawer,
  DrawerContent,
  DrawerClose,
  useDrawer,
} from '@/components/Util/Drawer';
import { useCart } from '@/util/CartProvider';
import { LuShoppingBag } from 'react-icons/lu';

export const CartDrawer = () => {
  const { openDrawer } = useDrawer();
  const { itemCount } = useCart();
  return (
    <>
      <button onClick={openDrawer}>
        <LuShoppingBag size={22} color={'#fff'} strokeWidth={2} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] text-black">
            {itemCount}
          </span>
        )}
      </button>

      <Drawer width="50%" height="100%" className="">
        <DrawerContent>
          <DrawerClose className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
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

          {/* Your content here */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
