import SlideShow from './SlideShow';

export default function HeroBanner() {
  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-tl from-zinc-600 to-neutral-700 px-5 pt-40 pb-10 md:px-9 md:pt-36 md:pb-15 lg:px-12">
      <SlideShow />
    </div>
  );
}
