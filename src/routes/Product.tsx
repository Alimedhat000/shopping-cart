// ProductPage.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import ProductGallery from '@/components/Product/ProductGallery';
import ProductInfo from '@/components/Product/ProductInfo';

interface ColorOption {
  name: string;
  hex: string;
}

type SizeOption = 'S' | 'M' | 'L' | 'XL';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  console.log('Product ID:', id);
  const [selectedColor, setSelectedColor] = useState<string>('black');
  const [selectedSize, setSelectedSize] = useState<SizeOption>('S');
  const [quantity, setQuantity] = useState<number>(1);

  const colors: ColorOption[] = [
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

  const sizes: SizeOption[] = ['S', 'M', 'L', 'XL'];

  const thumbnails: string[] = [
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
