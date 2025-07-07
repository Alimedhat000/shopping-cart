import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { BsBoxSeam } from 'react-icons/bs';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

interface ShippingRate {
  method: string;
  price: number;
  currency: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
}) => (
  <div className="relative flex flex-col rounded-xl border border-zinc-400 px-5 py-2">
    <label className="text-xs text-zinc-500">{label}</label>
    <select
      className="w-full appearance-none text-lg font-medium outline-none"
      value={value}
      onChange={onChange}
      style={{
        // Ensure consistent width and prevent content-based resizing
        width: '100%',
        minWidth: '140px',
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} className="py-2">
          {option.label}
        </option>
      ))}
    </select>
    <HiChevronDown className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform" />
  </div>
);

const ShippingEstimator: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState('Egypt');
  const [province, setProvince] = useState('Alexandria');
  const [zipCode, setZipCode] = useState('');
  const [shippingRates, setShippingRates] = useState<ShippingRate[] | null>(
    null
  );
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateShipping = () => {
    setIsCalculating(true);

    // Simulate API call with setTimeout
    setTimeout(() => {
      // Generate shipping rate based on location
      // In a real app, this would be an API call to get actual rates
      const rate = {
        method: 'Express Shipping',
        price: 91.0,
        currency: 'EGP',
      };

      setShippingRates([rate]);
      setIsCalculating(false);
    }, 1000); // Simulate a 500ms delay for the API call
  };

  return (
    <div className="font-condensed border-b border-zinc-300 py-6">
      <button
        className="flex w-full cursor-pointer items-center justify-between font-bold uppercase"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <BsBoxSeam className="text-2xl" />
          ESTIMATE SHIPPING
        </div>
        <HiChevronDown
          className={`text-xl transition-transform xl:text-2xl ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="pt-4">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Country Dropdown */}
            <SelectField
              label="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              options={[
                { value: 'Egypt', label: 'Egypt' },
                // Add more country options as needed
              ]}
            />

            {/* Province Dropdown */}
            <SelectField
              label="Province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              options={[
                { value: '6th of October', label: '6th of October' },
                { value: 'Al Sharqia', label: 'Al Sharqia' },
                { value: 'Alexandria', label: 'Alexandria' },
                { value: 'Aswan', label: 'Aswan' },
                { value: 'Asyut', label: 'Asyut' },
                { value: 'Beheira', label: 'Beheira' },
                { value: 'Beni Suef', label: 'Beni Suef' },
                { value: 'Cairo', label: 'Cairo' },
                { value: 'Dakahlia', label: 'Dakahlia' },
                { value: 'Damietta', label: 'Damietta' },
                { value: 'Faiyum', label: 'Faiyum' },
                { value: 'Gharbia', label: 'Gharbia' },
                { value: 'Giza', label: 'Giza' },
                { value: 'Helwan', label: 'Helwan' },
                { value: 'Ismailia', label: 'Ismailia' },
                { value: 'Kafr el-Sheikh', label: 'Kafr el-Sheikh' },
                { value: 'Luxor', label: 'Luxor' },
                { value: 'Matrouh', label: 'Matrouh' },
                { value: 'Minya', label: 'Minya' },
                { value: 'Monufia', label: 'Monufia' },
                { value: 'New Valley', label: 'New Valley' },
                { value: 'North Sinai', label: 'North Sinai' },
                { value: 'Port Said', label: 'Port Said' },
                { value: 'Qalyubia', label: 'Qalyubia' },
                { value: 'Qena', label: 'Qena' },
                { value: 'Red Sea', label: 'Red Sea' },
                { value: 'Sohag', label: 'Sohag' },
                { value: 'South Sinai', label: 'South Sinai' },
                { value: 'Suez', label: 'Suez' },
              ]}
            />

            {/* Zip/Postal Code Input */}
            <div className="relative flex flex-col rounded-xl border border-zinc-400 px-5 py-2">
              <label className="text-xs text-zinc-500">Zip code</label>
              <input
                type="text"
                className="w-full text-lg font-medium outline-none"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                style={{
                  minWidth: '140px',
                }}
              />
            </div>

            {/* Estimate Button */}
            <button
              className="bg-primary w-full self-end rounded-full px-8 py-3 text-lg font-bold whitespace-nowrap text-white uppercase hover:bg-orange-600 md:w-fit md:self-center"
              onClick={calculateShipping}
              disabled={isCalculating}
            >
              {isCalculating ? 'Calculating...' : 'Estimate'}
            </button>
          </div>

          {shippingRates && (
            <div className="mt-6 rounded-lg bg-gray-100 px-2 py-4">
              <p className="mb-2 text-lg font-medium">
                There is one shipping rate for your address:
              </p>
              <ul className="list-disc pl-6">
                {shippingRates.map((rate, index) => (
                  <li key={index} className="font-medium">
                    {rate.method}: {rate.currency} {rate.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShippingEstimator;
