export type Product = {
  id: number;
  image: string;
  price: string;
  status: "active" | "inactive";
  name: string;
  description: string;
  brands: string[];
  sizes: string[];
  average_rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
};

export type Pagination = {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
};

export type ProductListResponse = {
  status: number;
  error: boolean;
  message: string;
  data: Product[];
  pagination: Pagination;
};

export type ProductsQueryParams = {
  size?: string;
  brand?: string;

  min_price?: number;
  max_price?: number;
  min_rating?: number | string;

  sort_by?: "price" | "rating" | "created_at" | undefined;
  sort_order?: "asc" | "desc" | undefined;

};
