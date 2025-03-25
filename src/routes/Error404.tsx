import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="relative flex items-center justify-center p-40 sm:p-50">
      <div className="scale-x-95 scale-y-120 text-center text-[10rem] -tracking-wide opacity-10 sm:text-[20rem]">
        404
      </div>
      {/* go back button */}
      <div className="absolute top-[45%] left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 sm:gap-8">
        <span className="font-actay text-lg sm:text-xl">Page not found</span>
        <Link to="/">
          <button className="bg-primary text-creme rounded-4xl px-4 py-3 text-xs sm:px-8 sm:py-4 sm:text-base">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
