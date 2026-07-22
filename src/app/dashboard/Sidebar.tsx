"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, Settings2, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/constants/global";
import Button from "@/libraries/forms/components/Button";
import { useAppContext } from "@/libraries/project-provider/AppProvider";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user } = useAppContext()

  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const closeMobileSidebar = () => setIsOpenMobile(false);
  const openMobileSidebar = () => setIsOpenMobile(true);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  const mainNavItems = navItems.filter((item) => item.href !== "/dashboard/settings");
  const settingsItem = navItems.find((item) => item.href === "/dashboard/settings");

  const isExpanded = !isCollapsed;

  return (
    <React.Fragment>
      {isOpenMobile && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-[1000] bg-muted/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-300"
        />
      )}

      <aside
        className={cn(
          `fixed right-0 top-0 h-screen z-[1001] flex flex-col shrink-0 bg-reversed border-l border-border 
           transition-transform duration-300 ease-in-out w-64`,
          isOpenMobile ? "translate-x-0" : "translate-x-full",

          `lg:static lg:translate-x-0 lg:transition-[width] lg:duration-300`,
          isCollapsed ? "lg:w-[68px]" : "lg:w-64"
        )}
      >
        {!isOpenMobile && (
          <Button
            icon={Settings2}
            onClick={openMobileSidebar}
            variant="primary"
            className="lg:hidden absolute -left-6 w-fit top-35 z-20 p-1 rounded-xs"
            iconClassName="w-4 h-4"
          />
        )}

        <div
          className={cn(
            "flex items-center h-[65px] border-b border-border px-4 relative",
            isExpanded ? "justify-between" : "lg:justify-center justify-between"
          )}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-reversed" />
            </div>
            <span className={cn(
              "font-ibm-plex-arabic font-bold text-text text-[17px] block",
              isCollapsed && "lg:hidden"
            )}>
              بصيرة
            </span>
          </div>

          <div className="flex items-center">
            <Button
              icon={X}
              onClick={closeMobileSidebar}
              variant="transparent"
              className="lg:hidden"
              iconClassName="w-4 h-4"
            />

            {isExpanded && (
              <Button
                icon={ChevronLeft}
                onClick={() => setIsCollapsed(true)}
                variant="transparent"
                className="lg:block hidden"
                iconClassName="w-4 h-4"
              />
            )}
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {mainNavItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileSidebar}
                title={isCollapsed ? item.title : undefined}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-right",
                  active
                    ? "bg-primary text-reversed shadow-sm"
                    : "text-muted hover:bg-background hover:text-text",
                  isCollapsed ? "lg:justify-center" : "justify-start"
                )}
              >
                <item.icon className="w-[18px] h-[18px] shrink-0" />
                <span className={cn("block", isCollapsed && "lg:hidden")}>
                  {item.title}
                </span>

                {item.badge && (
                  <span className={cn(
                    "mr-auto px-1.5 py-0.5 bg-accent/15 text-accent text-[10px] font-bold rounded-full block",
                    active && "bg-reversed/15 text-reversed",
                    isCollapsed && "lg:hidden"
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border space-y-0.5">
          {settingsItem && (
            <Link
              href={settingsItem.href}
              onClick={closeMobileSidebar}
              title={isCollapsed ? settingsItem.title : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-right",
                isActive(settingsItem.href)
                  ? "bg-primary text-reversed"
                  : "text-muted hover:bg-background hover:text-text",
                isCollapsed ? "lg:justify-center" : "justify-start"
              )}
            >
              <settingsItem.icon className="w-[18px] h-[18px] shrink-0" />
              <span className={cn("block", isCollapsed && "lg:hidden")}>
                {settingsItem.title}
              </span>
            </Link>
          )}

          <div
            className={cn(
              "flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-background cursor-pointer transition-colors mt-1",
              isCollapsed ? "lg:justify-center" : "justify-start"
            )}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shrink-0 text-reversed text-xs font-bold">
              {user.name[0]}
            </div>
            <div className={cn("flex-1 min-w-0 text-right block", isCollapsed && "lg:hidden")}>
              <p className="text-sm font-medium text-text truncate leading-tight">{user.name}</p>
              <p className="text-[11px] text-muted truncate">مدير النظام</p>
            </div>
          </div>

          {isCollapsed && (
            <Button
              icon={ChevronRight}
              onClick={() => setIsCollapsed(false)}
              variant="transparent"
              iconClassName="w-4 h-4"
            />
          )}
        </div>
      </aside>
    </React.Fragment>
  );
};

export default Sidebar;