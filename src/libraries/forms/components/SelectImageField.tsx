"use client";

import React, {
  useEffect,
  useMemo,
  useRef,
} from "react";
import Image from "next/image";
import {
  FiUpload,
  FiX,
} from "react-icons/fi";
import { Skeleton } from "@/components/Skeleton";
import { SelectImageFieldProps } from "../types"

const SelectImageField: React.FC<
  SelectImageFieldProps
> = ({
  value,
  setValue,
  setIsImageChanged,
  label,
  className = "",
  isLoading = false,
}) => {
    const inputRef =
      useRef<HTMLInputElement>(null);

    const handleFileChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) return;

      setValue(file);
      setIsImageChanged?.(true);
    };

    const handleRemove = () => {
      setValue(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      setIsImageChanged?.(true);
    };

    const previewImage = useMemo(() => {
      if (!value) return null;

      if (typeof value === "string") {
        return value;
      }

      if (value instanceof File) {
        return URL.createObjectURL(value);
      }

      return null;
    }, [value]);

    useEffect(() => {
      if (!(value instanceof File)) {
        return;
      }

      return () => {
        if (previewImage) {
          URL.revokeObjectURL(
            previewImage
          );
        }
      };
    }, [value, previewImage]);

    const shouldShowImage =
      !!previewImage;

    if (isLoading) {
      return (
        <div
          className={`flex flex-col gap-2 ${className}`}
        >
          {label && (
            <span
              className="
              text-sm
              font-medium
              text-gray-700
            "
            >
              {label}
            </span>
          )}

          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
      );
    }

    return (
      <div
        className={`flex flex-col gap-2 ${className}`}
      >
        {label && (
          <span
            className="
            text-sm
            font-medium
            text-gray-700
          "
          >
            {label}
          </span>
        )}

        {!shouldShowImage ? (
          <label
            className="
            flex cursor-pointer
            flex-col items-center
            justify-center
            rounded-lg
            border-2
            border-dashed
            border-gray-300
            p-4
            bg-reversed
            transition
            duration-300
            hover:border-main
          "
          >
            <FiUpload
              className="
              mb-0 h-12
              w-6
              text-gray-500
            "
            />

            <span
              className="
              text-sm
              text-gray-500
            "
            >
              Click to select image
            </span>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={
                handleFileChange
              }
              className="hidden"
            />
          </label>
        ) : (
          <div
            className="
            relative
            h-32
            bg-reversed
            w-full
          "
          >
            <Image
              src={previewImage}
              alt="Selected preview"
              fill
              unoptimized
              className="
              rounded-lg
              object-contain
              shadow
            "
            />

            <button
              type="button"
              onClick={handleRemove}
              className="
              absolute
              right-1
              top-1
              cursor-pointer
              rounded-full
              bg-red-500
              p-1
              text-background
              transition
              duration-300
              hover:bg-red-600
            "
            >
              <FiX
                className="
                h-4
                w-4
              "
              />
            </button>
          </div>
        )}
      </div>
    );
  };

export default SelectImageField;