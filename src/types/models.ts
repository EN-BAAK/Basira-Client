import { ID, MessageRole, SelectedItemState } from "./global";

export interface ColorEntity {
  id: ID;
  name: string;
}

export type ColorEntityCreation = {} & Omit<ColorEntity, "id">

export interface SizeEntity {
  id: ID;
  name: string;
}

export type SizeEntityCreation = {} & Omit<SizeEntity, "id">

export type User = {
  id: ID,
  name: string;
  email: string;
  phone: string;
}

export interface CategoryEntity {
  id: ID;
  name: string;
  description?: string;
  imgUrl: string
}

export type CategoryEntityCreation = {} & Omit<CategoryEntity, "id" | "imgUrl">

export interface BrandEntity {
  id: ID;
  name: string;
  imgUrl: string
}

export type BrandEntityCreation = {} & Omit<BrandEntity, "id" | "imgUrl">

export interface ProductEntity {
  id: ID;
  title: string;
  price: number;
  summarize: string;
  description: string;
  imgUrl: string;
  categoryId?: ID,
  brandId?: ID,
  category?: { id: ID; name: string, imgUrl: string };
  brand?: { id: ID; name: string, imgUrl: string };
  colors: { id: ID; name: string }[];
  sizes: { id: ID; name: string }[];
}

export type ProductEntityCreation = Omit<ProductEntity, "id" | "category" | "brand" | "colors" | "sizes" | "imgUrl" | "categoryId" | "brandId"> & {
  categoryId: string;
  brandId: string;
  colors: SelectedItemState[];
  sizes: SelectedItemState[];
};

export type ProductVariantEntity = {
  id: ID,
  productId: ID,
  color?: ColorEntity,
  size?: SizeEntity,
  quantity: number
}

export type ProductVariantEntityCreation = Omit<ProductVariantEntity, "id" | "color" | "size"> & {
  colorId?: ID,
  sizeId?: ID
}

export type ChatRoomEntity = {
  id: ID,
  title: string,
  createdAt: Date
}

export type ChatRoomEntityCreation = Omit<ChatRoomEntity, "id">

export type MessageEntity = {
  id: ID,
  role: MessageRole,
  content: string,
  createdAt: Date
}

export type MessageEntityCreation = Omit<MessageEntity, "id" | "createdAt"> & {
  chatRoomId: ID
}