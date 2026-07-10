import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "إدارة المنتجات | بصيرة",

  description:
    "لوحة تحكم إدارة المنتجات في منصة بصيرة. تتيح لك إضافة منتجات جديدة، تعديل البيانات، تتبع المخزون، والبحث المتقدم مع ميزات الفرز والفلترة الذكية لجميع السلع والبضائع.",

  keywords: [
    // العربية
    "إدارة المنتجات",
    "قائمة المنتجات",
    "إضافة منتج جديد",
    "البحث في المخزون",
    "فلترة المنتجات",
    "تحديث بيانات السلع",
    "جرد المخزون بصيرة",
    "لوحة تحكم بصيرة",

    // English
    "Product Management",
    "Product List",
    "Create Product",
    "Inventory Search",
    "Product Filters",
    "Stock Control",
    "Basira Products",
  ],

  openGraph: {
    title: "إدارة المنتجات والمخزون | بصيرة",
    description:
      "لوحة التحكم المركزية لإدارة وعرض المنتجات، وتحديث بيانات السلع، والبحث المتقدم في المخزون ضمن منصة بصيرة.",
    url: "https://basira-platform.com/dashboard/products",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "إدارة المنتجات - منصة بصيرة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "إدارة المنتجات والمخزون | بصيرة",
    description: "شاشة التحكم وإدارة العمليات الشاملة على المنتجات والمخازن في منصة بصيرة.",
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

interface ProductsLayoutProps {
  children: React.ReactNode;
}

const ProductsLayout: React.FC<ProductsLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ProductsLayout;