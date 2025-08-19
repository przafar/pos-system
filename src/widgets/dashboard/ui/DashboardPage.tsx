"use client";

import { Header } from "./Header";
import { CompanyInfoCard } from "./CompanyInfoCard";
import { FinanceOverview } from "./FinanceOverview";
import { ShiftStatus } from "./ShiftStatus";
import { BalancePanel } from "./BalancePanel";
import { RevenueDynamics } from "./RevenueDynamics";
import { InventorySwitcher } from "./InventorSwitcher";

export default function DashboardPage() {

  return (
    <div className="min-h-screen bg-[#f6fbff]">
      <Header />
      <div className="mx-auto max-w-none px-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <CompanyInfoCard
          name="“Soliq Servis” DUK"
          address="Toshkent sh., Yunusobod tumani, A.Temur ko'chasi, 1-uy"
          director="Qodirov Alisher"
          regDate="12.05.2021"
          tin="202530465"
          lastUpdated="12.08.2025 15:45"
        />
        <FinanceOverview />
        <ShiftStatus
          onCloseShift={() => {}}
          onZReport={() => {}}
        />
        <BalancePanel
          onTopUp={(amt) => {}}
          onHistory={() => {}}
        />
        <RevenueDynamics />
        <InventorySwitcher />
      </div>
      
      
    </div>
  );
}