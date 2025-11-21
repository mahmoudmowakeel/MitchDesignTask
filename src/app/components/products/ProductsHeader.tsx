import Image from "next/image";
import { useAppContext } from "../../context/AppContext";

export default function ProductsHeader() {
  const { selectedLang, setSelectedLang } = useAppContext();
  return (
    <div className="w-full h-[89px] border-b border-[rgba(226,226,226,1)]  flex justify-between items-center">
      <span>
        <Image
          src="icons/arrow.svg"
          width={19.678125381469727}
          height={17.465625762939453}
          alt="arrow"
        />
      </span>
      <h5 className="text-[rgba(136,153,168,1)] text-[16px] font-medium">
        Men&apos;s Wear
      </h5>
      <span className="flex justify-between gap-5">
        <h4
          className="cursor-pointer"
          onClick={() =>
            setSelectedLang((prev) => (prev == "EN" ? "FR" : "EN"))
          }
        >
          {selectedLang}
        </h4>
        <Image
          src="icons/cart.svg"
          width={19.678125381469727}
          height={17.465625762939453}
          alt="cart"
        />
      </span>
    </div>
  );
}
