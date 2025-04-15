// ProductPage.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import ProductGallery from '@/components/Product/ProductGallery';
import ProductInfo from '@/components/Product/ProductInfo';
import ProductSlider from '@/components/Home/ProductSlider';
import FAQ from '@/components/Faq';
import AccordionQA from '@/components/Util/AccordionQA';
import {
  PiAlarmBold,
  PiPhoneBold,
  PiKeyReturnBold,
  PiClipboardTextBold,
  PiTruckBold,
  PiShieldCheckBold,
} from 'react-icons/pi';
import { IconType } from 'react-icons';
import { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ColorOption {
  name: string;
  hex: string;
  availability?: boolean;
}

type SizeOption = 'S' | 'M' | 'L' | 'XL';

interface FAQItem {
  question: string;
  answer: ReactNode;
  icon?: ReactElement<IconType>;
}

const faqData: FAQItem[] = [
  {
    question: ' How much time does the delivery take?',
    answer:
      'Orders take 1-3 working days to be delivered and the shipping fees are the responsibility of the customer. (Shipping fees cost is communicated at checkout)',
    icon: <PiAlarmBold className="text-2xl" />,
  },
  {
    question: 'How can i contact customer service?',
    answer: (
      <p>
        You can contact our customer service with the chat button or via email
        through{' '}
        <a href="mailto:wecare@gonativeco.com">
          <span className="font-medium underline">test@test.com</span>
        </a>
      </p>
    ),
    icon: <PiPhoneBold className="text-2xl" />,
  },
  {
    question: 'What is your return policy?',
    answer: (
      <p>
        We accept returns within 14 days of delivery. Items must be unworn,
        unwashed, undamaged, and with original tags. Please refer to our{' '}
        <Link to="/" title="Refund Policy">
          <span className="font-medium underline">return policy</span>
        </Link>{' '}
        page for more details.
      </p>
    ),
    icon: <PiKeyReturnBold className="text-2xl" />,
  },
];

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

  const descData: FAQItem[] = [
    {
      question: 'Desciption',
      answer:
        'Effortless elegance our essentials long sleeve crew neck top. Upgrade your everyday wardrobe with our soft, stylish, and versatile essentials long sleeve crew neck top.',
      icon: <PiClipboardTextBold className="text-2xl" />,
    },
    {
      question: 'Express Shipping',
      answer: 'Your order will be at your doorstep within 1-3 working days.',
      icon: <PiTruckBold className="text-2xl" />,
    },
    {
      question: 'Refund & Return Policy',
      answer: (
        <div className="space-y-3">
          <p className="font-bold">
            We do not accept exchanges, however, we do accept return requests
            through our customer service department email{' '}
            <a href="/" className="underline">
              wecare@test.com
            </a>
            . The returned items must comply with our return policy:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Items ordered online cannot be returned in-store.</li>
            <li>
              Items must be returned unworn, unwashed, and undamaged with all
              the tags attached.
            </li>
            <li>The original packaging and invoice must be included.</li>
            <li>
              Returns are not applicable on items that were on sale at the time
              of purchase.
            </li>
            <li>
              Returns do not apply to swimwear, accessories, beauty products,
              and candles.
            </li>
            <li>
              Returns must be requested within 14 days from the date of
              delivery.
            </li>
            <li>The initial shipping fees are non-refundable.</li>
            <li>
              Return shipping fees are the responsibility of the customer.
            </li>
          </ol>
          <p className="font-bold">
            Please note that any returns that do not meet our policy will not be
            accepted.
          </p>
          <p className="font-bold">Thank you for your understanding.</p>
        </div>
      ),
      icon: <PiShieldCheckBold className="text-2xl" />,
    },
  ];

  const sizes = {
    S: { availability: true },
    M: { availability: false },
    L: { availability: true },
    XL: { availability: true },
  };

  const thumbnails: string[] = [
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
    'https://placehold.co/560x850',
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
    <>
      <div className="mx-auto max-w-7xl p-4 md:p-6">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Product Gallery */}
          <ProductGallery thumbnails={thumbnails} />

          {/* Product Info */}
          <div className="md:w-1/2">
            <div className="md:sticky md:top-30">
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
        </div>
      </div>
      {/* Product descreption */}

      <div className="site-padding mt-16 flex justify-center">
        <AccordionQA QAData={descData} className="w-full px-12 py-5" />
      </div>
      {/* You May Also Like */}
      <ProductSlider
        Title="YOU MAY ALSO LIKE"
        className="site-padding mt-16"
        showViewAll={false}
      />
      <FAQ FAQdata={faqData} />
    </>
  );
}
