"use client"

import React from "react";
import { DashboardProductDetailsProps } from '@/types/components'
import { Award, Tags, } from "lucide-react";
import Image from "next/image";
import { getImageUrl } from "@/lib/helpers";
import FormatText from "@/components/FormatText";
import { BiDevices } from "react-icons/bi";

const ProductsDetails: React.FC<DashboardProductDetailsProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1 space-y-5">
        <div className="bg-card border border-background2 rounded-xl overflow-hidden shadow-sm">
          <div className="relative w-full h-[350px] bg-background2 flex items-center justify-center p-2">
            {product.imgUrl ? (
              <Image
                unoptimized
                src={getImageUrl(product.imgUrl)}
                alt={product.title}
                fill
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <div className="text-primary/30 flex flex-col items-center gap-2">
                <BiDevices className="w-10 h-10 stroke-[1.2]" />
              </div>
            )}
          </div>
        </div>

        <div className="bg-card border border-background2 p-4 rounded-xl shadow-xs font-sans text-xs text-text/60 space-y-1">
          <div className="flex justify-between">
            <span>معرف المنتج الرقمي:</span>
            <span className="font-mono text-text font-bold">#{product.id}</span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card border border-background2 p-5 rounded-xl shadow-xs flex flex-col justify-between">
            <span className="text-xs font-sans text-text/40 block">سعر مفرق المستهلك النهائي (Retail)</span>
            <span className="font-mono text-2xl font-bold text-text mt-2 block">{product.price} ر.س</span>
          </div>
        </div>

        <div className="bg-card border border-background2 p-6 rounded-xl space-y-4 shadow-sm">
          <div>
            <h2 className="brand font-bold text-xl text-accent">{product.title}</h2>
            <p className="text-sm font-sans text-text/80 mt-2 bg-background p-3 rounded-lg border border-background2/60">
              {product.summarize}
            </p>
          </div>

          {product.description && (
            <div className="space-y-1.5">
              <span className="text-xs font-heading font-bold text-text/50">الوصف التفصيلي الكامل:</span>
              <div className="text-sm font-sans text-text/70 leading-relaxed whitespace-pre-line">
                <FormatText
                  text={product.description}
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-card border border-background2 p-6 rounded-xl space-y-5 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-background2 rounded-lg text-primary mt-0.5">
                <Tags className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-text/40 block font-sans">القسم</span>
                <span className="font-heading font-bold text-text mt-0.5 inline-block">{product.category?.name || "—"}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-background2 rounded-lg text-primary mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs text-text/40 block font-sans">العلامة التجارية</span>
                <span className="font-heading font-bold text-text mt-0.5 inline-block">{product.brand?.name || "—"}</span>
              </div>
            </div>
          </div>

          <hr className="border-background2" />

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-heading font-bold text-text/50 block">خيارات الألوان المتاحة:</span>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const hex = color.name.startsWith("#") ? color.name : `#${color.name}`;
                  return (
                    <div key={`details-color-${color.id}`} >
                      <div className="w-3.5 h-3.5 rounded-full border border-primary/10" style={{ backgroundColor: hex }} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-heading font-bold text-text/50 block">المقاسات المتوفرة بالمستودع:</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <span
                    key={`details-size-${size.id}`}
                    className="px-3 py-1 bg-background border border-background2 text-text font-mono font-bold text-xs uppercase rounded-md shadow-2xs"
                  >
                    {size.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsDetails