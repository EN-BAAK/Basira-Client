import type { Metadata } from "next";
import React from "react";
import DashboardLayoutClient from "./DashboardLayoutClient";
import OffsetProvider from "@/libraries/offset/OffsetsProvider";

export const metadata: Metadata = {
  title: "لوحة التحكم الرئيسية | بصيرة (Basira)",

  description:
    "لوحة التحكم الإدارية الشاملة لمنصة بصيرة. أداة ذكية متكاملة لإدارة المنتجات، الفئات، المبيعات، الفواتير، وتحليل البيانات المالية والتجارية بدقة وكفاءة عالية.",

  keywords: [
    "منصة بصيرة",
    "بصيرة لإدارة الأعمال",
    "لوحة تحكم بصيرة",
    "إدارة المنتجات",
    "إدارة المبيعات والطلبات",
    "أتمتة الفواتير",
    "تحليلات البيانات التجارية",
    "نظام إدارة الشركات KSA",

    "Basira Platform",
    "Basira Dashboard",
    "Business Management System",
    "Admin Panel",
    "Product Management",
    "Order Tracking",
    "Sales Analytics",
    "Invoice Management",
  ],

  openGraph: {
    title: "لوحة التحكم الرئيسية | بصيرة",
    description:
      "لوحة التحكم الإدارية الشاملة لمنصة بصيرة. أداة ذكية متكاملة لإدارة المنتجات، الفئات، المبيعات، الفواتير، وتحليل البيانات المالية والتجارية.",
    url: "https://basira-platform.com/dashboard",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "لوحة تحكم منصة بصيرة الذكية",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "لوحة التحكم الرئيسية | بصيرة",
    description:
      "لوحة التحكم الإدارية الشاملة لمنصة بصيرة لإدارة المنتجات والمبيعات والفواتير.",
    images: ["/favicon.ico"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <OffsetProvider>
      <DashboardLayoutClient>
        {children}
      </DashboardLayoutClient>
    </OffsetProvider>
  );
};

export default DashboardLayout;