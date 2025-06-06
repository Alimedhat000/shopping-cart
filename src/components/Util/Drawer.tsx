import {
  useState,
  createContext,
  useContext,
  ReactNode,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react';

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

interface DrawerProviderProps {
  children: ReactNode;
  defaultOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  width?: string;
  overlay?: boolean;
  overlayColor?: string;
  closeOnOverlayClick?: boolean;
}

interface DrawerTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

interface DrawerContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// interface DrawerHeaderProps extends HTMLAttributes<HTMLDivElement> {
//   children: ReactNode;
//   showCloseButton?: boolean;
// }

// interface DrawerBodyProps extends HTMLAttributes<HTMLDivElement> {
//   children: ReactNode;
// }

// interface DrawerFooterProps extends HTMLAttributes<HTMLDivElement> {
//   children: ReactNode;
// }

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};

export const Drawer = ({
  children,
  side = 'left',
  width = 'w-50',
  overlay = false,
  overlayColor = 'bg-black bg-opacity-50',
  closeOnOverlayClick = true,
  className = '',
  ...props
}: DrawerProps) => {
  const { isOpen, closeDrawer } = useDrawer();

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      closeDrawer();
    }
  };

  const sideClasses: Record<string, string> = {
    left: `left-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`,
    right: `right-0 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`,
    top: `top-0 left-0 right-0 h-80 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`,
    bottom: `bottom-0 left-0 right-0 h-80 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`,
  };

  return (
    <>
      {/* Overlay */}
      {overlay && isOpen && (
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 ${overlayColor}`}
          onClick={handleOverlayClick}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed ${sideClasses[side]} ${width} z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out ${className}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
};

export const DrawerOpen = ({
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

export const DrawerClose = ({
  children,
  className = '',
  ...props
}: DrawerTriggerProps) => {
  const { closeDrawer } = useDrawer();

  return (
    <button onClick={closeDrawer} className={className} {...props}>
      {children}
    </button>
  );
};

export const DrawerToggle = ({
  children,
  className = '',
  ...props
}: DrawerTriggerProps) => {
  const { toggleDrawer } = useDrawer();

  return (
    <button onClick={toggleDrawer} className={className} {...props}>
      {children}
    </button>
  );
};

export const DrawerProvider = ({
  children,
  defaultOpen = false,
  onOpenChange,
}: DrawerProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const openDrawer = (): void => {
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const closeDrawer = (): void => {
    setIsOpen(false);
    onOpenChange?.(false);
  };

  const toggleDrawer = (): void => {
    const newState = !isOpen;
    setIsOpen(newState);
    onOpenChange?.(newState);
  };

  const contextValue: DrawerContextType = {
    isOpen,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };

  return (
    <DrawerContext.Provider value={contextValue}>
      {children}
    </DrawerContext.Provider>
  );
};

export const DrawerContent = ({
  children,
  className = '',
  ...props
}: DrawerContentProps) => {
  return (
    <div className={`flex h-full flex-col ${className}`} {...props}>
      {children}
    </div>
  );
};
