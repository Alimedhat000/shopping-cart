import HeroBanner from '../components/Home/HeroBanner';
// import AnnouncementBar from "../components/NavBar/AnouncementBar";

function Home() {
  return (
    <>
      <div className="flex items-center justify-center">
        <HeroBanner />
        {/* <AnnouncementBar />
        <ProductSlider />
        <ProductGrid /> */}
      </div>
    </>
  );
}

export default Home;
