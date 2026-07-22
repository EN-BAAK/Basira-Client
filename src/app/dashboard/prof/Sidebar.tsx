"use client";

import React, { useState } from "react";
import { Plus, X, Pencil, Trash2, Bot } from "lucide-react";
import { DashboardProfSidebarProps } from "@/types/components";
import Button from "@/libraries/forms/components/Button";
import { ID } from "@/types/global";
import { useDeleteChatRoomById, useGetAllChatRooms, useUpdateChatRoomTitle } from "@/features/useChatRooms";
import SidebarLoading from "./SidebarLoading";
import { formatDate } from "@/lib/helpers";
import EditChatRoom from "./EditChatRoom";
import { useAppContext } from "@/libraries/project-provider/AppProvider";

const Sidebar: React.FC<DashboardProfSidebarProps> = ({
  openMobileSidebar,
  activeChat,
  setActiveChat,
  onNewChat,
  isOpenMobile,
  closeMobileSidebar,
}) => {
  const { showWarning } = useAppContext()

  const { mutateAsync: mutateAsyncDelete, isPending: isDeletePending } = useDeleteChatRoomById()
  const { mutateAsync: mutateAsyncUpdate, isPending: isUpdatePending } = useUpdateChatRoomTitle()

  const isPending = isDeletePending || isUpdatePending

  const { data, isFetching } = useGetAllChatRooms();
  const rooms = data?.data || [];

  const [editingChatId, setEditingChatId] = useState<ID | null>(null);

  const handleNewChat = () => {
    onNewChat();
    closeMobileSidebar();
  };

  const handleSelectChat = (chatId: ID) => {
    if (editingChatId === chatId) return;
    setActiveChat(chatId);
    closeMobileSidebar();
  };

  const handleEditSave = async (newTitle: string, chatId: ID) => {
    await mutateAsyncUpdate({ data: newTitle, id: chatId })
    setEditingChatId(null);
  };

  const handleStartEdit = (e: React.MouseEvent, id: ID) => {
    e.stopPropagation();
    setEditingChatId(id);
  };

  const handleDelete = (e: React.MouseEvent, id: ID) => {
    e.stopPropagation();
    showWarning({
      message: `هل انت متأكد من حذف هذه المحادثة؟`,
      btn1: "إغلاق",
      btn2: "حذف نهائي",
      handleBtn2: () => mutateAsyncDelete(id),
    });
  };

  return (
    <React.Fragment>
      {isOpenMobile && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-[997] bg-black/40 backdrop-blur-xs md:hidden animate-in fade-in duration-300"
        />
      )}

      <aside
        className={`
          fixed right-0 top-0 h-screen z-[999] flex flex-col shrink-0 bg-card border-l border-border 
          transition-transform duration-300 ease-in-out w-65 text-right
          ${isOpenMobile ? "translate-x-0" : "translate-x-full"}
          md:static md:translate-x-0 md:h-full md:z-0
        `}
      >
        {!isOpenMobile && (
          <Button
            icon={Bot}
            onClick={openMobileSidebar}
            variant="primary"
            className="md:hidden absolute -left-6 w-fit top-45 z-20 p-1 rounded-xs"
            iconClassName="w-4 h-4"
          />
        )}
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Button
            onClick={handleNewChat}
            label="محادثة جديدة"
            className="justify-start flex-1"
            icon={Plus}
          />

          <Button
            onClick={closeMobileSidebar}
            className="md:hidden block w-fit"
            icon={X}
            variant="transparent"
          />
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <p className="text-[11px] font-bold text-muted uppercase tracking-wider px-2 mb-2 font-sans">
            المحادثات السابقة
          </p>
          {isFetching ? (
            <SidebarLoading />
          ) : (
            rooms.map((chat) => (
              <React.Fragment key={chat.id}>
                {editingChatId === chat.id ? (
                  <EditChatRoom
                    chatRoom={chat}
                    isPending={isPending}
                    onSave={handleEditSave}
                    onCancel={() => setEditingChatId(null)}
                  />
                ) : (
                  <div
                    onClick={() => handleSelectChat(chat.id)}
                    className={`group relative flex items-center justify-between w-full px-3 py-2.5 rounded-xl transition-colors cursor-pointer ${activeChat === chat.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-background2 text-text"
                      }`}
                  >
                    <div className="flex-1 min-w-0 pl-2">
                      <p className="text-sm font-semibold truncate">{chat.title}</p>
                      <p className="text-[11px] text-muted mt-0.5 font-sans">
                        {formatDate(chat.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      <Button
                        type="button"
                        onClick={(e) => handleStartEdit(e, chat.id)}
                        variant="transparent-warning"
                        className="w-fit rounded-none p-1"
                        icon={Pencil}
                        iconClassName="w-3.5 h-3.5"
                        disabled={isPending}
                      />

                      <Button
                        type="button"
                        onClick={(e) => handleDelete(e, chat.id)}
                        variant="transparent-danger"
                        className="w-fit rounded-none p-1"
                        icon={Trash2}
                        iconClassName="w-3.5 h-3.5"
                        disabled={isPending}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))
          )}
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;