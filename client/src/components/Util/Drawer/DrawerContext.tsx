import { createContext, useContext } from 'react';
import type { AnimationControls } from 'framer-motion';

export interface DrawerContextType {
  isOpen: boolean;
  side: 'left' | 'right' | 'top' | 'bottom' | 'center';
  openDrawer: () => void;
  closeDrawer: () => void;
  controls: AnimationControls;
  contentControls: AnimationControls;
}

export const DrawerContext = createContext<DrawerContextType | undefined>(
  undefined
);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};
