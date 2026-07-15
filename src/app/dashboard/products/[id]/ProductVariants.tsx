"use client";

import React, { useState } from "react";
import { Plus, Sliders, Layers3 } from "lucide-react";
import CustomButton from "@/libraries/forms/components/Button";
import { VariantRow } from "./VariantRow";
import { ProductVariantEntity } from "@/types/models";
import { DashboardProductVariantsProps } from "@/types/components";
import { useDeleteProductVariantByIdSettings, useGetAllProductVariantsSettings, useUpdateProductVariantQuantitySettings } from "@/features/useVariatns";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { ID } from "@/types/global";
import { VariantModal } from "./VariantModal";

export const ProductVariants: React.FC<DashboardProductVariantsProps> = ({ productId, colors, sizes }) => {
  const { showWarning } = useAppContext()

  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

  const { mutateAsync: updateMutate, isPending: isUpdatePending } = useUpdateProductVariantQuantitySettings()
  const { mutateAsync: deleteMutate, isPending: isDeletePending } = useDeleteProductVariantByIdSettings()
  const isPending = isUpdatePending || isDeletePending

  const { data: variantData, isFetching: isFetchingVariants, isError: isVariantError, refetch: refetchVariants } = useGetAllProductVariantsSettings(productId);
  const variants: ProductVariantEntity[] = variantData?.data || [];

  const handleDeleteVariant = (id: ID) => {
    executeDelete(id)
  };

  const handleEditVariant = (id: ID, quantity: number) => {
    updateMutate({ id, data: quantity })
  }

  const executeDelete = (id: ID) => {
    showWarning({
      message: `هل أنت متأكد من حذف المنتج  نهائياً من المخازن؟ لا يمكن التراجع عن هذا الإجراء.`,
      btn1: "إغلاق",
      btn2: "حذف نهائي",
      handleBtn2: () => deleteMutate(id)
    });
  };

  const closeModal = () => setIsModalOpened(false)
  const openModal = () => setIsModalOpened(true)

  if (isFetchingVariants) {
    return (
      <div className="bg-card border border-border p-6 rounded-xl flex items-center justify-center min-h-[150px]">
        <div className="text-sm text-muted animate-pulse">جاري تحميل متغيرات المنتج المخزنية...</div>
      </div>
    );
  }

  return (
    <div className="bg-card mt-5 border border-border rounded-xl shadow-sm overflow-hidden text-right">
      <div className="p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-text text-base">متغيرات المخزون المتوفرة</h3>
            <p className="text-xs text-muted mt-0.5">إدارة تفاصيل تداخل المقاسات والألوان مع الكميات الفعلية.</p>
          </div>
        </div>

        <CustomButton
          label="إضافة متغير جديد"
          icon={Plus}
          className="w-fit text-xs px-3 py-2 bg-primary text-white hover:bg-primary/90 rounded-xl font-medium shadow-2xs"
          iconClassName="w-3.5 h-3.5"
          onClick={openModal}
        />
      </div>

      {isVariantError || variants.length === 0 ? (
        <div className="p-8 flex flex-col items-center justify-center text-center gap-3 bg-background/20">
          <Layers3 className="w-10 h-10 text-muted stroke-[1.2]" />
          <div>
            <p className="text-sm font-semibold text-text">لا توجد متغيرات مخزنية بعد</p>
            <p className="text-xs text-muted mt-0.5">لم يتم تخصيص خيارات ألوان أو مقاسات محددة لهذا المنتج.</p>
          </div>
          {isVariantError && (
            <button onClick={() => refetchVariants()} className="text-xs text-primary underline mt-1">
              إعادة المحاولة
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-background2/60 border-b border-border text-muted text-xs font-semibold">
                <th className="px-6 py-3 text-center w-16">#</th>
                <th className="px-6 py-3">اللون</th>
                <th className="px-6 py-3">المقاس</th>
                <th className="px-6 py-3">الكمية بالمستودع</th>
                <th className="px-6 py-3 text-center w-28">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <VariantRow
                  key={`variant-${variant.id}`}
                  isPending={isPending}
                  variant={variant}
                  onDelete={handleDeleteVariant}
                  onEdit={handleEditVariant}
                  colorName={variant.color?.name.toString()}
                  sizeName={variant.size?.name.toString()}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      <VariantModal
        colors={colors}
        sizes={sizes}
        isOpen={isModalOpened}
        onClose={closeModal}
        productId={productId}
        variants={variants}
      />
    </div>
  );
};

export default ProductVariants;