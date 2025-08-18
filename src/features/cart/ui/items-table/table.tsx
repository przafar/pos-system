"use client";

import { memo } from "react";
import { Card, CardContent } from "@shared/ui";
import type { CartItem } from "@features/cart/types";
import { DesktopRow } from "./desktop-row";
import { MobileRow } from "./mobile-row";

type Props = {
  items: CartItem[];
  onChangeQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onChangePrice: (id: string, price: number) => void;
  onChangeDiscount: (id: string, discount: number) => void;
  onChangeTotal?: (id: string, total: number) => void;
};

export const ItemsTable = memo(function ItemsTable({
  items,
  onChangeQty,
  onRemove,
  onChangePrice,
  onChangeDiscount,
  onChangeTotal,
}: Props) {
  return (
    <Card className="py-4 border-none rounded-none shadow-none">
      <CardContent className="p-0">
        <div className="hidden lg:block">
          <table className="w-full">
            <thead className="text-[#25567e]/80">
              <tr className="[&>th]:py-3 [&>th]:text-sm [&>th]:text-center border-b">
                <th className="w-[350px] pl-4 text-left">ISM</th>
                <th>NARX</th>
                <th>SONI</th>
                <th>BIRLIK</th>
                <th>CHEGIRMA</th>
                <th>SUMMA</th>
                <th />
              </tr>
            </thead>
            <tbody className="divide-y text-center">
              {items.map((i) => (
                <DesktopRow
                  key={i.id}
                  item={i}
                  onChangeQty={onChangeQty}
                  onRemove={onRemove}
                  onChangePrice={onChangePrice}
                  onChangeDiscount={onChangeDiscount}
                  onChangeTotal={onChangeTotal}
                />
              ))}
            </tbody>
          </table>
        </div>

        <ul className="space-y-3 lg:hidden">
          {items.map((i) => (
            <MobileRow
              key={i.id}
              item={i}
              onChangeQty={onChangeQty}
              onRemove={onRemove}
              onChangePrice={onChangePrice}
              onChangeDiscount={onChangeDiscount}
              onChangeTotal={onChangeTotal}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
});