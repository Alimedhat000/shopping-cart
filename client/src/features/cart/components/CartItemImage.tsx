const CartItemImage = ({ src, alt }: { src: string; alt: string }) => (
  <div className="h-30 w-20 bg-gray-100">
    <img
      src={src}
      alt={alt}
      className="h-full w-full rounded-lg object-cover"
    />
  </div>
);

export default CartItemImage;
