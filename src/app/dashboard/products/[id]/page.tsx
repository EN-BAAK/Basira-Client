"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Pen, Trash2, Award, Tags, Eye, Loader2, Shirt } from "lucide-react";
import { useGetProductByIdSettings, useDeleteProductByIdSettings } from "@/features/useProducts";
import { ProductEntity } from "@/types/models";
import Loading from "./Loading";
import CustomButton from "@/libraries/forms/components/Button";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import Content from "../../Contetns";
import Image from "next/image";
import { getImageUrl } from "@/lib/helpers";
import FormatText from "@/components/FormatText";

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { showWarning } = useAppContext();

  const productId = params.id as string;

  const { data, isFetching, isError, refetch } = useGetProductByIdSettings(productId);
  const { mutate: deleteProduct, isPending: isDeletePending } = useDeleteProductByIdSettings();

  const product: ProductEntity | undefined = data?.data;

  const goToEdit = () => router.push(`/dashboard/products/edit/${productId}`);
  const goBack = () => router.push("/dashboard/products");

  const executeDelete = () => {
    if (!product) return;
    showWarning({
      message: `هل أنت متأكد من حذف المنتج "${product.title}" نهائياً من المخازن؟ لا يمكن التراجع عن هذا الإجراء.`,
      btn1: "إغلاق",
      btn2: "حذف نهائي",
      handleBtn2: () => {
        deleteProduct(product.id, {
          onSuccess: () => {
            router.replace("/dashboard/products");
          }
        });
      },
    });
  };

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-background2 pb-5">
        <div className="flex items-center gap-2">
          <button
            onClick={goBack}
            className="p-2 hover:bg-background2 rounded-lg transition-colors text-text/60 hover:text-text cursor-pointer"
            title="العودة للمنتجات"
          >
            <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
          </button>
          <div>
            <h1 className="font-heading text-2xl font-bold text-text flex items-center gap-2">
              <Eye className="w-6 h-6 text-accent" />
              تفاصيل قطعة الأزياء
            </h1>
            <p className="text-sm text-text/70 mt-1 font-sans">
              استعراض شامل لبيانات وخامات الملابس وتسعير الجملة والمفرق بالمخازن.
            </p>
          </div>
        </div>

        {product && (
          <div className="flex items-center gap-3">
            <CustomButton
              label="تعديل المنتج"
              icon={Pen}
              className="w-fit rounded-md"
              variant="warning-outline"
              iconClassName="w-4 h-4"
              onClick={goToEdit}
              disabled={isDeletePending}
            />
            <CustomButton
              label="حذف القطعة"
              icon={isDeletePending ? Loader2 : Trash2}
              className="w-fit rounded-md"
              variant="danger"
              iconClassName={isDeletePending ? "w-4 h-4 animate-spin" : "w-4 h-4"}
              onClick={executeDelete}
              disabled={isDeletePending}
            />
          </div>
        )}
      </div>

      <Content
        Skeletons={<Loading />}
        isEmpty={!product}
        emptyTitle="المنتج غير موجود"
        emptyDesc="تعذر العثور على بيانات هذا المنتج، ربما تم حذفه أو أن الرابط غير صحيح."
        isError={isError}
        errorTitle="خطأ في جلب بيانات المنتج"
        errorDesc="حدثت مشكلة أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً."
        errorActionTitle="إعادة تحميل"
        errorAction={refetch}
        isLoading={isFetching && !product}
      >
        {product && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            <div className="lg:col-span-1 space-y-5">
              <div className="bg-card border border-background2 rounded-xl overflow-hidden shadow-sm">
                <div className="relative w-full h-80 bg-background2 flex items-center justify-center p-2">
                  {product.imgUrl ? (
                    <Image
                      unoptimized
                      src={getImageUrl(product.imgUrl)}
                      alt={product.title}
                      fill
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="text-primary/30 flex flex-col items-center gap-2">
                      <Shirt className="w-10 h-10 stroke-[1.2]" />
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
                  <span className="font-mono text-2xl font-bold text-text mt-2 block">{product.retailPrice} ر.س</span>
                </div>
                <div className="bg-accent/5 border border-accent/20 p-5 rounded-xl shadow-xs flex flex-col justify-between">
                  <span className="text-xs font-sans text-accent block">سعر تجار الجملة المعتمد (Wholesale)</span>
                  <span className="font-mono text-2xl font-bold text-accent mt-2 block">{product.wholesalePrice} ر.س</span>
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
                      <span className="text-xs text-text/40 block font-sans">قسم الملابس الرئيسي</span>
                      <span className="font-heading font-bold text-text mt-0.5 inline-block">{product.category?.name || "—"}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-background2 rounded-lg text-primary mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs text-text/40 block font-sans">دار الأزياء / العلامة التجارية</span>
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
        )}
      </Content>
    </div>
  );
}