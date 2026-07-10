"use client";

import React from "react";
import { Skeleton } from "@/components/Skeleton";

const Loading: React.FC = ():React.ReactNode => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="space-y-6 w-full h-full ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {skeletonCards.map((_, index) => (
          <div key={`category-skeleton-${index}`} className="bg-card border border-background2 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-2/3" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
            <div className="border-t border-background2/60 pt-3 flex justify-end gap-2">
              <Skeleton className="w-10 h-8 rounded-md" />
              <Skeleton className="w-10 h-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading