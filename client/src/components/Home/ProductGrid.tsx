import ViewAllButton from '../Util/ViewAllButton';
import ProductCard from '../ProductCard';
import Reveal from '../Util/Reveal';
import { Product } from '../../types/products';
import { useState, useEffect } from 'react';

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
  products: Product[];
  isLoading?: boolean;
  isError?: boolean;
}

function GridContainer({
  columns = { sm: 2, md: 2, lg: 5, xl: 5 },
  columnsClassName,
  products,
}: GridContainerProps) {
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!products?.length) return;

    let loadedCount = 0;
    const imgElements: HTMLImageElement[] = [];

    products.forEach((p) => {
      const img = new Image();
      img.src = p.images[0]?.src || '';
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === products.length) {
          setAllLoaded(true);
        }
      };
      imgElements.push(img);
    });

    return () => {
      imgElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [products]);

  const isLargeScreen =
    typeof window !== 'undefined' && window.innerWidth > 768;
  const delayBase = isLargeScreen ? columns.lg || 5 : columns.sm || 2;

  if (!allLoaded) return <div className="h-96">Loading...</div>; // Or a skeleton

  return (
    <div className={`${columnsClassName}`}>
      {products.map((product, index) => (
        <Reveal delay={(index % delayBase) * 0.1} key={product.id}>
          <ProductCard
            id={product.id}
            image={product.images[0].src + '&width=500'}
            handle={product.handle}
            title={product.title}
            brand={product.vendor}
            price={Number(product.price)}
            oldPrice={undefined}
            discountText=""
            classname="min-w-60 lg:min-w-50"
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
  title = 'CHECK OUT OUR KNITTED PRODUCTS',
  showViewAll = true,
  products,
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
        products={products}
      />
    </div>
  );
}

export default ProductGrid;
