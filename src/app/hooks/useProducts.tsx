"use client";

import { useQuery } from "@tanstack/react-query";
import { ProductListResponse, ProductsQueryParams } from "../lib/types/main";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function useProducts(params: ProductsQueryParams, lang: "en" | "fr") {
  return useQuery({
    queryKey: ["products", lang, params],
    queryFn: async () => {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) searchParams.append(key, String(value));
      });
      const res = await fetch(
        `${BASE_URL}/products/?${searchParams.toString()}`,
        {
          headers: { "Accept-Language": lang },
        }
      );
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to fetch products");
      }

      return res.json() as Promise<ProductListResponse>;
    },
  });
}
