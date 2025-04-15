import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showTopFade, setShowTopFade] = useState(false);
  const [showBottomFade, setShowBottomFade] = useState(false);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const verticalScrollRef = useRef<HTMLDivElement>(null);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  const images =
    thumbnails.length > 0
      ? thumbnails
      : ['https://via.placeholder.com/450x600'];
  const currentImage = initialImage || images[selectedIndex];

  const handleThumbnailClick = (index: number) => {
    setDirection(index > selectedIndex ? 1 : -1);
    setSelectedIndex(index);
  };

  const checkScrollPositions = () => {
    // Vertical scroll check
    const verticalContainer = verticalScrollRef.current;
    if (verticalContainer) {
      const { scrollTop, scrollHeight, clientHeight } = verticalContainer;
      setShowTopFade(scrollTop > 10);
      setShowBottomFade(scrollHeight - scrollTop - clientHeight > 10);
    }

    // Horizontal scroll check
    const horizontalContainer = horizontalScrollRef.current;
    if (horizontalContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = horizontalContainer;
      setShowLeftFade(scrollLeft > 10);
      setShowRightFade(scrollWidth - scrollLeft - clientWidth > 10);
    }
  };

  useEffect(() => {
    const verticalContainer = verticalScrollRef.current;
    const horizontalContainer = horizontalScrollRef.current;

    // Initial check after a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(checkScrollPositions, 100);

    if (verticalContainer) {
      verticalContainer.addEventListener('scroll', checkScrollPositions);
    }
    if (horizontalContainer) {
      horizontalContainer.addEventListener('scroll', checkScrollPositions);
    }

    // Add resize observer
    const resizeObserver = new ResizeObserver(checkScrollPositions);
    if (verticalContainer) resizeObserver.observe(verticalContainer);
    if (horizontalContainer) resizeObserver.observe(horizontalContainer);

    return () => {
      clearTimeout(timeoutId);
      if (verticalContainer) {
        verticalContainer.removeEventListener('scroll', checkScrollPositions);
      }
      if (horizontalContainer) {
        horizontalContainer.removeEventListener('scroll', checkScrollPositions);
      }
      resizeObserver.disconnect();
    };
  }, []);

  // Re-check when images change
  useEffect(() => {
    checkScrollPositions();
  }, [images]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col md:max-w-1/2 lg:flex-row">
      {/* Vertical thumbnails */}
      <div
        ref={verticalScrollRef}
        className="relative mr-4 hidden max-h-[500px] flex-col gap-4 overflow-y-auto pr-1 lg:flex"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        {showTopFade && (
          <div className="sticky -top-1 z-10 h-30 w-full bg-gradient-to-b from-[#f2f2f2] to-transparent">
            <wbr />
          </div>
        )}

        {images.map((thumb, index) => (
          <div
            key={index}
            className={`group relative flex-shrink-0 cursor-pointer rounded bg-gray-100`}
            onClick={() => handleThumbnailClick(index)}
          >
            <div className="h-24 w-16 overflow-hidden">
              <img
                src={thumb || 'https://via.placeholder.com/48x64'}
                alt={`Product thumbnail ${index + 1}`}
                className="h-full w-full rounded-lg object-cover"
              />
            </div>
            <div
              className={`inset-0 border-b-2 transition-all duration-300 ${
                selectedIndex === index
                  ? 'mt-1 border-black'
                  : 'border-transparent'
              }`}
            />
          </div>
        ))}

        {showBottomFade && (
          <div className="sticky bottom-0 z-10 h-8 w-full bg-gradient-to-t from-[#f2f2f2] to-transparent">
            <wbr />
          </div>
        )}
      </div>

      {/* Main image */}
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
              src={currentImage || 'https://via.placeholder.com/450x600'}
              alt="Product image"
              className="h-auto w-full rounded-2xl object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Horizontal thumbnails */}
      <div className="relative mt-4 lg:hidden">
        <div
          ref={horizontalScrollRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {showLeftFade && (
            <div className="absolute -left-1 z-10 min-h-full w-8 bg-gradient-to-r from-[#f2f2f2] to-transparent">
              <wbr />
            </div>
          )}

          {images.map((thumb, index) => (
            <div
              key={index}
              className={`group relative flex-shrink-0 cursor-pointer rounded bg-gray-100`}
              onClick={() => handleThumbnailClick(index)}
            >
              <div className="h-24 w-16 overflow-hidden">
                <img
                  src={thumb || 'https://via.placeholder.com/48x64'}
                  alt={`Product thumbnail ${index + 1}`}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>
              <div
                className={`inset-0 mt-1 border-b-2 transition-all duration-300 ${
                  selectedIndex === index
                    ? 'border-black'
                    : 'border-transparent'
                }`}
              />
            </div>
          ))}

          {showRightFade && (
            <div className="absolute right-0 z-10 h-full w-8 bg-gradient-to-l from-[#f2f2f2] to-transparent">
              <wbr />
            </div>
          )}
        </div>
      </div>

      {/* CSS for hiding scrollbars */}
      <style>{`
        div[ref=verticalScrollRef]::-webkit-scrollbar,
        div[ref=horizontalScrollRef]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
