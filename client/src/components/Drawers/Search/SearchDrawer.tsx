import { Drawer, DrawerContent, useDrawer } from '@/components/Util/Drawer';
import { LuSearch } from 'react-icons/lu';
import { SearchForm } from './SearchForm';

export const SearchDrawer = () => {
  const { openDrawer } = useDrawer();
  return (
    <>
      <button onClick={openDrawer}>
        <LuSearch size={22} color={'#fff'} strokeWidth={2} />
      </button>

      <Drawer width="100%" height="auto" className="">
        <DrawerContent className="p-6 pt-5">
          {/* Your content here */}
          <SearchForm />
        </DrawerContent>
      </Drawer>
    </>
  );
};
