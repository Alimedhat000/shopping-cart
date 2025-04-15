// components/ProductInfo.tsx
import ProductHeader from './ProductHeader';
import ColorSelector from './ColorSelector';
import SizeSelector from './SizeSelector';
import QuantitySelector from './QuantitySelector';
import ProductActions from './ProductActions';
import { useCart } from '@util/CartProvider';

interface ColorOption {
  name: string;
  hex: string;
  availability?: boolean;
}

type SizeOption = 'S' | 'M' | 'L' | 'XL';

interface SizeAvailability {
  S: {
    availability?: boolean;
  };
  M: {
    availability?: boolean;
  };
  L: {
    availability?: boolean;
  };
  XL: {
    availability?: boolean;
  };
}

interface ProductInfoProps {
  productId: number;
  productName: string;
  productBrand: string;
  productImage: string;
  productPrice: number;
  productDiscount: number;
  colors: ColorOption[];
  sizes: SizeAvailability;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedSize: SizeOption;
  setSelectedSize: (size: SizeOption) => void;
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
}

export default function ProductInfo({
  productId,
  productName,
  productBrand,
  productImage,
  productPrice,
  productDiscount,
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
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = {
      id: productId,
      name: productName,
      brand: productBrand,
      price: productPrice,
      discount: productDiscount,
      color: selectedColor,
      size: selectedSize,
      image: productImage,
    };

    addToCart(product, quantity);
  };
  return (
    <div>
      <ProductHeader
        Name={productName}
        Brand={productBrand}
        Price={productPrice}
        Discount={productDiscount}
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
        onAddToCart={handleAddToCart}
        onBuyNow={() => {
          console.log('Buy now clicked');
        }}
      />
    </div>
  );
}
