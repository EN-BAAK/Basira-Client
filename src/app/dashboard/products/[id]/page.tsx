"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Pen, Trash2, Eye, Loader2 } from "lucide-react";
import CustomButton from "@/libraries/forms/components/Button";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import ProductsDetails from "./ProductsDetails";
import { useDeleteProductByIdSettings, useGetProductByIdSettings } from "@/features/useProducts";
import ProductVariants from "./ProductVariants";
import { ProductEntity } from "@/types/models";
import Contents from "../../Contents";
import LoadingProductDetails from "./LoadingProduct";

const ProductDetailsPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { showWarning } = useAppContext();

  const productId = params.id as string;

  const { mutate: deleteProduct, isPending: isDeletePending } = useDeleteProductByIdSettings();
  const { data, isFetching, isError, refetch } = useGetProductByIdSettings(productId);
  const product: ProductEntity | undefined = data?.data;

  const goToEdit = () => router.push(`/dashboard/products/edit/${productId}`);

  const executeDelete = () => {
    showWarning({
      message: `هل أنت متأكد من حذف المنتج  نهائياً من المخازن؟ لا يمكن التراجع عن هذا الإجراء.`,
      btn1: "إغلاق",
      btn2: "حذف نهائي",
      handleBtn2: () => deleteProduct(productId)
    });
  };

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-background2 pb-5">
        <div className="flex items-center gap-2">
          <div>
            <h1 className="font-heading text-2xl font-bold text-text flex items-center gap-2">
              <Eye className="w-6 h-6 text-accent" />
              تفاصيل المنتج
            </h1>
            <p className="text-sm text-text/70 mt-1 font-sans">
              استعراض شامل لبياناتنا وتسعير المفرق بالمخازن.
            </p>
          </div>
        </div>

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
      </div>

      <Contents
        Skeletons={<LoadingProductDetails />}
        isEmpty={!product}
        emptyTitle="المنتج غير موجود"
        emptyDesc="تعذر العثور على بيانات هذا المنتج، ربما تم حذفه أو أن الرابط غير صحيح."
        isError={isError}
        errorTitle="خطأ في جلب بيانات المنتج"
        errorDesc="حدثت مشكلة أثناء الاتصال بالخادم، يرجى المحاولة لاحقاً."
        errorActionTitle="إعادة تحميل"
        errorAction={refetch}
        isLoading={isFetching}
      >
        <ProductsDetails product={product!} />
        <ProductVariants colors={product?.colors || []} sizes={product?.sizes || []} productId={productId} />
      </Contents>
    </div>
  );
}

export default ProductDetailsPage