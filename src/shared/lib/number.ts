export function sanitizeToDotNumber(raw: string): string {
  let v = String(raw).replace(/,/g, ".").replace(/\s/g, "");
  v = v.replace(/[^0-9.]/g, "");
  const parts = v.split(".");
  if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
  if (v.startsWith(".")) v = "0" + v;

  const [int, frac] = v.split(".");
  if (int) {
    const trimmedInt = int.replace(/^0+(?=\d)/, "");
    v = (trimmedInt === "" ? "0" : trimmedInt) + (frac !== undefined ? "." + frac : "");
  }
  return v;
}

export function parseNumber(v: string): number {
  const s = sanitizeToDotNumber(v);
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

export function formatAuto(n: number): string {
  const isInt = Math.abs(n - Math.trunc(n)) < 1e-9;
  const s = new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: isInt ? 0 : 2,
    maximumFractionDigits: isInt ? 0 : 2,
    useGrouping: true,
  }).format(n);
  return s.replace(",", ".");
}