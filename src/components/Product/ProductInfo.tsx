// components/ProductInfo.tsx
import ProductHeader from './ProductHeader';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import ProductActions from './ProductActions';

interface ColorOption {
  name: string;
  hex: string;
  availability?: boolean;
}

type SizeOption = 'S' | 'M' | 'L' | 'XL';

interface ProductInfoProps {
  colors: ColorOption[];
  sizes: SizeOption[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: SizeOption;
  setSelectedSize: (size: SizeOption) => void;
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

export default function ProductInfo({
  colors,
  sizes,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  decreaseQuantity,
  increaseQuantity,
}: ProductInfoProps) {
  return (
    <div>
      <ProductHeader
        Name="Long-Sleeve Crewneck Top"
        Brand="Diss&Miss"
        Price={513.0}
        Discount={211.5}
      />

      <ColorSelector
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <QuantitySelector
        quantity={quantity}
        decreaseQuantity={decreaseQuantity}
        increaseQuantity={increaseQuantity}
      />

      <ProductActions
        onAddToCart={() => {
          console.log('Add to cart clicked');
        }}
        onBuyNow={() => {
          console.log('Buy now clicked');
        }}
      />
    </div>
  );
}
