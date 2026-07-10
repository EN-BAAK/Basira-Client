"use client";

import React from "react";
import { DashboardEmptyContentProps } from "@/types/components";
import { RotateCw } from "lucide-react";
import Button from "@/libraries/forms/components/Button";

const EmptyContent: React.FC<DashboardEmptyContentProps> = ({ title, desc, buttonTitle = "اعد المحاولة", buttonAction }) => {
  return (
    <section className="relative flex h-[calc(100vh-81px)] w-full flex-col items-center justify-center rounded-xl bg-card border border-background2 p-8 text-center overflow-hidden animate-fade-in select-none">

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
      </div>

      <div className="relative z-10 max-w-md flex flex-col items-center">

        <div className="mb-4 w-12 h-1 gap-0.5 flex justify-center items-center">
          <span className="w-2 h-2 rounded-full bg-accent/40" />
          <span className="w-8 h-[2px] bg-accent/20" />
          <span className="w-2 h-2 rounded-full bg-accent/40" />
        </div>

        <h2 className="text-xl font-bold text-text font-heading">
          {title}
        </h2>

        <p className="mt-2 text-sm text-text/70 font-sans leading-relaxed max-w-sm">
          {desc}
        </p>

        {buttonAction && (
          <Button
            variant="warning-outline"
            icon={RotateCw}
            iconClassName="text-warning"
            className="mt-6"
            onClick={buttonAction}
            label={buttonTitle}
          />
        )}

        <div className="mt-5 w-6 h-6 border-b border-l border-accent/15 rounded-bl-sm" />
      </div>
    </section>
  );
};

export default EmptyContent;