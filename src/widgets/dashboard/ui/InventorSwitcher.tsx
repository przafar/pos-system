"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, Button, Badge } from "@shared/ui";
import { TrendingUp, TrendingDown, FileSpreadsheet } from "lucide-react";
import { cn } from "@shared/lib/utils";

type LowStockRow = { id: number; title: string; unit: string; left: string; status: "Kam" | "Kritik" };
type BestRow = { id: number; title: string; unit: string; sold: string; share: number; trendPct: number };

const LOW_STOCK: LowStockRow[] = [
  { id: 1, title: "Nok",    unit: "KG",  left: "20kg",  status: "Kam"   },
  { id: 2, title: "Ruchka", unit: "dona",left: "20dona",status: "Kritik"},
];

const BEST_SELLERS_BASE: BestRow[] = [
  { id: 1, title: "Olma", unit: "kg",  sold: "55kg", share: 7_500_000, trendPct: 12 },
  { id: 2, title: "Sut",  unit: "Litr",sold: "40L",  share: 6_500_000, trendPct: -3 },
];

function money(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

export function InventorySwitcher() {
  const [tab, setTab] = useState<"low" | "best">("low");
  const [range, setRange] = useState<"day" | "month" | "year">("day");

  const bestData = useMemo(() => {
    const k = range === "day" ? 1 : range === "month" ? 1.15 : 1.35;
    return BEST_SELLERS_BASE.map(r => ({
      ...r,
      share: Math.round(r.share * k),
      trendPct: r.trendPct + (range === "year" ? 2 : range === "month" ? 1 : 0),
    }));
  }, [range]);

  return (
    <Card className="bg-[#fff] border-0 shadow-sm rounded-[8px] py-2">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TabPill active={tab === "low"} onClick={() => setTab("low")}>
              Kam qolgan tovarlar
            </TabPill>
            <TabPill active={tab === "best"} onClick={() => setTab("best")}>
              Ko‘p sotilgan tovarlar
            </TabPill>
          </div>

          <div className="flex">
            <Button variant="secondary" className="h-9 rounded-xl px-4 mr-4">
              <FileSpreadsheet className="h-4 w-4 mr-2" /> Excel
            </Button>
            {tab === "best" && (
              <div className="mb-3 flex items-center justify-center gap-2">
                <Button
                  variant={range === "day" ? "default" : "outline"}
                  className={cn("h-9 rounded-[12px] px-4", range === "day" && "!bg-[#3a88c6]")}
                  onClick={() => setRange("day")}
                >
                  Kunlik
                </Button>
                <Button
                  variant={range === "month" ? "default" : "outline"}
                  className={cn("h-9 rounded-[12px] px-4", range === "month" && "!bg-[#3a88c6]")}
                  onClick={() => setRange("month")}
                >
                  Oylik
                </Button>
                <Button
                  variant={range === "year" ? "default" : "outline"}
                  className={cn("h-9 rounded-[12px] px-4", range === "year" && "!bg-[#3a88c6]")}
                  onClick={() => setRange("year")}
                >
                  Yillik
                </Button>
              </div>
            )}
          </div>
          
        </div>

        {tab === "low" ? (
          <div className="mt-4">
            <div className="overflow-auto  bg-white">
              <table className="w-full text-sm border-nonde">
                <thead>
                  <tr className="border-b text-[#0f2e46] [&>th]:py-3 [&>th]:px-4 text-left">
                    <th className="w-12">#</th>
                    <th>Tovar</th>
                    <th>O‘lchov birlik</th>
                    <th>Qoldiq</th>
                    <th>Holat</th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-b">
                  {LOW_STOCK.map((r) => (
                    <tr key={r.id} className="bg-white">
                      <td className="py-3 px-4">{r.id}</td>
                      <td className="py-3 px-4">{r.title}</td>
                      <td className="py-3 px-4">{r.unit}</td>
                      <td className="py-3 px-4">{r.left}</td>
                      <td className="py-3 px-4">
                        <Badge
                          className={cn(
                            "rounded-full px-3",
                            r.status === "Kam" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                          )}
                          variant="secondary"
                        >
                          {r.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <tr key={`empty-${i}`} className="bg-white">
                      <td className="py-2 px-4 text-muted-foreground">{LOW_STOCK.length + i + 1}</td>
                      <td className="py-2 px-4" />
                      <td className="py-2 px-4" />
                      <td className="py-2 px-4" />
                      <td className="py-2 px-4" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="p-0">
            

            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-[#0f2e46] [&>th]:py-3 [&>th]:px-4 text-left">
                    <th className="w-12">#</th>
                    <th>Tovar</th>
                    <th>O‘lchov birlik</th>
                    <th>Sotuv</th>
                    <th>Ulush</th>
                    <th>Trend</th>
                  </tr>
                </thead>
                <tbody className="[&>tr]:border-b">
                  {bestData.map((r) => (
                    <tr key={r.id} className="bg-white">
                      <td className="py-4 px-4">{r.id}</td>
                      <td className="py-4 px-4">{r.title}</td>
                      <td className="py-4 px-4">{r.unit}</td>
                      <td className="py-4 px-4">{r.sold}</td>
                      <td className="py-4 px-4">{money(r.share)}</td>
                      <td className="py-4 px-4">
                        {r.trendPct >= 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-emerald-700 text-xs font-semibold">
                            <TrendingUp className="h-4 w-4" />
                            +{r.trendPct}%
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 text-rose-700 text-xs font-semibold">
                            <TrendingDown className="h-4 w-4" />
                            {r.trendPct}%
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {Array.from({ length: 3 }).map((_, i) => (
                    <tr key={`empty-b-${i}`} className="bg-white">
                      <td className="py-4 px-4 text-muted-foreground">{bestData.length + i + 1}</td>
                      <td className="py-4 px-4" />
                      <td className="py-4 px-4" />
                      <td className="py-4 px-4" />
                      <td className="py-4 px-4" />
                      <td className="py-4 px-4" />
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function TabPill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-9 rounded-[12px] px-3 text-sm font-semibold border transition",
        active
          ? "bg-[#3a88c6] text-white border-transparent shadow-sm"
          : "bg-white text-[#0f2e46] border-[#e6edf5] hover:bg-[#f6fbff]"
      )}
    >
      {children}
    </button>
  );
}