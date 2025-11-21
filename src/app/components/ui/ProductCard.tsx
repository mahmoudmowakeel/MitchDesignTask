import Image from "next/image";

import { Heart } from "lucide-react";
import { Product } from "@/app/lib/types/main";
import StarRating from "./StartsRating";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image || "/images/place-holder.png";
  return (
    <div className="w-full h-fit flex flex-col gap-2">
      <div className="relative flex items-center">
        <div className="bg-white p-1.5 rounded-md absolute top-[17.16px] right-2 z-10">
          <Heart
            size={16}
            className=" text-gray-300 hover:text-red-600 transition-all duration-200"
            fill="currentColor"
          />
        </div>
        <div className="relative w-full  aspect-183/233">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="rounded-[15px] object-cover"
          />
        </div>
      </div>
      <h3 className="text-[11px] leading-[140%] w-[70%] font-medium">
        {product.name}
      </h3>
      <div className="flex justify-between items-center">
        <span className="text-[16px] font-semibold">${product.price}</span>
        <span className="text-[13px] font-semibold flex gap-2 ">
          <StarRating
            rating={product.average_rating}
            size={7}
            showNumber={true}
          />
        </span>
      </div>
    </div>
  );
}
