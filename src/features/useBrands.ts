import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createBrand, deleteBrandById, getAllBrands, getBrandById, updateBrand, } from "@/api-client";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { APIResponse } from "@/libraries/react-query/types";
import { BrandEntity } from "@/types/models";
import { ID } from "@/types/global";

const baseKey = ["brands"];

export const useGetAllBrands = () => {
  return useQuery({
    queryKey: baseKey,
    queryFn: getAllBrands,
    retry: false,
  });
};

export const useGetBrandById = (id: ID) => {
  return useQuery({
    queryKey: ["brands", id],
    queryFn: () => getBrandById(id),
    refetchOnMount: "always",
    gcTime: 0,
  });
};

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: createBrand,
    onSuccess: (data: APIResponse<BrandEntity>) => {
      const newBrand = data.data;

      queryClient.setQueryData<APIResponse<BrandEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newBrand, ...oldData.data],
        };
      });

      pushToast({ message: "تم إضافة الماركة بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/brands`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إضافة الماركة", type: "ERROR" });
    },
  });
};

export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: updateBrand,
    onSuccess: (data: APIResponse<BrandEntity>) => {
      const updatedBrand = data.data;

      queryClient.setQueryData<APIResponse<BrandEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((brand) =>
            brand.id === updatedBrand.id ? updatedBrand : brand
          ),
        };
      });

      queryClient.setQueryData(["brands", updatedBrand.id], data);

      pushToast({ message: "تم تحديث الماركة بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/brands`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية تحديث الماركة", type: "ERROR" });
    },
  });
};

export const useDeleteBrandById = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: deleteBrandById,
    onSuccess: (data: APIResponse<BrandEntity>) => {
      const deletedBrand = data?.data;

      queryClient.setQueryData<APIResponse<BrandEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((brand) => brand.id !== deletedBrand.id),
        };
      });

      queryClient.removeQueries({ queryKey: ["brands", deletedBrand.id] });

      pushToast({ message: "تم حذف الماركة بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية حذف الماركة", type: "ERROR" });
    },
  });
};