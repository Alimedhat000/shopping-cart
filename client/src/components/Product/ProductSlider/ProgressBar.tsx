interface ProgressBarProps {
  percentage: number;
}

const ProgressBar = ({ percentage }: ProgressBarProps) => (
  <div className="relative mr-6 h-1 w-full bg-gray-200 md:h-0.5">
    <div
      className="absolute left-0 h-1 rounded-xl bg-gray-800 transition-all ease-in-out md:h-0.5"
      style={{ width: `${percentage}%` }}
    />
  </div>
);

export default ProgressBar;
