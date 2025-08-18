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

export const DesktopRow = memo(function DesktopRow({
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
    <tr className="bg-white/60 border-b">
      <td className="py-3 pl-4 text-left">
        <div className="text-xs text-[#3a88c6]">{item.id}</div>
        <div className="text-sm">{item.name}</div>
      </td>

      <td className="py-3">
        <div className="flex justify-center">
          <Input
            defaultValue={formatAuto(item.price)}
            inputMode="decimal"
            className="h-10 w-28 text-center"
            onInput={(e) => (e.currentTarget.value = sanitizeToDotNumber(e.currentTarget.value))}
            onBlur={handlePriceBlur}
          />
        </div>
      </td>

      <td className="py-3">
        <div className="inline-flex items-center justify-center gap-2 border rounded-lg p-1">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full text-white bg-[#3a88c6]"
            onClick={() => onChangeQty(item.id, -1)}
          >
            <Minus />
          </Button>
          <div className="w-8 text-center font-semibold">{item.qty}</div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full text-white bg-[#3a88c6]"
            onClick={() => onChangeQty(item.id, +1)}
          >
            <Plus />
          </Button>
        </div>
      </td>

      <td className="py-3 text-center">{item.unit}</td>

      <td className="py-3">
        <div className="flex justify-center">
          <Input
            defaultValue={formatAuto(discount)}
            inputMode="decimal"
            className="h-10 w-28 text-center"
            onInput={(e) => (e.currentTarget.value = sanitizeToDotNumber(e.currentTarget.value))}
            onBlur={handleDiscountBlur}
          />
        </div>
      </td>

      <td className="py-3">
        <div className="flex justify-center">
          <Input
            defaultValue={formatAuto(rowTotal)}
            inputMode="decimal"
            className="h-10 w-28 text-center"
            onInput={(e) => (e.currentTarget.value = sanitizeToDotNumber(e.currentTarget.value))}
            onBlur={handleTotalBlur}
          />
        </div>
      </td>

      <td className="py-3 pr-2">
        <Button
          variant="destructive"
          size="icon"
          className="rounded-full"
          onClick={() => onRemove(item.id)}
        >
          <X />
        </Button>
      </td>
    </tr>
  );
});