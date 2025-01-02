import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="px-2 space-y-2 ">
      <Skeleton className="h-40"></Skeleton>
      <div className="max-w-full grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6 ">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full h-[300px] rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
