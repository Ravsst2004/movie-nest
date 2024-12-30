import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="max-w-full px-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-6 ">
      {Array.from({ length: 20 }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full h-[300px] rounded-lg"
        />
      ))}
    </div>
  );
};

export default Loading;
