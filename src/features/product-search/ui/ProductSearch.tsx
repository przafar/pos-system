"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@shared/ui";
import { Search } from "lucide-react";
import { cn } from "@shared/lib/utils";

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
};

type Props = {
  products: Product[];
  onPick: (p: Product) => void;
  placeholder?: string;
  className?: string;
  maxResults?: number;
  autoAddOnExactBarcode?: boolean;
};

export function ProductSearch({
  products,
  onPick,
  placeholder = "Search…",
  className,
  maxResults = 8,
  autoAddOnExactBarcode = true,
}: Props) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const s = q.trim().toLowerCase();

  const list = useMemo(() => {
    if (!s) return [];
    const res = products.filter(
      (p) =>
        p.id.toLowerCase().includes(s) ||
        p.name.toLowerCase().includes(s)
    );
    return res.slice(0, maxResults);
  }, [products, s, maxResults]);

  useEffect(() => {
    setOpen(list.length > 0);
    setActive(0);
  }, [list.length]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const pick = (p: Product) => {
    onPick(p);
    setQ("");
    setOpen(false);
  };

  useEffect(() => {
    if (!autoAddOnExactBarcode) return;
    if (!s) return;

    const exact = products.find(
      (p) => p.id.toLowerCase() === s
    );
    if (exact) {
      pick(exact);
    }
  }, [s, products, autoAddOnExactBarcode]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(0, list.length - 1)));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && list.length) {
        pick(list[active] ?? list[0]);
        return;
      }
      if (s) {
        const exactById = products.find((p) => p.id.toLowerCase() === s);
        if (exactById) {
          pick(exactById);
          return;
        }
        const exactByName = products.find((p) => p.name.toLowerCase() === s);
        if (exactByName) {
          pick(exactByName);
          return;
        }
        if (list.length) {
          pick(list[0]);
        }
      }
    }
  };

  return (
    <div className={cn("relative", className)} ref={wrapRef}>
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onFocus={() => list.length && setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="h-12 pl-12 bg-white"
        autoComplete="off"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-60" />

      {open && (
        <div className="absolute z-20 mt-1 w-full rounded-[6px] border bg-white shadow-md overflow-hidden">
          <ul className="max-h-80 overflow-auto">
            {list.map((p, i) => (
              <li
                key={p.id}
                className={cn(
                  "flex items-center justify-between px-3 py-2 cursor-pointer",
                  i === active ? "bg-[#e9f2fb]" : "hover:bg-accent"
                )}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  pick(p);
                }}
              >
                <div className="min-w-0">
                  <div className="text-sm truncate">{p.name}</div>
                  <div className="text-xs text-[#3a88c6]">{p.id}</div>
                </div>
                <div className="ml-3 shrink-0 text-sm font-semibold">
                  {p.price.toLocaleString("ru-RU")} so‘m
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}