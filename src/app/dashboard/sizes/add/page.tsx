"use client";

import { Form, Formik, FormikHelpers } from "formik";
import { Ruler, CheckSquare } from "lucide-react";
import { useCreateSizeSettings } from "@/features/useSizes";
import { initialSizeCreationValues } from "@/constants/formsValues";
import { validationSizeModifySchema } from "@/constants/formsValidations";
import { SizeEntityCreation } from "@/types/models";
import InputField from "@/libraries/forms/components/InputField";
import SubmitButton from "@/libraries/forms/components/SubmitButton";

const CreateSizeForm: React.FC = () => {
  const { mutateAsync } = useCreateSizeSettings();

  const onSubmit = async (
    values: SizeEntityCreation,
    helpers: FormikHelpers<SizeEntityCreation>
  ) => {
    await mutateAsync(values);
    helpers.resetForm();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 text-right">
        <div className="flex gap-3 justify-start items-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Ruler className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">إضافة مقاس جديد</h1>
            <p className="text-sm text-muted-foreground">أضف مقاساً جديداً إلى معايير المنتجات المتاحة بالمتجر</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialSizeCreationValues}
        validationSchema={validationSizeModifySchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="space-y-8 text-right">

            {/* قسم البيانات الأساسية */}
            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CheckSquare className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">تفاصيل المقاس</h2>
                  <p className="text-sm text-muted-foreground">أدخل رمز المقاس العالمي أو الرقمي بدقة</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
                <InputField
                  required
                  type="text"
                  dir="rtl"
                  name="name"
                  label="اسم / رمز المقاس"
                  placeholder="مثال: XL, M, L أو 38, 40, 42"
                />
              </div>
            </section>

            {/* زر الإرسال */}
            <div className="flex justify-end pt-2">
              <SubmitButton
                isDirty={dirty}
                isSubmitting={isSubmitting}
                isValid={isValid}
                label="حفظ المقاس الجديد"
              />
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateSizeForm;