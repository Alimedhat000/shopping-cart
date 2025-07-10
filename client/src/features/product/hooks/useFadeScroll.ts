import { useEffect, useState, RefObject } from 'react';

interface FadeState {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export default function useFadeScroll(
  verticalRef: RefObject<HTMLElement | null>,
  horizontalRef: RefObject<HTMLElement | null>
): FadeState {
  const [fadeState, setFadeState] = useState<FadeState>({
    top: false,
    bottom: false,
    left: false,
    right: false,
  });

  const checkScroll = () => {
    if (verticalRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = verticalRef.current;
      setFadeState((s) => ({
        ...s,
        top: scrollTop > 10,
        bottom: scrollHeight - scrollTop - clientHeight > 10,
      }));
    }

    if (horizontalRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = horizontalRef.current;
      setFadeState((s) => ({
        ...s,
        left: scrollLeft > 10,
        right: scrollWidth - scrollLeft - clientWidth > 10,
      }));
    }
  };

  useEffect(() => {
    const vertical = verticalRef.current;
    const horizontal = horizontalRef.current;

    const timeoutId = setTimeout(checkScroll, 100);
    if (vertical) vertical.addEventListener('scroll', checkScroll);
    if (horizontal) horizontal.addEventListener('scroll', checkScroll);

    const resizeObserver = new ResizeObserver(checkScroll);
    if (vertical) resizeObserver.observe(vertical);
    if (horizontal) resizeObserver.observe(horizontal);

    return () => {
      clearTimeout(timeoutId);
      vertical?.removeEventListener('scroll', checkScroll);
      horizontal?.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  });

  return fadeState;
}
