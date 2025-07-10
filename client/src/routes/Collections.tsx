import ProductGrid from '@/components/Home/ProductGrid';
import FilterBar from '@/components/Collections/FilterBar';
import { VscSettings } from 'react-icons/vsc';
import { useState } from 'react';
import { SortDropdown } from '@/components/Collections/SortBy';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/api/products';
import PageSelector from '@/components/Collections/PageSelector';

function Collections() {
  // Todo : handle Params and SearchParams
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') ?? 'createdAt';
  const rawSortOrder = searchParams.get('sortOrder');
  const sortOrder: 'desc' | 'asc' =
    rawSortOrder === 'asc' || rawSortOrder === 'desc' ? rawSortOrder : 'desc';
  const page = Number(searchParams.get('page') ?? '1');

  console.log('Category:', category);
  console.log('Sort By:', sortBy);
  console.log('Sort Order:', sortOrder);
  console.log('Page:', page);

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  console.log(activeFilters);

  const handleFilterChange = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const { data: gridProductsData } = useQuery({
    queryKey: [
      'homeGridProducts',
      { tags: activeFilters, sortBy, sortOrder, page },
    ],
    queryFn: () =>
      getAllProducts({
        tags: activeFilters,
        sortBy: sortBy,
        sortOrder: sortOrder,
        limit: 32,
        page: Number(page),
      }),
  });
  const gridProducts = gridProductsData?.products ?? [];
  const productCount = gridProductsData?.count ?? 0;

  return (
    <div className="mb-20 flex flex-col items-center justify-center">
      <div className="mb-20">
        <h1 className="hidden pt-20 text-center text-3xl text-black md:block md:text-4xl">
          NEW ARRIVALS
        </h1>
      </div>
      <div className="site-padding font-condensed grid grid-cols-1 grid-rows-[20px_1fr] md:grid-cols-[250px_1fr] md:gap-12 lg:grid-cols-[300px_1fr]">
        {/* Top row */}
        <div className="col-span-full hidden grid-cols-[inherit] gap-[inherit] sm:col-span-2 md:grid">
          <div className="flex items-center gap-2">
            <VscSettings size={20} />
            <span>Filters</span>
          </div>
          <div className="flex items-center justify-end">
            <SortDropdown
              onSortChange={(sortBy, sortOrder) => {
                searchParams.set('sortBy', sortBy);
                searchParams.set('sortOrder', sortOrder);
                searchParams.set('page', '1');

                setSearchParams(searchParams);
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
            {productCount} products
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
          products={gridProducts}
        />
      </div>
      <PageSelector
        page={page}
        onPageChange={(curPage) => {
          searchParams.set('page', String(curPage));
          setSearchParams(searchParams);
        }}
        totalPages={Math.ceil(productCount / 32)}
      />
    </div>
  );
}

export default Collections;
