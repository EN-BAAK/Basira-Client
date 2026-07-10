import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "إدارة الفئات والأقسام | بصيرة",

  description:
    "لوحة تحكم إدارة الفئات والأقسام في منصة بصيرة. أداة تنظيمية متكاملة لإنشاء وتعديل وتصنيف فئات المنتجات، وتتبع حجم ومخزون المنتجات داخل كل فئة لتسهيل هيكلة البيانات التجارية.",

  keywords: [
    // العربية
    "إدارة الفئات",
    "أقسام المنتجات",
    "تصنيف المنتجات",
    "هيكلة المخزون",
    "تنظيم المنتجات بصيرة",
    "لوحة تحكم بصيرة",
    "إدارة المخزون والبيانات",
    
    // English
    "Category Management",
    "Product Categories",
    "Inventory Structure",
    "Basira Categories",
    "Product Classification",
    "Stock Analytics",
  ],

  openGraph: {
    title: "إدارة الفئات والأقسام | بصيرة",
    description:
      "لوحة تحكم تنظيم وإدارة فئات الأقسام وحصر عدد المنتجات التابعة لها في منصة بصيرة.",
    url: "https://basira-platform.com/dashboard/categories",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "إدارة الفئات والأقسام - منصة بصيرة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "إدارة الفئات والأقسام | بصيرة",
    description: "شاشة التحكم وتنظيم الأقسام والفئات الرئيسية للمنتجات في منصة بصيرة.",
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

interface CategoriesLayoutProps {
  children: React.ReactNode;
}

const CategoriesLayout: React.FC<CategoriesLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default CategoriesLayout;