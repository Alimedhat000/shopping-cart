import ProductGrid from '../components/Home/ProductGrid';
import FilterBar from '../components/Collections/FilterBar';

function Collections() {
  return (
    <div>
      <div className="">
        <h1 className="pt-20 text-center text-3xl text-black md:text-4xl">
          New Arrivals
        </h1>
      </div>
      {/* <div>Sort by: </div> */}
      <div className="site-padding grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <FilterBar className="col-span-0 sm:col-span-1" />

        <div className="col-span-5 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <ProductGrid
            columns={{ sm: 1, md: 2, lg: 4 }}
            showViewAll={false}
            title=""
            items={12}
          />
        </div>
      </div>
    </div>
  );
}

export default Collections;
