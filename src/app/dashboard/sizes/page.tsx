"use client";

import React from "react";
import { Plus, Ruler } from "lucide-react";
import { useGetAllSizesSettings, useDeleteSizeByIdSettings } from "@/features/useSizes";
import { SizeEntity } from "@/types/models";
import Size from "./Size";
import Button from "@/libraries/forms/components/Button";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { useRouter } from "next/navigation";
import { ID } from "@/types/global";
import SizesSkeleton from "./Loading";
import Contents from "../Contents";

const SizesPage: React.FC = () => {
  const { showWarning } = useAppContext();
  const router = useRouter();

  const { data, isFetching, refetch, isError } = useGetAllSizesSettings();
  const { mutate: deleteSize, isPending: isDeletePending } = useDeleteSizeByIdSettings();

  const sizes: SizeEntity[] = data?.data || [];

  const executeDelete = (size: SizeEntity) => {
    showWarning({
      message: `هل أنت متأكد من حذف المقاس ${size.name}؟ سيؤثر هذا على المتغيرات المرتبطة به بالمنتجات.`,
      btn1: "اغلاق",
      btn2: "حذف",
      handleBtn2: () => deleteSize(size.id)
    });
  };

  const goToAdd = () => router.push("sizes/add");
  const goToEdit = (id: ID) => router.push(`sizes/edit/${id}`);

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-background2 pb-5">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text flex items-center gap-2">
            <Ruler className="w-6 h-6 text-accent" />
            إدارة مقاسات الأزياء والملابس
          </h1>
          <p className="text-sm text-text/70 mt-1 font-sans">
            التحكم في معايير المقاسات المتاحة للمنتجات (مثل المقاسات العالمية أو الرقمية).
          </p>
        </div>

        <Button
          label="اضافة مقاس جديد"
          icon={Plus}
          className="w-fit rounded-md"
          iconClassName="w-4 h-4"
          onClick={goToAdd}
        />
      </div>

      <Contents
        Skeletons={<SizesSkeleton />}
        isEmpty={sizes.length === 0}
        emptyTitle="ليس هناك اي مقاسات بعد"
        emptyDesc="يمكنك اضافة المقاسات من لوحة التحكم، هذه المقاسات تستخدم لتحديد أحجام قطع الملابس لاحقاً."
        isError={isError}
        errorTitle="خطأ من الخادم"
        errorDesc="حدث خطأ أثناء جلب المقاسات. يرجى إعادة المحاولة."
        errorActionTitle="اعادة التحميل"
        errorAction={refetch}
        isLoading={isFetching}
      >
        <div className="bg-card rounded-xl border border-background2 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-right">
              <thead>
                <tr className="bg-background2 border-b border-background2 text-text font-heading md:text-sm text-xs font-semibold">
                  <th className="p-4">اسم المقاس المعياري</th>
                  <th className="p-4 text-left pl-6">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-background2 font-sans md:text-sm text-xs text-text">
                {sizes.map((sizeItem) => (
                  <Size
                    key={`sizes-${sizeItem.id}`}
                    size={sizeItem}
                    onDelete={() => executeDelete(sizeItem)}
                    isDeleting={isDeletePending}
                    onEdit={() => goToEdit(sizeItem.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Contents>
    </div>
  );
};

export default SizesPage;