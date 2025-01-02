import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="px-2 space-y-2 ">
      <Skeleton className="h-96"></Skeleton>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8 gap-6 ">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton
            key={i}
            className="w-full h-[200px] rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
