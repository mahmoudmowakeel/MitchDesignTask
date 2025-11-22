import FilterSpanButton from "./FilterSpanButton";
import { ChevronRight } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useState } from "react";

interface CollapseComponentType {
  title: string;
  filters: string[];
}

export default function CollapseFilterComponent({
  title,
  filters,
}: CollapseComponentType) {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const {
    setSelectedFilters,
    tempFilters,
    setTempFilters,
    setFilterIsOpen,
    selectedPrices,
    setSelectedPrices,
    setSortedBy,
    setNumFiltersApplied,
  } = useAppContext();
  const priceRanges = {
    "Under $50": { min: 0, max: 50 },
    "$50 - $100": { min: 50, max: 100 },
    "$100 - $200": { min: 100, max: 200 },
    "$200 - $500": { min: 200, max: 500 },
    "$500+": { min: 500, max: undefined },
  };
  return (
    <div className="border border-[rgba(243,243,243,1)] flex flex-col gap-[18px] w-full rounded-[10px] py-5 px-3.5 md:py-2.5 md:px-[7px]">
      <div className="flex justify-between">
        <h1 className="text-[18px] font-semibold">{title}</h1>
        <span
          className="text-2xl mr-4 cursor-pointer"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          {collapsed ? "+" : "-"}
        </span>
      </div>
      {collapsed ? (
        ""
      ) : (
        <div>
          <ul className="flex w-full gap-2">
            {}
            {filters.map((filter) => (
              <li
                onClick={() => {
                  setTempFilters((prev) => {
                    const t = title.toLowerCase();
                    if (t == "price") {
                      const isSelected = selectedPrices.includes(filter);

                      const updated = isSelected
                        ? selectedPrices.filter((p) => p !== filter)
                        : [...selectedPrices, filter];

                      setSelectedPrices(updated);
                      if (updated.length === 0) {
                        return {
                          ...prev,
                          min_price: undefined,
                          max_price: undefined,
                        };
                      }
                      const mins: number[] = [];
                      const maxs: number[] = [];

                      updated.forEach((priceLabel) => {
                        const { min, max } =
                          priceRanges[priceLabel as keyof typeof priceRanges];

                        if (min !== undefined) mins.push(min);
                        if (max !== undefined) maxs.push(max);
                      });

                      const globalMin = mins.length ? Math.min(...mins) : 0;
                      const globalMax = maxs.length
                        ? Math.max(...maxs)
                        : undefined;

                      return {
                        ...prev,
                        min_price: globalMin,
                        max_price: globalMax,
                      };
                    }

                    if (t === "size") {
                      const modifiedSize =
                        filter == "X Small"
                          ? "XS"
                          : filter == "Small"
                          ? "S"
                          : filter == "Medium"
                          ? "M"
                          : filter == "Large"
                          ? "L"
                          : filter == "X Large"
                          ? "XL"
                          : "";
                      return {
                        ...prev,
                        size: prev.size == modifiedSize ? "" : modifiedSize,
                      };
                    }

                    if (t === "rating") {
                      return {
                        ...prev,
                        min_rating: filter,
                      };
                    }

                    return prev;
                  });
                }}
                key={filter}
              >
                <FilterSpanButton filter={filter} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="fixed bottom-3 right-0  px-5 flex  justify-between items-center w-full gap-3">
        <button
          onClick={() => {
            setTempFilters({});
            setSelectedPrices([]);
            setSortedBy("Most Recommended");
          }}
          className="w-full"
        >
          Clear All
        </button>
        <button
          onClick={() => {
            setSelectedFilters(tempFilters);
            setFilterIsOpen(false);
            const appliedFilters = (() => {
              let priceCounted = false;
              return Object.entries(tempFilters).filter(([key, value]) => {
                if (value === "" || value === undefined) return false;
                if (key === "min_price" || key === "max_price") {
                  if (priceCounted) return false;
                  priceCounted = true;
                  return true;
                }
                return true;
              }).length;
            })();

            setNumFiltersApplied(appliedFilters);
          }}
          className="w-full py-4 pr-[22px] pl-[42px] h-[58px] rounded-xl bg-[rgba(12,75,84,1)] text-[20px] font-medium text-white"
        >
          Apply
          <ChevronRight className="inline" />
        </button>
      </div>
    </div>
  );
}
