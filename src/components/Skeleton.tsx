import { SkeletonProps } from "@/types/components"
import React from "react"

export const Skeleton: React.FC<SkeletonProps> = ({ className = "", variant = "rectangular", ...props }) => {
  const baseClass = "relative overflow-hidden bg-background2 animate-pulse before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-reversed/20 before:to-transparent"

  const variantClasses = {
    text: "h-4 w-full rounded-sm",
    rectangular: "rounded-md",
    circular: "rounded-full",
    pattern: "rounded-t-[2rem] rounded-b-md"
  }

  return (
    <div
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}