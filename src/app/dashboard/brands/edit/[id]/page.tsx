"use client";

import { useState } from "react";
import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { Award, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { validationBrandModifySchema } from "@/constants/formsValidations";
import { BrandEntity } from "@/types/models";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import InputField from "@/libraries/forms/components/InputField";
import SelectImageField from "@/libraries/forms/components/SelectImageField";
import Contents from "@/app/dashboard/Contents";
import { useGetBrandById, useUpdateBrand } from "@/features/useBrands";
import { getImageUrl } from "@/lib/helpers";
import BrandEditSkeleton from "./Loading";

const EditBrandForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [isImageChanged, setIsImageChanged] = useState(false);
  const [brandImage, setBrandImage] = useState<File | null | undefined | string>(undefined);

  const { mutateAsync } = useUpdateBrand();
  const { data, isFetching, isError, refetch } = useGetBrandById(id.toString());

  const brandData = data?.data;

  const handleGoBack = () => router.back();

  const displayedImage =
    brandImage === undefined
      ? brandData?.imgUrl ? getImageUrl(brandData.imgUrl) : undefined
      : brandImage;

  const onSubmit = async (values: BrandEntity) => {
    const formData = new FormData();
    if (!brandData) return;

    if (values.name !== brandData.name) {
      formData.append("name", values.name);
    }

    if (brandImage instanceof File) {
      formData.append("image", brandImage);
    } else if (brandImage === null) {
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
      Skeletons={<BrandEditSkeleton />}
      isEmpty={!brandData}
      emptyTitle="غير موجود"
      emptyDesc="عذراً، هذه الماركة غير موجودة أو تم حذفها"
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
            <Award className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">تعديل بيانات الماركة</h1>
            <p className="text-sm text-muted-foreground">تعديل مسميات وشعارات الماركات المدخلة مسبقاً</p>
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={brandData!}
          validationSchema={validationBrandModifySchema}
          onSubmit={onSubmit}
        >
          {({ dirty, isSubmitting, isValid }) => (
            <Form className="space-y-8 text-right">

              <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="size-5 text-primary" />
                  <h2 className="font-rubik text-lg font-semibold text-text">تحديث الماركة</h2>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
                  <InputField
                    name="name"
                    type="text"
                    dir="rtl"
                    label="اسم الماركة الحالي"
                    placeholder="أدخل اسم الماركة"
                  />
                </div>
              </section>

              <section className="rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ImageIcon className="size-5 text-accent" />
                  <h2 className="font-rubik text-lg font-semibold text-text">تعديل الشعار</h2>
                </div>
                <SelectImageField
                  value={displayedImage}
                  setValue={setBrandImage}
                  setIsImageChanged={setIsImageChanged}
                  isLoading={false}
                  label="شعار الماركة"
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

export default EditBrandForm;