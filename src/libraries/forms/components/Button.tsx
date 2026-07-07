"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { CustomButtonProps } from "../types"

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  className = "",
  variant = "primary",
  onClick,
  icon: Icon,
  iconClassName = "",
  disabled = false,
  type = "button"
}) => {
  const variantClasses = {
    primary:
      "bg-primary text-background hover:opacity-90",

    "primary-outline":
      "border border-primary bg-transparent text-primary hover:bg-primary/10",

    accent:
      "bg-accent text-text hover:opacity-90",

    "accent-outline":
      "border border-accent bg-transparent text-accent hover:bg-accent/10",

    danger:
      "bg-danger text-background hover:opacity-90",

    "danger-outline":
      "border border-danger bg-transparent text-danger hover:bg-danger/10",

    success:
      "bg-success text-background hover:opacity-90",

    "success-outline":
      "border border-success bg-transparent text-success hover:bg-success/10",

    warning:
      "bg-warning text-background hover:opacity-90",

    "warning-outline":
      "border border-warning bg-transparent text-warning hover:bg-warning/10",

    info:
      "bg-info text-background hover:opacity-90",

    "info-outline":
      "border border-info bg-transparent text-info hover:bg-info/10",

    transparent:
      "bg-transparent text-text hover:opacity-75",

    "transparent-outline":
      "border border-muted bg-transparent text-text hover:bg-muted/20",

    "primary-gradient":
      "bg-gradient-to-r from-primary to-success text-background hover:opacity-90",

    "primary-gradient-outline":
      "border border-primary bg-transparent text-primary hover:bg-primary/10",

    "accent-gradient":
      "bg-gradient-to-r from-accent to-warning text-text hover:opacity-90",

    "accent-gradient-outline":
      "border border-accent bg-transparent text-accent hover:bg-accent/10",
  }[variant]

  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cn(
        "w-full px-3 py-2 flex items-center justify-center gap-2 rounded-xl transition duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses,
        className
      )}
    >
      {Icon && <Icon className={cn("w-5 h-5", iconClassName)} />}
      {label && <span>{label}</span>}
    </button>
  )
}

export default CustomButton