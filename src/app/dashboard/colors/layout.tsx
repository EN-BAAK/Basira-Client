import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "إدارة الألوان | بصيرة",

  description:
    "لوحة تحكم إدارة ألوان المنتجات في منصة بصيرة. أضف، عدّل، واحذف خيارات الألوان المتوفرة في المخزون لتسهيل تصنيف المنتجات وتجربة تسوق دقيقة.",

  keywords: [
    // العربية
    "إدارة الألوان",
    "خيارات المنتجات",
    "تصنيف المنتجات بصيرة",
    "ألوان المخزون",
    "لوحة تحكم بصيرة",
    "تخصيص المنتجات",
    
    // English
    "Color Management",
    "Product Colors",
    "Basira Colors",
    "Product Options",
    "Inventory Variations",
  ],

  openGraph: {
    title: "إدارة ألوان المنتجات | بصيرة",
    description:
      "لوحة تحكم إدارة ألوان المنتجات في منصة بصيرة. أضف، عدّل، واحذف خيارات الألوان المتوفرة في المخزون.",
    url: "https://basira-platform.com/dashboard/colors",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "إدارة الألوان - منصة بصيرة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "إدارة ألوان المنتجات | بصيرة",
    description: "شاشة التحكم وإدارة خيارات الألوان المتاحة للمنتجات في منصة بصيرة.",
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

interface ColorsLayoutProps {
  children: React.ReactNode;
}

const ColorsLayout: React.FC<ColorsLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ColorsLayout;