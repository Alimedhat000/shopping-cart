import ProductCard from '@/components/Product/ProductCard';
import ProductCardSkeleton from '@/components/Product/ProductCardSkeleton';
import Reveal from '@/components/Util/Reveal';
import useAllImagesLoaded from '../../../features/home/hooks/useAllImagesLoaded';
import { Product } from '@/types/products';

interface Props {
  products: Product[];
  columns?: { sm?: number; md?: number; lg?: number; xl?: number };
  columnsClassName?: string;
}

const GridContainer = ({
  products,
  columns = { sm: 2, md: 2, lg: 5, xl: 5 },
  columnsClassName,
}: Props) => {
  const allLoaded = useAllImagesLoaded(products);

  // fallback for SSR / hydration
  const isLargeScreen =
    typeof window !== 'undefined' && window.innerWidth > 768;
  const delayBase = isLargeScreen ? columns.lg || 5 : columns.sm || 2;

  if (!allLoaded) {
    const skeletonCount = (columns?.lg || 5) * 2;

    return (
      <div className={columnsClassName}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className={columnsClassName}>
      {products.map((product, index) => (
        <Reveal key={product.id} delay={(index % delayBase) * 0.1}>
          <ProductCard
            id={product.id}
            image={product.images[0]?.src + '&width=500'}
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
};

export default GridContainer;
