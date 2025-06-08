import { LuSearch } from 'react-icons/lu';

export default function SearchDropdown({
  products,
  searchValue,
  isLoading,
  handleProductClick,
  handleSubmit,
}: {
  products: { id: number; name: string; brand: string; price: string }[];
  searchValue: string;
  isLoading: boolean;
  handleProductClick: (id: number) => void;
  handleSubmit: (e: React.FormEvent | { preventDefault: () => void }) => void;
}) {
  return (
    <div className="mt-5 overflow-y-auto bg-white">
      {isLoading ? (
        <div className="p-6 text-center text-gray-500">
          <LuSearch className="mx-auto mb-2 animate-spin" size={20} />
          Searching...
        </div>
      ) : products.length > 0 ? (
        <div>
          {/* Product List */}
          <div className="bg-white">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className="font-condensed flex cursor-pointer items-start border-b border-gray-100 p-6 last:border-b-0 hover:bg-gray-50"
              >
                <div className="mr-4 flex flex-shrink-0 items-center justify-center rounded bg-gray-100">
                  <img
                    src={'https://placehold.co/560x850'}
                    className="h-30 w-20 object-cover"
                  />
                </div>
                <div className="flex-1 text-start">
                  <div className="mb-1 text-xs tracking-wide text-gray-500 uppercase">
                    {product.brand || 'Brand'}
                  </div>
                  <div className="mb-2 text-lg font-bold text-black">
                    {product.name}
                  </div>
                  <div className="text-gray-600">{product.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : searchValue.length > 1 ? (
        <div className="p-6 text-center text-gray-500">
          No products found for "{searchValue}"
          <div
            onClick={() => handleSubmit({ preventDefault: () => {} })}
            className="mt-2 cursor-pointer text-black hover:underline"
          >
            Search anyway
          </div>
        </div>
      ) : null}
    </div>
  );
}
