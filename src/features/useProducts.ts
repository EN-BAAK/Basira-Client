import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createProductSettings, deleteProductByIdSettings, getAllProductsSettings, getProductByIdSettings, updateProductSettings, } from "@/api-client";
import { useOffsetContext } from "@/libraries/offset/OffsetsProvider";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { UpdateOffsetUnitProcess } from "@/libraries/offset/types";
import { APIResponse } from "@/libraries/react-query/types";
import { ProductEntity } from "@/types/models";
import { ID } from "@/types/global";

const adminBaseKey = "products-settings";

export const useGetAllProductsSettings = (limit: number, search?: string) => {
  const { getOffsetUnit } = useOffsetContext();
  const offsetUnit = getOffsetUnit([adminBaseKey, ""]);

  return useInfiniteQuery({
    queryKey: [adminBaseKey, { search }],
    queryFn: ({ pageParam = 1 }) =>
      getAllProductsSettings({ limit, page: pageParam, offsetUnit, search }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.data.hasMore
        ? lastPage.data.nextPage
        : undefined,
    retry: false,
  });
};

export const useGetProductByIdSettings = (id: ID) => {
  return useQuery({
    queryKey: [adminBaseKey, id],
    queryFn: () => getProductByIdSettings(id.toString()),
    refetchOnMount: "always",
    gcTime: 0,
  });
};

export const useCreateProductSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();
  const { updateOffsetUnit } = useOffsetContext();

  return useMutation({
    mutationFn: createProductSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [adminBaseKey] });

      updateOffsetUnit([adminBaseKey, ""], UpdateOffsetUnitProcess.UP);
      pushToast({ message: "تم إضافة المنتج بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/products`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إضافة المنتج", type: "ERROR" });
    },
  });
};

export const useUpdateProductSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: updateProductSettings,
    onSuccess: (data: APIResponse<ProductEntity>) => {
      const updatedProduct = data.data;

      queryClient.setQueryData([adminBaseKey, updatedProduct.id], data);
      queryClient.invalidateQueries({ queryKey: [adminBaseKey] });

      pushToast({ message: "تم تحديث المنتج بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/products`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية تحديث المنتج", type: "ERROR" });
    },
  });
};

export const useDeleteProductByIdSettings = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();
  const { updateOffsetUnit } = useOffsetContext();

  return useMutation({
    mutationFn: deleteProductByIdSettings,
    onSuccess: (data: APIResponse<ProductEntity>) => {
      const deletedProduct = data?.data;

      queryClient.removeQueries({ queryKey: [adminBaseKey, deletedProduct.id] });
      queryClient.invalidateQueries({ queryKey: [adminBaseKey] });

      updateOffsetUnit([adminBaseKey, ""], UpdateOffsetUnitProcess.DOWN);
      pushToast({ message: "تم حذف المنتج بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية حذف المنتج", type: "ERROR" });
    },
  });
};