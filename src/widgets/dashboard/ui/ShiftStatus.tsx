"use client";

import { Card, CardContent, Button } from "@shared/ui";
import {
  Clock3, 
  MonitorSmartphone, 
  CreditCard, 
  Wallet, 
  User, 
  Hash, 
  CheckCircle2
} from "lucide-react";

type Props = {
  checks?: number; 
  revenue?: number;
  lastCheckTime?: string;
  kassaName?: string;
  avgCheck?: number;
  payments?: string[];
  compareChecksPct?: string;
  compareRevenuePct?: string;
  shiftStart?: string;
  shiftDuration?: string;
  cashier?: string;
  shiftId?: string;
  onCloseShift?: () => void;
  onZReport?: () => void;
};

export function ShiftStatus({
  checks = 86,
  revenue = 1_245_000,
  lastCheckTime = "15:22",
  kassaName = "POS-02",
  avgCheck = 14480,
  payments = ["Naqd", "Terminal"],
  compareChecksPct = "+8%",
  compareRevenuePct = "+12%",
  shiftStart = "10:12",
  shiftDuration = "05 soat 18 daq",
  cashier = "Alisher Q.",
  shiftId = "SMN-240812-01",
  onCloseShift,
  onZReport,
}: Props) {
  return (
    <Card className="bg-[#fff] border-0 shadow-sm rounded-[8px] py-2">
      <CardContent className="p-2 lg:p-2">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-[28px] lg:text-[32px] font-extrabold text-[#0f2e46]">
            Smena holati — Bugun
          </h2>

          <div className="rounded-full bg-emerald-100/70 text-emerald-800 border-1 border-emerald-100 px-3 py-1.5 text-[13px] font-semibold inline-flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Smena ochiq · {shiftStart} dan beri
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-[#e6edf5] bg-white p-3">
            <div className="text-[#98a7b7] text-sm mb-3">Bugungi smenada cheklar</div>
            <div className="text-[22px] lg:text-[26px] leading-none font-extrabold text-[#0f2e46]">
              {checks.toLocaleString("ru-RU")} ta
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Pill >
                <Clock3 className="h-4 w-4 mr-2 opacity-80" />
                So‘nggi chek: {lastCheckTime}
              </Pill>
              <Pill>
                <MonitorSmartphone className="h-4 w-4 mr-2 opacity-80" />
                Kassa: {kassaName}
              </Pill>
            </div>

            <div className="mt-3 text-[14px] text-[#5b6b7c]">
              Kechagiga nisbatan{" "}
              <span className="font-semibold text-emerald-600">{compareChecksPct}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-[#e6edf5] bg-white p-3">
            <div className="text-[#98a7b7] text-sm mb-3">Bugungi smenada tushum</div>
            <div className="text-[22px] lg:text-[26px] leading-none font-extrabold text-[#0f2e46]">
              {revenue.toLocaleString("ru-RU")} so‘m
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Pill>
                <CreditCard className="h-4 w-4 mr-2 opacity-80" />
                O‘rtacha chek: {avgCheck.toLocaleString("ru-RU")}
              </Pill>
              <Pill>
                <Wallet className="h-4 w-4 mr-2 opacity-80" />
                To‘lovlar: {payments.join(", ")}
              </Pill>
            </div>

            <div className="mt-3 text-[14px] text-[#5b6b7c]">
              Kechagiga nisbatan{" "}
              <span className="font-semibold text-emerald-600">{compareRevenuePct}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetaBox label="Boshlanish" value={shiftStart} />
          <MetaBox label="Davomiyligi" value={shiftDuration} />
          <MetaBox label="Kassir" value={cashier} icon={<User className="h-4 w-4 mr-2" />} />
          <MetaBox label="Smena ID" value={shiftId} icon={<Hash className="h-4 w-4 mr-2" />} />
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <Button
            className="h-12 rounded-[12px] text-base px-6 sm:min-w-[220px]"
            onClick={onCloseShift}
          >
            <CheckCircle2 className="h-5 w-5 mr-2" />
            Smena yopish
          </Button>
          <Button
            variant="secondary"
            className="h-12 rounded-[12px] text-base bg-black text-white hover:bg-black/90 px-6 sm:min-w-[220px]"
            onClick={onZReport}
          >
            Z-hisobot
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#e6edf5] bg-[#f6fbff] px-3 py-1 text-[12px]">
      {children}
    </span>
  );
}

function MetaBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center rounded-[12px] border border-[#e6edf5] bg-white px-3 py-3 text-[#0f2e46]">
      <div className="text-[11px] text-[#98a7b7] mr-1">{label}:</div>
      <div className="text-[11px] font-semibold flex items-center">
        {icon}
        {value}
      </div>
    </div>
  );
}