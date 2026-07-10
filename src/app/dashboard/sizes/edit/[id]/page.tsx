"use client";

import { Form, Formik } from "formik";
import { useParams, useRouter } from "next/navigation";
import { Ruler, CheckSquare } from "lucide-react";
import { useGetSizeByIdSettings, useUpdateSizeSettings } from "@/features/useSizes";
import { validationSizeModifySchema } from "@/constants/formsValidations";
import { SizeEntity } from "@/types/models";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import InputField from "@/libraries/forms/components/InputField";
import Contents from "@/app/dashboard/Contents";
import SizeEditSkeleton from "./Loading";

const EditSizeForm: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { mutateAsync } = useUpdateSizeSettings();
  const { data, isFetching, isError, refetch } = useGetSizeByIdSettings(id.toString());

  const sizeData = data?.data;

  const handleGoBack = () => router.back();

  const onSubmit = async (values: SizeEntity) => {
    const { id, ...data } = values;
    await mutateAsync({
      id,
      data,
    });
  };

  return (
    <Contents
      isLoading={isFetching}
      Skeletons={<SizeEditSkeleton />}
      isEmpty={!sizeData}
      emptyTitle="غير موجود"
      emptyDesc="عذراً، هذا المقاس غير موجود أو تم حذفه"
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
            <Ruler className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">تعديل بيانات المقاس</h1>
            <p className="text-sm text-muted-foreground">تعديل رموز ومسميات المقاسات المدخلة مسبقاً</p>
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={sizeData!}
          validationSchema={validationSizeModifySchema}
          onSubmit={onSubmit}
        >
          {({ dirty, isSubmitting, isValid }) => (
            <Form className="space-y-8 text-right">
              <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <CheckSquare className="size-5 text-primary" />
                  <h2 className="font-rubik text-lg font-semibold text-text">تحديث المقاس</h2>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
                  <InputField
                    name="name"
                    type="text"
                    dir="rtl"
                    label="اسم / رمز المقاس الحالي"
                    placeholder="أدخل المقاس"
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
      </div>
    </Contents>
  );
};

export default EditSizeForm;