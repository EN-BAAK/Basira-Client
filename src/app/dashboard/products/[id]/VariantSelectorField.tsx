"use client"

import React from "react"
import { useField } from "formik"
import { cn } from "@/lib/utils"
import { VariantSelectorFieldProps } from "@/types/forms"

const VariantSelectorField: React.FC<VariantSelectorFieldProps> = ({
  sizeFieldName,
  colorFieldName,
  existingVariants = [],
  colors = [],
  sizes = [],
  label,
  styles,
  labelStyle,
}) => {
  const [sizeField, , sizeHelpers] = useField<string | number | null>(sizeFieldName)
  const [colorField, , colorHelpers] = useField<string | number | null>(colorFieldName)

  const selectedSize = sizeField.value !== null && sizeField.value !== undefined ? sizeField.value.toString() : ""
  const selectedColor = colorField.value !== null && colorField.value !== undefined ? colorField.value.toString() : ""

  const shouldHideSize = (sizeId: string | number) => {
    if (!selectedColor) return false
    
    return existingVariants.some((variant) => {
      const varColorId = variant.color?.id?.toString()
      const varSizeId = variant.size?.id?.toString()
      
      return varColorId === selectedColor && varSizeId === sizeId.toString()
    })
  }

  const shouldHideColor = (colorId: string | number) => {
    if (!selectedSize) return false

    return existingVariants.some((variant) => {
      const varColorId = variant.color?.id?.toString()
      const varSizeId = variant.size?.id?.toString()

      return varSizeId === selectedSize && varColorId === colorId.toString()
    })
  }

  const handleSizeToggle = (sizeId: string | number) => {
    const sizeIdStr = sizeId.toString()
    if (selectedSize === sizeIdStr) {
      sizeHelpers.setValue(null)
    } else {
      sizeHelpers.setValue(sizeId)
    }
  }

  const handleColorToggle = (colorId: string | number) => {
    const colorIdStr = colorId.toString()
    if (selectedColor === colorIdStr) {
      colorHelpers.setValue(null)
    } else {
      colorHelpers.setValue(colorId)
    }
  }

  return (
    <div className={cn("mb-6", styles)}>
      {label && (
        <label className={cn("block mb-3 font-medium text-text", labelStyle)}>
          {label}
        </label>
      )}

      <div className="bg-background2 p-4 rounded-xl border border-border space-y-4">
        <div>
          <span className="block text-sm text-text/70 mb-2 font-medium">المقاس المحدد:</span>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const sizeIdStr = size.key.toString()
              const isSelected = selectedSize === sizeIdStr
              const isHidden = shouldHideSize(size.key)

              if (isHidden) return null

              return (
                <button
                  key={sizeIdStr}
                  type="button"
                  onClick={() => handleSizeToggle(size.key)}
                  className={cn(
                    "px-4 py-2 rounded-lg border text-sm font-medium transition-colors duration-200 cursor-pointer",
                    isSelected
                      ? "bg-primary border-primary text-reversed"
                      : "bg-card border-border text-text hover:bg-border/40"
                  )}
                >
                  {size.value}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <span className="block text-sm text-text/70 mb-2 font-medium">اللون المحدد:</span>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => {
              const colorIdStr = color.key.toString()
              const isSelected = selectedColor === colorIdStr
              const isHidden = shouldHideColor(color.key)

              if (isHidden) return null

              return (
                <button
                  key={colorIdStr}
                  type="button"
                  onClick={() => handleColorToggle(color.key)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all duration-200 cursor-pointer",
                    isSelected ? "border-primary scale-110 shadow-sm" : "border-transparent hover:scale-105"
                  )}
                  style={{ backgroundColor: color.value }} 
                  title={color.value}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VariantSelectorField