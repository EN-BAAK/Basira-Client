"use client"

import React from "react"
import Link from "next/link"
import { Formik, Form, FormikHelpers } from "formik"
import { Mail, Lock, Tag } from "lucide-react"
import InputField from "@/libraries/forms/components/InputField"
import SubmitButton from "@/libraries/forms/components/SubmitButton"
import { LoginProps } from "@/types/forms"
import { useLogin } from "@/features/useAuth"
import { loginInItalValues } from "@/constants/formsValues"
import { loginValidationSchema } from "@/constants/formsValidations"

const LoginPage: React.FC = () => {
  const { mutateAsync, isPending } = useLogin()

  const onSubmit = async (values: LoginProps, formik: FormikHelpers<LoginProps>) => {
    await mutateAsync(values)
    formik.setSubmitting(false)
  }

  return (
    <div className="flex-1 flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="flex lg:hidden items-center justify-center gap-2.5 mb-8">
          <span
            className="text-2xl font-bold text-foreground brand">
            منصة بصيرة
          </span>
        </div>

        <div className="mb-8 text-right">
          <h1
            className="text-2xl font-bold text-foreground">
            مرحباً بك مجدداً
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            سجّل دخولك للوصول إلى حسابك ومتابعة طلباتك
          </p>
        </div>

        <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 mb-6 text-right">
          <div>
            <div className="flex items-center gap-3">
              <Tag size={16} className="text-accent shrink-0" />
              <span className="text-sm font-semibold text-accent">
                وكلاء حصريون يسهلون عملك
              </span>
            </div>

            <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
              قم بادارة متجرك الالكتروني بسهولة بمساعدة مجموعة من الوكلاء الذين يسهلون عملك و يدعموك بخبرة عالية
            </p>
          </div>
        </div>

        <Formik
          initialValues={loginInItalValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className="space-y-5 text-right">

              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">
                  البريد الإلكتروني
                </label>
                <InputField
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  Icon={<Mail size={15} />}
                  dir="ltr"
                  innerDivStyle="relative"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">
                  كلمة المرور
                </label>
                <InputField
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="••••••••"
                  Icon={<Lock size={15} />}
                  dir="ltr"
                  innerDivStyle="relative"
                />
              </div>

              <div className="flex items-center justify-between text-sm pt-1">
                <Link
                  href="/forgot-password"
                  className="text-accent hover:underline text-xs transition duration-300"
                >
                  نسيت كلمة المرور؟
                </Link>
                <label className="flex items-center gap-2 text-muted-foreground text-xs cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="rounded accent-accent w-4 h-4 cursor-pointer"
                  />
                  تذكرني على هذا الجهاز
                </label>
              </div>

              <SubmitButton
                isSubmitting={isSubmitting || isPending}
                isDirty={dirty}
                isValid={isValid}
                variant="primary"
                label="تسجيل الدخول"
                submittingLabel="جاري التحقق من الحساب..."
                disabledLabel="يرجى ملء البيانات بشكل صحيح"
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default LoginPage