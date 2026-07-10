"use client";

import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { Palette, Paintbrush } from "lucide-react";
import { useGetColorByIdSettings, useUpdateColorSettings } from "@/features/useColors";
import { validationColorModifySchema } from "@/constants/formsValidations";
import { ColorEntity } from "@/types/models";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import InputField from "@/libraries/forms/components/InputField";
import Contents from "@/app/dashboard/Contents";
import ColorEditSkeleton from "./Loading";

const EditColorForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { mutateAsync } = useUpdateColorSettings();
  const { data, isFetching, isError, refetch } = useGetColorByIdSettings(id);

  const colorData = data?.data;

  const handleGoBack = () => router.back();

  const onSubmit = async (values: ColorEntity) => {
    const { id, ...data } = values
    await mutateAsync({
      id,
      data,
    });
  };

  return (
    <Contents
      isLoading={isFetching}
      Skeletons={<ColorEditSkeleton />}
      isEmpty={!colorData}
      emptyTitle="غير موجود"
      emptyDesc="عذراً، هذا اللون غير موجود أو تم حذفه"
      emptyAction={handleGoBack}
      emptyActionTitle="العودة"
      isError={isError}
      errorTitle="مشكلة مفاجئة"
      errorDesc="ربما حدث خطأ من السيرفر"
      errorAction={refetch}
    >
      <div className="mb-8 flex items-center gap-3 text-right">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Palette className="size-6" />
        </div>
        <div>
          <h1 className="font-rubik text-2xl font-bold text-text">تعديل بيانات اللون</h1>
          <p className="text-sm text-muted-foreground">تعديل المسميات والدرجات اللونية المدخلة مسبقاً</p>
        </div>
      </div>

      <Formik
        enableReinitialize
        initialValues={colorData!}
        validationSchema={validationColorModifySchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="space-y-8 text-right">
            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex items-center gap-3">
                <Paintbrush className="size-5 text-primary" />
                <h2 className="font-rubik text-lg font-semibold text-text">بيانات اللون الأساسية</h2>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
                <InputField
                  name="name"
                  type="color"
                  dir="rtl"
                  label="رمز اللون (Hex Code)"
                  inputStyle="h-12 w-[80px]"
                />
              </div>
            </section>

            <div className="flex justify-end">
              <SubmitButton
                isDirty={dirty}
                isSubmitting={isSubmitting}
                isValid={isValid}
                label="تحديث وحفظ التعديلات"
              />
            </div>

          </Form>
        )}
      </Formik>
    </Contents>
  );
};

export default EditColorForm;