import ViewAllButton from '../Util/ViewAllButton';
import ProductCard from '../ProductCard';
import Reveal from '../Util/Reveal';

interface GridContainerProps {
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  columnsClassName?: string;
  items?: number;
  title?: string;
  showViewAll?: boolean;
  className?: string;
}

function GridContainer({
  columns = { sm: 2, md: 2, lg: 5, xl: 5 },
  columnsClassName,
  items = 10,
}: GridContainerProps) {
  return (
    <div className={`${columnsClassName}`}>
      {Array.from({ length: items }).map((_, index) => (
        <Reveal
          delay={
            window.innerWidth > 768
              ? (index % (columns.lg || 5)) * 0.1
              : (index % (columns.sm || 2)) * 0.1
          }
          key={index}
        >
          <ProductCard
            id={index.toString()}
            key={index}
            image="https://placehold.co/500x700"
            title="Comfy Pants"
            brand="Woke"
            price={750}
            oldPrice={855}
            discountText="Save 105.00"
            link="/"
            classname="w-full pb-10 "
          />
        </Reveal>
      ))}
    </div>
  );
}

function ProductGrid({
  columns,
  columnsClassName,
  items,
  title = 'End of Season Sale',
  showViewAll = true,
  className,
}: GridContainerProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="mb-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl text-black md:text-4xl">{title}</h1>
        {showViewAll && <ViewAllButton />}
      </div>
      <GridContainer
        columns={columns}
        columnsClassName={columnsClassName}
        items={items}
      />
    </div>
  );
}

export default ProductGrid;
