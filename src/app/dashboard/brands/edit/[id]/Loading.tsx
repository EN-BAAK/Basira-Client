"use client";

import React from "react";
import { Skeleton } from "@/components/Skeleton";

const BrandEditSkeleton: React.FC = (): React.ReactNode => {
  return (
    <div className="w-full text-right animate-pulse" dir="rtl">
      <div className="mb-8 flex items-center gap-3">
        <Skeleton className="size-12 rounded-2xl bg-primary/10" />
        
        <div className="space-y-2">
          <Skeleton className="h-7 w-44 rounded-md" />
          <Skeleton className="h-4 w-72 rounded-md" />
        </div>
      </div>

      <div className="space-y-8">
        
        <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
          <div className="flex items-center gap-3">
            <Skeleton className="size-5 rounded-md bg-primary/10" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-11 w-full bg-card rounded-lg" />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-background2 p-5 md:p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="size-5 rounded-md bg-accent/10" />
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 bg-primary/10 rounded-md" />
            <Skeleton className="h-32 w-full rounded-xl border border-dashed border-border bg-card" />
          </div>
        </section>

        <div className="flex justify-end">
          <Skeleton className="h-11 w-44 rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default BrandEditSkeleton;