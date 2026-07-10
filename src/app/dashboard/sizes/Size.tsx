"use client";

import React from "react";
import { Trash2, Loader2, Pen } from "lucide-react";
import { DashboardSizesRowProps } from "@/types/components";
import Button from "@/libraries/forms/components/Button";

const Size: React.FC<DashboardSizesRowProps> = ({ size, onDelete, isDeleting, onEdit }) => {
  return (
    <tr className="hover:bg-background/50 transition-colors animate-fade-in animate-duration-200">
      <td className="p-4 font-heading font-medium text-text uppercase">
        {size.name}
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
};

export default Size;