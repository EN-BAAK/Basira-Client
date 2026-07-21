import * as Yup from "yup"

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("البريد الإلكتروني المدخل غير صالح")
    .required("يرجى إدخال البريد الإلكتروني الحساب الرسمي"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن لا تقل عن 6 خانات")
    .required("يرجى إدخال كلمة المرور السريّة"),
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .email("البريد الإلكتروني المدخل غير صالح")
    .required("يرجى إدخال البريد الإلكتروني لإرسال رمز التحقق"),
});

export const resetPasswordValidationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "يجب أن يتكون الرمز من أحرف وأرقام فقط")
    .length(6, "يرجى إدخال رمز التحقق كاملاً (6 أحرف/أرقام)")
    .required("رمز التحقق مطلوب لإعادة التعيين"),
  password: Yup.string()
    .min(6, "كلمة المرور الجديدة يجب أن لا تقل عن 6 خانات")
    .required("يرجى إدخال كلمة المرور الجديدة"),
});

export const validationColorModifySchema = Yup.object({
  name: Yup.string()
    .matches(/^#[0-9A-Fa-f]{6}$/, "صيغة رمز اللون غير صالحة (مثال: #FFFFFF)")
    .required("يرجى اختيار أو كتابة رمز اللون (HEX)"),
});

export const validationSizeModifySchema = Yup.object({
  name: Yup.string()
    .min(1, "اسم المقاس لا يمكن أن يكون فارغاً")
    .max(20, "اسم المقاس طويل جداً")
    .required("يرجى إدخال اسم أو رمز المقاس"),
});

export const validationCategoryModifySchema = Yup.object({
  name: Yup.string()
    .min(2, "اسم الفئة يجب أن لا يقل عن حرفين")
    .max(50, "اسم الفئة طويل جداً")
    .required("يرجى إدخال اسم الفئة"),
  description: Yup.string()
    .min(20, "الوصف الكامل يجب أن لا يقل عن 20 حرفاً")
    .required("يرجى إدخال الوصف الكامل للصنف"),
});

export const validationBrandModifySchema = Yup.object({
  name: Yup.string()
    .min(2, "اسم الماركة يجب أن لا يقل عن حرفين")
    .max(50, "اسم الماركة طويل جداً")
    .required("يرجى إدخال اسم الماركة"),
});

export const validationProductModifySchema = Yup.object({
  title: Yup.string()
    .min(3, "عنوان المنتج قصير جداً")
    .max(100, "عنوان المنتج طويل جداً")
    .required("يرجى إدخال عنوان المنتج"),
  price: Yup.number()
    .positive("يجب أن يكون سعر المفرق أكبر من صفر")
    .required("يرجى إدخال سعر المفرق"),
  summarize: Yup.string()
    .min(10, "الوصف المختصر يجب أن لا يقل عن 10 أحرف")
    .required("يرجى إدخال وصف مختصر للمنتج"),
  description: Yup.string()
    .min(20, "الوصف الكامل يجب أن لا يقل عن 20 حرفاً")
    .required("يرجى إدخال الوصف الكامل للمنتج"),
  categoryId: Yup.string()
    .required("يرجى اختيار فئة المنتج"),
  brandId: Yup.string()
    .required("يرجى اختيار الماركة التجارية"),
  colors: Yup.array().of(
    Yup.object({
      id: Yup.string().required(),
      state: Yup.string().oneOf(["old", "new", "remove"]).required(),
    })
  ),
  sizes: Yup.array().of(
    Yup.object({
      id: Yup.string().required(),
      state: Yup.string().oneOf(["old", "new", "remove"]).required(),
    })
  ),
});

export const variantValidationSchema =
  Yup.object().shape({
    colorId: Yup.string().test(
      "at-least-one",
      "يجب اختيار اللون أو المقاس على الأقل لتحديد المتغير",
      function (value) {
        const { sizeId } = this.parent;
        return !!value || !!sizeId;
      }
    ),

    sizeId: Yup.string().test(
      "at-least-one",
      "يجب اختيار اللون أو المقاس على الأقل لتحديد المتغير",
      function (value) {
        const { colorId } = this.parent;
        return !!value || !!colorId;
      }
    ),

    quantity: Yup.number()
      .typeError("يجب إدخال كمية صحيحة كأرقام")
      .min(0, "الكمية المتوفرة لا يمكن أن تكون أقل من 0")
      .required("يرجى إدخال الكمية المتوفرة بالمستودع"),
  });

export const messageValidationSchema =
  Yup.object().shape({
    content: Yup.string()
      .max(200, "الرسالة طويلة جداً")
      .required("يرجى كتابة رسالة"),
  });

export const chatRoomTitleValidationSchema =
  Yup.object().shape({
    title: Yup.string()
      .min(3, "العنوان يجب ان يكون اكثر من 3 احرف")
      .max(20, "العنوان طويل جداً")
      .required("يرجى كتابة العنوان"),
  });