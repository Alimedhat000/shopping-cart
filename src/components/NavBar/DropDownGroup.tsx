import DropDown from './DropDown';

export default function DropDownGroup() {
  return (
    <div className="flex gap-4 text-xs">
      <DropDown text={'WOMEN'} />
      <DropDown text={'MEN'} />
    </div>
  );
}
