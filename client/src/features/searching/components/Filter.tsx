import { IoChevronDown } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';

function Filter({ Name, Options = [] }: { Name?: string; Options?: string[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(
    Array(Options.length).fill(false)
  );

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen, Options]);

  const handleCheckboxChange = (index: number) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  return (
    <div className="w-full border-b border-zinc-400 py-3">
      <div
        className="group flex cursor-pointer items-center justify-between px-2 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="tracking-tighter">{Name}</span>
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
        <div ref={contentRef} className="py-1">
          {Options.map((option, index) => (
            <label
              key={index}
              className="flex cursor-pointer items-center px-2 py-1 text-sm"
            >
              <div
                className={`mr-3 h-4 w-4 rounded ${checkedItems[index] ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => handleCheckboxChange(index)}
              >
                {/* The actual checkbox is hidden */}
                <input
                  type="checkbox"
                  className="absolute opacity-0"
                  checked={checkedItems[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </div>
              {option}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Filter;
