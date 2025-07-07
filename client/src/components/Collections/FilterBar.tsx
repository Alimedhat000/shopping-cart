import Filter from './Filter';
import InStockOnly from './InStockOnly';
import PriceFilter from './PriceFilter';

function FilterBar({
  className = '',
  // activeFilters = [],
  // handleFilterChange,
}: {
  className?: string;
  activeFilters?: string[];
  handleFilterChange?: (filters: string) => void;
}) {
  return (
    <div className={`${className}`}>
      <InStockOnly />

      <PriceFilter />
      <Filter
        Name="Brand"
        Options={['Go Native Merch (2)', 'Vega (3)', 'Woke (2)']}
      />
      <Filter
        Name="Brand"
        Options={['Go Native Merch (2)', 'Vega (3)', 'Woke (2)']}
      />
      <Filter
        Name="Brand"
        Options={['Go Native Merch (2)', 'Vega (3)', 'Woke (2)']}
      />
      <Filter
        Name="Brand"
        Options={['Go Native Merch (2)', 'Vega (3)', 'Woke (2)']}
      />

      {/* Add more filters here if needed */}
    </div>
  );
}

export default FilterBar;
