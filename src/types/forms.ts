import { ID } from "./global"
import { ChatRoomEntity, MessageEntity, ProductVariantEntity } from "./models"

export type LoginProps = {
  email: string,
  password: string
}

export type VerifyAccountProps = {
  otp: string
}

export type VerifyAccountAPIProps = {
  email: string
} & VerifyAccountProps

export type ForgotPasswordProps = {
  email: string
}

export type ResetForgottenPasswordProps = {
  otp: string,
  password: string
}

export interface AdminProductsQueryParams {
  limit: number;
  page: number;
  offsetUnit: number;
  search?: string;
}

interface VariantOption {
  key: ID;
  value: string;
}

export interface VariantSelectorFieldProps {
  sizeFieldName: string;
  colorFieldName: string;
  label?: string;
  existingVariants: ProductVariantEntity[],
  colors: VariantOption[];
  sizes: VariantOption[];
  styles?: string;
  labelStyle?: string;
}

export type CreatedMessageMutationResponse = {
  message: MessageEntity,
  roomId: ID,
  createdRoom?: ChatRoomEntity
}

export type ReceiveAIResponseMutationResponse = {
  message: MessageEntity,
  roomId: ID,
}