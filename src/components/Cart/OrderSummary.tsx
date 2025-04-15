import React from 'react';
import { LuLockKeyhole } from 'react-icons/lu';
import { Link } from 'react-router-dom';

interface OrderSummaryProps {
  subtotal: number;
  orderNote: string;
  setOrderNote: (note: string) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  orderNote,
  setOrderNote,
}) => {
  return (
    <div className="font-condensed rounded-2xl border border-zinc-300 p-6 px-8">
      <div className="flex justify-between text-zinc-500">
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)}</span>
      </div>

      <div className="py-4">
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>{subtotal.toFixed(2)} EGP</span>
        </div>
        <div className="mt-1 text-sm text-gray-500">
          Tax included.{' '}
          <Link to={'/'}>
            <span className="underline">Shipping</span>
          </Link>{' '}
          calculated at checkout.
        </div>
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Order note"
          value={orderNote}
          onChange={(e) => setOrderNote(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 p-2 px-5"
          rows={3}
        />
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-4xl bg-black py-3 text-white">
        <LuLockKeyhole />
        Checkout
      </button>
    </div>
  );
};

export default OrderSummary;
