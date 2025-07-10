import React from 'react';

const CartHeader: React.FC = () => {
  return (
    <div className="font-condensed mb-4 hidden grid-cols-[2.5fr_1fr_1fr] gap-4 border-b-1 border-zinc-300 pb-2 font-bold md:grid">
      <div>Product</div>
      <div className="text-center">Quantity</div>
      <div className="text-right">Total</div>
    </div>
  );
};

export default CartHeader;
