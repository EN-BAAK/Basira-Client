"use client";

import React from "react";
import { Plus, Award } from "lucide-react";
import { BrandEntity } from "@/types/models";
import Brand from "./Brand";
import Loading from "./Loading";
import Button from "@/libraries/forms/components/Button";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { useRouter } from "next/navigation";
import { ID } from "@/types/global";
import { useDeleteBrandById, useGetAllBrands } from "@/features/useBrands";
import Contents from "../Contents";

const BrandsPage: React.FC = () => {
  const { showWarning } = useAppContext();
  const router = useRouter();

  const { data, isFetching, refetch, isError } = useGetAllBrands();
  const { mutate: deleteBrand, isPending: isDeletePending } = useDeleteBrandById();

  const brands: BrandEntity[] = data?.data || [];

  const executeDelete = (brand: BrandEntity) => {
    showWarning({
      message: `هل أنت متأكد من حذف العلامة التجارية "${brand.name}"؟ قد يؤثر ذلك على المنتجات التابعة لها.`,
      btn1: "اغلاق",
      btn2: "حذف",
      handleBtn2: () => deleteBrand(brand.id)
    });
  };

  const goToAdd = () => router.push("brands/add");
  const goToEdit = (id: ID) => router.push(`brands/edit/${id}`);

  return (
    <div className="space-y-6 animate-fade-in animate-duration-300 w-full h-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-background2 pb-5">
        <div>
          <h1 className="font-heading text-2xl font-bold text-text flex items-center gap-2">
            <Award className="w-6 h-6 text-accent" />
            إدارة العلامات التجارية (البراندات)
          </h1>
          <p className="text-sm text-text/70 mt-1 font-sans">
            إدارة الموردين ودور الأزياء العالمية والمحلية المسجلة على المنصة.
          </p>
        </div>

        <Button
          label="اضافة علامة تجارية"
          icon={Plus}
          className="w-fit rounded-md"
          iconClassName="w-4 h-4"
          onClick={goToAdd}
        />
      </div>

      <Contents
        Skeletons={<Loading />}
        isEmpty={brands.length === 0}
        emptyTitle="ليس هناك أي علامات تجارية بعد"
        emptyDesc="قم بإضافة دور الأزياء ومصانع الأقمشة لتتمكن من تصنيف منتجات الجملة والمفرق بناءً عليها."
        isError={isError}
        errorTitle="فشل جلب البيانات"
        errorDesc="حدث خطأ أثناء تحميل براندات الأزياء، يرجى التحقق من الخادم وإعادة المحاولة."
        errorActionTitle="اعادة التحميل"
        errorAction={refetch}
        isLoading={isFetching}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {brands.map((brandItem) => (
            <Brand
              key={`brand-${brandItem.id}`}
              brand={brandItem}
              onDelete={() => executeDelete(brandItem)}
              isDeleting={isDeletePending}
              onEdit={() => goToEdit(brandItem.id)}
            />
          ))}
        </div>
      </Contents>
    </div>
  );
};

export default BrandsPage;