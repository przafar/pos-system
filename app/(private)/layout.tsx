"use client";

import { useState } from "react";
import { SidebarNav } from "@widgets/shell/ui/SidebarNav";
import { Topbar } from "@widgets/shell/ui/Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fff]">
      <Topbar onOpen={() => setOpen(true)} />
      <main className="p-4">{children}</main>
      <SidebarNav open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
