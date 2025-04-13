import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';

import { Button } from '../components/Util/Button';
import { cn } from '../lib/utils';

export default function ProductPage() {
  const ProductID = useParams();
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedSize, setSelectedSize] = useState('S');
  const [quantity, setQuantity] = useState(1);

  const colors = [
    { name: 'green', hex: '#00A651' },

    { name: 'purple', hex: '#800080' },
    { name: 'yellow', hex: '#FFFF00' },
    { name: 'light-gray', hex: '#D3D3D3' },
    { name: 'dark-gray', hex: '#A9A9A9' },
    { name: 'gold', hex: '#C9B037' },
    { name: 'teal', hex: '#008080' },
    { name: 'light-blue', hex: '#ADD8E6' },
    { name: 'baby-blue', hex: '#89CFF0' },
    { name: 'pink', hex: '#FFC0CB' },
    { name: 'blue', hex: '#0000FF' },
    { name: 'navy', hex: '#000080' },
    { name: 'gray', hex: '#808080' },
    { name: 'brown', hex: '#964B00' },
    { name: 'red', hex: '#FF0000' },
    { name: 'orange', hex: '#FFA500' },
    { name: 'hot-pink', hex: '#FF69B4' },
    { name: 'lime', hex: '#BFFF00' },
  ];

  const sizes = ['S', 'M', 'L', 'XL'];

  const thumbnails = [
    'https://placehold.co/60x80',
    'https://placehold.co/60x80',
    'https://placehold.co/60x80',
    'https://placehold.co/60x80',
    'https://placehold.co/60x80',
    'https://placehold.co/60x80',
  ];

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Product Gallery */}
        <div className="flex md:w-1/2">
          {/* Thumbnails */}
          <div className="mr-4 hidden flex-col gap-2 md:flex">
            {thumbnails.map((thumb, index) => (
              <div
                key={index}
                className="h-20 w-16 cursor-pointer bg-gray-100 hover:border-gray-400"
              >
                <img
                  src={thumb || 'https://placehold.co/60x80'}
                  alt={`Product thumbnail ${index + 1}`}
                  width={60}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 bg-gray-100">
            <img
              src="https://placehold.co/450x600"
              alt="Long-Sleeve Crewneck Top"
              width={450}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <div className="mb-6">
            <div className="mb-1 text-sm text-gray-600">DissMiss</div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight uppercase">
              Long-Sleeve Crewneck Top
            </h1>

            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl font-medium text-[#FF5733]">
                301.50
              </span>
              <span className="text-sm text-gray-500 line-through">
                $513.00
              </span>
              <span className="rounded-full bg-[#FF5733] px-2 py-1 text-xs text-white">
                Save 211.50
              </span>
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium">Color:</span>
              <span className="capitalize">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={cn(
                    'h-8 w-8 rounded-full border-2',
                    selectedColor === color.name
                      ? 'border-black'
                      : 'border-transparent'
                  )}
                  style={{
                    backgroundColor: color.hex,
                    boxShadow:
                      color.name === 'white'
                        ? 'inset 0 0 0 1px #e5e5e5'
                        : 'none',
                  }}
                  aria-label={`Select ${color.name} color`}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <div className="mb-2">
              <span className="font-condensed font-normal text-zinc-700">
                Size:
              </span>
              <span className="font-condensed ml-2">{selectedSize}</span>
            </div>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border',
                    selectedSize === size
                      ? 'border-black bg-white'
                      : 'border-gray-300 bg-gray-50'
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <div className="font-condensed mb-2 font-normal text-zinc-700">
              Quantity:
            </div>
            <div className="w inline-flex h-[60px] max-w-[280px] items-center justify-between gap-6 rounded-full border border-gray-300 px-6">
              <button
                onClick={decreaseQuantity}
                className="flex h-6 w-6 cursor-pointer items-center justify-center"
                aria-label="Decrease quantity"
              >
                <LuMinus className="h-5 w-5" />
              </button>
              <div className="text-xl font-medium">{quantity}</div>
              <button
                onClick={increaseQuantity}
                className="flex h-6 w-6 cursor-pointer items-center justify-center"
                aria-label="Increase quantity"
              >
                <LuPlus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button className="bg-primary hover:bg-primary/80 h-12 flex-1 rounded-3xl text-white">
              Add to cart
            </Button>
            <Button className="h-12 flex-1 rounded-3xl bg-black text-white hover:bg-black/90">
              Buy it now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
