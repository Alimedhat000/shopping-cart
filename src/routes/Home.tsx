import HeroBanner from '../components/Home/HeroBanner';
import ProductSlider from '../components/Home/ProductSlider';
import AnnouncementBar from '../components/NavBar/AnnouncementBar';
import { AnnouncementBarProps } from '../components/NavBar/types';

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
  fetch('https://api.escuelajs.co/api/v1/products')
    .then((res) => res.json())
    .then(console.log);
  return (
    <>
      <div className="flex w-full flex-col justify-center">
        <HeroBanner />

        <div className="w-full overflow-hidden">
          <AnnouncementBar {...announcementbar} />
        </div>

        <ProductSlider />
        {/*<ProductGrid /> */}
      </div>
    </>
  );
}

export default Home;
