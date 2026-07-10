"use client";

import { Form, Formik, FormikHelpers } from "formik";
import { Palette, Paintbrush } from "lucide-react";
import { useCreateColorSettings } from "@/features/useColors";
import { initialColorCreationValues } from "@/constants/formsValues";
import { validationColorModifySchema } from "@/constants/formsValidations";
import { ColorEntityCreation } from "@/types/models";
import InputField from "@/libraries/forms/components/InputField";
import SubmitButton from "@/libraries/forms/components/SubmitButton";

const CreateColorForm: React.FC = () => {
  const { mutateAsync } = useCreateColorSettings();

  const onSubmit = async (
    values: ColorEntityCreation,
    helpers: FormikHelpers<ColorEntityCreation>
  ) => {
    await mutateAsync(values);
    helpers.resetForm();
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 text-right">
        <div className="flex gap-3 justify-start items-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Palette className="size-6" />
          </div>
          <div>
            <h1 className="font-rubik text-2xl font-bold text-text">إضافة لون جديد</h1>
            <p className="text-sm text-muted-foreground">أضف لوناً جديداً إلى قائمة الألوان المتاحة للأقمشة والمنتجات</p>
          </div>
        </div>
      </div>

      <Formik
        initialValues={initialColorCreationValues}
        validationSchema={validationColorModifySchema}
        onSubmit={onSubmit}
      >
        {({ dirty, isSubmitting, isValid }) => (
          <Form className="space-y-8 text-right">
            <section className="space-y-5 rounded-2xl border border-border bg-background2 p-5 md:p-6">
              <div className="flex gap-3 items-center">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Paintbrush className="size-5" />
                </div>
                <div>
                  <h2 className="font-rubik text-lg font-semibold text-text">تفاصيل اللون</h2>
                  <p className="text-sm text-muted-foreground">حدد اسم اللون ودرجته الدقيقة للزبائن</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 items-end">
                <div className="flex gap-3 items-center w-full">
                  <div className="flex-1">
                    <InputField
                      required
                      type="color"
                      dir="ltr"
                      name="name"
                      label="رمز اللون (Hex Code)"
                      inputStyle="h-12 w-[80px]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end pt-2">
              <SubmitButton
                isDirty={dirty}
                isSubmitting={isSubmitting}
                isValid={isValid}
                label="حفظ اللون الجديد"
              />
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateColorForm;