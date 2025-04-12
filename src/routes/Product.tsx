import { useParams } from 'react-router-dom';

function Product() {
  const ProductID = useParams();
  return (
    <>
      <div>
        Product: <span>{ProductID.id}</span>
      </div>
    </>
  );
}

export default Product;
