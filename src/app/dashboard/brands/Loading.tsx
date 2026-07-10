"use client";

import { Skeleton } from "@/components/Skeleton";
import React from "react";

const Loading: React.FC = () => {
  const skeletonCards = Array.from({ length: 4 });

  return (
    <div className="space-y-6 w-full h-full animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {skeletonCards.map((_, index) => (
          <div key={`brand-skeleton-${index}`} className="bg-card border border-background2 rounded-xl overflow-hidden space-y-4 shadow-sm">
            <Skeleton className="w-full h-40 bg-background2 rounded-none" />

            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-2/3 bg-background2" />
                <Skeleton className="h-3 w-1/4 bg-background2" />
              </div>
              <div className="border-t border-background2/60 pt-3 flex justify-end gap-2">
                <Skeleton className="w-10 h-8 rounded-md bg-background2" />
                <Skeleton className="w-10 h-8 rounded-md bg-background2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;