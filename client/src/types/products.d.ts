export interface Product {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  body_html: string | null;
  productType: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  price: string;
  variants: Variant[];
  images: ProductImage[];
  options: ProductOption[];
}

export interface ProductOption {
  id: number;
  name: string;
  position: number;
  values: string[];
  productId: string;
}

export interface Variant {
  id: string;
  title: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  available: boolean;
  price: string;
  compareAtPrice: string;
  position: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
  featuredImageId: string;
}

export interface ProductImage {
  id: string;
  src: string;
  alt: string | null;
  width: number;
  height: number;
  position: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
  variantIds: string[];
}
