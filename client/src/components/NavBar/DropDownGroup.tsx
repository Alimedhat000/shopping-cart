import DropDown from './DropDown';

export default function DropDownGroup({ color = '#fff' }: { color: string }) {
  return (
    <div className="flex gap-9 text-lg">
      <DropDown text={'Women'} color={color} />
      <DropDown text={'Men'} color={color} />
    </div>
  );
}
