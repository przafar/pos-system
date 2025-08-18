"use client";

import { Button } from "@shared/ui";
import { Menu } from "lucide-react";

export function Topbar({ onOpen }: { onOpen: () => void }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="mx-auto max-w-full px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">

          <Button className="h-12 w-12" variant="ghost" size="icon" onClick={onOpen}>
             <Menu className="!h-7 !w-7 text-[#25567e]" />
          </Button>
         
          <span className="text-xl font-semibold text-[#3a88c6]">Menyu</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col text-sm">
            <span>Mustafayev Bexruz</span>
            <span className="text-gray-500">Soliq servis</span>
          </div>
          <div className="size-10 rounded-xl bg-[#bed6ec] text-[#fff] grid place-items-center font-bold">MB</div>
        </div>
      </div>
    </header>
  );
}
