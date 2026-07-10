import React from "react";
import { CommonParentProps } from "@/types/global";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayoutClient: React.FC<CommonParentProps> = ({ children }) => {
  return (
    <div className="bg-background h-screen flex overflow-hidden" dir="rtl">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header />

        <main className="flex-1 h-100 overflow-auto px-2 py-2 lg:px-2 lg:py-2">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayoutClient;