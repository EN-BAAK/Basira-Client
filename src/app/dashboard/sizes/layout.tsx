import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "إدارة المقاسات | بصيرة",

  description:
    "لوحة تحكم إدارة مقاسات وأحجام المنتجات في منصة بصيرة. أداة مرنة لضبط دليلك الخاص بالمقاسات المتوفرة في المخزون وربطها بالمنتجات.",

  keywords: [
    // العربية
    "إدارة المقاسات",
    "أحجام المنتجات",
    "دليل المقاسات بصيرة",
    "متغيرات المنتجات",
    "إدارة المخزون",
    "لوحة التحكم",
    
    // English
    "Size Management",
    "Product Sizes",
    "Basira Sizes",
    "Size Chart Admin",
    "Stock Variations",
  ],

  openGraph: {
    title: "إدارة مقاسات المنتجات | بصيرة",
    description:
      "لوحة تحكم إدارة مقاسات وأحجام المنتجات في منصة بصيرة. أداة مرنة لضبط دليلك الخاص بالمقاسات المتوفرة.",
    url: "https://basira-platform.com/dashboard/sizes",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "إدارة المقاسات - منصة بصيرة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "إدارة مقاسات المنتجات | بصيرة",
    description: "شاشة التحكم وإدارة خيارات المقاسات والأحجام المتاحة للمنتجات في منصة بصيرة.",
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

interface SizesLayoutProps {
  children: React.ReactNode;
}

const SizesLayout: React.FC<SizesLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default SizesLayout;