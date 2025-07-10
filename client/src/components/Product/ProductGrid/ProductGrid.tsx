import GridContainer from './GridContainer';
import ViewAllButton from '@/components/Util/ViewAllButton';
import { Product } from '@/types/products';

export interface ProductGridProps {
  columns?: { sm?: number; md?: number; lg?: number; xl?: number };
  columnsClassName?: string;
  title?: string;
  showViewAll?: boolean;
  className?: string;
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
}
const ProductGrid = ({
  columns,
  columnsClassName,
  title = 'CHECK OUT OUR KNITTED PRODUCTS',
  showViewAll = true,
  products,
  className,
}: ProductGridProps) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="mb-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl text-black md:text-4xl">{title}</h1>
        {showViewAll && <ViewAllButton />}
      </div>
      <GridContainer
        columns={columns}
        columnsClassName={columnsClassName}
        products={products}
      />
    </div>
  );
};

export default ProductGrid;
