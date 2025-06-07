import { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useDrawer } from './DrawerContext';

interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const DrawerContent = ({
  children,
  className = '',
}: DrawerContentProps) => {
  const { contentControls } = useDrawer();
  return (
    <div
      className={`flex h-full flex-col items-center justify-center rounded-xl bg-white text-center shadow-2xl ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={contentControls}
        exit={{ opacity: 0 }}
        className={`relative flex h-full w-full flex-col items-center justify-center text-center`}
      >
        {children}
      </motion.div>
    </div>
  );
};
