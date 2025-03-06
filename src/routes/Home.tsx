import HeroBanner from '../components/Home/HeroBanner';
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
    speed: 80,
    direction: 'left',
    showDots: false,
    itemClassName: 'text-black text-6xl py-15',
    className: 'bg-gray-100 px-0',
  };
  return (
    <>
      <div className="flex w-full flex-col items-center justify-center">
        <HeroBanner />

        <div className="w-full overflow-hidden">
          <AnnouncementBar {...announcementbar} />
        </div>

        {/*
        <ProductSlider />
        <ProductGrid /> */}
      </div>
    </>
  );
}

export default Home;
