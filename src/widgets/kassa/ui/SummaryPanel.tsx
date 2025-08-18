"use client";

import { Card, CardContent } from "@shared/ui";
import { useMemo } from "react";

type Props = {
  subtotal: number;
  discount?: number;
  vatRate?: number;
};

function formatMoney(n: number, fraction = 0) {
  const formatted = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: fraction,
    maximumFractionDigits: fraction,
  }).format(n);
  return formatted.replace(",", ".");
}

export function SummaryPanel({
  subtotal,
  discount = 0,
  vatRate = 0.12, // QQS * 100 = 12%
}: Props) {
  const payment = useMemo(() => Math.max(0, subtotal - discount), [subtotal, discount]);
  const vat = useMemo(() => Math.max(0, payment * vatRate), [payment, vatRate]);
  const total = useMemo(() => payment + vat, [payment, vat]);

  return (
    <Card className="border-none shadow-none mt-0">
      <CardContent className="space-y-3 text-right p-4">
        <div className="flex justify-between items-center">
          <div className="text-md text-muted-foreground">Hisoblangan:</div>
          <div className="text-2xl font-bold">
            {formatMoney(subtotal)} so‘m
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-md text-muted-foreground">Chegirma:</div>
          <div className="text-xl font-semibold">
            {formatMoney(discount)} so‘m
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-md text-muted-foreground">To‘lov:</div>
          <div className="text-xl font-semibold">
            {formatMoney(payment)} so‘m
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-md text-muted-foreground">
            QQS:
          </div>
          <div className="text-xl font-semibold">
            {formatMoney(vat, 2)} so‘m
          </div>
        </div>

        <div className="flex justify-between items-center mt-3 text-left text-2xl font-bold border-t pt-2">
          <span>To‘lov uchun:</span>
          <span className="text-[#25567e]">
            {formatMoney(total, 2)} so‘m
          </span>
        </div>
      </CardContent>
    </Card>
  );
}