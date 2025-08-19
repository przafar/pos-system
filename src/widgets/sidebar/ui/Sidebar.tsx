"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@shared/lib/utils";
import {
  LayoutDashboard, FileText, Store, Tags, Package,
  Receipt, BookA, Users, FileSpreadsheet,
  ChevronLeft, Power, Menu
} from "lucide-react";

type Props = {
  open: boolean;
  collapsed: boolean;
  onClose: () => void;
  onToggleCollapse: () => void;
};

const items = [
  { 
    label: "Dashboard", 
    href: "/dashboard", 
    icon: LayoutDashboard 
  },
  { 
    label: "Malumot", 
    href: "/malumot", 
    icon: FileText 
  },
  { 
    label: "Kassalar", 
    href: "/kassalar", 
    icon: Store 
  },
  { 
    label: "Kategoriyalar", 
    href: "/kategoriyalar", 
    icon: Tags 
  },
  { 
    label: "Mahsulotlar", 
    href: "/mahsulotlar", 
    icon: Package 
  },
  { 
    label: "Cheklar", 
    href: "/cheklar", 
    icon: Receipt 
  },
  { 
    label: "Z-Hisobot", 
    href: "/z-hisobot", 
    icon: BookA 
  },
  { 
    label: "Foydalanuvchilar", 
    href: "/users", 
    icon: Users 
  },
  { 
    label: "EHF", 
    href: "/ehf", 
    icon: FileSpreadsheet 
  },
];

export function Sidebar({ open, collapsed, onClose, onToggleCollapse }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("access_token");
    } catch {}
    router.push("/login");
    onClose();
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-[#0f2e46] text-white flex flex-col border-r border-black/10 z-50",
          "transition-[width] duration-300 ease-in-out",
          collapsed ? "w-20" : "w-72",
          "transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0"
        )}
      >
        <div className="p-4 flex items-center gap-3">
          {!collapsed && (
            <>
              <div className="h-10 w-10 rounded-xl bg-[#1e4a74] grid place-items-center font-bold">
                MB
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold truncate">Mustafayev</div>
                <div className="text-sm opacity-80 -mt-0.5">Bexruz</div>
              </div>
            </>
          )}

          <button
            title="Collapse"
            onClick={onToggleCollapse}
            className={cn(
              "h-8 w-8 grid place-items-center rounded-md hover:bg-white/10 transition",
              collapsed ? "mx-auto" : "ml-auto"
            )}
          >
            {collapsed ? <Menu /> : <ChevronLeft />}
          </button>
        </div>

        <nav className="px-3 flex-1 overflow-y-auto">
          {items.map(({ href, icon: Icon, label }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center rounded-xl px-3 py-3 mb-1 transition-colors",
                  active ? "bg-white/15" : "hover:bg-white/10",
                  collapsed ? "justify-center" : "gap-3"
                )}
              >
                <Icon className="shrink-0" />
                {!collapsed && <span className="font-medium">{label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <button
            onClick={handleLogout}
            className={cn(
              "w-full flex items-center rounded-xl px-4 py-3 transition-colors",
              "bg-[#634b65] hover:bg-[#715275]",
              collapsed ? "justify-center" : "gap-3"
            )}
          >
            <Power className="shrink-0" />
            {!collapsed && <span className="font-semibold">Chiqish</span>}
          </button>
        </div>
      </aside>
    </>
  );
}