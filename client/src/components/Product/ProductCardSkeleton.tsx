import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductCardSkeleton = () => {
  return (
    <div className="min-w-60 p-2 lg:min-w-50">
      <Skeleton height={250} className="mb-2 rounded-md" />
      <Skeleton height={20} width={`80%`} className="mb-1" />
      <Skeleton height={16} width={`60%`} />
    </div>
  );
};

export default ProductCardSkeleton;
