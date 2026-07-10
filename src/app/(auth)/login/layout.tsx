import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "تسجيل الدخول | منصة بصيرة",

  description:
    "بوابة تسجيل الدخول الآمنة للمسؤولين إلى منصة بصيرة الذكية لإدارة الأعمال. قم بتسجيل الدخول للوصول إلى لوحة التحكم والمؤشرات المالية وتفاصيل المخزون.",

  keywords: [
    "تسجيل دخول بصيرة",
    "بوابة المسؤول بصيرة",
    "تسجيل الدخول الآمن",
    "لوحة تحكم بصيرة",
    "Basira login",

    "Basira Login",
    "Admin Login Basira",
    "Secure Sign In",
    "Business Management Login",
  ],

  openGraph: {
    title: "تسجيل الدخول | منصة بصيرة",
    description:
      "بوابة تسجيل الدخول الآمنة للمسؤولين إلى منصة بصيرة الذكية لإدارة الأعمال.",
    url: "https://basira-platform.com/login",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "بوابة تسجيل الدخول الآمنة - منصة بصيرة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "تسجيل الدخول | منصة بصيرة",
    description: "بوابة تسجيل الدخول الآمنة للمسؤولين إلى منصة بصيرة الذكية لإدارة الأعمال.",
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

interface LoginLayoutProps {
  children: React.ReactNode;
}

const LoginLayout: React.FC<LoginLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-cairo antialiased" dir="rtl">
      {children}
    </div>
  );
};

export default LoginLayout;