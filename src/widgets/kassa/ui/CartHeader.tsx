"use client";

import { Button } from "@shared/ui";
import { Star, X, Plus } from "lucide-react";
import { ProductSearch } from "@features/product-search/ui/ProductSearch";

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
};

type Cart = {
  id: string;
  name: string;
  itemsCount: number;
};

type Props = {
  carts?: Cart[];
  activeCartId?: string;
  setActiveCartId?: (id: string) => void;

  products: Product[];
  onAddProduct: (p: Product) => void;

  onCloseCart?: (id: string) => void;
  onNewCart?: () => void;
};

export function CartHeader({
  carts = [],
  activeCartId,
  setActiveCartId,
  products,
  onAddProduct,
  onCloseCart,
  onNewCart,
}: Props) {
  const hasSwitcher = carts.length > 0 && activeCartId && setActiveCartId;

  return (
    <div className="flex flex-col items-center w-full gap-3">
      {hasSwitcher ? (
        <div className="flex gap-2 flex-wrap w-full">
          {carts.map((c) => (
            <div
              key={c.id}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${
                c.id === activeCartId
                  ? "bg-[#e9f2fb] text-[#25567e]"
                  : "bg-[#3a88c6] text-white"
              }`}
            >
              <button onClick={() => setActiveCartId!(c.id)}>
                {c.name}
                {c.itemsCount > 0 && (
                  <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded">
                    {c.itemsCount}
                  </span>
                )}
              </button>
              {onCloseCart && carts.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-6 w-6"
                  onClick={() => onCloseCart(c.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          {onNewCart && (
            <Button
              variant="default"
              size="icon"
              className="rounded-lg"
              onClick={onNewCart}
            >
              <Plus />
            </Button>
          )}
        </div>
      ) : (
        <div className="w-full inline-flex items-center gap-2 rounded-[6px] bg-[#e9f2fb] px-3 py-2">
          <span className="font-semibold text-[#25567e]">Savatcha-1</span>
          {onCloseCart && (
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full ml-auto"
              onClick={() => onCloseCart("1")}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
          {onNewCart && (
            <Button
              variant="default"
              size="icon"
              className="rounded-lg"
              onClick={onNewCart}
            >
              <Plus />
            </Button>
          )}
        </div>
      )}

      <div className="flex w-full bg-[#e9f2fb] p-2">
        <ProductSearch
          products={products}
          onPick={onAddProduct}
          placeholder="Mahsulot nomini yoki shtrix-kodini kiriting"
          className="flex-1"
        />
        <div className="ml-2">
          <Button variant="outline" className="h-12 w-12 rounded-[6px]">
            <Star />
          </Button>
        </div>
      </div>
    </div>
  );
}
