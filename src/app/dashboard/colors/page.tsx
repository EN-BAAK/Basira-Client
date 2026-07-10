"use client";

import React from "react";
import { Plus, Paintbrush } from "lucide-react";
import { useGetAllColorsSettings, useDeleteColorByIdSettings } from "@/features/useColors";
import { ColorEntity } from "@/types/models";
import Color from "./Color";
import Button from "@/libraries/forms/components/Button";
import Contents from "../Contents";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { useRouter } from "next/navigation";
import { ID } from "@/types/global";
import ColorsSkeleton from "./Loading";

const ColorsPage: React.FC = () => {
  const { showWarning } = useAppContext()
  const router = useRouter()

  const { data, isFetching, refetch, isError } = useGetAllColorsSettings();
  const { mutate: deleteColor, isPending: isDeletePending } = useDeleteColorByIdSettings();

  const colors: ColorEntity[] = data?.data || []

  const executeDelete = (color: ColorEntity) => {
    showWarning({
      message: `هل أنت متأكد من حذف اللون ${color.name}؟`,
      btn1: "اغلاق",
      btn2: "حذف",
      handleBtn2: () => deleteColor(color.id)
    })
  };

  const goToAdd = () => router.push("colors/add")
  const goToEdit = (id: ID) => router.push(`colors/edit/${id}`)

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-background2 pb-5">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text flex items-center gap-2">
            <Paintbrush className="w-6 h-6 text-accent" />
            إدارة ألوان الأقمشة والملابس
          </h1>
          <p className="text-sm text-text/70 mt-1 font-sans">
            التحكم في الألوان المتاحة لقطع الأزياء وخامات الأقمشة الفاخرة في المخزون.
          </p>
        </div>

        <Button
          label="اضافة لون جديد"
          icon={Plus}
          className="w-fit rounded-md"
          iconClassName="w-4 h-4"
          onClick={goToAdd}
        />
      </div>

      <Contents
        Skeletons={<ColorsSkeleton />}
        isEmpty={colors.length === 0}
        emptyTitle="ليس هناك اي الوان بعد"
        emptyDesc="يمكنك اضافة الالوان من لوحة التحكم, هذه الالوان تستخدم لتحديد الوان الاقمشة لاحقا"
        isError={isError}
        errorTitle="خطأ من الخادم"
        errorDesc="حدث خطأ أثناء جلب الألوان. يرجى إعادة المحاولة."
        errorActionTitle="اعادة التحميل"
        errorAction={refetch}
        isLoading={isFetching}
      >
        <div className="bg-card rounded-xl border border-background2 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-right">
              <thead>
                <tr className="bg-background2 border-b border-background2 text-text font-heading md:text-sm text-xs font-semibold">
                  <th className="p-4">معاينة اللون</th>
                  <th className="p-4">رمز اللون (Hex Code)</th>
                  <th className="p-4 text-left pl-6">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-background2 font-sans md:text-sm text-xs text-text">
                {colors.map((colorItem) => (
                  <Color
                    key={`colors-${colorItem.id}`}
                    color={colorItem}
                    onDelete={() => executeDelete(colorItem)}
                    isDeleting={isDeletePending}
                    onEdit={() => goToEdit(colorItem.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Contents>

    </div>
  );
}

export default ColorsPage