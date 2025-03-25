import { Link } from 'react-router-dom';

export default function Error404() {
  return (
    <div className="relative flex items-center justify-center p-50">
      <div className="scale-x-95 scale-y-120 text-center text-[20rem] -tracking-wide opacity-10">
        404
      </div>
      {/* go back button */}
      <div className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-8">
        <span className="font-actay text-xl">Page not found</span>
        <Link to="/">
          <button className="bg-primary text-creme rounded-4xl px-8 py-4">
            Continue shopping
          </button>
        </Link>
      </div>
    </div>
  );
}
