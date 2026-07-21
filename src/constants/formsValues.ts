import { ForgotPasswordProps, LoginProps, ResetForgottenPasswordProps } from "@/types/forms";
import { MessageRole } from "@/types/global";
import { BrandEntityCreation, CategoryEntityCreation, ColorEntityCreation, MessageEntityCreation, ProductEntityCreation, ProductVariantEntityCreation, SizeEntityCreation } from "@/types/models";

export const loginInItalValues: LoginProps = {
  email: "",
  password: "",
};

export const forgotPasswordInitialValues: ForgotPasswordProps = {
  email: "",
};

export const resetPasswordInitialValues: ResetForgottenPasswordProps = {
  otp: "",
  password: "",
};

export const initialColorCreationValues: ColorEntityCreation = {
  name: "",
};

export const initialSizeCreationValues: SizeEntityCreation = {
  name: "",
};

export const initialCategoryCreationValues: CategoryEntityCreation = {
  name: "",
  description: "",
};

export const initialBrandCreationValues: BrandEntityCreation = {
  name: "",
};

export const initialProductCreationValues: ProductEntityCreation = {
  title: "",
  price: 0,
  summarize: "",
  description: "",
  categoryId: "",
  brandId: "",
  colors: [],
  sizes: [],
};

export const initialVariantCreationValue: ProductVariantEntityCreation = {
  quantity: 1,
  productId: "",
}

export const initialMessageCreationValues: MessageEntityCreation = {
  content: "",
  role: MessageRole.USER,
  chatRoomId: "-1"
}