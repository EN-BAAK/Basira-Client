import { LucideIcon } from "lucide-react"

type SelectOption = {
  key: string;
  value: string;
}

export type Variant =
  | "primary"
  | "primary-outline"
  | "accent"
  | "accent-outline"
  | "success"
  | "success-outline"
  | "danger"
  | "danger-outline"
  | "warning"
  | "warning-outline"
  | "info"
  | "info-outline"
  | "transparent"
  | "transparent-outline"
  | "primary-gradient"
  | "primary-gradient-outline"
  | "accent-gradient"
  | "accent-gradient-outline"

type Input = "text" | "color" | "number" | "password" | "email";

export type SubmitButtonProps = {
  isSubmitting: boolean
  isDirty: boolean
  isValid: boolean
  label?: string
  submittingLabel?: string
  disabledLabel?: string
  className?: string
  onClick?: () => void
  variant?: Variant
  Icon?: LucideIcon;
  iconStyle?: string;
}

export interface BaseFieldProps {
  name: string;
  label?: string;
  styles?: string;
  labelStyle?: string;
  innerDivStyle?: string;
  Icon?: React.ReactNode;
  iconStyle?: string;
  required?: boolean
  dir?: "ltr" | "rtl";
  disabled?: boolean;
}

export interface OtpInputProps {
  name: string;
  length: number;
  numericOnly?: boolean;
  boxSize?: string;
  className?: string;
}

export interface BaseInputProps {
  styles?: string;
  placeholder?: string
}

export interface CheckBoxFieldProps extends BaseFieldProps {
  inputClasses?: string,
}

export interface InputFieldProps extends BaseFieldProps {
  type: Input;
  inputMode?: "numeric" | "";
  placeholder?: string;
  autoComplete?: "on" | "off";
  inputStyle?: string
}


export interface IconSelectionFieldProps {
  name: string;
  label?: string;
  styles?: string;
  labelStyle?: string;
  innerDivStyle?: string;
  disabled?: boolean;
}

export interface TextAreaFieldProps extends BaseFieldProps {
  placeholder?: string;
}

export interface SelectorFieldProps extends BaseFieldProps {
  options: SelectOption[];
  inputClasses?: string;
}

export interface FileInputFieldProps extends BaseFieldProps {
  accept?: string;
}

export type TextErrorProps = {
  msg: string;
};

export type SelectImageFieldProps = {
  value?: File | null | string;
  setValue: React.Dispatch<React.SetStateAction<File | undefined | null | string>>;
  label?: string;
  setIsImageChanged?: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
  isLoading?: boolean;
};

export type SelectorProps = {
  data: SelectOption[],
  setFunction: (value: string) => void
} & BaseInputProps

export interface CustomButtonProps {
  label?: string
  className?: string
  variant?: Variant
  onClick?: () => void
  icon?: LucideIcon
  iconClassName?: string,
  disabled?: boolean,
  type?: "button" | "submit"
}

export interface MultiSelectorFieldProps extends BaseFieldProps {
  maxSelection?: number;
  options: SelectOption[]
}

export type ChoiceOption = {
  id: string;
  key: string;
};

export type AdvancedMultiSelectFieldStateValue = {
  id: string;
  state: "old" | "new" | "remove";
};

export interface AdvancedMultiSelectFieldProps {
  name: string;
  label?: string;
  options: ChoiceOption[];
  styles?: string;
  labelStyle?: string;
  innerDivStyle?: string;
  isColor?: boolean
}