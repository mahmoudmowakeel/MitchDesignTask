import Image from "next/image";
import { useAppContext } from "../../context/AppContext";

export default function BrandButton({
  img,
  name,
}: {
  img: string;
  name: string;
}) {
  const { selectedBrands, setSelectedBrands, setSelectedFilters } =
    useAppContext();
  const isSelected = selectedBrands.includes(name);

  return (
    <div
      onClick={() => {
        setSelectedBrands(() => [name]);
        setSelectedFilters((prev) => {
          return {
            ...prev,
            brand: name,
          };
        });
      }}
      className={`flex py-1 px-2 items-center gap-6  bg-[rgba(245,246,250,1)] rounded-[10px] ${
        isSelected
          ? "border border-[rgba(12,75,84,1)]"
          : "border-2 border-transparent"
      } transition-all duration-200 ease-in-out`}
    >
      <div className="flex items-center gap-[5px]">
        <span className="min-w-10 min-h-10 flex items-center justify-center bg-[rgba(254,254,254,1)] rounded-[10px] py-3 px-1.5">
          <Image src={`${img}`} width={26} height={13.52} alt={name} />
        </span>
        <p className="text-[15px] font-medium">{name}</p>
      </div>
      <button
        className={`${
          !isSelected ? "hidden" : "flex"
        } cursor-pointer w-2.5 h-2.5 transition-all duration-200 ease-in-out`}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedBrands((prev) => [...prev].filter((el) => el !== name));
          setSelectedFilters((prev) => ({
            ...prev,
            brand: "",
          }));
        }}
      >
        <Image src="/icons/close.svg" width={10} height={10} alt={"close"} />
      </button>
    </div>
  );
}
