"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "@shared/assets/image/logo.png";
import { Separator, Button } from "@shared/ui";
import Link from "next/link";

import {
  ShoppingCart, CircleUser, Repeat, History, Settings, LifeBuoy, LogOut, X
} from "lucide-react";
import { cn } from "@shared/lib/utils";

const items = [
  { 
    icon: ShoppingCart, 
    label: "Kassa", 
    href: "/kassa", 
    active: true 
  },
  { 
    icon: CircleUser, 
    label: "Smena", 
    href: "/home" 
  },
  { 
    icon: Repeat, 
    label: "Z-hisobot", 
    href: "/home" 
  },
  { 
    icon: History, 
    label: "Tarix", 
    href: "/home" 
  },
  { 
    icon: Settings, 
    label: "Sozlamalar", 
    href: "/home" 
  },
  { 
    icon: LifeBuoy, 
    label: "Yordam", 
    href: "/home" 
  },
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SidebarNav({ open, onClose }: Props) {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/login");
  };
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition pointer-events-none",
        open && "pointer-events-auto"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/30 backdrop-blur-none transition-opacity duration-300 ease-in-out",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        className={cn(
          "absolute top-0 left-0 h-full w-72 bg-white shadow-xl border-r flex flex-col",
          "transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-5 py-4 flex items-center justify-between border-b">
           <Link href="/home" className="flex items-center gap-3">
              <Image src={logo} alt="Virtual kassa" width={28} height={28} />
              <span className="text-lg font-semibold text-[#25567e]">
                Virtual kassa
              </span>
            </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X />
          </Button>
        </div>

        <Separator />
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {items.map(({ icon: Icon, label, href, active }) => (
            <a
              key={label}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-accent",
                active ? "text-primary font-semibold" : "text-foreground"
              )}
            >
              <Icon className="opacity-80" />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="destructive"
            className="w-full justify-start rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" /> Chiqish
          </Button>
        </div>
      </aside>
    </div>
  );
}
