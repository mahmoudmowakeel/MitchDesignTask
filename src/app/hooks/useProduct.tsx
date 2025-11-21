"use client";
import { useQuery } from "@tanstack/react-query";

const BASE_URL =  process.env.NEXT_PUBLIC_API_URL;

export function useProduct(id: number, lang: "en" | "fr") {
  return useQuery({
    queryKey: ["product", lang, id],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/products/${id}`, {
        headers: { "Accept-Language": lang },
      });
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to fetch products");
      }

      return res.json();
    },
  });
}
