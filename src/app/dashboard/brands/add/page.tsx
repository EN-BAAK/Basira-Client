"use client";

import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Award, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { initialBrandCreationValues } from "@/constants/formsValues";
import { validationBrandModifySchema } from "@/constants/formsValidations";
import { BrandEntityCreation } from "@/types/models";
import InputField from "@/libraries/forms/components/InputField";
import SelectImageField from "@/libraries/forms/components/SelectImageField";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import { useCreateBrand } from "@/features/useBrands";

const CreateBrandForm: React.FC = () => {
  const { mutateAsync } = useCreateBrand();

  const [brandImage, setBrandImage] = useState<File | null | undefined | string>(undefined);

  const onSubmit = async (
    values: BrandEntityCreation,
    helpers: FormikHelpers<BrandEntityCreation>
  ) => {
    const formData = new FormData();

    formData.append("name", values.name);

    if (brandImage instanceof File) {
      formData.append("image", brandImage);
    }

    await mutateAsync(formData);
    helpers.resetForm();
    setBrandImage(undefined);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 text-right">
        <div className="flex gap-3 justify-start items-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Award className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">إضافة ماركة جديدة</h1>
            <p className="text-sm text-muted-foreground">أضف علامة تجارية أو ماركة جديدة للمنتجات</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialBrandCreationValues}
        validationSchema={validationBrandModifySchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="space-y-8 text-right">

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">تفاصيل الماركة</h2>
                  <p className="text-sm text-muted-foreground">أدخل الاسم الرسمي للعلامة التجارية</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
                <InputField
                  required
                  type="text"
                  dir="rtl"
                  name="name"
                  label="اسم الماركة"
                  placeholder="مثال: قوتشي، شانيل، الماركة الفاخرة"
                />
              </div>
            </section>

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center mb-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <ImageIcon className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">شعار الماركة</h2>
                  <p className="text-sm text-muted-foreground">اختر صورة الشعار الرسمية للماركة</p>
                </div>
              </div>
              <SelectImageField
                value={brandImage ?? undefined}
                setValue={(file) => setBrandImage(file ?? null)}
                label="شعار الماركة"
              />
            </section>

            <div className="flex justify-end pt-2">
              <SubmitButton
                isDirty={dirty || brandImage !== undefined}
                isSubmitting={isSubmitting}
                isValid={isValid}
                label="حفظ الماركة الجديدة"
              />
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBrandForm;