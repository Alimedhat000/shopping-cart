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
  items?: number;
  title?: string;
  showViewAll?: boolean;
  className?: string;
}

function GridContainer({
  columns = { sm: 2, md: 2, lg: 5, xl: 5 },
  items = 10,
}: GridContainerProps) {
  const getColumnClass = () => {
    return `grid grid-cols-${columns.sm} gap-2 
            sm:grid-cols-${columns.sm} 
            md:grid-cols-${columns.md} md:gap-6 
            lg:grid-cols-${columns.lg}
            xl:grid-cols-${columns.xl}`;
  };

  return (
    <div className={getColumnClass()}>
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
            key={index}
            image="https://placehold.co/500x700"
            title="Comfy Pants"
            brand="Woke"
            price={750}
            oldPrice={855}
            discountText="Save 105.00"
            link="/"
            classname="w-full pb-10"
          />
        </Reveal>
      ))}
    </div>
  );
}

function ProductGrid({
  columns,
  items,
  title = 'End of Season Sale',
  showViewAll = true,
  className,
}: GridContainerProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl text-black md:text-4xl">{title}</h1>
        {showViewAll && <ViewAllButton />}
      </div>
      <GridContainer columns={columns} items={items} />
    </div>
  );
}

export default ProductGrid;
