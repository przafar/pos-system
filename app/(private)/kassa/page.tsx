"use client";

import { useMemo, useState } from "react";
import { CartHeader } from "@widgets/kassa/ui/CartHeader";
import { ItemsTable } from "@features/cart/ui/items-table/table";
import type { CartItem } from "@features/cart/types";
import { SummaryPanel } from "@widgets/kassa/ui/SummaryPanel";
import { PaymentButtons } from "@widgets/kassa/ui/PaymentButtons";
import { catalog } from "@entities/product/lib/mock";
import { initialCart } from "@features/cart/lib/initial";
import { User, RefreshCw, Wallet } from "lucide-react";

type Cart = { id: string; name: string; items: CartItem[] };

const actions = [
  { label: "Smena", icon: User, active: true },
  { label: "Sinxronizatsiya", icon: RefreshCw },
  { label: "Balans", icon: Wallet },
];

export default function KassaPage() {
  const [carts, setCarts] = useState<Cart[]>([
    { id: "1", name: "Savatcha-1", items: initialCart },
  ]);
  const [activeCartId, setActiveCartId] = useState("1");
  const [vatRate] = useState(0.12);

  const activeCart = useMemo(
    () => carts.find((c) => c.id === activeCartId) ?? carts[0],
    [carts, activeCartId]
  );

  const subtotalBeforeDiscount = useMemo(
    () => (activeCart?.items ?? []).reduce((s, i) => s + i.price * i.qty, 0),
    [activeCart?.items]
  );

  const discountTotal = useMemo(
    () => (activeCart?.items ?? []).reduce((s, i) => s + (i.discount ?? 0), 0),
    [activeCart?.items]
  );

  const mutateActive = (fn: (items: CartItem[]) => CartItem[]) =>
    setCarts((all) =>
      all.map((c) => (c.id === activeCartId ? { ...c, items: fn(c.items) } : c))
    );

  const addProduct = (p: { id: string; name: string; price: number; unit: string }) =>
    mutateActive((items) =>
      items.some((x) => x.id === p.id)
        ? items.map((x) => (x.id === p.id ? { ...x, qty: x.qty + 1 } : x))
        : [...items, { ...p, qty: 1 }]
    );

  const changeQty = (id: string, delta: number) =>
    mutateActive((items) =>
      items
        .map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter((i) => i.qty > 0)
    );

  const changePrice = (id: string, price: number) =>
    mutateActive((items) => items.map((x) => (x.id === id ? { ...x, price } : x)));

  const changeDiscount = (id: string, discount: number) =>
    mutateActive((items) =>
      items.map((x) => {
        if (x.id !== id) return x;
        const rowSubtotal = x.price * x.qty;
        return { ...x, discount: Math.min(Math.max(0, discount), rowSubtotal) };
      })
    );

  const changeTotal = (id: string, total: number) =>
    mutateActive((items) =>
      items.map((x) => {
        if (x.id !== id) return x;
        const rowSubtotal = x.price * x.qty;
        const desired = Math.min(Math.max(0, total), rowSubtotal);
        return { ...x, discount: rowSubtotal - desired };
      })
    );

  const removeItem = (id: string) =>
    mutateActive((items) => items.filter((i) => i.id !== id));

  const onNewCart = () => {
    const id = String(Date.now());
    setCarts((all) => [...all, { id, name: `Savatcha-${all.length + 1}`, items: [] }]);
    setActiveCartId(id);
  };

  const onCloseCart = (id: string) => {
    setCarts((all) => {
      if (all.length === 1) return all; 
      const next = all.filter((c) => c.id !== id);
      if (id === activeCartId) setActiveCartId(next[0].id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="
        mx-auto max-w-full py-5
        grid grid-cols-1
        md:grid-cols-[1fr_300px]
        lg:grid-cols-[1fr_400px]
        gap-6
      ">
        <section className="space-y-4">
          <CartHeader
            carts={carts.map((c) => ({ id: c.id, name: c.name, itemsCount: c.items.length }))}
            activeCartId={activeCartId}
            setActiveCartId={setActiveCartId}
            products={catalog}
            onAddProduct={addProduct}
            onNewCart={onNewCart}
            onCloseCart={onCloseCart}
          />

          <ItemsTable
            items={activeCart?.items ?? []}
            onChangeQty={changeQty}
            onRemove={removeItem}
            onChangePrice={changePrice}
            onChangeDiscount={changeDiscount}
            onChangeTotal={changeTotal}
          />
        </section>

        <aside className="space-y-3">
          <div className="grid grid-cols-3 gap-3">
            {actions.map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1">
                <span className="text-md text-black font-semibold">{b.label}</span>
                <button
                  className={`h-14 w-full rounded-xl border flex items-center justify-center ${
                    b.active ? "bg-[#3a88c6] text-white" : "bg-[#e9f2fb] text-[#25567e]"
                  }`}
                >
                  <b.icon className="w-6 h-6" />
                </button>
              </div>
            ))}
          </div>

          <SummaryPanel
            subtotal={subtotalBeforeDiscount}
            discount={discountTotal}
            vatRate={vatRate}
          />

          <PaymentButtons onPay={() => {  }} />
        </aside>
      </main>
    </div>
  );
}