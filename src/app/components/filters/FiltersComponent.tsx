import Image from "next/image";
import { useAppContext } from "../../context/AppContext";
import { ChevronRight } from "lucide-react";
import CollapseFilterComponent from "./CollapseFilterComponent";

export default function FiltersComponent() {
  const { setFilterIsOpen, setSortbyIsOpen, sortedBy } = useAppContext();
  const priceFilters = [
    "Under $50",
    "$50 - $100",
    "$100 - $200",
    "$200 - $500",
    "$500+",
  ];
  const sizeFilters = ["X Small", "Small", "Medium", "Large", "X Large"];
  const ratingFilters = ["2", "3", "4", "All Ratings"];
  return (
    <>
      <div className="pt-10 pb-5">
        <div className="flex justify-between w-full pb-5">
          <h1 className="text-[rgba(136,153,168,1)] leading-[130%] text-[16px] font-medium">
            Sort and Filter
          </h1>
          <button
            onClick={() => {
              setFilterIsOpen(false);
            }}
          >
            <Image
              src="/icons/close.svg"
              width={14}
              height={14}
              alt={"close"}
            />
          </button>
        </div>
        <div className="flex justify-between border border-[rgba(243,243,243,1)] py-5 px-3.5 rounded-[10px]">
          <h1 className="text-[18px] font-semibold">Sort By</h1>
          <span
            className="text-[rgba(12,75,84,1)] cursor-pointer text-[16px] font-medium"
            onClick={() => setSortbyIsOpen(true)}
          >
            {sortedBy}
            <ChevronRight className="inline" />
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <CollapseFilterComponent title="Price" filters={priceFilters} />
        <CollapseFilterComponent title="Size" filters={sizeFilters} />
        <CollapseFilterComponent title="Rating" filters={ratingFilters} />
      </div>
    </>
  );
}
