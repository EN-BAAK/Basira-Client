import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "إدارة العلامات التجارية | بصيرة",

  description:
    "لوحة تحكم إدارة العلامات التجارية في منصة بصيرة. أداة متكاملة لتهيئة وتصنيف الشركات المصنعة، الموردين، والعلامات التجارية لربطها بالمنتجات وتسهيل عمليات الفرز والتحليل المالي والمخزني.",

  keywords: [
    // العربية
    "إدارة العلامات التجارية",
    "الشركات المصنعة",
    "تصنيف المنتجات بصيرة",
    "بيانات الموردين",
    "شركاء العمل",
    "إدارة المخزون",
    "لوحة تحكم بصيرة",
    
    // English
    "Brand Management",
    "Product Brands",
    "Basira Brands",
    "Manufacturers",
    "Inventory Sorting",
    "Supplier Data",
  ],

  openGraph: {
    title: "إدارة العلامات التجارية | بصيرة",
    description:
      "لوحة تحكم إدارة العلامات التجارية وتصنيف المنتجات حسب الشركات المصنعة والموردين في منصة بصيرة.",
    url: "https://basira-platform.com/dashboard/brands",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "إدارة العلامات التجارية - منصة بصيرة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "إدارة العلامات التجارية | بصيرة",
    description: "شاشة التحكم وإدارة العلامات التجارية والشركات المصنعة للمنتجات في منصة بصيرة.",
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
  },
};

interface BrandsLayoutProps {
  children: React.ReactNode;
}

const BrandsLayout: React.FC<BrandsLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default BrandsLayout;