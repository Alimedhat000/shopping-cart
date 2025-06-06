import ProductGrid from '@/components/Home/ProductGrid';
import FilterBar from '@/components/Collections/FilterBar';
import { VscSettings } from 'react-icons/vsc';
import { useState } from 'react';
import { SortDropdown } from '@/components/Collections/SortBy';
import { useParams, useSearchParams } from 'react-router-dom';

function Collections() {
  // Todo : handle Params and SearchParams
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sort_by'); // e.g., 'price-ascending'
  const page = searchParams.get('page');

  console.log('Category:', category);
  console.log('Sort By:', sortBy);
  console.log('Page:', page);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterChange = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="mb-20">
      <div className="mb-20">
        <h1 className="hidden pt-20 text-center text-3xl text-black md:block md:text-4xl">
          NEW ARRIVALS
        </h1>
      </div>
      <div className="site-padding grid grid-cols-1 grid-rows-[20px_1fr] md:grid-cols-[250px_1fr] md:gap-12 lg:grid-cols-[300px_1fr]">
        {/* Top row */}
        <div className="col-span-full hidden grid-cols-[inherit] gap-[inherit] sm:col-span-2 md:grid">
          <div className="flex items-center gap-2">
            <VscSettings size={20} />
            <span>Filters</span>
          </div>
          <div className="flex items-center justify-end">
            <SortDropdown
              defaultValue="title-asc"
              onSortChange={(value) => {
                console.log('Sort changed to:', value);
                searchParams.set('sort_by', value);
                //TODO: Here I should update product list based on the sort value
              }}
            />
          </div>
        </div>

        {/* Main content*/}
        <FilterBar
          activeFilters={activeFilters}
          handleFilterChange={handleFilterChange}
          className="hidden md:block"
        />
        
        {
          <div className="font-condensed -mt-5 text-center text-lg md:hidden">
            192 products
          </div> //Todo: This should be dynamic based on the product count
        }

        <ProductGrid
          columns={{ sm: 2, md: 2, lg: 4, xl: 4 }}
          columnsClassName="grid gap-2 md:gap-6 
                            grid-cols-2
                            sm:grid-cols-2
                            md:grid-cols-2
                            lg:grid-cols-4
                            xl:grid-cols-4 "
          showViewAll={false}
          title=""
          items={12}
        />
      </div>
    </div>
  );
}

export default Collections;
