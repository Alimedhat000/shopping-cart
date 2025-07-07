import { useState } from 'react';
import { IconType } from 'react-icons';
import { ReactElement, ReactNode } from 'react';
import { HiChevronDown } from 'react-icons/hi';

export default function AccordionQA({
  QAData,
  className,
}: {
  QAData: {
    question: string;
    answer: ReactNode;
    icon?: ReactElement<IconType>;
  }[];
  className?: string;
}) {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleQA = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className={`mt-6 rounded-lg bg-neutral-200 ${className}`}>
      {QAData.map((QA, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div
            key={index}
            className="border-b-2 border-zinc-300 last:border-b-0"
          >
            <button
              className={`font-condensed flex w-full justify-between py-5 text-left font-bold text-gray-900 focus:outline-none xl:text-lg`}
              onClick={() => toggleQA(index)}
            >
              <div className="flex items-center gap-2">
                {QA.icon}
                {QA.question}
              </div>
              <HiChevronDown
                className={`text-xl transition-transform xl:text-2xl ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="font-condensed mb-3 pr-6 text-sm">
                {QA.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
