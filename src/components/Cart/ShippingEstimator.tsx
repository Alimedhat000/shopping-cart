import { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { LuPackage } from 'react-icons/lu';

export default function ShippingEstimator() {
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState('Egypt');
  const [province, setProvince] = useState('6th of October');
  const [zipCode, setZipCode] = useState('');

  return (
    <div className="w-full">
      <div className="font-condensed border-b border-zinc-400 px-4 py-6">
        {/* Header - Always visible */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <LuPackage className="text-black" size={24} />
            <h2 className="text-lg font-bold uppercase">Estimate Shipping</h2>
          </div>
          <div className="rounded-full bg-gray-200 p-2">
            <HiChevronDown
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              size={16}
            />
          </div>
        </button>

        {/* Collapsible Form */}
        {isOpen && (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Country Dropdown */}
            <div className="relative">
              <label className="mb-1 block text-sm">Country</label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2 pr-10 pl-3"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="Egypt">Egypt</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                <HiChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>

            {/* Province Dropdown */}
            <div className="relative">
              <label className="mb-1 block text-sm">Province</label>
              <div className="relative">
                <select
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white p-2 pr-10 pl-3"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <option value="6th of October">6th of October</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Alexandria">Alexandria</option>
                </select>
                <HiChevronDown
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                  size={16}
                />
              </div>
            </div>

            {/* Zip Code Input */}
            <div>
              <input
                type="text"
                className="rounded-md border border-zinc-400 py-5 text-center"
                placeholder="Zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            {/* Estimate Button */}
            <div className="self-end">
              <button className="bg-primary w-full rounded-full px-8 py-2 font-medium text-white transition-colors hover:bg-orange-600">
                Estimate
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
