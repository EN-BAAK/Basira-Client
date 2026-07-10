"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { FolderPlus, Grid, Image as ImageIcon } from "lucide-react";
import { validationCategoryModifySchema } from "@/constants/formsValidations";
import { CategoryEntity } from "@/types/models";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import InputField from "@/libraries/forms/components/InputField";
import SelectImageField from "@/libraries/forms/components/SelectImageField";
import Contents from "@/app/dashboard/Contents";
import { useGetCategoryById, useUpdateCategory } from "@/features/useCategories";
import { getImageUrl } from "@/lib/helpers";
import CategoryEditSkeleton from "./Loading";

const EditCategoryForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [categoryImage, setCategoryImage] = useState<File | null | undefined | string>(undefined);

  const { mutateAsync } = useUpdateCategory();
  const { data, isFetching, isError, refetch } = useGetCategoryById(id.toString());

  const categoryData = data?.data;

  const handleGoBack = () => router.back();

  const displayedImage =
    categoryImage === undefined
      ? categoryData?.imgUrl ? getImageUrl(categoryData.imgUrl) : undefined
      : categoryImage;

  const onSubmit = async (values: CategoryEntity) => {
    const formData = new FormData();
    if (!categoryData) return;

    if (values.name !== categoryData.name) {
      formData.append("name", values.name);
    }

    if (values.description !== categoryData.description) {
      formData.append("description", values.description || "");
    }

    if (categoryImage instanceof File) {
      formData.append("image", categoryImage);
    } else if (categoryImage === null) {
      formData.append("removeImage", "true");
    }

    await mutateAsync({
      id: id.toString(),
      data: formData,
    });
  };

  return (
    <Contents
      isLoading={isFetching}
      Skeletons={<CategoryEditSkeleton />}
      isEmpty={!categoryData}
      emptyTitle="غير موجود"
      emptyDesc="عذراً، هذه الفئة غير موجودة أو تم حذفها"
      emptyAction={handleGoBack}
      emptyActionTitle="العودة"
      isError={isError}
      errorTitle="مشكلة مفاجئة"
      errorDesc="ربما حدث خطأ من السيرفر"
      errorAction={refetch}
    >
      <div>
        <div className="mb-8 flex items-center gap-3 text-right">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FolderPlus className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">تعديل بيانات الفئة</h1>
            <p className="text-sm text-muted-foreground">تعديل مسميات وصور الفئات المدخلة مسبقاً</p>
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={categoryData!}
          validationSchema={validationCategoryModifySchema}
          onSubmit={onSubmit}
        >
          {({ dirty, isSubmitting, isValid }) => (
            <Form className="space-y-8 text-right">
              
              <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <Grid className="size-5 text-primary" />
                  <h2 className="font-rubik text-lg font-semibold text-text">تحديث الفئة</h2>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
                  <InputField
                    name="name"
                    type="text"
                    dir="rtl"
                    label="اسم الفئة الحالي"
                    placeholder="أدخل اسم الفئة"
                  />
                  
                  <InputField
                    name="description"
                    type="text"
                    dir="rtl"
                    label="وصف الفئة (اختياري)"
                    placeholder="أدخل وصفاً مختصراً للفئة"
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="size-5 text-accent" />
                  <h2 className="font-rubik text-lg font-semibold text-text">تعديل صورة الفئة</h2>
                </div>
                <SelectImageField
                  value={displayedImage}
                  setValue={setCategoryImage}
                  setIsImageChanged={setIsImageChanged}
                  isLoading={false}
                  label="صورة الفئة"
                />
              </section>

              <div className="flex justify-end">
                <SubmitButton
                  isDirty={dirty || isImageChanged}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  label="تحديث وحفظ التعديلات"
                />
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </Contents>
  );
};

export default EditCategoryForm;