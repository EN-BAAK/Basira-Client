"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Variant, SubmitButtonProps } from "../types"

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  isDirty,
  isValid,
  label = "Send",
  submittingLabel = "Sending...",
  disabledLabel = "Please fill out the form",
  className = "",
  variant = "primary",
  onClick,
  Icon,
  iconStyle
}) => {
  const disabled = isSubmitting || !isDirty || !isValid

  let buttonLabel = label
  if (isSubmitting) buttonLabel = submittingLabel
  else if (disabled) buttonLabel = disabledLabel

  const variantClasses: Record<Variant, string> = {
    primary: "bg-primary text-reversed hover:bg-primary/90",
    "primary-outline":
      "border border-primary text-primary hover:bg-primary hover:text-reversed",

    accent: "bg-accent text-reversed hover:bg-accent/90",
    "accent-outline":
      "border border-accent text-accent hover:bg-accent hover:text-reversed",

    success: "bg-green-600 text-reversed hover:bg-green-500",
    "success-outline":
      "border border-green-600 text-green-600 hover:bg-green-600 hover:text-reversed",

    danger: "bg-danger text-reversed hover:bg-danger/90",
    "danger-outline":
      "border border-danger text-danger hover:bg-danger hover:text-reversed",

    warning: "bg-warning text-reversed hover:bg-warning/90",
    "warning-outline":
      "border border-warning text-warning hover:bg-warning hover:text-reversed",

    info: "bg-info text-reversed hover:bg-info/90",
    "info-outline":
      "border bg-info text-info hover:bg-info hover:text-reversed",

    transparent: "bg-transparent text-foreground hover:text-foreground/70",
    "transparent-outline":
      "border border-foreground/40 text-reversed hover:border-foreground hover:text-reversed",

    "primary-gradient":
      "bg-gradient-to-r from-primary to-green-600 text-reversed hover:opacity-90",

    "primary-gradient-outline":
      "border border-primary text-primary hover:bg-gradient-to-r hover:from-primary hover:to-green-600 hover:text-reversed",

    "accent-gradient":
      "bg-gradient-to-r from-accent to-red-600 text-reversed hover:opacity-90",

    "accent-gradient-outline":
      "border border-accent text-accent hover:bg-gradient-to-r hover:from-accent hover:to-red-600 hover:text-reversed",
  }

  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "w-full rounded-xl py-3.5 transition cursor-pointer text-sm disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className
      )}
    >
      {Icon && <Icon className={cn("w-5 h-5", iconStyle)} />}
      <span>{buttonLabel}</span>
    </button>
  )
}

export default SubmitButton
