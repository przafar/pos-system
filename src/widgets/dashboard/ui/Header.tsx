"use client";

import { useState } from "react";
import { Button } from "@shared/ui";
import { Calendar, Store, KeyRound } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@shared/components/ui/select";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@shared/components/ui/popover";
import { Calendar as CalendarUI } from "@shared/components/ui/calendar";

const kassas = [
  {
    id: "cbe92a40-1", 
    name: "Kassa-1"
  },
  {
    id: "f9271c9a-2", 
    name: "Kassa-2"
  },
  {
    id: "a77123bb-3", 
    name: "Kassa-3"
  },
];

const uuids = [
  {
    id: "c5c2bd2a-9b0e-4d7f-8d2b-7a3f1f6a1a11", 
    name: "UUID #1"
  },
  {
    id: "d1f3a7b8-2c4d-4e9f-9a22-3b4c5d6e7f88",
    name: "UUID #2"
  },
  {
    id: "a0b1c2d3-e4f5-6789-abcd-ef0123456789",
    name: "UUID #3"
  },
];

export function Header() {
  const [kassa, setKassa] = useState(kassas[0].id);
  const [uuid, setUuid] = useState(uuids[0].id);
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <div className="mx-auto w-full px-4 pt-2 ">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-10">
              <Calendar className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {date.from.toLocaleDateString()} — {date.to.toLocaleDateString()}
                  </>
                ) : (
                  date.from.toLocaleDateString()
                )
              ) : (
                <span>Sana oralig`ini tanlang</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarUI
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>

        <Select value={kassa} onValueChange={setKassa}>
          <SelectTrigger className="h-10 bg-white">
            <SelectValue placeholder="Kassa" />
          </SelectTrigger>
          <SelectContent align="end">
            {kassas.map((k) => (
              <SelectItem key={k.id} value={k.id}>
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-blue-500" />
                  {k.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={uuid} onValueChange={setUuid}>
          <SelectTrigger className="h-10 bg-white">
            <SelectValue placeholder="UUID" />
          </SelectTrigger>
          <SelectContent align="end">
            {uuids.map((u) => (
              <SelectItem key={u.id} value={u.id}>
                <div className="flex items-center gap-2">
                  <KeyRound className="h-4 w-4 text-amber-500" />
                  <span className="truncate max-w-[200px]">{u.id}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}