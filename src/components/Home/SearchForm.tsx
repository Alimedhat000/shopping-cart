import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchDropdown from './SearchDropdown';
import { useDrawer, DrawerClose } from '@/components/Util/Drawer';
import { LuX } from 'react-icons/lu';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
}

export const SearchForm = () => {
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { closeDrawer } = useDrawer();

  // Debounced search effect
  useEffect(() => {
    const mockProducts = [
      { id: 1, name: 'Blancka Jeans', brand: 'Blancka', price: '750.00' },
      { id: 2, name: 'Regular Jeans', brand: 'Navy', price: '1,350.00' },
      { id: 3, name: 'Low Waist Jeans', brand: 'Frenchee', price: '1,000.00' },
      { id: 4, name: 'Vesta Jeans', brand: 'THEA', price: '1,500.00' },
      { id: 5, name: 'Straight Jeans', brand: 'THEA', price: '1,200.00' },
      { id: 6, name: 'High Rise Jeans', brand: 'Blancka', price: '1,100.00' },
      { id: 7, name: 'Skinny Jeans', brand: 'Navy', price: '900.00' },
      { id: 8, name: 'Wide Leg Jeans', brand: 'Frenchee', price: '1,400.00' },
      { id: 9, name: 'Bootcut Jeans', brand: 'THEA', price: '1,600.00' },
      { id: 10, name: 'Mom Jeans', brand: 'Blancka', price: '800.00' },
    ];

    if (searchValue.length > 1) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        // Simulate API call - replace with actual fetch
        const filteredProducts = mockProducts.filter((product) =>
          product.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setProducts(filteredProducts);
        setIsLoading(false);
        setShowDropdown(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setProducts([]);
      setShowDropdown(false);
    }
  }, [searchValue]);

  const handleClear = () => {
    setSearchValue('');
    setProducts([]);
    setShowDropdown(false);
  };

  const handleSubmit = (
    e: React.FormEvent | { preventDefault: () => void }
  ) => {
    e.preventDefault();
    if (searchValue.trim()) {
      closeDrawer();
      setShowDropdown(false);
      setProducts([]);
      setIsLoading(false);
      navigate(
        `/search?q=${encodeURIComponent(searchValue.trim())}&type=product`
      );
      setSearchValue('');
    }
  };

  const handleProductClick = (productID: number) => {
    navigate(`/product/${encodeURIComponent(productID)}`);
    closeDrawer();
    setShowDropdown(false);
    setProducts([]);
    setIsLoading(false);
    setSearchValue('');
  };

  return (
    <div className="relative max-h-[90vh] w-full overflow-y-auto">
      <input
        type="search"
        name="q"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Search for..."
        aria-label="Search"
        autoFocus={true}
        autoComplete="off"
        className="font-condensed w-full border-b-2 border-b-gray-300 p-4 text-xl font-bold transition-colors duration-500 focus:border-black focus:outline-none"
        style={{
          WebkitAppearance: 'none',
          MozAppearance: 'textfield',
        }}
      />
      <DrawerClose className="absolute top-4 right-4 z-50 text-gray-500 hover:text-gray-800">
        <LuX size={24} />
      </DrawerClose>
      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="font-condensed absolute top-7.5 right-12 -translate-y-1/2 transform text-sm transition-colors duration-200 hover:text-black"
        >
          Clear
        </button>
      )}
      {/* Search Results Dropdown */}
      {showDropdown && (
        <SearchDropdown
          products={products}
          isLoading={isLoading}
          searchValue={searchValue}
          handleProductClick={handleProductClick}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};
