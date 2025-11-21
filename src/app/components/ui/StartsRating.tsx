import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showNumber?: boolean;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 16,
  showNumber = false,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <div
            key={index}
            className="relative"
            style={{ width: size, height: size }}
          >
            <Star
              size={size}
              className="absolute text-gray-300"
              fill="currentColor"
            />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <Star
                size={size}
                className={`${
                  rating >= 4
                    ? "text-green-800"
                    : rating < 2.5
                    ? "text-red-800"
                    : "text-yellow-500"
                }`}
                fill="currentColor"
              />
            </div>
          </div>
        );
      })}
      {showNumber && (
        <span className="text-[13px] text-gray-600 ml-1">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
