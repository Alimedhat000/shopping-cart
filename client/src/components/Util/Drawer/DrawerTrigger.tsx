import { ButtonHTMLAttributes, ReactNode } from 'react';
import { useDrawer } from './DrawerContext';

interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const DrawerTrigger = ({
  children,
  className = '',
  ...props
}: DrawerTriggerProps) => {
  const { openDrawer } = useDrawer();
  return (
    <button onClick={openDrawer} className={className} {...props}>
      {children}
    </button>
  );
};
