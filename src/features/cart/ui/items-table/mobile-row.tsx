"use client";

import { memo, useCallback } from "react";
import { Button, Input } from "@shared/ui";
import { Minus, Plus, X } from "lucide-react";
import type { CartItem } from "@features/cart/types";
import { sanitizeToDotNumber, parseNumber, formatAuto } from "@shared/lib/number";

type RowProps = {
  item: CartItem;
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onChangePrice: (id: string, price: number) => void;
  onChangeDiscount: (id: string, discount: number) => void;
  onChangeTotal?: (id: string, total: number) => void;
};

export const MobileRow = memo(function MobileRow({
  item,
  onChangeQty,
  onRemove,
  onChangePrice,
  onChangeDiscount,
  onChangeTotal,
}: RowProps) {
  const discount = item.discount ?? 0;
  const rowSubtotal = item.price * item.qty;
  const rowTotal = Math.max(0, rowSubtotal - discount);

  const handlePriceBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const v = parseNumber(e.currentTarget.value);
      onChangePrice(item.id, v);
      e.currentTarget.value = formatAuto(v);
    },
    [item.id, onChangePrice]
  );

  const handleDiscountBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let v = parseNumber(e.currentTarget.value);
      v = Math.min(Math.max(0, v), rowSubtotal);
      onChangeDiscount(item.id, v);
      e.currentTarget.value = formatAuto(v);
    },
    [item.id, onChangeDiscount, rowSubtotal]
  );

  const handleTotalBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      let desiredTotal = parseNumber(e.currentTarget.value);
      desiredTotal = Math.min(Math.max(0, desiredTotal), rowSubtotal);
      const newDiscount = Math.max(0, rowSubtotal - desiredTotal);
      onChangeDiscount(item.id, newDiscount);
      onChangeTotal?.(item.id, desiredTotal);
      e.currentTarget.value = formatAuto(desiredTotal);
    },
    [item.id, onChangeDiscount, onChangeTotal, rowSubtotal]
  );

  return (
    <li className="rounded-xl border bg-white p-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs text-[#3a88c6]">{item.id}</div>
          <div className="text-sm font-medium">{item.name}</div>
          <div className="mt-1 text-xs text-muted-foreground">{item.unit}</div>
        </div>
        <Button variant="destructive" size="icon" className="rounded-full" onClick={() => onRemove(item.id)}>
          <X />
        </Button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Narx</div>
          <Input
            defaultValue={formatAuto(item.price)}
            inputMode="decimal"
            className="h-10 text-center"
            onInput={(e) => (e.currentTarget.value = sanitizeToDotNumber(e.currentTarget.value))}
            onBlur={handlePriceBlur}
          />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Soni</div>
          <div className="flex items-center justify-center gap-2 border rounded-lg h-10">
            <Button variant="ghost" size="icon" onClick={() => onChangeQty(item.id, -1)}>
              <Minus />
            </Button>
            <div className="w-8 text-center font-semibold">{item.qty}</div>
            <Button variant="ghost" size="icon" onClick={() => onChangeQty(item.id, +1)}>
              <Plus />
            </Button>
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Chegirma</div>
          <Input
            defaultValue={formatAuto(discount)}
            inputMode="decimal"
            className="h-10 text-center"
            onInput={(e) => (e.currentTarget.value = sanitizeToDotNumber(e.currentTarget.value))}
            onBlur={handleDiscountBlur}
          />
        </div>

        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Summa</div>
          <Input
            defaultValue={formatAuto(rowTotal)}
            inputMode="decimal"
            className="h-10 text-center"
            onInput={(e) => (e.currentTarget.value = sanitizeToDotNumber(e.currentTarget.value))}
            onBlur={handleTotalBlur}
          />
        </div>
      </div>
    </li>
  );
});