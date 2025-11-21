"use client";

export default function SkullLoader() {
  return (
    <div className="w-full h-fit flex flex-col gap-2 animate-pulse">
      <div className="relative w-full aspect-[183/233] bg-gray-200 rounded-[15px]"></div>

      <div className="h-3 w-[70%] bg-gray-200 rounded-md"></div>

      <div className="flex justify-between items-center w-full mt-1">
        <div className="h-4 w-12 bg-gray-200 rounded-md"></div>

        <div className="flex items-center gap-2">
          <div className="h-3 w-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}
