import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useAnimationControls, AnimationControls } from 'framer-motion';
import { DrawerContext } from './DrawerContext';

interface DrawerProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
  side: 'left' | 'right' | 'top' | 'bottom' | 'center';
  onOpenChange?: (isOpen: boolean) => void;
}

interface DrawerContextType {
  isOpen: boolean;
  side: 'left' | 'right' | 'top' | 'bottom' | 'center';
  openDrawer: () => void;
  closeDrawer: () => void;
  controls: AnimationControls;
  contentControls: AnimationControls;
}

export const DrawerProvider = ({
  children,
  side,
  defaultOpen = false,
  onOpenChange,
}: DrawerProviderProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const controls = useAnimationControls();
  const contentControls = useAnimationControls();

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    onOpenChange?.(true);
    if (side === 'left' || side === 'right') {
      controls.start({ scaleX: 1 }); // Animate when starting
    } else {
      controls.start({ scaleY: 1 }); // For top, bottom, or center
    }
    contentControls.start({
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut', delay: 0.2 },
    });
  }, [side, onOpenChange, controls, contentControls]);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    onOpenChange?.(false);
    if (side === 'left' || side === 'right') {
      controls.start({ scaleX: 0 }); // Animate when starting
    } else {
      controls.start({ scaleY: 0 }); // For top, bottom, or center
    }
    contentControls.start({
      opacity: 0,
      transition: { duration: 0.1, ease: 'easeInOut' },
    });
  }, [side, onOpenChange, controls, contentControls]);

  // Close on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeDrawer]);

  const contextValue: DrawerContextType = {
    isOpen,
    side,
    openDrawer,
    closeDrawer,
    controls,
    contentControls,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};
