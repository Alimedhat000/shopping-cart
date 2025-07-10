import FAQ from '@/components/Faq';
import HeroBanner from '@/components/Home/HeroBanner';
import ProductGrid from '@/components/Home/ProductGrid';
import ProductSlider from '@/components/Home/ProductSlider';
import AnnouncementBar from '@/components/NavBar/AnnouncementBar';
import { AnnouncementBarProps } from '@/components/NavBar/types';
import { IconType } from 'react-icons';
import { ReactElement } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '@/api/products';

interface FAQItem {
  question: string;
  answer: string;
  icon?: ReactElement<IconType>;
}
const faqData: FAQItem[] = [
  {
    question: 'What is Logo Ipsum?',
    answer:
      "An idea to support our community's creative economy while finding one-of-a-kind pieces",
  },
  {
    question: 'Where are your products made?',
    answer:
      "We're selling 100% Egyptian products crafted with local threads by our amazing Egyptian tailors.",
  },
  {
    question: 'How can I track my order?',
    answer:
      'You can track your order through Customer Area, link in the email sent by us, or by contacting our customer service email wecare@testmail.com',
  },
];

function Home() {
  const announcementbar: AnnouncementBarProps = {
    items: [
      { text: 'NEW ARRIVALS', link: '/' },
      { text: 'NEW ARRIVALS', link: '/' },
      { text: 'NEW ARRIVALS', link: '/' },
      { text: 'NEW ARRIVALS', link: '/' },
    ],
    speed: 50,
    direction: 'right',
    showDots: false,
    itemClassName: 'text-black text-4xl py-10 md:text-6xl md:py-15',
    className: 'bg-gray-100 px-0',
  };

  const {
    data: sliderProductsData,
    isLoading: sliderProductsisLoading,
    isError: sliderProductsisError,
  } = useQuery({
    queryKey: [
      'homeSliderProducts',
      { tags: ['New Arrivals'], sortBy: 'createdAt', sortOrder: 'desc' },
    ],
    queryFn: () =>
      getAllProducts({
        tags: ['New Arrivals'],
        sortBy: 'publishedAt',
        sortOrder: 'desc',
      }),
  });

  const sliderProducts = sliderProductsData?.products ?? [];

  const {
    data: gridProductsData,
    isLoading: gridProductsisLoading,
    isError: gridProductsisError,
  } = useQuery({
    queryKey: [
      'homeGridProducts',
      { tags: ['knitted'], sortBy: 'createdAt', sortOrder: 'desc' },
    ],
    queryFn: () =>
      getAllProducts({
        search: 'knitted',
        sortBy: 'publishedAt',
        sortOrder: 'desc',
        limit: 20,
      }),
  });

  const gridProducts = gridProductsData?.products ?? [];

  return (
    <>
      <div className="flex w-full flex-col justify-center">
        <HeroBanner />

        <div className="w-full overflow-hidden">
          <AnnouncementBar {...announcementbar} />
        </div>
        <ProductSlider
          showViewAll={true}
          className="site-padding"
          products={sliderProducts}
          isError={sliderProductsisError}
          isLoading={sliderProductsisLoading}
        />
        <ProductGrid
          className="site-padding space-y-12 py-12 lg:space-y-0"
          columns={{ sm: 2, md: 2, lg: 5, xl: 5 }}
          columnsClassName="grid gap-2 md:gap-6 
    grid-cols-2
    sm:grid-cols-2
    md:grid-cols-2
    lg:grid-cols-5
    xl:grid-cols-5 undefined"
          products={gridProducts}
          isError={gridProductsisError}
          isLoading={gridProductsisLoading}
        />
        <FAQ FAQdata={faqData} />
      </div>
    </>
  );
}

export default Home;
