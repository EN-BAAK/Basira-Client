import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getMessagesByRoomId } from "@/api-client";
import { useAppContext } from "@/libraries/project-provider/AppProvider";
import { APIResponse } from "@/libraries/react-query/types";
import { ChatRoomEntity, MessageEntity } from "@/types/models";
import { ID } from "@/types/global";
import { CreatedMessageMutationResponse } from "@/types/forms";
import {baseKey as chatRoomBaseKey} from "./useChatRooms"

export const useGetMessagesByRoomId = (chatRoomId: ID) => {
  return useQuery({
    queryKey: ["messages", chatRoomId],
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
      const newMessages = data.data.messages || [];
      const roomId = data.data.roomId
      const createdRoom = data.data.createdRoom

      if (chatRoomId == "-1")
        setRoom(roomId)

      queryClient.setQueryData<APIResponse<MessageEntity[]>>(
        ["messages", roomId],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            data: [...oldData.data, ...newMessages],
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

      pushToast({ message: "تم إرسال الرسالة بنجاح", type: "SUCCESS" });
    },
    onError: () => {
      pushToast({ message: "فشلت عملية إرسال الرسالة", type: "ERROR" });
    },
  });
};