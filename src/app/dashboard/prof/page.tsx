"use client";

import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { ID } from "@/types/global";
import ChatRoom from "./ChatRoom";

const ChatPage: React.FC = () => {
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [activeChat, setActiveChat] = useState<ID>("-1");

  const startNewChat = () => setActiveChat("-1");

  return (
    <div className="flex h-full min-h-[550px] bg-background text-right">
      <Sidebar
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        onNewChat={startNewChat}
        isOpenMobile={isOpenMobile}
        closeMobileSidebar={() => setIsOpenMobile(false)}
        openMobileSidebar={() => setIsOpenMobile(true)}
      />

      <div className="flex-1 flex flex-col min-w-0 bg-background2/30">
        <ChatRoom chatRoomId={activeChat} setChatRoom={setActiveChat} />

        <p className="text-center text-[11px] pt-2 text-muted-foreground font-sans">
          بصيرة — RAG + Text-to-SQL لتحليل بياناتك المالية
        </p>
      </div>
    </div>
  );
};

export default ChatPage;