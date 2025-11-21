"use client";
import Image from "next/image";
import BrandButton from "../components/ui/BrandButton";
import ProductsHeader from "../components/products/ProductsHeader";
import { useProducts } from "../hooks/useProducts";
import FiltersComponent from "../components/filters/FiltersComponent";
import { SortByType, useAppContext } from "../context/AppContext";
import SortByComponent from "../components/filters/SortByComponent";
import { Bug, Check, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import SkullLoader from "../components/ui/Loading";
import ProductCard from "../components/ui/ProductCard";

export default function ProductsPage() {
  const {
    filterIsOpen,
    setFilterIsOpen,
    sortbyIsOpen,
    setSortbyIsOpen,
    sortedBy,
    setSortedBy,
    setTempFilters,
    numFiltersApplied,
    selectedLang,
  } = useAppContext();
  const { selectedFilters } = useAppContext();
  const { data, isLoading, error } = useProducts(
    selectedFilters,
    selectedLang == "EN" ? "fr" : "en"
  );
  const router = useRouter();

  const sortOptions = [
    "Most Recommended",
    "Price Lowest First",
    "Price Highest First",
    "Best Rating",
  ];
  return (
    <div className="px-5">
      {filterIsOpen ? (
        <>
          <FiltersComponent />
          <SortByComponent
            open={sortbyIsOpen}
            onClose={() => setSortbyIsOpen(false)}
          >
            <h2 className="text-[20px] font-medium mb-4 text-center">
              Sort By
            </h2>
            <ul className="flex flex-col gap-6">
              {sortOptions.map((option) => (
                <li
                  onClick={() => {
                    const readyFilter =
                      option == "Price Lowest First"
                        ? {
                            sort_by: "price" as const,
                            sort_order: "asc" as const,
                          }
                        : option == "Price Highest First"
                        ? {
                            sort_by: "price" as const,
                            sort_order: "desc" as const,
                          }
                        : option == "Best Rating"
                        ? {
                            sort_by: "rating" as const,
                            sort_order: "desc" as const,
                          }
                        : { sort_by: undefined, sort_order: undefined };
                    setSortedBy(option as SortByType);
                    setTempFilters((prev) => ({
                      ...prev,
                      sort_by: readyFilter.sort_by,
                      sort_order: readyFilter.sort_order,
                    }));
                  }}
                  className={`text-[16px]  border-b border-b-[rgba(231,231,231,1)] flex justify-between items-center pb-5 last:border-b-0 ${
                    sortedBy == option
                      ? "text-[rgba(12,75,84,1)] font-semibold"
                      : "text-[rgba(31,42,55,1)]"
                  }`}
                  key={option}
                >
                  <span>{option}</span>
                  <span className={`${sortedBy == option ? "flex" : "hidden"}`}>
                    <Check className="w-[18px] h-[18px] text-[rgba(12,75,84,1)]" />
                  </span>
                </li>
              ))}
            </ul>
          </SortByComponent>
        </>
      ) : (
        <div className="w-full relative">
          <div className="sticky top-0 right-0 z-20 bg-white w-full flex flex-col gap-[23px]">
            <ProductsHeader />
            <div className="flex w-full pb-3 overflow-y-auto gap-2.5 justify-between">
              <BrandButton img="/icons/nike.svg" name="Nike" />
              <BrandButton img="/icons/Adidas.svg" name="Adidas" />
              <BrandButton img="/icons/Reebok.svg" name="Reebok" />
              <BrandButton img="/icons/puma-logo 1.svg" name="Puma" />
            </div>
          </div>
          <div className="w-full">
            <ul className="space-y-4 grid py-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {isLoading ? (
                Array.from({ length: 15 }).map((_, i) => (
                  <li key={i}>
                    <SkullLoader />
                  </li>
                ))
              ) : error ? (
                <p className="col-span-full mx-auto flex flex-col justify-center items-center text-center">
                  <Bug /> Error: {(error as Error).message} Please Try Again
                </p>
              ) : (data?.data?.length ?? 0) > 0 ? (
                data!.data!.map((product) => (
                  <li
                    onClick={() => {
                      router.push(`/products/${product.id}`);
                    }}
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </li>
                ))
              ) : (
                <div className="col-span-full mx-auto  text-center text-[rgba(143,149,158,1)]">
                  <FileText className="mx-auto my-auto mb-3" />
                  No Products To Show
                </div>
              )}
            </ul>
          </div>
          <span
            onClick={() => setFilterIsOpen(true)}
            className="w-[46px] h-[46px] fixed bottom-3 right-3 bg-[rgba(12,75,84,1)] rounded-[40px] flex items-center justify-center z-25"
          >
            {/* Red notification badge */}
            {numFiltersApplied > 0 && (
              <span className="absolute -top-2 -left-2 w-5 h-5 bg-red-500 text-white text-[12px] font-bold rounded-full flex items-center justify-center">
                {numFiltersApplied}
              </span>
            )}

            <Image src="icons/filter.svg" width={24} height={24} alt="filter" />
          </span>
        </div>
      )}
    </div>
  );
}
