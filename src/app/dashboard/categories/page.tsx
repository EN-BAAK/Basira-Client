"use client";

import React from "react";
import { Plus, Tags } from "lucide-react";
import { CategoryEntity } from "@/types/models";
import Category from "./Category";
import Loading from "./Loading";
import Button from "@/libraries/forms/components/Button";
import Contents from "../Contents";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { useRouter } from "next/navigation";
import { ID } from "@/types/global";
import { useDeleteCategoryById, useGetAllCategories } from "@/features/useCategories";

const CategoriesPage: React.FC = () => {
  const { showWarning } = useAppContext();
  const router = useRouter();

  const { data, isFetching, refetch, isError } = useGetAllCategories();
  const { mutate: deleteCategory, isPending: isDeletePending } = useDeleteCategoryById();

  const categories: CategoryEntity[] = data?.data || [];

  const executeDelete = (category: CategoryEntity) => {
    showWarning({
      message: `هل أنت متأكد من حذف تصنيف "${category.name}"؟ سيؤدي هذا لإزالة ارتباطه بجميع خامات الملابس والأقمشة.`,
      btn1: "اغلاق",
      btn2: "حذف",
      handleBtn2: () => deleteCategory(category.id)
    });
  };

  const goToAdd = () => router.push("categories/add");
  const goToEdit = (id: ID) => router.push(`categories/edit/${id}`);

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-background2 pb-5">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text flex items-center gap-2">
            <Tags className="w-6 h-6 text-accent" />
            إدارة تصنيفات الأزياء والأقمشة
          </h1>
          <p className="text-sm text-text/70 mt-1 font-sans">
            تنظيم وتوزيع معروضات الموضة والخامات في أقسام رئيسية لتسهيل تصفح المفرق والجملة.
          </p>
        </div>

        <Button
          label="اضافة تصنيف جديد"
          icon={Plus}
          className="w-fit rounded-md"
          iconClassName="w-4 h-4"
          onClick={goToAdd}
        />
      </div>

      <Contents
        Skeletons={<Loading />}
        isEmpty={categories.length === 0}
        emptyTitle="ليس هناك اي تصنيفات بعد"
        emptyDesc="ابدأ بإنشاء أول قسم رئيسي (مثل: أقمشة حريرية، ملابس شتوية) لتنظيم متجرك."
        isError={isError}
        errorTitle="خطأ في الاتصال بالخادم"
        errorDesc="لم نتمكن من مزامنة الأقسام الفاخرة حالياً، يرجى إعادة المحاولة."
        errorActionTitle="اعادة التحميل"
        errorAction={refetch}
        isLoading={isFetching}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((categoryItem) => (
            <Category
              key={`category-${categoryItem.id}`}
              category={categoryItem}
              onDelete={() => executeDelete(categoryItem)}
              isDeleting={isDeletePending}
              onEdit={() => goToEdit(categoryItem.id)}
            />
          ))}
        </div>
      </Contents>
    </div >
  );
};

export default CategoriesPage;