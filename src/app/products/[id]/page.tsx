"use client";

import SkullLoader from "@/app/components/ui/Loading";

import { useAppContext } from "@/app/context/AppContext";
import { useProduct } from "@/app/hooks/useProduct";
import { Bug, FileText, Plus } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import NotFound from "../not-found";
import ReviewComponent, {
  ReviewComponentType,
} from "@/app/components/products/ReviewComponent";

export default function ProductInfo() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;
  const { selectedLang } = useAppContext();
  const { data, isLoading, error } = useProduct(
    Number(id),
    selectedLang == "EN" ? "fr" : "en"
  );
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [expanded, setExpanded] = useState(false);
  const limit = 130;
  const isLong = data?.data?.description.length > limit;
  const displayText = expanded
    ? data?.data?.description
    : data?.data?.description.substring(0, limit);
  if (isLoading) return <SkullLoader />;
  if (!data) {
    return <NotFound />;
  }

  if (error)
    return (
      <p className="col-span-full mx-auto flex flex-col justify-center items-center text-center">
        <Bug /> Error: {(error as Error).message} Please Try Again
      </p>
    );

  return (
    <div className="w-full">
      <div id="header-image">
        <div className="relative w-full h-[387px]">
          <Image
            src={data?.data?.image}
            alt="image"
            fill
            className="object-cover"
          />
        </div>
        <span className="absolute top-[45px] right-[15px] bg-[rgba(254,254,254,1)] rounded-full w-[45px] h-[45px] flex items-center justify-center">
          <Image src={"/icons/Bag.svg"} width={25} height={25} alt="image" />
        </span>
        <span className="absolute top-[45px] left-[15px] bg-[rgba(254,254,254,1)] rounded-full w-[45px] h-[45px] flex items-center justify-center  cursor-pointer">
          <Image
            onClick={() => {
              router.push("/products");
            }}
            src={"/icons/arrow.svg"}
            width={20}
            height={20}
            alt="image"
          />
        </span>
      </div>
      <div className=" py-2.5 px-5 ">
        <div id="info-sec" className="pb-5">
          <section className="flex justify-between text-[rgba(143,149,158,1)] text-[13px] font-normal">
            <span>{data?.data?.brands[0]}</span>
            <span>Price</span>
          </section>
          <section className="flex justify-between text-[rgba(29,30,32,1)]  text-[22px] font-semibold">
            <span>{data?.data?.name}</span>
            <span>${data?.data?.price}</span>
          </section>
        </div>
        <div className="flex justify-between gap-1  h-[77px] mb-5 ">
          <span className="">
            <Image
              className="rounded-[15px] h-full"
              src={data?.data?.image}
              width={90}
              height={77}
              alt="image"
            />
          </span>
          <span className="w-[90px] h-[77px] rounded-[15px]">
            <Image
              className="rounded-[15px] h-full"
              src={data?.data?.image}
              width={90}
              height={77}
              alt="image"
            />
          </span>
          <span className="w-[90px] h-[77px] rounded-[15px]">
            <Image
              className="rounded-[15px] h-full"
              src={data?.data?.image}
              width={90}
              height={77}
              alt="image"
            />
          </span>
          <span className="w-[90px] h-[77px] rounded-[15px]">
            <Image
              className="rounded-[15px] h-full"
              src={data?.data?.image}
              width={90}
              height={77}
              alt="image"
            />
          </span>
        </div>
        <div id="size" className="flex flex-col gap-2 pb-5">
          <section className="flex justify-between">
            <span className="text-[17px] font-semibold ">Size</span>
            <span className="text-[15px] text-[rgba(143,149,158,1)] ">
              Size Guide
            </span>
          </section>
          <section className="flex gap-2.5 items-center justify-center">
            <span
              onClick={() => setSelectedSize("S")}
              className={`w-[69px] h-[60px] rounded-[10px] p-2.5 flex items-center transition duration-300 ${
                selectedSize == "S"
                  ? "bg-[rgba(12,75,84,1)] text-white"
                  : "bg-[rgba(245,246,250,1)]"
              }`}
            >
              <span className="w-full text-center text-[17px] font-semibold">
                S
              </span>
            </span>
            <span
              onClick={() => setSelectedSize("M")}
              className={`w-[69px] h-[60px] rounded-[10px] p-2.5 flex items-center transition duration-300 ${
                selectedSize == "M"
                  ? "bg-[rgba(12,75,84,1)] text-white"
                  : "bg-[rgba(245,246,250,1)]"
              }`}
            >
              <span className="w-full text-center text-[17px] font-semibold">
                M
              </span>
            </span>
            <span
              onClick={() => setSelectedSize("L")}
              className={`w-[69px] h-[60px] rounded-[10px] p-2.5  flex  items-center transition duration-300 ${
                selectedSize == "L"
                  ? "bg-[rgba(12,75,84,1)] text-white"
                  : "bg-[rgba(245,246,250,1)]"
              }`}
            >
              <span className="w-full text-center text-[17px] font-semibold">
                L
              </span>
            </span>
            <span
              onClick={() => setSelectedSize("XL")}
              className={`w-[69px] h-[60px] rounded-[10px] p-2.5  flex items-center transition duration-300 ${
                selectedSize == "XL"
                  ? "bg-[rgba(12,75,84,1)] text-white"
                  : "bg-[rgba(245,246,250,1)]"
              }`}
            >
              <span className="w-full text-center text-[17px] font-semibold">
                XL
              </span>
            </span>
            <span
              onClick={() => setSelectedSize("2XL")}
              className={`w-[69px] h-[60px] rounded-[10px] p-2.5  flex items-center transition duration-300 ${
                selectedSize == "2XL"
                  ? "bg-[rgba(12,75,84,1)] text-white"
                  : "bg-[rgba(245,246,250,1)]"
              }`}
            >
              <span className="w-full text-center text-[17px] font-semibold">
                2XL
              </span>
            </span>
          </section>
        </div>
        <div id="description" className="pb-5">
          <h1 className="text-[17px] font-semibold">Description</h1>
          <p className="text-[15px] text-[rgba(143,149,158,1)]">
            {displayText}
            {isLong && !expanded && "… "}
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="text-[rgba(143,149,158,1)] text-sm font-medium hover:underline ml-1"
              >
                {expanded ? "See Less" : "See More"}
              </button>
            )}
          </p>
        </div>
        <div id="reviews" className="flex flex-col gap-3">
          <section className="flex justify-between">
            <h1 className="text-[17px] font-semibold">Reviews</h1>
            <span className="text-[13px] text-[rgba(143,149,158,1)]">
              View All
            </span>
          </section>
          <section>
            <ul className="flex flex-col gap-[15px]">
              {data?.data?.reviews.length > 0 ? (
                data?.data?.reviews
                  ?.slice(0, 3)
                  ?.map((review: ReviewComponentType) => (
                    <li key={review.reviewer}>
                      <ReviewComponent
                        reviewer={review.reviewer}
                        rating={review.rating}
                        comment={review.comment}
                        created_at={review.created_at}
                      />
                    </li>
                  ))
              ) : (
                <div className="mx-auto text-center text-[rgba(143,149,158,1)]">
                  <FileText className="mx-auto mb-3" />
                  No Reviews To Show
                </div>
              )}
            </ul>
          </section>
        </div>
        <div
          id="total-price"
          className="flex justify-between w-full pt-5 pb-[70px]"
        >
          <section>
            <h1 className="text-[15px] font-semibold">Total Price</h1>
            <h1 className="text-[11px] text-[rgba(143,149,158,1)]">
              with VAT, SD
            </h1>
          </section>
          <span className="text-[17px] font-semibold">
            ${Number(data?.data?.price) + 5}
          </span>
        </div>
        <button className=" fixed bottom-3 text-center w-[90%] h-[58px] bg-[rgba(12,75,84,1)] rounded-xl py-4 text-[20px] font-medium text-white flex gap-3 justify-center items-center">
          <Plus className="inline" /> Add to Cart
        </button>
      </div>
    </div>
  );
}
