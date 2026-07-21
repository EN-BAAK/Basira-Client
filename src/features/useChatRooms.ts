import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createChatRoom, deleteChatRoom, getAllChatRooms, updateChatRoom } from "@/api-client";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { APIResponse } from "@/libraries/react-query/types";
import { ChatRoomEntity } from "@/types/models";

export const baseKey = ["chatRooms"];

export const useGetAllChatRooms = () => {
  return useQuery({
    queryKey: baseKey,
    queryFn: getAllChatRooms,
    retry: false,
  });
};

export const useCreateChatRoom = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: createChatRoom,
    onSuccess: (data: APIResponse<ChatRoomEntity>) => {
      const newChatRoom = data.data;

      queryClient.setQueryData<APIResponse<ChatRoomEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: [newChatRoom, ...oldData.data],
        };
      });

      pushToast({ message: "تم إضافة غرفة الدردشة بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إضافة غرفة الدردشة", type: "ERROR" });
    },
  });
};

export const useUpdateChatRoomTitle = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: updateChatRoom,
    onSuccess: (data: APIResponse<ChatRoomEntity>) => {
      const updatedChatRoom = data.data;

      queryClient.setQueryData<APIResponse<ChatRoomEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((room) =>
            room.id === updatedChatRoom.id ? updatedChatRoom : room
          ),
        };
      });

      queryClient.setQueryData(["chatRooms", updatedChatRoom.id], data);

      pushToast({ message: "تم تحديث غرفة الدردشة بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية تحديث غرفة الدردشة", type: "ERROR" });
    },
  });
};

export const useDeleteChatRoomById = () => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: deleteChatRoom,
    onSuccess: (data: APIResponse<ChatRoomEntity>) => {
      const deletedChatRoom = data?.data;

      queryClient.setQueryData<APIResponse<ChatRoomEntity[]>>(baseKey, (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.filter((room) => room.id !== deletedChatRoom.id),
        };
      });

      queryClient.removeQueries({ queryKey: ["chatRooms", deletedChatRoom.id] });

      pushToast({ message: "تم حذف غرفة الدردشة بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية حذف غرفة الدردشة", type: "ERROR" });
    },
  });
};