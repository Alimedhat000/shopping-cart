// components/ProductHeader.tsx
export default function ProductHeader({
  Name,
  Brand,
  Price,
  Discount,
}: {
  Name: string;
  Brand: string;
  Price: number;
  Discount?: number;
}) {
  return (
    <div className="font-condensed mb-6">
      <div className="mb-1 text-sm text-gray-600">{Brand}</div>
      <h1 className="font-oswald mb-4 text-3xl tracking-tight uppercase">
        {Name}
      </h1>

      <div className="mb-6 flex items-center gap-3">
        <span className="text-primary text-2xl">
          {Price - (Discount != undefined ? Discount : 0)}
        </span>
        {Discount != undefined && Discount > 0 ? (
          <>
            <span className="text-sm text-black line-through">{Discount}</span>
            <span className="bg-primary rounded-full px-3 py-1 text-xs text-white">
              Save {Price - Discount}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
}
