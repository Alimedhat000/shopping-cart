import ViewAllButton from '../Util/ViewAllButton';
import ProductCard from '../ProductCard';
import Reveal from '../Util/Reveal';

function GridContainer() {
  console.log(window.innerWidth);
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:gap-6 lg:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <Reveal
          delay={
            window.innerWidth > 768 ? (index % 5) * 0.1 : (index % 2) * 0.1
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
            classname="min-w-20 md:min-w-70 lg:min-w-45 pb-10"
          />
        </Reveal>
      ))}
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="space-y-12 overflow-hidden px-5 py-12 md:px-9 lg:px-12">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl text-black md:text-4xl">End of Season Sale</h1>
        <ViewAllButton />
      </div>
      <GridContainer />
    </div>
  );
}

export default ProductGrid;
