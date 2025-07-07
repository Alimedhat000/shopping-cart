import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  brand?: string;
  price: number;
  oldPrice?: number;
  discountText?: string;
  isSoldOut?: boolean;
  link?: string;
  classname?: string;
}

export default function ProductCard({
  id,
  image,
  title,
  brand,
  price,
  oldPrice,
  discountText,
  isSoldOut = false,
  classname = '',
}: ProductCardProps) {
  return (
    <div
      className={`relative row-span-2 grid grid-rows-subgrid rounded-md bg-white ${classname}`}
    >
      {/* Discount Badge (if exists) */}
      {discountText && (
        <div className="absolute top-1 left-2 z-1 md:top-3 md:left-3">
          <span className="bg-primary rounded-full px-2 py-1 text-[0.5rem] font-medium text-white md:px-3 md:text-xs">
            {discountText}
          </span>
        </div>
      )}

      {isSoldOut
        ? discountText && (
            <div className="absolute top-6 left-2 z-1 md:top-10 md:left-3">
              <span className="rounded-full bg-black px-2 py-1 text-[0.5rem] font-medium text-white md:px-3 md:text-xs">
                Sold Out
              </span>
            </div>
          )
        : null}

      {/* Product Image */}
      <div className="row-start-1 w-full bg-gray-100">
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            className="aspect-[3/4] h-auto w-full object-cover"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="row-start-2 space-y-1 px-4 py-4 md:px-6">
        <Link to={`/product/${id}`}>
          {/* Brand Link (if exists) */}
          {brand && (
            <p className="text-xs font-medium text-gray-500 hover:text-gray-700">
              {brand}
            </p>
          )}

          <div>
            <h3 className="md:text-md text-sm font-medium text-gray-900">
              {title}{' '}
            </h3>

            <div className="flex items-center space-x-2">
              <span className="text-primary font-sans text-sm md:text-sm">
                {price} EGP
              </span>
              {oldPrice && (
                <span className="font-sans text-xs text-gray-500 line-through md:text-sm">
                  {oldPrice} EGP
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
