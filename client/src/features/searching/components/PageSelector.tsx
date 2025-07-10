import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface PageSelectorProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function PageSelector({
  page,
  totalPages,
  onPageChange,
}: PageSelectorProps) {
  const handlePrev = () => {
    if (page > 1) onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) onPageChange(page + 1);
  };

  return (
    <div className="mt-15 flex w-50 items-center justify-around rounded-full border border-gray-200 px-6 py-5 text-black">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="disabled:opacity-30"
      >
        <LuChevronLeft size={20} />
      </button>

      <span className="text-md font-medium">
        {page} / {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={page === totalPages}
        className="disabled:opacity-30"
      >
        <LuChevronRight size={20} />
      </button>
    </div>
  );
}
