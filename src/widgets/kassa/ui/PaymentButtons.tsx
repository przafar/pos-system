"use client";

import { Button } from "@shared/ui";
import { CreditCard, Wallet} from "lucide-react";

type Props = {
  onPay?: () => void;
};

export function PaymentButtons({ onPay }: Props) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="h-28 flex flex-col items-center justify-center rounded-xl text-md"
        >
          <Wallet className="!h-auto !w-8 mb-2 text-[#3a88c6]" />
          Naqd
        </Button>

        <Button
          variant="outline"
          className="h-28 flex flex-col items-center justify-center rounded-xl text-md"
        >
          <CreditCard className="!h-auto !w-8 mb-2 text-[#3a88c6]" />
          Terminal
        </Button>

        <Button
          variant="outline"
          className="col-span-2 h-28 flex flex-col items-center justify-center rounded-xl text-md"
        >
          <CreditCard className="!h-auto !w-8 mb-2 text-[#3a88c6]" />
          Boshqa turdagi to‘lovlar
        </Button>
      </div>

      <Button
        className="w-full h-20 rounded-xl flex flex-col items-center justify-center text-md mt-3"
        onClick={onPay}
      >
        To‘lov
      </Button>
    </>
  );
}
