import { CommonParentProps, ID } from "./global"
import { BrandEntity, CategoryEntity, ChatRoomEntity, ColorEntity, MessageEntity, ProductEntity, ProductVariantEntity, SizeEntity } from "./models"

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular" | "pattern"
}

export type DashboardColorsRowProps = {
  color: ColorEntity,
  onDelete: () => void,
  onEdit: () => void
  isDeleting: boolean
}

export interface DashboardEmptyContentProps {
  title: string;
  desc: string;
  buttonTitle?: string,
  buttonAction?: () => void
}

export interface DashboardErrorContentProps {
  title: string;
  desc: string;
  actionTitle?: string;
  onAction?: () => void;
}

export type DashboardContentProps = {
  isLoading: boolean,
  isEmpty: boolean
  emptyTitle: string,
  emptyDesc: string,
  emptyActionTitle?: string,
  emptyAction?: () => void,
  isError: boolean,
  errorTitle: string,
  errorDesc: string,
  errorActionTitle?: string,
  errorAction?: () => void,
  Skeletons: React.ReactNode
} & CommonParentProps


export type SystemPatternProps = {
  id: string; color?: string; opacity?: number;
}

export type DashboardSizesRowProps = {
  size: SizeEntity,
  onDelete: () => void,
  onEdit: () => void
  isDeleting: boolean
}

export interface DashboardCategoryCardProps {
  category: CategoryEntity;
  onDelete: () => void;
  isDeleting: boolean;
  onEdit: () => void;
}

export interface DashboardBrandCardProps {
  brand: BrandEntity;
  onDelete: () => void;
  isDeleting: boolean;
  onEdit: () => void;
}

export interface DashboardProductCardProps {
  product: ProductEntity;
  onDelete: () => void;
  isDeleting: boolean;
  onEdit: () => void;
  onView: () => void
}

export type FormatTextProps = {
  text: string
}

export type DashboardProductDetailsProps = {
  product: ProductEntity
}

export type DashboardVariantRowProps = {
  variant: ProductVariantEntity;
  onDelete: (variantId: ID) => void;
  onEdit: (id: ID, quantity: number) => void
  colorName?: string;
  sizeName?: string;
  isPending: boolean,
}

export interface DashboardProductVariantsProps {
  productId: ID;
  colors: ColorEntity[];
  sizes: SizeEntity[]
}

export interface DashboardVariantModalProps {
  isOpen: boolean;
  onClose: () => void;
  colors: ColorEntity[];
  sizes: SizeEntity[]
  productId: ID;
  variants: ProductVariantEntity[]
}

export interface DashboardProfSidebarProps {
  activeChat: ID;
  setActiveChat: (id: ID) => void;
  onNewChat: () => void;
  isOpenMobile: boolean;
  closeMobileSidebar: () => void;
  openMobileSidebar: () => void
}

export interface DashboardMessageProps {
  message: MessageEntity,
  username: string
}

export type DashboardChatRoomProps = {
  chatRoomId: ID,
  setChatRoom: (roomId: ID) => void
}

export type DashboardEditChatRoomProps = {
  chatRoom: ChatRoomEntity;
  onSave: (newTitle: string, chatId: ID) => Promise<void>;
  onCancel: () => void;
  isPending?: boolean;
}