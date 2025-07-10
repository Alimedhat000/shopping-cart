import { useEffect, useState } from 'react';
import { Product } from '@/types/products';

export default function useAllImagesLoaded(products: Product[]): boolean {
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (!products.length) return;

    let loadedCount = 0;
    const imgElements: HTMLImageElement[] = [];

    products.forEach((p) => {
      const img = new Image();
      img.src = p.images[0]?.src || '';
      img.onload = img.onerror = () => {
        loadedCount++;
        if (loadedCount === products.length) {
          setAllLoaded(true);
        }
      };
      imgElements.push(img);
    });

    return () => {
      imgElements.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [products]);

  return allLoaded;
}
