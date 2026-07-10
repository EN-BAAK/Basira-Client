"use client";

import React from "react";
import { Trash2, Loader2, Pen, Award, Eye } from "lucide-react";
import CustomButton from "@/libraries/forms/components/Button";
import { DashboardProductCardProps } from "@/types/components";
import Image from "next/image";
import { getImageUrl } from "@/lib/helpers";
import { BiDevices } from "react-icons/bi";

const Product: React.FC<DashboardProductCardProps> = ({ product, onDelete, isDeleting, onEdit, onView }) => {
  return (
    <div className="bg-card border border-background2 rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300 group animate-fade-in animate-duration-200">

      <div className="relative w-full h-52 bg-background2 flex items-center justify-center overflow-hidden border-b border-background2">
        {product.imgUrl ? (
          <Image
            unoptimized
            fill
            src={getImageUrl(product.imgUrl)}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="text-primary/30 flex flex-col items-center gap-2">
            <BiDevices className="w-10 h-10 stroke-[1.2]" />
          </div>
        )}

        <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-xs text-reversed text-[10px] px-2 py-0.5 rounded-sm font-sans">
          {product.category?.name}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1 justify-between">
        <div className="space-y-2">
          <div>
            <h3 className="font-heading font-bold text-text text-base line-clamp-1 group-hover:text-accent transition-colors">
              {product.title}
            </h3>
            <p className="text-xs text-text/60 font-sans line-clamp-2 mt-0.5">
              {product.summarize}
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs text-text/50 font-sans">
            {product.brand?.imgUrl ? (
              <Image
                unoptimized
                width={20}
                height={20}
                src={getImageUrl(product.brand.imgUrl)}
                alt={product.title}
                className="w-8 h-6 object-contain group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            ) : (
              <Award className="w-3.5 h-3.5 text-accent" />
            )}
            <span className="text-brand">{product.brand?.name || "بدون علامة"}</span>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 py-1">
              {product.colors.map((color) => {
                const hex = color.name.startsWith("#") ? color.name : `#${color.name}`;
                return (
                  <div
                    key={`prod-color-${color.id}`}
                    className="w-3.5 h-3.5 rounded-full border border-primary/10 shadow-xs"
                    style={{ backgroundColor: hex }}
                    title={hex}
                  />
                );
              })}
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <span key={`prod-size-${size.id}`} className="text-[10px] bg-background2 text-text/70 px-1.5 py-0.5 rounded-xs font-mono uppercase">
                  {size.name}
                </span>
              ))}
            </div>
          )}

          <p className="font-bold">{product.price}</p>
        </div>

        <div className="border-t border-background2/60 pt-3 flex items-center justify-end gap-2">
          <CustomButton
            className="w-fit rounded-md"
            variant="danger-outline"
            icon={isDeleting ? Loader2 : Trash2}
            iconClassName={isDeleting ? "w-4 h-4 animate-spin" : "w-4 h-4"}
            disabled={isDeleting}
            onClick={onDelete}
          />

          <CustomButton
            className="w-fit rounded-md"
            variant="warning-outline"
            icon={Pen}
            iconClassName="w-4 h-4"
            disabled={isDeleting}
            onClick={onEdit}
          />

          <CustomButton
            className="w-fit rounded-md"
            variant="info-outline"
            icon={Eye}
            iconClassName="w-4 h-4"
            disabled={isDeleting}
            onClick={onView}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;