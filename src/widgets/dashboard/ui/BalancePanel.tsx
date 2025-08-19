"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, Button, Input, Badge } from "@shared/ui";
import { CalendarDays } from "lucide-react";
import { cn } from "@shared/lib/utils";

type Props = {
  balance?: number;
  lastTopUpAt?: string;
  abonentDue?: string;
  daysLeft?: number;
  status?: "Faol" | "Muddati tugagan";
  quickAmounts?: number[];
  onTopUp?: (amount: number) => void;
  onHistory?: () => void;
};

function money(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " so‘m";
}

export function BalancePanel({
  balance = 80_000,
  lastTopUpAt = "02.08.2025",
  abonentDue = "2025-12-22",
  daysLeft = 133,
  status = "Faol",
  quickAmounts = [80_000, 160_000, 240_000, 960_000],
  onTopUp,
  onHistory,
}: Props) {
  const [tab, setTab] = useState<"abonent" | "fm">("abonent");
  const [amount, setAmount] = useState<number>(quickAmounts[0] ?? 0);

  const statusColor = useMemo(
    () =>
      status === "Faol"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-red-100 text-red-700",
    [status]
  );

  return (
    <Card className="bg-[#fff] border-0 shadow-sm rounded-[8px] py-2">
      <CardContent className="p-2 lg:p-2">
        <div className="flex items-center justify-between">
          <h2 className="text-[28px] font-extrabold text-[#0f2e46]">Balans</h2>

          <div className="flex gap-3">
            <button
              className={cn(
                "px-5 h-11 rounded-[12px] font-semibold shadow-sm border",
                tab === "abonent"
                  ? "bg-[#3a88c6] text-white border-transparent"
                  : "bg-white border-[#e6edf5] text-[#0f2e46]"
              )}
              onClick={() => setTab("abonent")}
            >
              Abonent to‘lovi
            </button>
            <button
              className={cn(
                "px-5 h-11 rounded-[12px] font-semibold shadow-sm border",
                tab === "fm"
                  ? "bg-[#3a88c6] text-white border-transparent"
                  : "bg-white border-[#e6edf5] text-[#0f2e46]"
              )}
              onClick={() => setTab("fm")}
            >
              FM uchun to‘lov
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#e6edf5] bg-white p-3">
            <div className="text-[#98a7b7] text-sm mb-3">Hisobingiz</div>
            <div className="text-[22px] lg:text-[26px] leading-none font-extrabold text-[#0f2e46]">
              {money(balance)}
            </div>
            <div className="inline-flex items-center rounded-full border border-[#e6edf5] bg-[#f6fbff] px-3 py-1 text-[12px] mt-4 gap-2">
              Oxirgi to‘ldirish: {lastTopUpAt}
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6edf5] bg-white p-3">
            <div className="text-[#98a7b7] text-sm mb-3">Abonent to‘lov sanasi</div>
            <div className="text-[22px] lg:text-[26px] leading-none font-extrabold text-[#0f2e46]">
              {abonentDue}
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-[#e6edf5] bg-[#f6fbff] px-3 py-1 text-[12px] gap-2">
                <CalendarDays className="h-4 w-4 opacity-80" />
                Qolgan muddat: <strong className="ml-1">{daysLeft}</strong> kun
              </div>
              <span className={cn("px-3 py-1 rounded-full text-[12px]", statusColor)}>
                {status}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-[12px] border border-[#e6edf5] bg-white p-3">
          <div className="flex flex-col gap-3 lg:flex-col lg:items-center">
            <div className="w-full">
              <div className="text-[#98a7b7] text-sm mb-2">Summani kiriting</div>
              <div className="flex items-center gap-2 w-full">
                <Input
                  value={amount ? new Intl.NumberFormat("ru-RU").format(amount) : ""}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\s/g, "").replace(",", ".");
                    const n = Math.max(0, Math.floor(Number(raw) || 0));
                    setAmount(n);
                  }}
                  placeholder="0"
                  className="h-12 rounded-xl max-w-[280px] text-right"
                />
                <span className="text-[#6c7b8a]">so‘m</span>

                <div className="flex flex-wrap gap-2 ml-2 w-full">
                  {quickAmounts.map((q) => (
                    <button
                      key={q}
                      onClick={() => setAmount(q)}
                      className="h-10 rounded-[12px] px-4 border border-[#e6edf5] bg-white text-[#0f2e46] text-sm font-semibold hover:bg-[#f6fbff]"
                    >
                      {new Intl.NumberFormat("ru-RU").format(q)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-3 lg:mt-0 justify-start w-full">
              <Button
                className="h-11 rounded-xl px-6 font-semibold bg-green-600"
                onClick={() => onTopUp?.(amount)}
              >
                Balans to‘ldirish
              </Button>
              <Button
                variant="secondary"
                className="h-11 rounded-xl px-6 font-semibold bg-[#2b3442] text-white hover:bg-[#232b37]"
                onClick={onHistory}
              >
                To‘lov tarixi
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-4  border-[#e6edf5] bg-white px-3 py-3 text-sm text-[#0f2e46] flex items-center justify-between">
          <div>
            To‘lov usullari:
            <span className="font-semibold"> Payme / Click / UZCARD / HUMO</span> qo‘llab-quvvatlaydi
          </div>
          <div className="text-[#8aa0b5]">© 2025 Soliq Servis — VK</div>
        </div>
      </CardContent>
    </Card>
  );
}