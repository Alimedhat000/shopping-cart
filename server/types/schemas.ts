// types/shopify.ts

export type Image = {
  id: number;
  src: string;
  alt?: string | null;
  width: number;
  height: number;
  position: number;
  created_at: string;
  updated_at: string;
  product_id?: number;
  variant_ids?: number[];
};

export type Variant = {
  id: number;
  title: string;
  option1: string;
  option2: string | null;
  option3: string | null;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: Image | null;
  available: boolean;
  price: string;
  grams: number;
  compare_at_price: string | null;
  position: number;
  product_id: number;
  created_at: string;
  updated_at: string;
};

export type ProductOption = {
  name: string;
  position: number;
  values: string[];
};

export type Product = {
  id: number;
  title: string;
  handle: string;
  body_html: string | null;
  vendor: string;
  product_type: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  published_at: string | null;
  options: ProductOption[];
  variants: Variant[];
  images: Image[];
};

export type Collection = {
  id: number;
  title: string;
  handle: string;
  body_html: string | null;
  published_at: string | null;
  updated_at: string;
  image: {
    id: number;
    created_at: string;
    src: string;
    alt: string | null;
  };
  products_count: number;
};
