"use client";

import { AppShell } from "@widgets/app-shell/ui/AppShell";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}