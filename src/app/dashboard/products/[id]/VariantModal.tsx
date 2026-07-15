"use client";

import React from "react";
import { Formik, Form, FormikHelpers } from "formik";
import { X } from "lucide-react";
import { DashboardVariantModalProps } from "@/types/components";
import { variantValidationSchema } from "@/constants/formsValidations";
import InputField from "@/libraries/forms/components/InputField";
import SubmitButton from "@/libraries/forms/components/SubmitButton";
import { ProductVariantEntityCreation, SizeEntity } from "@/types/models";
import VariantSelectorField from "./VariantSelectorField";
import { useCreateProductVariantSettings } from "@/features/useVariatns";
import { initialVariantCreationValue } from "@/constants/formsValues";

export const VariantModal: React.FC<DashboardVariantModalProps> = ({
  isOpen,
  onClose,
  colors,
  sizes,
  productId,
  variants
}) => {
  const { mutateAsync: createMutate } = useCreateProductVariantSettings()

  if (!isOpen) return null;

  const colorOptions = colors.map((color) => ({
    key: color.id.toString(),
    value: color.name,
  }));

  const sizeOptions = sizes.map((size: SizeEntity) => ({
    key: size.id.toString(),
    value: size.name,
  }));

  const handleSubmit = async (values: ProductVariantEntityCreation, helpers: FormikHelpers<ProductVariantEntityCreation>
  ) => {
    await createMutate({ ...values, productId })

    helpers.resetForm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/40 backdrop-blur-xs p-4 animate-fade-in text-right">
      <div className="bg-card border border-border w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-scale-up">

        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-background2">
          <h3 className="font-heading font-bold text-text text-base">
            إضافة متغير مخزني جديد
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-background text-muted hover:text-text transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <Formik
          enableReinitialize
          initialValues={initialVariantCreationValue}
          validationSchema={variantValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ dirty, isSubmitting, isValid }) => (
            <Form className="p-6 space-y-5">
              <VariantSelectorField
                colorFieldName="colorId"
                sizeFieldName="sizeId"
                label="قم باضافة البضاعة"
                existingVariants={variants}
                colors={colorOptions}
                sizes={sizeOptions}
              />

              <InputField
                required
                type="number"
                dir="ltr"
                name="quantity"
                label="الكمية المتوفرة بالمستودع"
                placeholder="مثال: 50"
              />

              <div className="flex justify-end gap-2 pt-2 border-t border-border mt-6">
                <SubmitButton
                  isDirty={dirty}
                  isSubmitting={isSubmitting}
                  isValid={isValid}
                  label="إضافة المتغير"
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};