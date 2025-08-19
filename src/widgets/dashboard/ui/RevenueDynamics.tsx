"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent } from "@shared/ui";

const ResponsiveContainer = dynamic(() => import("recharts").then(m => m.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import("recharts").then(m => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then(m => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then(m => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then(m => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then(m => m.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then(m => m.Tooltip), { ssr: false });

const daily = [
  { 
    name: "1", 
    cash: 300_000,
    terminal: 200_000,
    other: 60_000
  },
  {
    name: "2",
    cash: 340_000,
    terminal: 400_000,
    other: 29_000
  },
  {
    name: "3",
    cash: 260_000,
    terminal: 100_000,
    other: 20_000
  },
  {
    name: "4",
    cash: 400_000,
    terminal: 200_000,
    other: 10_000
  },
  {
    name: "5",
    cash: 314_000,
    terminal: 500_000,
    other: 14_000
  }
];

const monthly = Array.from({ length: 6 }, (_, i) => ({
  name: String(i + 1),
  cash: 2_000_000 + i * 120_000,
  terminal: 1_800_000 + i * 140_000,
  other: 120_000 + i * 10_000,
}));

const yearly = Array.from({ length: 5 }, (_, i) => ({
  name: String(2020 + i),
  cash: 20_000_000 + i * 2_000_000,
  terminal: 17_000_000 + i * 1_500_000,
  other: 900_000 + i * 100_000,
}));

const COLORS = {
  cash: "#4ea3f9",
  terminal: "#2f3742",
  other: "#7bd06f",
};

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n);
}

function axisK(n: number) {
  if (n >= 1_000_000) return `${Math.round(n / 100_000) / 10}m`;
  return `${Math.round(n / 1000)}k`;
}


function ValueLabel(props: any) {
  const { x, y, width, value } = props;
  const cx = x! + width! / 2;
  const cy = y! - 8;
  return (
    <text x={cx} y={cy} textAnchor="middle" fill="#0a0a0a" fontWeight={600} fontSize={13}>
      {fmt(value as number)}
    </text>
  );
}

export function RevenueDynamics() {
  const [tab, setTab] = useState<"daily" | "monthly" | "yearly">("daily");

  const data = useMemo(() => {
    if (tab === "monthly") return monthly;
    if (tab === "yearly") return yearly;
    return daily;
  }, [tab]);

  return (
    <Card className="bg-[#fff] border-0 shadow-sm rounded-[8px] py-2">
      <CardContent className="p-3 lg:p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[24px] font-extrabold text-[#0f2e46] mx-auto lg:mx-0">
            Tushum dinamikasi
          </h3>

          <div className="hidden lg:flex gap-2">
            <button
              onClick={() => setTab("daily")}
              className={`h-10 px-4 rounded-[12px] border text-sm font-semibold ${tab === "daily" ? "bg-[#3a88c6] text-white border-transparent" : "bg-white border-[#e6edf5] text-[#0f2e46]"}`}
            >
              Kunlik
            </button>
            <button
              onClick={() => setTab("monthly")}
              className={`h-10 px-4 rounded-[12px] border text-sm font-semibold ${tab === "monthly" ? "bg-[#3a88c6] text-white border-transparent" : "bg-white border-[#e6edf5] text-[#0f2e46]"}`}
            >
              Oylik
            </button>
            <button
              onClick={() => setTab("yearly")}
              className={`h-10 px-4 rounded-[12px] border text-sm font-semibold ${tab === "yearly" ? "bg-[#3a88c6] text-white border-transparent" : "bg-white border-[#e6edf5] text-[#0f2e46]"}`}
            >
              Yillik
            </button>
          </div>
        </div>

        <div className="h-[420px]">
          <ResponsiveContainer>
            <BarChart data={data} barCategoryGap={28}>
              <CartesianGrid stroke="#e9eef5" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: "#e9eef5" }} />
              <YAxis
                tickFormatter={axisK}
                tickLine={false}
                axisLine={{ stroke: "#e9eef5" }}
                width={40}
              />
              <Tooltip
                formatter={(v: number) => fmt(v as number)}
                labelClassName="font-semibold"
                contentStyle={{ borderRadius: 12, borderColor: "#e6edf5" }}
              />

              <Bar dataKey="cash" fill={COLORS.cash} radius={[6, 6, 0, 0]} label={<ValueLabel />} />
              <Bar dataKey="terminal" fill={COLORS.terminal} radius={[6, 6, 0, 0]} label={<ValueLabel />} />
              <Bar dataKey="other" fill={COLORS.other} radius={[6, 6, 0, 0]} label={<ValueLabel />} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
          <LegendDot color={COLORS.cash} label="Naqd" />
          <LegendDot color={COLORS.terminal} label="Terminal" />
          <LegendDot color={COLORS.other} label="Boshqa turdagi to‘lovlar" />
        </div>

        <div className="mt-4 flex gap-2 justify-center lg:hidden">
          <button
            onClick={() => setTab("daily")}
            className={`h-9 px-4 rounded-2xl border text-sm font-semibold ${tab === "daily" ? "bg-[#3a88c6] text-white border-transparent" : "bg-white border-[#e6edf5] text-[#0f2e46]"}`}
          >
            Kunlik
          </button>
          <button
            onClick={() => setTab("monthly")}
            className={`h-9 px-4 rounded-2xl border text-sm font-semibold ${tab === "monthly" ? "bg-[#3a88c6] text-white border-transparent" : "bg-white border-[#e6edf5] text-[#0f2e46]"}`}
          >
            Oylik
          </button>
          <button
            onClick={() => setTab("yearly")}
            className={`h-9 px-4 rounded-2xl border text-sm font-semibold ${tab === "yearly" ? "bg-[#3a88c6] text-white border-transparent" : "bg-white border-[#e6edf5] text-[#0f2e46]"}`}
          >
            Yillik
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="inline-block h-4 w-4 rounded-md" style={{ background: color }} />
      <span className="text-[14px] font-extrabold text-[#0f2e46]">{label}</span>
    </div>
  );
}