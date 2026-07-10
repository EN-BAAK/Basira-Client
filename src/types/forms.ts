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