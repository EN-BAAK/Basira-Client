"use client";

import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { PackagePlus, Info, DollarSign, Layers, Image as ImageIcon } from "lucide-react";
import { useCreateProductSettings } from "@/features/useProducts";
import { initialProductCreationValues } from "@/constants/formsValues";
import { validationProductModifySchema } from "@/constants/formsValidations";
import { BrandEntity, CategoryEntity, ColorEntity, ProductEntityCreation, SizeEntity } from "@/types/models";
import InputField from "@/libraries/forms/components/InputField";
import SelectorField from "@/libraries/forms/components/SelectorField";
import AdvancedMultiSelectField from "@/libraries/forms/components/AdvancedMultiSelectField";
import SelectImageField from "@/libraries/forms/components/SelectImageField";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import { useGetAllCategories } from "@/features/useCategories";
import { useGetAllBrands } from "@/features/useBrands";
import { useGetAllColorsSettings } from "@/features/useColors";
import { useGetAllSizesSettings } from "@/features/useSizes";
import TextAreaField from "@/libraries/forms/components/TextAreaField";

const CreateProductForm: React.FC = () => {
  const { mutateAsync } = useCreateProductSettings();
  const { data: categoriesData } = useGetAllCategories();
  const { data: brandsData } = useGetAllBrands();
  const { data: colorsData } = useGetAllColorsSettings();
  const { data: sizesData } = useGetAllSizesSettings();

  const [productImage, setProductImage] = useState<File | null | undefined | string>(undefined);

  const categoriesOptions = categoriesData?.data?.map((c: CategoryEntity) => ({ key: c.name, value: c.id })) || [];
  const brandsOptions = brandsData?.data?.map((b: BrandEntity) => ({ key: b.name, value: b.id })) || [];
  const colorsOptions = colorsData?.data?.map((col: ColorEntity) => ({ id: col.id, key: col.name })) || [];
  const sizesOptions = sizesData?.data?.map((s: SizeEntity) => ({ id: s.id, key: s.name })) || [];

  const onSubmit = async (
    values: ProductEntityCreation,
    helpers: FormikHelpers<ProductEntityCreation>
  ) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("price", String(values.price));
    formData.append("summarize", values.summarize);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    formData.append("brandId", values.brandId);

    const activeColors = values.colors.filter((c) => c.state !== "remove").map((c) => ({ id: c.id, state: c.state }));
    const activeSizes = values.sizes.filter((s) => s.state !== "remove").map((s) => ({ id: s.id, state: s.state }));

    formData.append("colors", JSON.stringify(activeColors));
    formData.append("sizes", JSON.stringify(activeSizes));

    if (productImage instanceof File) {
      formData.append("image", productImage);
    }

    await mutateAsync(formData);
    helpers.resetForm();
    setProductImage(undefined);
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 text-right">
        <div className="flex gap-3 justify-start items-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <PackagePlus className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">إضافة منتج جديد</h1>
            <p className="text-sm text-muted-foreground">أدخل تفاصيل ومواصفات المنتج الفنية والتجارية</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialProductCreationValues}
        validationSchema={validationProductModifySchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="space-y-8 text-right">

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Info className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">بيانات المنتج الأساسية</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5">
                <InputField required type="text" dir="rtl" name="title" label="عنوان المنتج" placeholder="أدخل اسم أو عنوان المنتج كاملاً" />
                <TextAreaField dir="rtl" name="summarize" label="نبذة مختصرة عن المنتج" placeholder="وصف سطرين يظهر في واجهة البطاقة للمنتج" />
                <TextAreaField dir="rtl" name="description" label="الوصف التفصيلي والشامل للمنتج" placeholder="اكتب هنا جميع مواصفات وتفاصيل السلعة" />
              </div>
            </section>

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <DollarSign className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">التسعير المالي</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <InputField required type="number" dir="ltr" name="price" label="سعر المفرق" placeholder="0.00" />
              </div>
            </section>

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Layers className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">التصنيفات والمواصفات الفنية</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                <SelectorField name="categoryId" label="الفئة التجارية" options={categoriesOptions} />
                <SelectorField name="brandId" label="الماركة / البراند" options={brandsOptions} />

                <div className="lg:col-span-2">
                  <AdvancedMultiSelectField isColor name="colors" label="الألوان المتاحة للمنتج" options={colorsOptions} />
                </div>

                <div className="lg:col-span-2">
                  <AdvancedMultiSelectField name="sizes" label="المقاسات المتاحة للمنتج" options={sizesOptions} />
                </div>
              </div>
            </section>

            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center mb-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <ImageIcon className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">الصورة الرئيسية للمنتج</h2>
                </div>
              </div>
              <SelectImageField value={productImage ?? undefined} setValue={(file) => setProductImage(file ?? null)} label="صورة المنتج" />
            </section>

            <div className="flex justify-end pt-2">
              <SubmitButton isDirty={dirty || productImage !== undefined} isSubmitting={isSubmitting} isValid={isValid} label="حفظ ونشر المنتج الجديد" />
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductForm;