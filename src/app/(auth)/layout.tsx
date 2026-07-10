import React from "react";
import { Check, Sparkles } from "lucide-react";
import SystemPattern from "@/components/SystemPattern";
import { CommonParentProps } from "@/types/global";

const AuthLayout: React.FC<Readonly<CommonParentProps>> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background flex select-none" dir="rtl">
      <div className="hidden lg:flex flex-col w-5/12 relative bg-primary overflow-hidden items-center justify-between p-12 py-16">
        <SystemPattern id="login-pat" color="#F8FAFC" opacity={0.15} />

        <div className="relative z-10 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
              <Sparkles className="w-5 h-5 text-reversed" />
            </div>
            <span className="text-2xl font-bold text-reversed tracking-wide font-ibm-plex-arabic">
              منصة بصيرة
            </span>
          </div>
        </div>

        <div className="relative z-10 text-right w-full my-auto">
          <div className="text-reversed text-sm font-semibold mb-3 tracking-wider uppercase">
            نظام إدارة المتاجر الذكي والـ Agents
          </div>
          <h2 className="text-4xl font-bold leading-tight mb-4 text-reversed font-ibm-plex-arabic">
            رؤية شاملة
            <br />
            <span className="text-accent">لإدارة تجارة</span> أسهل
          </h2>

          <p className="text-reversed/80 text-sm leading-relaxed max-w-sm mb-8">
            منصة متكاملة ومؤتمتة تمنحك تحليلات فوريّة، إدارة مخزون ذكية، وأدوات متطورة لربط مبيعاتك وعملياتك في مكان واحد.
          </p>

          <div className="flex flex-col gap-3.5">
            {[
              "لوحة تحكم ذكية وإحصائيات مباشرة لحظة بلحظة",
              "إدارة مركزية للمنتجات، الطلبات، والمخازن",
              "أتمتة العمليات ودعم كامل للـ AI Agents المتطورة",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center shrink-0">
                  <Check size={11} className="text-reversed" />
                </div>
                <span className="text-reversed/90 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 w-full border-t border-reversed/10 pt-6">
          <div className="flex items-center justify-between text-xs text-reversed/40">
            <span>إصدار المنصة v1.0</span>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
};

export default AuthLayout;