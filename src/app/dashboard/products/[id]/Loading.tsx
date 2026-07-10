"use client";

import { Skeleton } from "@/components/Skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="space-y-6 w-full h-full animate-pulse p-1">
      <div className="flex justify-between items-center border-b border-background2 pb-5">
        <div className="space-y-2 w-1/3">
          <Skeleton className="h-8 w-3/4 bg-background2" />
          <Skeleton className="h-4 w-1/2 bg-background2" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-24 bg-background2 rounded-md" />
          <Skeleton className="h-10 w-24 bg-background2 rounded-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          <Skeleton className="w-full h-80 rounded-xl bg-background2" />
          <div className="bg-card p-4 border border-background2 rounded-xl space-y-2">
            <Skeleton className="h-4 w-1/3 bg-background2" />
            <Skeleton className="h-8 w-full bg-background2" />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6 bg-card border border-background2 p-6 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-16 w-full bg-background2 rounded-lg" />
            <Skeleton className="h-16 w-full bg-background2 rounded-lg" />
          </div>
          <div className="space-y-3 pt-4">
            <Skeleton className="h-4 w-1/4 bg-background2" />
            <Skeleton className="h-20 w-full bg-background2" />
          </div>
          <div className="space-y-3 pt-4">
            <Skeleton className="h-5 w-1/3 bg-background2" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-16 bg-background2 rounded-md" />
              <Skeleton className="h-8 w-16 bg-background2 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}