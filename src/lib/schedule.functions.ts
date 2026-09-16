import { createServerFn } from "@tanstack/react-start";

const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbzkHudh8zK-zcV3xGqtK85FYM52TeBFVW3-8mMm4AahieVD5bjvEXDq10lDVo8ME57mFQ/exec";

export type ScheduleEvent = {
  id: string;
  naslov: string;
  datum: string;
  vreme: string;
  den: string;
  opis: string;
  slika: string;
};

function formatDate(value: unknown): string {
  if (typeof value === "number") return value.toFixed(2).replace(".", ".");
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime()) && raw.includes("-")) {
    const dd = String(parsed.getUTCDate()).padStart(2, "0");
    const mm = String(parsed.getUTCMonth() + 1).padStart(2, "0");
    return `${dd}.${mm}`;
  }
  return raw;
}

function formatTime(value: unknown): string {
  if (typeof value === "number") {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 100);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  const parsed = new Date(raw);
  if (!Number.isNaN(parsed.getTime()) && raw.includes("T")) {
    const hh = String(parsed.getUTCHours()).padStart(2, "0");
    const mm = String(parsed.getUTCMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }
  return raw;
}

export const getSchedule = createServerFn({ method: "GET" }).handler(
  async (): Promise<ScheduleEvent[]> => {
    try {
      const response = await fetch(SHEET_URL, { headers: { Accept: "application/json" } });
      if (!response.ok) return [];
      const rows = (await response.json()) as Array<Record<string, unknown>>;
      if (!Array.isArray(rows)) return [];

      return rows
        .map((row, index) => ({
          id: String(index + 1),
          naslov: String(row["naslov"] ?? "").trim(),
          datum: formatDate(row["datum"]),
          vreme: formatTime(row["vreme"]),
          den: String(row["den"] ?? "").trim(),
          opis: String(row["opis"] ?? "").trim(),
          slika: String(row["slika"] ?? "").trim(),
        }))
        .filter((event) => event.naslov.length > 0);
    } catch {
      return [];
    }
  },
);
