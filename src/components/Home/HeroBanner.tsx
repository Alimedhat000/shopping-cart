import SlideShow from './SlideShow';

export default function HeroBanner() {
  return (
    <div className="flex w-full items-center justify-center bg-gradient-to-tl from-zinc-600 to-neutral-700 px-5 pt-40 pb-15 md:px-22">
      <SlideShow />
    </div>
  );
}
