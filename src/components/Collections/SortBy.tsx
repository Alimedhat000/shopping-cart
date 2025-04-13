export default function SortBy() {
  return <div>SortBy:</div>;
}

import * as React from 'react';
import { LuChevronDown, LuCheck } from 'react-icons/lu';
import { cn } from '../../lib/utils';

type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Best selling', value: 'best-selling' },
  { label: 'Alphabetically, A-Z', value: 'title-asc' },
  { label: 'Alphabetically, Z-A', value: 'title-desc' },
  { label: 'Price, low to high', value: 'price-asc' },
  { label: 'Price, high to low', value: 'price-desc' },
  { label: 'Date, old to new', value: 'date-asc' },
  { label: 'Date, new to old', value: 'date-desc' },
];

interface SortDropdownProps {
  defaultValue?: string;
  onSortChange?: (value: string) => void;
  className?: string;
}

export function SortDropdown({
  defaultValue = 'title-asc',
  onSortChange,
  className,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<SortOption>(
    sortOptions.find((option) => option.value === defaultValue) ||
      sortOptions[2]
  );
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(option.value);
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={cn('relative inline-block text-left', className)}
    >
      <div>
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="text-gray-600">Sort By:</span>{' '}
          <span className="">{selectedOption.label}</span>
          <div className="rounded-full bg-zinc-300 p-1">
            <LuChevronDown
              className={cn(
                'h-4 w-4 text-black transition-transform',
                isOpen ? 'rotate-180 transform' : ''
              )}
              aria-hidden="true"
            />
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-2 mt-5 w-56 origin-top-right rounded-md bg-white shadow-lg focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="px-2 py-4" role="none">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                className={cn(
                  'text-xm flex w-full items-center px-3 py-2 tracking-tighter',
                  selectedOption.value === option.value
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-50'
                )}
                role="menuitem"
                tabIndex={-1}
                onClick={() => handleOptionClick(option)}
              >
                {option.value === selectedOption.value && (
                  <span className="justify-centertext-xs mr-2 flex h-5 w-5 items-center text-black">
                    <LuCheck />
                  </span>
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
