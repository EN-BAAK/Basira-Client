"use client";

import React from "react";
import Button from "@/libraries/forms/components/Button";
import { Check, X } from "lucide-react";
import { DashboardEditChatRoomProps } from "@/types/components";
import { Form, Formik, FormikHelpers } from "formik";
import InputField from "@/libraries/forms/components/InputField";
import { chatRoomTitleValidationSchema } from "@/constants/formsValidations";
import SubmitButton from "@/libraries/forms/components/SubmitButton";

const EditChatRoom: React.FC<DashboardEditChatRoomProps> = ({
  chatRoom,
  onSave,
  onCancel,
  isPending = false,
}) => {

  const handleSubmit = async (values: { title: string }, helpers: FormikHelpers<{ title: string }>) => {
    await onSave(values.title, chatRoom.id)
    helpers.setSubmitting(false)
  };

  return (
    <Formik
      initialValues={{ title: chatRoom.title }}
      onSubmit={handleSubmit}
      validationSchema={chatRoomTitleValidationSchema}
      enableReinitialize
    >
      {({ dirty, isSubmitting, isValid }) => (
        <Form
          className="flex items-center gap-1.5 p-1 bg-background rounded-xl border border-primary/30 my-1 animate-in fade-in duration-200"
        >
          <InputField
            type="text"
            disabled={isPending}
            placeholder="عنوان المحادثة..."
            name="title"
          />
          <div className="flex items-center gap-1 shrink-0">
            <SubmitButton
              Icon={Check}
              isSubmitting={isSubmitting || isPending}
              isValid={isValid}
              isDirty={dirty}
              variant="primary"
              className="p-1 h-7 w-7 rounded-lg"
            />

            <Button
              type="button"
              onClick={onCancel}
              icon={X}
              variant="transparent"
              disabled={isPending}
              className="p-1 h-7 w-7"
              iconClassName="w-3.5 h-3.5"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditChatRoom;