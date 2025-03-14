// import testimage from '../assets/imgs/model-banner-2-closeup.png';
import { Link } from 'react-router-dom';

export default function ProductCard() {
  return (
    <div className="relative row-span-2 grid grid-rows-subgrid rounded-md bg-white md:min-w-80">
      {/* card_badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="rounded-full bg-[#ff4f2c] px-3 py-1 text-xs font-medium text-white">
          Save 105.00
        </span>
      </div>

      {/* card_figure */}
      <div className="row-start-1 w-full bg-gray-100">
        <img
          src="https://placehold.co/500x700"
          alt="Product"
          className="h-full w-full object-cover"
        />
      </div>

      {/* card_info */}
      <div className="row-start-2 space-y-1 px-8 py-4">
        <Link
          to="/"
          className="text-xs font-medium text-gray-500 hover:text-gray-700"
        >
          Woke
        </Link>

        <div>
          <h3 className="text-md font-medium text-gray-900">Comfy Pants</h3>

          <div className="flex items-center space-x-2">
            <span className="text-md font-sans text-[#ff4f2c]">750.00 EGP</span>
            <span className="font-sans text-sm text-gray-500 line-through">
              855.00 EGP
            </span>
          </div>
        </div>
        {/* 
        <div className="flex items-center space-x-2 pt-1">
          <button className="h-5 w-5 rounded-full border border-gray-300 bg-gray-800"></button>
          <button className="h-5 w-5 rounded-full border border-gray-300 bg-blue-600"></button>
        </div> */}
      </div>
    </div>
  );
}
