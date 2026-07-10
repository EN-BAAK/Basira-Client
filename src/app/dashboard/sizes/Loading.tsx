"use client";

import React from "react";
import { Skeleton } from "@/components/Skeleton";

const SizesSkeleton: React.FC = (): React.ReactNode => {
  const skeletonRows = Array.from({ length: 5 });

  return (
    <div className="bg-card rounded-xl border border-background2 overflow-hidden shadow-sm w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-right">
          <tbody className="divide-y divide-background2">
            {skeletonRows.map((_, index) => (
              <tr key={`size-skeleton-row-${index}`} className="animate-pulse">
                {/* اسم المقاس (مثل XL, SM) */}
                <td className="p-4">
                  <Skeleton className="h-5 w-16 rounded-md" />
                </td>
                {/* أزرار الإجراءات */}
                <td className="p-4 text-left pl-6">
                  <div className="flex justify-end items-center gap-3">
                    <Skeleton className="w-10 h-8 rounded-sm" />
                    <Skeleton className="w-10 h-8 rounded-sm" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SizesSkeleton;