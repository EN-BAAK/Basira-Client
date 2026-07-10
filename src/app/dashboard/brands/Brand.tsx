"use client";

import React from "react";
import { Trash2, Loader2, Pen, Shirt } from "lucide-react";
import Button from "@/libraries/forms/components/Button";
import Image from "next/image";
import { DashboardBrandCardProps } from "@/types/components";
import { getImageUrl } from "@/lib/helpers";

const Brand: React.FC<DashboardBrandCardProps> = ({ brand, onDelete, isDeleting, onEdit }) => {
  return (
    <div className="bg-card border border-background2 rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 group animate-fade-in animate-duration-200">
      <div className="relative w-full h-40 bg-background2 flex items-center justify-center p-6 border-b border-background2 overflow-hidden">
        {brand.imgUrl ? (
          <Image
            fill
            unoptimized
            src={getImageUrl(brand.imgUrl)}
            alt={brand.name}
            className="max-w-full max-h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="text-primary/30 flex flex-col items-center gap-2">
            <Shirt className="w-10 h-10 stroke-[1.2]" />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
        <div>
          <h3 className="font-heading font-bold text-text text-base group-hover:text-accent transition-colors">
            {brand.name}
          </h3>
        </div>

        <div className="border-t border-background2/60 pt-3 flex items-center justify-end gap-2">
          <Button
            className="w-fit rounded-md"
            variant="danger-outline"
            icon={isDeleting ? Loader2 : Trash2}
            iconClassName={isDeleting ? "w-4 h-4 animate-spin" : "w-4 h-4"}
            disabled={isDeleting}
            onClick={onDelete}
          />

          <Button
            className="w-fit rounded-md"
            variant="warning-outline"
            icon={Pen}
            iconClassName="w-4 h-4"
            disabled={isDeleting}
            onClick={onEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default Brand;