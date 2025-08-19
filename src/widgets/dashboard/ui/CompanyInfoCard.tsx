"use client";

import { Button, Card, CardContent } from "@shared/ui";
import { Copy } from "lucide-react";
import { useToast } from "@shared/components/ui/use-toast";


type Props = {
  name: string;
  subtitle?: string;
  address: string;
  director: string;
  regDate: string;
  tin: string;
  lastUpdated?: string;
};

export function CompanyInfoCard({
  name,
  subtitle = "Korxona ma'lumotlari",
  address,
  director,
  regDate,
  tin,
  lastUpdated,
}: Props) {
  const initials =
    name
      .replace(/["“”]/g, " ")
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "—";

  const toast = useToast();

 
  const copyTin = async () => {
    try {
      await navigator.clipboard.writeText(tin);
      toast("Скопировано: STIR nusxa olindi");
    } catch {
      toast.error("Xatolik: STIR'ni nusxalash muvaffaqiyatsiz tugadi");
    }
  };

  return (
    <Card className="bg-[#fff] border-0 shadow-sm rounded-[8px] py-2">
      <CardContent className="p-2 sm:p-2 lg:p-2 flex flex-col h-full">
        <div className="flex flex-col gap-2 sm:gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-[#0f3b63] text-white grid place-items-center text-lg font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-extrabold leading-tight truncate">
                {name}
              </div>
              <div className="text-xs sm:text-sm text-[#6b7a88]">
                {subtitle}
              </div>
            </div>
          </div>

          <div className="mt-1 md:mt-0 rounded-full border bg-white/70 px-3 py-2 inline-flex w-full md:w-auto items-center justify-between md:justify-start gap-3">
            <div className="text-sm text-[#6b7a88] truncate">
              <span className="opacity-80 mr-1">STIR:</span>
              <span className="font-extrabold tracking-wide">{tin}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full h-8"
              onClick={copyTin}
            >
              <Copy className="h-4 w-4 mr-2" />
              Nusxa olish
            </Button>
          </div>
        </div>

        <div className="mt-4 sm:mt-5 grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3 flex-1">
          <InfoField label="Manzil" value={address} />
          <InfoField label="Raxbar" value={director} highlight />
          <InfoField label="Ro'yxatdan o'tgan sana" value={regDate} strong />
          <InfoField label="STIR (korxona)" value={tin} strong />
        </div>

        
      </CardContent>
      {lastUpdated && (
          <div className=" pt-3 pl-4 text-xs sm:text-sm text-[#6b7a88]">
            Oxirgi yangilanish:{" "}
            <span className="font-medium">{lastUpdated}</span>
          </div>
        )}
    </Card>
  );
}

function InfoField({
  label,
  value,
  strong,
  highlight,
}: {
  label: string;
  value: string;
  strong?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="h-[110px] sm:h-[110px] rounded-[12px] border border-[#e6edf5] bg-white px-3 py-3 sm:px-3 sm:py-3 flex flex-col justify-between">
      <div className="text-xs sm:text-sm text-[#98a7b7]">{label}</div>
      <div
        className={[
          "leading-snug line-clamp-2",
          strong
            ? "text-[14px] font-extrabold"
            : "text-base sm:text-[16px] font-semibold",
          highlight ? "text-[#0f2e46]" : "text-[#0f2e46]/90",
        ].join(" ")}
      >
        {value}
      </div>
    </div>
  );
}