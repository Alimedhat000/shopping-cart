import { LuShoppingBag } from 'react-icons/lu';
import { DrawerClose } from '@/components/Util/Drawer';

export default function EmptyCartContent() {
  return (
    <>
      <div className="relative mb-4 p-4">
        <LuShoppingBag size={35} strokeWidth={2} />
      </div>
      <DrawerClose className="absolute top-8 right-10 text-gray-500 hover:text-gray-800">
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

      <h2 className="mb-2 text-xl font-semibold">YOUR CART IS EMPTY</h2>
      <DrawerClose className="mt-4 rounded-full bg-black px-8 py-3 font-semibold text-white hover:bg-gray-800">
        Continue shopping
      </DrawerClose>
    </>
  );
}
