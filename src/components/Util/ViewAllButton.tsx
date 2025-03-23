import { IoIosArrowForward } from 'react-icons/io';

// ViewAllButton Component
const ViewAllButton: React.FC = () => {
  return (
    <div className="flex items-center justify-end">
      <div className="flex items-center gap-3 font-light">
        <span>View all</span>
        <div className="rounded-full bg-gray-300 p-1">
          <IoIosArrowForward />
        </div>
      </div>
    </div>
  );
};

export default ViewAllButton;
