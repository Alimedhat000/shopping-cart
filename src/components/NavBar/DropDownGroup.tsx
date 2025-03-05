import DropDown from './DropDown';

export default function DropDownGroup({ color = '#fff' }: { color: string }) {
  return (
    <div className="flex gap-4 text-xs">
      <DropDown text={'WOMEN'} color={color} />
      <DropDown text={'MEN'} color={color} />
    </div>
  );
}
