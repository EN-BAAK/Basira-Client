import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCategory, deleteCategoryById, getAllCategories, getCategoryById, updateCategory, } from "@/api-client";
import { ID } from "@/types/global";
import { CategoryEntity } from "@/types/models";
import { APIResponse } from "@/libraries/react-query/types";
import { useAppContext } from "@/libraries/project-provider/AppProvider";

const baseKey = ["categories"];

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: baseKey,
    queryFn: getAllCategories,
    retry: false,
  });
};

export const useGetCategoryById = (id: ID) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategoryById(id),
    refetchOnMount: "always",
    gcTime: 0,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: (data: APIResponse<CategoryEntity>) => {
      const newCategory = data.data;

      queryClient.setQueryData<APIResponse<CategoryEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newCategory, ...oldData.data],
        };
      });

      pushToast({ message: "تم إضافة القسم بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/categories`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إضافة القسم", type: "ERROR" });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: (data: APIResponse<CategoryEntity>) => {
      const updatedCategory = data.data;

      queryClient.setQueryData<APIResponse<CategoryEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((cat) =>
            cat.id === updatedCategory.id ? updatedCategory : cat
          ),
        };
      });

      queryClient.setQueryData(["categories", updatedCategory.id], data);

      pushToast({ message: "تم تحديث القسم بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/categories`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية تحديث القسم", type: "ERROR" });
    },
  });
};

export const useDeleteCategoryById = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: deleteCategoryById,
    onSuccess: (data: APIResponse<CategoryEntity>) => {
      const deletedCategory = data?.data;

      queryClient.setQueryData<APIResponse<CategoryEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((cat) => cat.id !== deletedCategory.id),
        };
      });

      queryClient.removeQueries({ queryKey: ["categories", deletedCategory.id] });

      pushToast({ message: "تم حذف القسم بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية حذف القسم", type: "ERROR" });
    },
  });
};