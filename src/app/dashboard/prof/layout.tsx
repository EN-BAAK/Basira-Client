import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "المساعد الذكي (FCO) | بصيرة",

  description:
    "واجهة المحادثة التفاعلية الذكية مع مساعد بصيرة (FCO). اسأل المساعد الذكي مباشرة لتحليل البيانات المالية، استخراج تقارير المبيعات، الاستعلام الذكي عن المخزون، ودعم اتخاذ القرارات التنفيذية فورياً.",

  keywords: [
    // العربية
    "المساعد الذكي بصيرة",
    "مساعد FCO",
    "محادثة الذكاء الاصطناعي",
    "الاستعلام الذكي عن البيانات",
    "تحليل المبيعات بالذكاء الاصطناعي",
    "نظام دعم القرار بصيرة",
    "AI Assistant Basira",
    
    // English
    "FCO AI Assistant",
    "AI Chat Dashboard",
    "Basira Chatbot",
    "Business Intelligence AI",
    "Decision Support System",
    "Natural Language Queries",
  ],

  openGraph: {
    title: "المساعد الذكي (FCO) - المحادثة الفورية | بصيرة",
    description:
      "تفاعل مع المساعد الذكي (FCO) في منصة بصيرة لتحليل بيانات أعمالك، وتوليد التقارير، والاستعلام الفوري عن المخزون والمبيعات عبر الأوامر النصية.",
    url: "https://basira-platform.com/dashboard/prof",
    locale: "ar_SA",
    type: "website",
    siteName: "بصيرة - لإدارة الأعمال",
    images: [
      {
        url: "/favicon.ico",
        width: 1200,
        height: 630,
        alt: "المساعد الذكي FCO - منصة بصيرة",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "المساعد الذكي (FCO) | بصيرة",
    description: "بوابة المحادثة الذكية لتحليل البيانات ودعم اتخاذ القرارات في منصة بصيرة.",
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

interface ProfLayoutProps {
  children: React.ReactNode;
}

const ProfLayout: React.FC<ProfLayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default ProfLayout;