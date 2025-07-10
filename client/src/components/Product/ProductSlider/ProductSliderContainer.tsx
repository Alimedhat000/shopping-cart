import { Product } from '@/types/products';
import ProductCard from '@/components/Product/ProductCard';

interface ProductContainerProps {
  currentSlide: number;
  totalSlides: number;
  visibleSlides: number;
  sliderRef: React.RefObject<HTMLDivElement | null>;
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

const ProductContainer = ({
  currentSlide,
  totalSlides,
  //   visibleSlides,
  sliderRef,
  products,
  isLoading,
  isError,
}: ProductContainerProps) => {
  const widthPercentage = 100 / totalSlides;

  return (
    <div
      className="grid max-h-150 grid-flow-col grid-rows-[16fr_6fr] gap-x-6"
      ref={sliderRef}
      style={{
        transform: `translateX(-${currentSlide * widthPercentage}%)`,
        transition: 'transform 0.6s ease',
      }}
    >
      {(isLoading || isError
        ? Array.from({ length: totalSlides }).map((_, index) => ({
            id: index.toString(),
            title: 'loading',
            images: [{ src: 'https://placehold.co/500x700' }],
            handle: 'loading',
            vendor: 'loading',
            price: 750,
          }))
        : products
      ).map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          handle={product.handle}
          image={product.images?.[0]?.src + '&width=500'}
          title={product.title}
          brand={product.vendor}
          price={Number(product.price)}
          oldPrice={undefined}
          discountText=""
          classname="min-w-60 lg:min-w-50"
        />
      ))}
    </div>
  );
};

export default ProductContainer;
