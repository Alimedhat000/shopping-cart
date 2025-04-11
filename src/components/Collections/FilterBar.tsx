import { VscSettings } from 'react-icons/vsc';

function FilterBar({ className }: { className?: string }) {
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-start gap-8">
        <VscSettings />
        <span>Filter Lalalala</span>
      </div>
    </div>
  );
}

export default FilterBar;
