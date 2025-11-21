import { useAppContext } from "../../context/AppContext";

interface FilterSpanButtonType {
  filter: string;
}

export default function FilterSpanButton({ filter }: FilterSpanButtonType) {
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
  const { tempFilters, selectedPrices } = useAppContext();
  const selected =
    tempFilters.size == modifiedSize ||
    selectedPrices.includes(filter) ||
    tempFilters.min_rating == filter;
  return (
    <button
      className={`p-1 rounded-md  ${
        selected
          ? "bg-[rgba(206,219,221,1)] text-[rgba(12,75,84,1)] "
          : "bg-[rgba(243,243,243,1)] text-[rgba(136,153,168,1)]"
      }`}
    >
      <span className="text-[12px] font-medium">{filter}</span>
    </button>
  );
}
