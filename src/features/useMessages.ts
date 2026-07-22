import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getMessagesByRoomId, receiveAIResponse } from "@/api-client";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { APIResponse } from "@/libraries/react-query/types";
import { ChatRoomEntity, MessageEntity } from "@/types/models";
import { ID } from "@/types/global";
import { CreatedMessageMutationResponse } from "@/types/forms";
import { baseKey as chatRoomBaseKey } from "./useChatRooms"

export const useGetMessagesByRoomId = (chatRoomId: ID) => {
  return useQuery({
    queryKey: ["messages", String(chatRoomId)],
    queryFn: () => getMessagesByRoomId(chatRoomId),
    retry: false,
    enabled: !!chatRoomId,
  });
};

export const useCreateMessage = (chatRoomId: ID, setRoom: (roomID: ID) => void) => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: createMessage,
    onSuccess: (data: APIResponse<CreatedMessageMutationResponse>) => {
      const newMessage = data.data.message;
      const roomId = data.data.roomId
      const createdRoom = data.data.createdRoom

      if (chatRoomId == "-1") {
        setRoom(String(roomId))
      }

      queryClient.setQueryData<APIResponse<MessageEntity[]>>(
        ["messages", String(roomId)],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [...oldData.data, newMessage],
          };
        }
      );

      if (createdRoom)
        queryClient.setQueryData<APIResponse<ChatRoomEntity[]>>(chatRoomBaseKey, (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [createdRoom, ...oldData.data],
          };
        });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إرسال الرسالة", type: "ERROR" });
    },
  });
};

export const useReceiveAiResponse = (chatRoomId: ID) => {
  const queryClient = useQueryClient();
  const { pushToast } = useAppContext();

  return useMutation({
    mutationFn: receiveAIResponse,
    onSuccess: (data: APIResponse<CreatedMessageMutationResponse>) => {
      const newMessage = data.data.message;

      queryClient.setQueryData<APIResponse<MessageEntity[]>>(
        ["messages", String(chatRoomId)],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [...oldData.data, newMessage],
          };
        }
      );
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إرسال الرسالة", type: "ERROR" });
    },
  });
};