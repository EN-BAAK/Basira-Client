"use client";

import React from "react";
import { Bot } from "lucide-react";
import { DashboardMessageProps } from "@/types/components";
import { formatDate } from "@/lib/helpers";

const Message: React.FC<DashboardMessageProps> = ({ message }) => {
  const isUser = message.role === "user";

  function renderMd(text: string) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**") ? (
        <strong key={i} className="font-bold text-text">
          {p.slice(2, -2)}
        </strong>
      ) : (
        <span key={i}>{p}</span>
      )
    );
  }

  return (
    <div className={`flex items-start gap-3 text-right ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${isUser
          ? "bg-gradient-to-br from-primary to-accent text-reversed"
          : "bg-card border border-border text-primary"
          }`}
      >
        {isUser ? "م" : <Bot className="w-4 h-4" />}
      </div>

      <div className={`max-w-[75%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${isUser
            ? "bg-primary text-reversed rounded-tr-none"
            : "bg-card border border-border text-text rounded-tl-none"
            }`}
        >
          {message.content.split("\n").map((line, li) => (
            <p key={li} className={li > 0 ? "mt-1" : ""}>
              {renderMd(line)}
            </p>
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground px-1 font-sans">{formatDate(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default Message;