import { toPng } from 'html-to-image';

export const captureAndDownload = async (
  element: HTMLElement | null,
  fileName: string
) => {
  if (!element) {
    console.error('Element not found');
    return;
  }

  try {
    const imageUrl = await toPng(element, { quality: 1.0, pixelRatio: 2 });

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error capturing and downloading image:', error);
  }
};
