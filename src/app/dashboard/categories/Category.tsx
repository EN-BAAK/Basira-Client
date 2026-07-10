"use client";

import React from "react";
import { Trash2, Loader2, Pen, Folder } from "lucide-react";
import Button from "@/libraries/forms/components/Button";
import { DashboardCategoryCardProps } from "@/types/components";
import { getImageUrl } from "@/lib/helpers";
import Image from "next/image";

const Category: React.FC<DashboardCategoryCardProps> = ({ category, onDelete, isDeleting, onEdit }) => {
  const categoryImage = category.imgUrl ? getImageUrl(category.imgUrl) : null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between gap-4 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 group animate-fade-in animate-duration-200 relative z-1 overflow-hidden text-right">

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-background2 border border-border flex items-center justify-center shrink-0 overflow-hidden relative group-hover:border-accent/40 transition-colors duration-300">
          {categoryImage ? (
            <Image
              src={categoryImage}
              alt={category.name}
              fill
              unoptimized
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="48px"
            />
          ) : (
            <Folder className="w-5 h-5 stroke-[1.5] text-primary" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-text text-lg truncate mb-1">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px] leading-relaxed">
            {category.description || "لا يوجد وصف متوفر لهذه الفئة حالياً."}
          </p>
        </div>
      </div>

      <div className="border-t border-border/60 my-0.5" />

      <div className="flex items-center justify-end gap-2">
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
  );
};

export default Category;