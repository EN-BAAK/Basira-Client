import { User } from "@/types/models";

export type Variant = "default" | "secondary" | "destructive" | "outline" | "main";

export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type ToastProps = {
  onClose: () => void;
} & ToastMessage;

export type Warning = {
  message: string;
  btn1?: string;
  btn2: string;
  styleBtn1?: Variant;
  styleBtn2?: Variant;
  handleBtn2: () => void;
};

export type ToastComponentProps = {
  index: number;
  onClose: () => void
} & ToastProps

export type WarningProps = {
  onClose: () => void
} & Warning

export type AppContextProps = {
  pushToast: (toastMessage: ToastMessage) => void;
  showWarning: (warning: Warning) => void;
  isLoggedIn: boolean;
  user: User
}

export type AppProviderProps = {
  children: React.ReactNode
}