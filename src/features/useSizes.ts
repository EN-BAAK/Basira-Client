import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {createSizeSettings,deleteSizeByIdSettings,getAllSizesSettings,getSizeByIdSettings,updateSizeSettings,} from "@/api-client";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { APIResponse } from "@/libraries/react-query/types";
import { SizeEntity } from "@/types/models";
import { ID } from "@/types/global";

const baseKey = ["sizes-settings"];

export const useGetAllSizesSettings = () => {
  return useQuery({
    queryKey: baseKey,
    queryFn: getAllSizesSettings,
    retry: false,
  });
};

export const useGetSizeByIdSettings = (id: ID) => {
  return useQuery({
    queryKey: ["sizes-settings", id],
    queryFn: () => getSizeByIdSettings(id),
    refetchOnMount: "always",
    gcTime: 0,
  });
};

export const useCreateSizeSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: createSizeSettings,
    onSuccess: (data: APIResponse<SizeEntity>) => {
      const newSize = data.data;

      queryClient.setQueryData<APIResponse<SizeEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newSize, ...oldData.data],
        };
      });

      pushToast({ message: "تم إضافة المقاس بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/sizes`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إضافة المقاس", type: "ERROR" });
    },
  });
};

export const useUpdateSizeSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: updateSizeSettings,
    onSuccess: (data: APIResponse<SizeEntity>) => {
      const updatedSize = data.data;

      queryClient.setQueryData<APIResponse<SizeEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((size) =>
            size.id === updatedSize.id ? updatedSize : size
          ),
        };
      });

      queryClient.setQueryData(["sizes-settings", updatedSize.id], data);

      pushToast({ message: "تم تحديث المقاس بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/sizes`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية تحديث المقاس", type: "ERROR" });
    },
  });
};

export const useDeleteSizeByIdSettings = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: deleteSizeByIdSettings,
    onSuccess: (data: APIResponse<SizeEntity>) => {
      const deletedSize = data?.data;

      queryClient.setQueryData<APIResponse<SizeEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((size) => size.id !== deletedSize.id),
        };
      });

      queryClient.removeQueries({ queryKey: ["sizes-settings", deletedSize.id] });

      pushToast({ message: "تم حذف المقاس بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية حذف المقاس", type: "ERROR" });
    },
  });
};