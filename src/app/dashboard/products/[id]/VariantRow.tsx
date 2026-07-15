"use client";

import React, { useState } from "react";
import { Trash2, Layers, Check, Minus, Plus } from "lucide-react";
import CustomButton from "@/libraries/forms/components/Button";
import { DashboardVariantRowProps } from "@/types/components";
import { cn } from "@/lib/utils";

export const VariantRow: React.FC<DashboardVariantRowProps> = ({
  variant,
  onDelete,
  isPending,
  onEdit,
  colorName = "_",
  sizeName = "—",
}) => {
  const [localQuantity, setLocalQuantity] = useState<number>(variant.quantity);
  const [isValueChanged, setIsValueChanged] = useState<boolean>(false)

  const handleDelete = () => onDelete(variant.id);

  const handleIncrease = () => {
    if (isPending) return;
    const newQty = localQuantity + 1;
    setLocalQuantity(newQty);
    onEdit(variant.id, newQty);
  };

  const handleDecrease = () => {
    if (isPending || localQuantity <= 0) return;
    const newQty = localQuantity - 1;
    setLocalQuantity(newQty);
    onEdit(variant.id, newQty);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value === "" ? 0 : Number(e.target.value);
    if (val >= 0) {
      setLocalQuantity(val);

      if (val == variant.quantity)
        setIsValueChanged(false)
      else
        setIsValueChanged(true)
    }
  };

  const handleBlur = () => {
    setLocalQuantity(variant.quantity)
    setIsValueChanged(false)
  };

  const handleSave = () => {
    if (isPending || !isValueChanged) return;
    onEdit(variant.id, localQuantity);
    setIsValueChanged(false)
  };

  return (
    <tr className="border-b border-border hover:bg-background/50 transition-colors text-right">
      <td className="px-6 py-4 text-center text-xs font-mono text-muted">
        {variant.id}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {colorName !== "_" && (
            <div
              className="w-4 h-4 rounded-full border border-text/10 shrink-0 shadow-2xs"
              style={{ backgroundColor: colorName }}
              title={colorName}
            />
          )}
          <span className="text-sm font-medium text-text font-mono">{colorName}</span>
        </div>
      </td>

      <td className="px-6 py-4">
        <span className="px-2.5 py-1 bg-background border border-border text-text font-mono font-bold text-xs uppercase rounded-md">
          {sizeName}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-muted shrink-0" />

          <div className="flex items-center border border-border bg-background rounded-lg overflow-hidden h-8">
            {isValueChanged ? (
              <CustomButton
                type="button"
                onClick={handleSave}
                disabled={isPending}
                variant="success"
                className="px-2.5 h-full rounded-none rounded-end-xs"
                icon={Check}
              />
            ) : (
              <CustomButton
                type="button"
                onClick={handleDecrease}
                disabled={isPending || localQuantity <= 0}
                className="px-2 h-full"
                variant="transparent-danger"
                iconClassName="w-3 h-3"
                icon={Minus}
              />
            )}

            <input
              type="number"
              min="0"
              value={localQuantity}
              onChange={handleInputChange}
              onBlur={handleBlur}
              disabled={isPending}
              className={cn(
                "w-14 text-center font-mono font-bold text-sm bg-transparent outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none translate duration-200",
                localQuantity === 0 ? "text-danger" : "text-text",
                isValueChanged && "rounded-none"
              )
              }
            />

            {!isValueChanged && (
              <CustomButton
                type="button"
                onClick={handleIncrease}
                disabled={isPending}
                className="px-2 h-full"
                variant="transparent-success"
                iconClassName="w-3 h-3"
                icon={Plus}
              />
            )}
          </div>
          <span className="text-xs text-muted font-sans">قطعة</span>
        </div>
      </td>

      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <CustomButton
            className="p-1.5 rounded-lg"
            variant="danger-outline"
            icon={Trash2}
            disabled={isPending}
            iconClassName="w-3.5 h-3.5"
            onClick={handleDelete}
          />
        </div>
      </td>
    </tr>
  );
};