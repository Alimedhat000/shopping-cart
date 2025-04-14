// ProductPage.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import ProductGallery from '@/components/Product/ProductGallery';
import ProductInfo from '@/components/Product/ProductInfo';

interface ColorOption {
  name: string;
  hex: string;
  availability?: boolean;
}

type SizeOption = 'S' | 'M' | 'L' | 'XL';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  console.log('Product ID:', id);
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<SizeOption>('S');
  const [quantity, setQuantity] = useState<number>(1);

  const colors: ColorOption[] = [
    { name: 'black', hex: '#000', availability: true },
    { name: 'green', hex: '#00A651', availability: true },
    { name: 'purple', hex: '#800080', availability: true },
    { name: 'yellow', hex: '#FFFF00', availability: true },
    { name: 'light-gray', hex: '#D3D3D3', availability: true },
    { name: 'dark-gray', hex: '#A9A9A9', availability: true },
    { name: 'gold', hex: '#C9B037', availability: true },
    { name: 'teal', hex: '#008080', availability: true },
    { name: 'light-blue', hex: '#ADD8E6', availability: true },
    { name: 'baby-blue', hex: '#89CFF0', availability: true },
    { name: 'pink', hex: '#FFC0CB', availability: true },
    { name: 'blue', hex: '#0000FF', availability: true },
    { name: 'navy', hex: '#000080', availability: false },
    { name: 'gray', hex: '#808080', availability: false },
    { name: 'brown', hex: '#964B00', availability: true },
    { name: 'red', hex: '#FF0000', availability: true },
    { name: 'orange', hex: '#FFA500', availability: false },
    { name: 'hot-pink', hex: '#FF69B4', availability: true },
    { name: 'lime', hex: '#BFFF00', availability: true },
  ];

  const sizes: SizeOption[] = ['S', 'M', 'L', 'XL'];

  const thumbnails: string[] = [
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
    'https://placehold.co/450x600',
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
        <ProductGallery thumbnails={thumbnails} />

        {/* Product Info */}
        <ProductInfo
          colors={colors}
          sizes={sizes}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          decreaseQuantity={decreaseQuantity}
          increaseQuantity={increaseQuantity}
        />
      </div>
    </div>
  );
}
