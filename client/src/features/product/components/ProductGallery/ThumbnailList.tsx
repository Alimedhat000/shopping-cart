// import React from 'react';

interface Props {
  images: string[];
  selectedIndex: number;
  onClick: (index: number) => void;
  vertical?: boolean;
}

export default function ThumbnailList({
  images,
  selectedIndex,
  onClick,
  //   vertical = false,
}: Props) {
  return (
    <>
      {images.map((thumb, index) => (
        <div
          key={index}
          className="group relative flex-shrink-0 cursor-pointer rounded bg-gray-100"
          onClick={() => onClick(index)}
        >
          <div className="h-24 w-16 overflow-hidden">
            <img
              src={thumb + '&width=500'}
              alt={`Thumbnail ${index + 1}`}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div
            className={`inset-0 mt-1 border-b-2 transition-all duration-300 ${
              selectedIndex === index ? 'border-black' : 'border-transparent'
            }`}
          />
        </div>
      ))}
    </>
  );
}
