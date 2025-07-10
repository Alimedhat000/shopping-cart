import { DualRangeSlider } from '../../../components/Util/DualRangeSlider';
import { IoChevronDown } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';

export default function PriceFilter() {
  const [isOpen, setIsOpen] = useState(true);
  const [values, setValues] = useState([0, 3000]);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="w-full border-b border-zinc-400 py-3">
      <div
        className="group flex cursor-pointer items-center justify-between px-2 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="tracking-tighter">Price</span>
        <div
          className={`rounded-full p-2 transition-all ${isOpen ? 'rotate-180 bg-black text-gray-100' : 'bg-zinc-300 text-gray-900'} group-hover:bg-black group-hover:text-gray-100`}
        >
          <IoChevronDown />
        </div>
      </div>
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px` }}
      >
        <div ref={contentRef} className="px-5 py-15">
          <DualRangeSlider
            label={(value) => (
              <span className="text-xs tracking-tighter">{value}</span>
            )}
            value={values}
            onValueChange={setValues}
            min={0}
            max={3000}
            step={1}
          />
        </div>
      </div>
    </div>
  );
}
