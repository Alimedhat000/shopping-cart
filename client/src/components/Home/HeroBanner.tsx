import SlideShow from './SlideShow';

export default function HeroBanner() {
  return (
    <div className="site-padding flex w-full items-center justify-center bg-gradient-to-tl from-zinc-600 to-neutral-700 pt-40 pb-10 md:pt-36 md:pb-15">
      <SlideShow />
    </div>
  );
}
