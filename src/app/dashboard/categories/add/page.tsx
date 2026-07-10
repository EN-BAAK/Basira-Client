"use client";

import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { FolderPlus, Grid, Image as ImageIcon } from "lucide-react";
import { initialCategoryCreationValues } from "@/constants/formsValues";
import { validationCategoryModifySchema } from "@/constants/formsValidations";
import { CategoryEntityCreation } from "@/types/models";
import InputField from "@/libraries/forms/components/InputField";
import SelectImageField from "@/libraries/forms/components/SelectImageField";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import { useCreateCategory } from "@/features/useCategories";

const CreateCategoryForm: React.FC = () => {
  const { mutateAsync } = useCreateCategory();

  const [categoryImage, setCategoryImage] = useState<File | null | undefined | string>(undefined);

  const onSubmit = async (
    values: CategoryEntityCreation,
    helpers: FormikHelpers<CategoryEntityCreation>
  ) => {
    const formData = new FormData();

    formData.append("name", values.name);
    if (values.description) {
      formData.append("description", values.description);
    }

    if (categoryImage instanceof File) {
      formData.append("image", categoryImage);
    }

    await mutateAsync(formData);

    helpers.resetForm();
    setCategoryImage(undefined);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 text-right">
        <div className="flex gap-3 justify-start items-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FolderPlus className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">إضافة فئة جديدة</h1>
            <p className="text-sm text-muted-foreground">أضف تصنيفاً جديداً لتنظيم المنتجات داخل المتجر</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialCategoryCreationValues}
        validationSchema={validationCategoryModifySchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="space-y-8 text-right">

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Grid className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">تفاصيل الفئة</h2>
                  <p className="text-sm text-muted-foreground">أدخل الاسم العام والوصف للفئة التجارية</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-start">
                <InputField
                  required
                  type="text"
                  dir="rtl"
                  name="name"
                  label="اسم الفئة"
                  placeholder="مثال: فساتين، عباءات، أقمشة رجالية"
                />

                <InputField
                  type="text"
                  dir="rtl"
                  name="description"
                  label="الوصف (اختياري)"
                  placeholder="أدخل وصفاً مختصراً يوضح محتوى الفئة"
                />
              </div>
            </section>

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center mb-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <ImageIcon className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">صورة الفئة</h2>
                  <p className="text-sm text-muted-foreground">اختر الصورة التوضيحية الرسمية للفئة</p>
                </div>
              </div>

              <SelectImageField
                value={categoryImage ?? undefined}
                setValue={(file) => setCategoryImage(file ?? null)}
                label="صورة الفئة"
              />
            </section>

            <div className="flex justify-end pt-2">
              <SubmitButton
                isDirty={dirty || categoryImage !== undefined}
                isSubmitting={isSubmitting}
                isValid={isValid}
                label="حفظ الفئة الجديدة"
              />
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategoryForm;