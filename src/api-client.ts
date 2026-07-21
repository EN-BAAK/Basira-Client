import { setSessionItem } from "./lib/helpers";
import { APIResponse, UpdateItemType, UpdateItemWithFormData } from "./libraries/react-query/types";
import { AdminProductsQueryParams, CreatedMessageMutationResponse, ForgotPasswordProps, LoginProps, ResetForgottenPasswordProps } from "./types/forms";
import { CachedUser, ID } from "./types/global";
import { BrandEntity, CategoryEntity, ChatRoomEntity, ChatRoomEntityCreation, ColorEntity, ColorEntityCreation, MessageEntity, MessageEntityCreation, ProductEntity, ProductVariantEntity, ProductVariantEntityCreation, SizeEntity, SizeEntityCreation, User } from "./types/models";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
const API_URL = `${BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`
const USER_INFO = process.env.NEXT_PUBLIC_USER_INFO!

let cachedUser: CachedUser = null;
const CACHE_DURATION = 60 * 1000;

export const validateAuthenticationWithCaching = async (
  token: string
): Promise<APIResponse<User> | null> => {
  const now = Date.now();

  if (cachedUser && now - cachedUser.timestamp < CACHE_DURATION) {
    return {
      success: true,
      message: "User fetched from cache",
      data: cachedUser.data,
    };
  }

  try {
    const response = await fetch(`${API_URL}/auth/verify-protected-middleware`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const responseBody = await response.json();

    if (!response.ok) return null;

    cachedUser = { data: responseBody.data, timestamp: now };

    return responseBody;
  } catch {
    return null;
  }
};

export const validateAuthentication = async (): Promise<APIResponse<User>> => {
  const response = await fetch(`${API_URL}/auth/verify-me`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  if (responseBody.data) {
    setSessionItem(USER_INFO, {
      username: `${responseBody.data.firstName} ${responseBody.data.lastName}`,
      email: responseBody.data.email
    });
  }

  return responseBody;
};

export const login = async (formData: LoginProps) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const forgotPassword = async (formData: ForgotPasswordProps) => {
  const response = await fetch(`${API_URL}/auth/forgot-password/${formData.email}`, {
    method: "PATCH",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const resetForgottenPassword = async (formData: ResetForgottenPasswordProps) => {
  const response = await fetch(`${API_URL}/auth/reset-password`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const logout = async () => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
};

export const changePassword = async (data: Omit<ResetForgottenPasswordProps, "confirmPassword">) => {
  const response = await fetch(`${API_URL}/auth/change-password`, {
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const responseBody = await response.json();

  if (!response.ok) throw new Error(responseBody.message);

  return responseBody;
}


export const getAllColorsSettings = async (): Promise<APIResponse<ColorEntity[]>> => {
  const response = await fetch(`${API_URL}/colors`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch colors");
  return responseBody;
};

export const getColorByIdSettings = async (id: number): Promise<APIResponse<ColorEntity>> => {
  const response = await fetch(`${API_URL}/colors/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch color");
  return responseBody;
};

export const createColorSettings = async (data: ColorEntityCreation): Promise<APIResponse<ColorEntity>> => {
  const response = await fetch(`${API_URL}/colors`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to create color");
  return responseBody;
};

export const updateColorSettings = async ({ id, data }: UpdateItemType<ColorEntity>): Promise<APIResponse<ColorEntity>> => {
  const response = await fetch(`${API_URL}/colors/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to update color");
  return responseBody;
};

export const deleteColorByIdSettings = async (id: ID): Promise<APIResponse<ColorEntity>> => {
  const response = await fetch(`${API_URL}/colors/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to delete color");
  return responseBody;
};

export const getAllSizesSettings = async (): Promise<APIResponse<SizeEntity[]>> => {
  const response = await fetch(`${API_URL}/sizes`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch sizes");
  return responseBody;
};

export const getSizeByIdSettings = async (id: ID): Promise<APIResponse<SizeEntity>> => {
  const response = await fetch(`${API_URL}/sizes/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch size");
  return responseBody;
};

export const createSizeSettings = async (data: SizeEntityCreation): Promise<APIResponse<SizeEntity>> => {
  const response = await fetch(`${API_URL}/sizes`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to create size");
  return responseBody;
};

export const updateSizeSettings = async ({ id, data }: UpdateItemType<SizeEntity>): Promise<APIResponse<SizeEntity>> => {
  const response = await fetch(`${API_URL}/sizes/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to update size");
  return responseBody;
};

export const deleteSizeByIdSettings = async (id: ID): Promise<APIResponse<SizeEntity>> => {
  const response = await fetch(`${API_URL}/sizes/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to delete size");
  return responseBody;
};


export const getAllCategories = async (): Promise<APIResponse<CategoryEntity[]>> => {
  const response = await fetch(`${API_URL}/categories`);

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch categories");
  return responseBody;
};

export const getCategoryById = async (id: ID): Promise<APIResponse<CategoryEntity>> => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch category");
  return responseBody;
};

export const createCategory = async (formData: FormData): Promise<APIResponse<CategoryEntity>> => {
  const response = await fetch(`${API_URL}/categories`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to create category");
  return responseBody;
};

export const updateCategory = async ({ id, data }: UpdateItemWithFormData): Promise<APIResponse<CategoryEntity>> => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to update category");
  return responseBody;
};

export const deleteCategoryById = async (id: ID): Promise<APIResponse<CategoryEntity>> => {
  const response = await fetch(`${API_URL}/categories/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to delete category");
  return responseBody;
};

export const getAllBrands = async (): Promise<APIResponse<BrandEntity[]>> => {
  const response = await fetch(`${API_URL}/brands`);

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch brands");
  return responseBody;
};

export const getBrandById = async (id: ID): Promise<APIResponse<BrandEntity>> => {
  const response = await fetch(`${API_URL}/brands/${id}`, {
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch brand");
  return responseBody;
};

export const createBrand = async (formData: FormData): Promise<APIResponse<BrandEntity>> => {
  const response = await fetch(`${API_URL}/brands`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to create brand");
  return responseBody;
};

export const updateBrand = async ({ id, data }: UpdateItemWithFormData): Promise<APIResponse<BrandEntity>> => {
  const response = await fetch(`${API_URL}/brands/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data,
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to update brand");
  return responseBody;
};

export const deleteBrandById = async (id: ID): Promise<APIResponse<BrandEntity>> => {
  const response = await fetch(`${API_URL}/brands/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to delete brand");
  return responseBody;
};

export const getAllProductsSettings = async ({ limit, page, offsetUnit = 0, search }: AdminProductsQueryParams) => {
  let url = `${API_URL}/products/settings?p=${page}&l=${limit}&o=${offsetUnit}`;
  if (search) url += `&s=${encodeURIComponent(search)}`;

  const response = await fetch(url, { credentials: "include" });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch products settings");
  return responseBody;
};

export const getProductByIdSettings = async (id: ID): Promise<APIResponse<ProductEntity>> => {
  const response = await fetch(`${API_URL}/products/${id}/settings`, { credentials: "include" });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to fetch product settings");
  return responseBody;
};

export const createProductSettings = async (formData: FormData): Promise<APIResponse<ProductEntity>> => {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to create product");
  return responseBody;
};

export const updateProductSettings = async ({ id, data }: UpdateItemWithFormData): Promise<APIResponse<ProductEntity>> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "PUT",
    credentials: "include",
    body: data,
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to update product");
  return responseBody;
};

export const deleteProductByIdSettings = async (id: ID): Promise<APIResponse<ProductEntity>> => {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "Failed to delete product");
  return responseBody;
};

export async function getAllProductVariantsSettings(productId: ID): Promise<APIResponse<ProductVariantEntity[]>> {
  const response = await fetch(`${API_URL}/variants/product/${productId}`, {
    credentials: "include",
    method: "GET",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية جلب المتغيرات");
  return responseBody;
}

export async function createProductVariantSettings(data: ProductVariantEntityCreation): Promise<APIResponse<ProductVariantEntity>> {
  const response = await fetch(`${API_URL}/variants`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية إضافة المتغير");
  return responseBody;
}

export async function updateProductVariantQuantitySettings({ id, data, }: UpdateItemType<number>): Promise<APIResponse<ProductVariantEntity>> {
  const response = await fetch(`${API_URL}/variants/${id}/quantity`, {
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({ quantity: data }),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية تحديث المتغير");
  return responseBody;
}

export async function deleteProductVariantByIdSettings(id: string): Promise<APIResponse<ProductVariantEntity>> {
  const response = await fetch(`${API_URL}/variants/${id}`, {
    credentials: "include",
    method: "DELETE",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية حذف المتغير");
  return responseBody;
}

export async function getAllChatRooms(): Promise<APIResponse<ChatRoomEntity[]>> {
  const response = await fetch(`${API_URL}/rooms`, {
    credentials: "include",
    method: "GET",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية جلب غرف الدردشة");
  return responseBody;
}

export async function createChatRoom(data: ChatRoomEntityCreation): Promise<APIResponse<ChatRoomEntity>> {
  const response = await fetch(`${API_URL}/rooms`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية إضافة الغرفة");
  return responseBody;
}

export async function updateChatRoom({ id, data, }: UpdateItemType<string>): Promise<APIResponse<ChatRoomEntity>> {
  const response = await fetch(`${API_URL}/rooms/${id}`, {
    credentials: "include",
    method: "PUT",
    headers: { "Content-Type": "application/json", },
    body: JSON.stringify({ title: data }),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية تحديث الغرفة");
  return responseBody;
}

export async function deleteChatRoom(id: ID): Promise<APIResponse<ChatRoomEntity>> {
  const response = await fetch(`${API_URL}/rooms/${id}`, {
    credentials: "include",
    method: "DELETE",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية حذف الغرفة");
  return responseBody;
}

export async function getMessagesByRoomId(chatRoomId: ID): Promise<APIResponse<MessageEntity[]>> {
  const response = await fetch(`${API_URL}/messages/room/${chatRoomId}`, {
    credentials: "include",
    method: "GET",
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية جلب الرسائل");
  return responseBody;
}

export async function createMessage(data: MessageEntityCreation): Promise<APIResponse<CreatedMessageMutationResponse>> {
  const { chatRoomId, ...body } = data;
  const response = await fetch(`${API_URL}/messages/room/${chatRoomId}`, {
    credentials: "include",
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const responseBody = await response.json();
  if (!response.ok) throw new Error(responseBody.message || "فشلت عملية إرسال الرسالة");
  return responseBody;
}