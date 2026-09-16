import { createServerFn } from "@tanstack/react-start";

const SCHEDULE_URL =
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
  if (typeof value === "number") {
    const [d, m] = value.toFixed(2).split(".");
    return `${d!.padStart(2, "0")}.${m}`;
  }
  return String(value ?? "").trim();
}

function formatTime(value: unknown): string {
  if (typeof value === "number") {
    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }
  const raw = String(value ?? "").trim();
  if (/^\d{1,2}$/.test(raw)) return `${raw.padStart(2, "0")}:00`;
  return raw;
}

export const getSchedule = createServerFn({ method: "GET" }).handler(
  async (): Promise<ScheduleEvent[]> => {
    try {
      const res = await fetch(SCHEDULE_URL, { headers: { accept: "application/json" } });
      if (!res.ok) return [];
      const rows = (await res.json()) as Array<Record<string, unknown>>;
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
        .filter((e) => e.naslov || e.datum);
    } catch {
      return [];
    }
  },
);
