import { NavItem } from "@/types/global";
import { User } from "@/types/models";
import { Settings2, Boxes, Palette, Ruler, Tags, Building2, MapPin, Users, ShoppingCart, LayoutDashboard, MessageCircle, } from "lucide-react";

export const navItems: NavItem[] = [
  {
    title: "لوحة التحكم",
    subtitle: "نظرة عامة على أداء ومبيعات الشركة",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "المحلل المالي",
    subtitle: "استشارات وتقارير ذكية مدعومة بالذكاء الاصطناعي",
    href: "/dashboard/prof",
    icon: MessageCircle,
    badge: "AI",
  },
  {
    title: "المنتجات",
    subtitle: "إدارة المخزون، الأسعار وتفاصيل المنتجات",
    href: "/dashboard/products",
    icon: Boxes,
  },
  {
    title: "الطلبات",
    subtitle: "متابعة المبيعات، الطلبات وحالات الشحن",
    href: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "الأصناف",
    subtitle: "تنظيم المنتجات داخل أقسام وتصنيفات رئيسية",
    href: "/dashboard/categories",
    icon: Tags,
  },
  {
    title: "العلامات التجارية",
    subtitle: "إدارة الشركات المصنعة والعلامات التجارية للشركاء",
    href: "/dashboard/brands",
    icon: Building2,
  },
  {
    title: "الألوان",
    subtitle: "تحديد خيارات الألوان المتاحة للمنتجات",
    href: "/dashboard/colors",
    icon: Palette,
  },
  {
    title: "الأحجام",
    subtitle: "إدارة المقاسات والأبعاد المختلفة للمنتجات",
    href: "/dashboard/sizes",
    icon: Ruler,
  },
  {
    title: "الإعدادات",
    subtitle: "تهيئة النظام وتفضيلات الحساب العامة",
    href: "/dashboard/settings",
    icon: Settings2,
  },
];

export const initialUser: User = {
  id: "-1",
  email: "guest@gmail.com",
  name: "زائر",
  phone: "0000000000",
}