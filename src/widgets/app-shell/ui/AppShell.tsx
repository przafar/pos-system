"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@widgets/sidebar/ui/Sidebar";
import { cn } from "@shared/lib/utils";
import { Toaster } from "sonner";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem("sb_collapsed");
      if (v === "1") setCollapsed(true);
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("sb_collapsed", collapsed ? "1" : "0");
    } catch {}
  }, [collapsed]);

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      <Sidebar
        open={mobileOpen}
        collapsed={collapsed}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed((s) => !s)}
      />

      <div className={cn("transition-all", collapsed ? "lg:pl-20" : "lg:pl-72")}>
        

        <main className="p-3 lg:p-2">{children}</main>
      </div>

      <Toaster position="top-right" richColors closeButton duration={2000} />
    </div>
  );
}