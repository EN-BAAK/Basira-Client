"use client";

import React from "react";
import { Plus } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { navItems } from "@/constants/global";
import Button from "@/libraries/forms/components/Button";

export const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const currentItem = navItems.find((item) => {
    if (item.href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(item.href);
  });

  const title = currentItem ? currentItem.title : "لوحة التحكم";
  const subtitle = currentItem?.subtitle;

  const goToOrder = () => router.push("/dashboard/orders")

  return (
    <header className="h-[65px] bg-reversed border-b border-border px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <div className="text-right">
          <h1 className="text-base font-ibm-plex-arabic font-semibold text-text leading-tight">
            {title}
          </h1>
          {subtitle && <p className="sm:block hidden text-[11px] text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          icon={Plus}
          onClick={goToOrder}
          variant="primary"
          label="فاتورة جديدة"
          className="px-3 py-1.5 text-sm rounded-sm"
          iconClassName="w-4 h-4"
        />
      </div>
    </header>
  );
};

export default Header;