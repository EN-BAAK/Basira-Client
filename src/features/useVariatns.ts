import { useMutation, useQuery, useQueryClient, } from "@tanstack/react-query";
import { createProductVariantSettings, deleteProductVariantByIdSettings, getAllProductVariantsSettings, updateProductVariantQuantitySettings, } from "@/api-client";
import { useOffsetContext } from "@/libraries/offset/OffsetsProvider";
import { UpdateOffsetUnitProcess } from "@/libraries/offset/types";
import { ID } from "@/types/global";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { APIResponse } from "@/libraries/react-query/types";
import { ProductVariantEntity } from "@/types/models";

const adminBaseKey = "variants-settings";

export const useGetAllProductVariantsSettings = (productId: ID) => {
  return useQuery({
    queryKey: [adminBaseKey, "list", productId],
    queryFn: () => getAllProductVariantsSettings(productId.toString()),
    refetchOnMount: "always",
  });
}

export const useCreateProductVariantSettings = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext()

  return useMutation({
    mutationFn: createProductVariantSettings,
    onSuccess: (response) => {
      const newVariant = response.data;

      queryClient.setQueryData(
        [adminBaseKey, "list", newVariant.productId.toString()],
        (oldData: APIResponse<ProductVariantEntity[]> | undefined) => {
          console.log("OLD data", oldData)
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: [...oldData.data, newVariant],
          };
        }
      );

      pushToast({
        message: "تم إضافة متغير المنتج بنجاح",
        type: "SUCCESS",
      });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إضافة متغير المنتج, ربما يكون المنتج موجود مسبقاً", type: "ERROR" })
    },
  });
}

export const useUpdateProductVariantQuantitySettings = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext()

  return useMutation({
    mutationFn: updateProductVariantQuantitySettings,
    onSuccess: (response) => {
      const updatedVariant = response.data;

      queryClient.setQueryData(
        [adminBaseKey, "list", updatedVariant.productId.toString()],
        (oldData: APIResponse<ProductVariantEntity[]> | undefined) => {
          console.log("OLD data", oldData)
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.map((variant) =>
              variant.id === updatedVariant.id
                ? updatedVariant
                : variant
            ),
          };
        }
      );

      queryClient.setQueryData([adminBaseKey, updatedVariant.id], response);
      pushToast({ message: "تم تحديث كمية المنتج بنجاح", type: "SUCCESS", });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية تحديث كمية المنتج", type: "ERROR" })
    },
  });
}

export const useDeleteProductVariantByIdSettings = () => {
  const queryClient = useQueryClient();
  const { updateOffsetUnit } = useOffsetContext();
  const { pushToast } = useAppContext()

  return useMutation({
    mutationFn: (id: ID) => deleteProductVariantByIdSettings(id.toString()),
    onSuccess: (response) => {
      const deletedVariant = response.data;

      queryClient.setQueryData(
        [adminBaseKey, "list", deletedVariant.productId.toString()],
        (oldData: APIResponse<ProductVariantEntity[]> | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            data: oldData.data.filter(
              (variant) => variant.id !== deletedVariant.id
            ),
          };
        }
      );

      queryClient.removeQueries({ queryKey: [adminBaseKey, deletedVariant.id.toString()], });

      updateOffsetUnit([adminBaseKey, ""], UpdateOffsetUnitProcess.DOWN);
      pushToast({ message: "تم حذف متغير المنتج بنجاح", type: "SUCCESS", });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية حذف متغير المنتج", type: "ERROR" })
    },
  });
}