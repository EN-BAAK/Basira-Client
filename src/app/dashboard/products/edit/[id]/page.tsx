"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { PackagePlus, Info, DollarSign, Layers, Image as ImageIcon } from "lucide-react";
import { useGetProductByIdSettings, useUpdateProductSettings } from "@/features/useProducts";
import { validationProductModifySchema } from "@/constants/formsValidations";
import InputField from "@/libraries/forms/components/InputField";
import SelectorField from "@/libraries/forms/components/SelectorField";
import AdvancedMultiSelectField from "@/libraries/forms/components/AdvancedMultiSelectField";
import SelectImageField from "@/libraries/forms/components/SelectImageField";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import Contents from "@/app/dashboard/Contents";
import { getImageUrl } from "@/lib/helpers";
import { useGetAllCategories } from "@/features/useCategories";
import { useGetAllBrands } from "@/features/useBrands";
import { useGetAllColorsSettings } from "@/features/useColors";
import { useGetAllSizesSettings } from "@/features/useSizes";
import { BrandEntity, CategoryEntity, ColorEntity, SizeEntity } from "@/types/models";
import TextAreaField from "@/libraries/forms/components/TextAreaField";
import ProductEditSkeleton from "./Loading";

const EditProductForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [productImage, setProductImage] = useState<File | null | undefined | string>(undefined);

  const { mutateAsync } = useUpdateProductSettings();
  const { data: productRes, isFetching: isFetchingProduct, isError: isProductError, refetch: refetchProduct } = useGetProductByIdSettings(id.toString());
  const { data: categoriesData, isError: isCategoriesError } = useGetAllCategories();
  const { data: brandsData, isError: isBrandsError } = useGetAllBrands();
  const { data: colorsData, isError: isColorsError } = useGetAllColorsSettings();
  const { data: sizesData, isError: isSizesError } = useGetAllSizesSettings();

  const product = productRes?.data;
  const handleGoBack = () => router.back();

  const hasError = isProductError || isCategoriesError || isBrandsError || isColorsError || isSizesError;

  const handleRefetchAll = () => {

    refetchProduct();
  };

  const categoriesOptions = categoriesData?.data?.map((c: CategoryEntity) => ({ key: c.name, value: c.id })) || [];
  const brandsOptions = brandsData?.data?.map((b: BrandEntity) => ({ key: b.name, value: b.id })) || [];
  const colorsOptions = colorsData?.data?.map((col: ColorEntity) => ({ id: col.id, key: col.name })) || [];
  const sizesOptions = sizesData?.data?.map((s: SizeEntity) => ({ id: s.id, key: s.name })) || [];

  const displayedImage = productImage === undefined
    ? product?.imgUrl ? getImageUrl(product.imgUrl) : undefined
    : productImage;

  const initialFormValues = product ? {
    title: product.title,
    price: product.price,
    summarize: product.summarize,
    description: product.description,
    categoryId: product.category?.id || "",
    brandId: product.brand?.id || "",
    colors: product.colors?.map((c: ColorEntity) => ({ id: c.id, state: "old" })) || [],
    sizes: product.sizes?.map((s: SizeEntity) => ({ id: s.id, state: "old" })) || [],
  } : null;

  const onSubmit = async (values: typeof initialFormValues) => {
    const formData = new FormData();

    if (!product) return;

    if (values!.title !== product.title) formData.append("title", values!.title);
    if (values!.price !== product.price) formData.append("price", String(values!.price));
    if (values!.summarize !== product.summarize) formData.append("summarize", values!.summarize);
    if (values!.description !== product.description) formData.append("description", values!.description);
    if (values!.categoryId !== product.category?.id) formData.append("categoryId", values!.categoryId);
    if (values!.brandId !== product.brand?.id) formData.append("brandId", values!.brandId);

    const colorRelations = values!.colors.map((color) => ({ id: color.id, state: color.state }));
    const sizeRelations = values!.sizes.map((size) => ({ id: size.id, state: size.state }));

    formData.append("colors", JSON.stringify(colorRelations));
    formData.append("sizes", JSON.stringify(sizeRelations));

    if (productImage instanceof File) {
      formData.append("image", productImage);
    } else if (productImage === null) {
      formData.append("removeImage", "true");
    }

    await mutateAsync({
      id: id.toString(),
      data: formData,
    });
  };

  return (
    <Contents
      isLoading={isFetchingProduct}
      Skeletons={<ProductEditSkeleton />}
      isEmpty={!product}
      emptyTitle="غير موجود"
      emptyDesc="عذراً، هذا المنتج غير موجود أو تم حذفه"
      emptyAction={handleGoBack}
      emptyActionTitle="العودة"
      isError={hasError}
      errorTitle="مشكلة مفاجئة"
      errorDesc="حدث خطأ أثناء جلب بيانات المنتج أو القوائم التابعة له"
      errorAction={handleRefetchAll}
    >
      <div>
        <div className="mb-8 flex items-center gap-3 text-right">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <PackagePlus className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">تعديل بيانات المنتج</h1>
            <p className="text-sm text-muted-foreground">تعديل وتحديث المواصفات، الأسعار والخامات المدخلة سابقاً</p>
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialFormValues!}
          validationSchema={validationProductModifySchema}
          onSubmit={onSubmit}
        >
          {({ dirty, isSubmitting, isValid }) => (
            <Form className="space-y-8 text-right">
              <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <Info className="size-5 text-primary" />
                  <h2 className="font-rubik text-lg font-semibold text-text">تفاصيل المسميات والوصف</h2>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  <InputField name="title" type="text" dir="rtl" label="عنوان المنتج" placeholder="تعديل عنوان المنتج" />
                  <TextAreaField dir="rtl" name="summarize" label="نبذة مختصرة عن المنتج" placeholder="تعديل النبذة" />
                  <TextAreaField dir="rtl" name="description" label="الوصف الكامل" placeholder="تعديل الوصف الكامل للشرح" />
                </div>
              </section>

              <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <DollarSign className="size-5 text-primary" />
                  <h2 className="font-rubik text-lg font-semibold text-text">الأسعار الحالية</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <InputField name="price" type="number" dir="ltr" label="سعر المفرق" placeholder="0.00" />
                </div>
              </section>

              <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <Layers className="size-5 text-primary" />
                  <h2 className="font-rubik text-lg font-semibold text-text">العلاقات والخامات المتعددة</h2>
                </div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  <SelectorField name="categoryId" label="تعديل الفئة" options={categoriesOptions} />
                  <SelectorField name="brandId" label="تعديل الماركة" options={brandsOptions} />

                  <div className="lg:col-span-2">
                    <AdvancedMultiSelectField isColor name="colors" label="إدارة الألوان" options={colorsOptions} />
                  </div>

                  <div className="lg:col-span-2">
                    <AdvancedMultiSelectField name="sizes" label="إدارة المقاسات" options={sizesOptions} />
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="size-5 text-accent" />
                  <h2 className="font-rubik text-lg font-semibold text-text">تعديل الصورة التوضيحية</h2>
                </div>
                <SelectImageField value={displayedImage} setValue={setProductImage} setIsImageChanged={setIsImageChanged} isLoading={false} label="صورة المنتج" />
              </section>

              <div className="flex justify-end">
                <SubmitButton isDirty={dirty || isImageChanged} isSubmitting={isSubmitting} isValid={isValid} label="تحديث وحفظ التعديلات" />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Contents>
  );
};

export default EditProductForm;