"use client";

import React from "react";
import { Trash2, Loader2, Pen } from "lucide-react";
import { DashboardColorsRowProps } from "@/types/components";
import Button from "@/libraries/forms/components/Button";

const Color: React.FC<DashboardColorsRowProps> = ({ color, onDelete, isDeleting, onEdit }) => {
  const hexStyle = color.name.startsWith("#") ? color.name : `#${color.name}`;

  return (
    <tr className="hover:bg-background/50 transition-colors animate-fade-in animate-duration-200">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 rounded-full shadow-inner border border-primary/10 transition-transform hover:scale-110"
            style={{ backgroundColor: hexStyle }}
            title={hexStyle}
          />
        </div>
      </td>
      <td className="p-4 font-mono text-text/80">
        {hexStyle.toUpperCase()}
      </td>
      <td className="p-4 text-left pl-6">
        <div className="flex justify-end items-center gap-3">
          <Button
            className="w-fit rounded-sm"
            variant="danger-outline"
            icon={isDeleting ? Loader2 : Trash2}
            iconClassName={isDeleting ? "w-4 h-4 animate-spin" : "w-4 h-4"}
            disabled={isDeleting}
            onClick={onDelete}
          />

          <Button
            className="w-fit rounded-sm"
            variant="warning-outline"
            icon={Pen}
            iconClassName="w-4 h-4"
            disabled={isDeleting}
            onClick={onEdit}
          />
        </div>
      </td>
    </tr>
  );
}

export default Color