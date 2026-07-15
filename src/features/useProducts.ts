import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createProductSettings, deleteProductByIdSettings, getAllProductsSettings, getProductByIdSettings, updateProductSettings, } from "@/api-client";
import { useOffsetContext } from "@/libraries/offset/OffsetsProvider";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { UpdateOffsetUnitProcess } from "@/libraries/offset/types";
import { APIResponse, InfinityResponse } from "@/libraries/react-query/types";
import { ProductEntity } from "@/types/models";
import { ID } from "@/types/global";

const adminBaseKey = "products-settings";

export const useGetAllProductsSettings = (limit: number, search?: string) => {
  const { getOffsetUnit } = useOffsetContext();
  const offsetUnit = getOffsetUnit([adminBaseKey, search || ""]);

  return useInfiniteQuery({
    queryKey: [adminBaseKey, search],
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
    onSuccess: (data: APIResponse<ProductEntity>) => {
      const newProduct = data.data;

      queryClient.setQueriesData<InfinityResponse<ProductEntity>>({ queryKey: [adminBaseKey, ""] }, (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page, index) =>
            index === 0
              ? {
                ...page,
                data: {
                  ...page.data,
                  items: [newProduct, ...page.data.items],
                },
              }
              : page
          ),
        };
      }
      );

      updateOffsetUnit([adminBaseKey], UpdateOffsetUnitProcess.UP);
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

      queryClient.setQueriesData<InfinityResponse<ProductEntity>>({ queryKey: [adminBaseKey, ""] }, (oldData) => {
        if (!oldData) return oldData;
        console.log("oldData", oldData)
        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            data: {
              ...page.data,
              items: page.data.items.map((product) =>
                product.id === updatedProduct.id
                  ? updatedProduct
                  : product
              ),
            },
          })),
        };
      }
      );

      queryClient.setQueryData([adminBaseKey, updatedProduct.id], data);

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
      const deletedProduct = data.data;

      queryClient.setQueriesData<InfinityResponse<ProductEntity>>(
        { queryKey: [adminBaseKey, ""] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: {
                ...page.data,
                items: page.data.items.filter(
                  (product) => product.id !== deletedProduct.id
                ),
              },
            })),
          };
        }
      );

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