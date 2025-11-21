import { CircleUserRound, Clock } from "lucide-react";
import { useState } from "react";
import StarRating from "../ui/StartsRating";

export interface ReviewComponentType {
  reviewer: string;
  created_at: string;
  rating: string;
  comment: string;
}

export default function ReviewComponent({
  reviewer,
  created_at,
  rating,
  comment,
}: ReviewComponentType) {
  const [expanded, setExpanded] = useState(false);
  const limit = 70;
  const isLong = comment.length > limit;
  const displayText = expanded ? comment : comment.substring(0, limit);
  function formatDate(isoString: string) {
    const date = new Date(isoString);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  }
  return (
    <div>
      <section className="flex justify-between items-center">
        <div className="flex items-center justify-center gap-2">
          <section>
            <CircleUserRound className="w-10 h-10" />
          </section>
          <section className="flex flex-col gap-1">
            <h1 className="text-[15px] font-medium">{reviewer}</h1>
            <p className="text-[rgba(143,149,158,1)] text-[11px]">
              <Clock className="inline w-[15px] h-[15px]" />{" "}
              {formatDate(created_at)}
            </p>
          </section>
        </div>
        <span className="flex flex-col gap-1">
          <h1 className="text-[11px] text-[rgba(143,149,158,1)] text-right font-medium">
            <span className="text-[15px] text-black ">{rating}</span> rating
          </h1>
          <StarRating size={9} rating={Number(rating)} />
        </span>
      </section>
      <p className="text-[rgba(143,149,158,1)] pt-2 font-normal text-[15px]">
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
  );
}
