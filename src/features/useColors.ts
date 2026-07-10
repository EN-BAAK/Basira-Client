import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {createColorSettings,deleteColorByIdSettings,getAllColorsSettings,getColorByIdSettings,updateColorSettings,} from "@/api-client";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { ColorEntity } from "@/types/models";
import { APIResponse } from "@/libraries/react-query/types";

const baseKey = ["colors-settings"];

export const useGetAllColorsSettings = () => {
  return useQuery({
    queryKey: baseKey,
    queryFn: getAllColorsSettings,
    retry: false,
  });
};

export const useGetColorByIdSettings = (id: number) => {
  return useQuery({
    queryKey: ["colors-settings", id],
    queryFn: () => getColorByIdSettings(id),
    refetchOnMount: "always",
    gcTime: 0,
  });
};

export const useCreateColorSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: createColorSettings,
    onSuccess: (data: APIResponse<ColorEntity>) => {
      const newColor = data.data;

      queryClient.setQueryData<APIResponse<ColorEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newColor, ...oldData.data],
        };
      });

      pushToast({ message: "تم إضافة اللون بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/colors`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إضافة اللون", type: "ERROR" });
    },
  });
};

export const useUpdateColorSettings = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: updateColorSettings,
    onSuccess: (data: APIResponse<ColorEntity>) => {
      const updatedColor = data.data;

      queryClient.setQueryData<APIResponse<ColorEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((color) =>
            color.id === updatedColor.id ? updatedColor : color
          ),
        };
      });

      queryClient.setQueryData(["colors-settings", updatedColor.id], data);

      pushToast({ message: "تم تحديث اللون بنجاح", type: "SUCCESS" });
      router.push(`/dashboard/colors`);
    },
    onError: () => {
      pushToast({ message: "فشلت عملية تحديث اللون", type: "ERROR" });
    },
  });
};

export const useDeleteColorByIdSettings = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: deleteColorByIdSettings,
    onSuccess: (data: APIResponse<ColorEntity>) => {
      const deletedColor = data?.data;

      queryClient.setQueryData<APIResponse<ColorEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((color) => color.id !== deletedColor.id),
        };
      });

      queryClient.removeQueries({ queryKey: ["colors-settings", deletedColor.id] });

      pushToast({ message: "تم حذف اللون بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية حذف اللون", type: "ERROR" });
    },
  });
};