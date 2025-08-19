"use client";

import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, Button } from "@shared/ui";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = ["#0d6efd", "#ff7f0e"] as const;
const periods = ["Kunlik", "Oylik", "Yillik"] as const;
type Period = (typeof periods)[number];

const BASE: Record<Period, { expense: number; profit: number }> = {
  Kunlik: { expense: 6_052_951, profit: 2_386_586 },
  Oylik: { expense: 172_000_000, profit: 68_500_000 },
  Yillik: { expense: 2_095_000_000, profit: 842_000_000 },
};

function jitter(n: number, pct = 0.06) {
  const delta = n * pct;
  const r = (Math.random() * 2 - 1) * delta;
  return Math.max(0, Math.round(n + r));
}

function money(n: number) {
  return `${new Intl.NumberFormat("ru-RU").format(n)} so‘m`;
}

export function FinanceOverview() {
  const [period, setPeriod] = useState<Period>("Kunlik");
  const [toggleKey, setToggleKey] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => setReady(true), []); 

  const data = useMemo(() => {
    const base = BASE[period];
    if (!ready) {
      return [
        { name: "Xarajat", value: base.expense },
        { name: "Foyda", value: base.profit },
      ];
    }
    const expense = jitter(base.expense, 0.08);
    const profit = jitter(base.profit, 0.08);
    return [
      { name: "Xarajat", value: expense },
      { name: "Foyda", value: profit },
    ];
  }, [period, toggleKey, ready]);

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  return (
    <Card className="bg-[#fff] border-0 shadow-sm rounded-[8px] py-2">
      <CardContent className="p-2 flex flex-col lg:flex-row gap-2 h-full">
        <div className="flex flex-col gap-2 w-full lg:w-1/4 h-full">
          <Stat label={`Tushum (jami) — ${period}`} value={total} highlight />
          <Stat label={`Xarajat (jami) — ${period}`} value={data[0].value} />
          <Stat label={`Foyda (jami) — ${period}`} value={data[1].value} />
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="flex gap-2 mb-4 w-full justify-end">
            {periods.map((p) => (
              <Button
                key={p}
                variant={period === p ? "default" : "outline"}
                onClick={() => {
                  setPeriod(p);
                  setToggleKey((k) => k + 1);
                }}
                className={`px-6 rounded-lg ${period === p ? "!bg-[#3a88c6]" : ""}`}
              >
                {p}
              </Button>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart >
              <Pie
                key={`${period}-${toggleKey}`}
                data={data}
                dataKey="value"
                innerRadius={80}
                outerRadius={120}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name} — ${money(value as number)} (${((percent ?? 0) * 100).toFixed(1)}%)`
                }
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number, n) => [money(v), n as string]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-[12px] border border-[#e6edf5] bg-white px-5 py-4 h-full">
      <div className="text-sm text-[#98a7b7] mb-1">{label}</div>
      <div className={`${highlight ? "text-[22px] font-extrabold" : "text-[22px] font-bold"} text-[#0f2e46]`}>
        {money(value)}
      </div>
    </div>
  );
}