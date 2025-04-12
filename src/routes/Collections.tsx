import ProductGrid from '../components/Home/ProductGrid';
import FilterBar from '../components/Collections/FilterBar';
import { VscSettings } from 'react-icons/vsc';
import { useState } from 'react';

function Collections() {
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
        <h1 className="pt-20 text-center text-3xl text-black md:text-4xl">
          NEW ARRIVALS
        </h1>
      </div>
      <div className="site-padding grid grid-cols-1 grid-rows-[20px_1fr] gap-12 md:grid-cols-[300px_1fr]">
        {/* Top row */}
        <div className="col-span-full hidden grid-cols-[inherit] gap-[inherit] sm:col-span-2 md:grid">
          <div className="flex items-center gap-2">
            <VscSettings size={20} />
            <span>Filters</span>
          </div>
          <div className="flex items-center justify-end">Sort by:</div>
        </div>

        {/* Main content*/}
        {
          <FilterBar
            activeFilters={activeFilters}
            handleFilterChange={handleFilterChange}
          />
        }

        <ProductGrid
          columns={{ sm: 2, md: 2, lg: 4, xl: 4 }}
          showViewAll={false}
          title=""
          items={12}
        />
      </div>
    </div>
  );
}

export default Collections;
