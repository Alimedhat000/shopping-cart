import FAQ from '@/components/Faq';
import HeroBanner from '@/components/Home/HeroBanner';
import ProductGrid from '@/components/Home/ProductGrid';
import ProductSlider from '@/components/Home/ProductSlider';
import AnnouncementBar from '@/components/NavBar/AnnouncementBar';
import { AnnouncementBarProps } from '@/components/NavBar/types';
import { IconType } from 'react-icons';
import { ReactElement } from 'react';

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
  // fetch('https://api.escuelajs.co/api/v1/products')
  //   .then((res) => res.json())
  //   .then(console.log);
  return (
    <>
      <div className="flex w-full flex-col justify-center">
        <HeroBanner />

        <div className="w-full overflow-hidden">
          <AnnouncementBar {...announcementbar} />
        </div>
        <ProductSlider showViewAll={true} className="site-padding" />
        <ProductGrid
          className="site-padding space-y-12 py-12 lg:space-y-0"
          columns={{ sm: 2, md: 2, lg: 5, xl: 5 }}
        />
        <FAQ FAQdata={faqData} />
      </div>
    </>
  );
}

export default Home;
