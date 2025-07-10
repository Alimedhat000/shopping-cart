import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThumbnailList from './ThumbnailList';
import useFadeScroll from '../../hooks/useFadeScroll';

interface ProductGalleryProps {
  thumbnails: string[];
  initialImage?: string;
}

export default function ProductGallery({
  thumbnails,
  initialImage,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const verticalRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  const { top, bottom, left, right } = useFadeScroll(verticalRef, horizontalRef);

  const currentImage = initialImage || thumbnails[selectedIndex];

  useEffect(() => {
    thumbnails.forEach((src) => {
      const img = new Image();
      img.src = src + '&width=1000';
    });
  }, [thumbnails]);

  const handleClick = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="flex flex-col md:max-w-1/2 lg:flex-row">
      {/* Vertical Thumbnails */}
      <div
        ref={verticalRef}
        className="relative mr-4 hidden max-h-[500px] flex-col gap-4 overflow-y-auto pr-1 lg:flex"
      >
        {top && <div className="sticky -top-1 z-10 h-30 w-full bg-gradient-to-b from-[#f2f2f2] to-transparent" />}
        <ThumbnailList
          images={thumbnails}
          selectedIndex={selectedIndex}
          onClick={handleClick}
          vertical
        />
        {bottom && <div className="sticky bottom-0 z-10 h-8 w-full bg-gradient-to-t from-[#f2f2f2] to-transparent" />}
      </div>

      {/* Main Image */}
      <div className="relative flex-1 overflow-hidden bg-gray-100">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={selectedIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <img
              src={currentImage}
              alt="Main product"
              className="h-auto w-full rounded-2xl object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Horizontal Thumbnails (Mobile) */}
      <div className="relative mt-4 lg:hidden">
        <div ref={horizontalRef} className="flex gap-4 overflow-x-auto pb-2">
          {left && <div className="absolute -left-1 z-10 min-h-full w-8 bg-gradient-to-r from-[#f2f2f2] to-transparent" />}
          <ThumbnailList
            images={thumbnails}
            selectedIndex={selectedIndex}
            onClick={handleClick}
          />
          {right && <div className="absolute right-0 z-10 h-full w-8 bg-gradient-to-l from-[#f2f2f2] to-transparent" />}
        </div>
      </div>
    </div>
  );
}
