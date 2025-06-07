import { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useDrawer } from './DrawerContext';

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  width?: string;
  height?: string;
  overlay?: boolean;
  overlayColor?: string;
  closeOnOverlayClick?: boolean;
}

export const Drawer = ({
  children,
  width,
  height,
  overlay = true,
  overlayColor = 'bg-black/50',
  closeOnOverlayClick = true,
  className = '',
  ...props
}: DrawerProps) => {
  const { isOpen, closeDrawer, controls, side } = useDrawer();

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      closeDrawer();
    }
  };

  const sideClasses: Record<string, string> = {
    left: `left-0 top-0 `,
    right: `top-0 right-0`,
    top: `inset-x-0 top-2 w-full m-auto `,
    bottom: `inset-x-0 bottom-2 m-auto w-full `,
    center: `top-0 left-0 translate-y-1/2 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`,
  };

  // Prevent clicks inside the drawer from closing it
  const handleDrawerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const getinitialScale = () => {
    switch (side) {
      case 'left':
      case 'right':
        return { scaleX: 0 };
      case 'top':
      case 'bottom':
      case 'center':
        return { scaleY: 0 };
    }
  };

  function getTransformOrigin() {
    switch (side) {
      case 'left':
        return 'left center';
      case 'right':
        return 'right center';
      case 'top':
        return 'center top';
      case 'bottom':
        return 'center bottom';
      default:
        return 'center center';
    }
  }

  const getDrawerStyle = () => {
    const style: React.CSSProperties = { ...props.style };

    if (side === 'left' || side === 'right') {
      style.width = width;
      style.height = height;
    } else if (side === 'top' || side === 'bottom') {
      style.width = width === '400px' ? '100%' : width;
      style.height = height === '100vh' ? '200px' : height;
    } else if (side === 'center') {
      style.width = width;
      style.height = height === '100vh' ? 'auto' : height;
      style.maxWidth = '90vw';
      style.maxHeight = '90vh';
    }

    return style;
  };

  return (
    <>
      {/* Overlay */}
      {overlay && (
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? overlayColor : 'pointer-events-none opacity-0'}`}
          onClick={handleOverlayClick}
        />
      )}

      {/* Drawer */}
      <motion.div
        role="dialog"
        aria-modal="true"
        className={`fixed ${sideClasses[side]} z-50 flex flex-col p-4 ${className}`}
        style={{
          ...getDrawerStyle(),
          ...props.style,
          transformOrigin: getTransformOrigin(),
        }}
        onClick={handleDrawerClick}
        initial={getinitialScale()}
        animate={controls}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </>
  );
};
