import { createServerFn } from "@tanstack/react-start";

const SCHEDULE_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHMb0JTC1l-VTfMzF98rxumrAbqpdPkG6qpU2ZfUjd-gXVWGG6cF39edntGl_xUrLVIEyYy2ky-bKu/pub?gid=0&single=true&output=csv";

export type ScheduleEvent = {
  id: string;
  naslov: string;
  datum: string;
  vreme: string;
  den: string;
  opis: string;
  slika: string;
};

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += c;
      continue;
    }
    if (c === '"') inQuotes = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (c !== "\r") field += c;
  }
  row.push(field);
  rows.push(row);
  return rows.filter((r) => r.some((v) => v.trim() !== ""));
}

function formatTime(value: string): string {
  const raw = value.trim();
  if (/^\d{1,2}$/.test(raw)) return `${raw.padStart(2, "0")}:00`;
  return raw;
}

export const getSchedule = createServerFn({ method: "GET" }).handler(
  async (): Promise<ScheduleEvent[]> => {
    try {
      const res = await fetch(SCHEDULE_URL, { headers: { accept: "text/csv" } });
      if (!res.ok) return [];
      const rows = parseCsv(await res.text());
      if (rows.length < 2) return [];

      const header = rows[0]!.map((h) => h.trim().toLowerCase());
      const idx = (name: string) => header.indexOf(name);
      const cols = {
        naslov: idx("naslov"),
        datum: idx("datum"),
        vreme: idx("vreme"),
        den: idx("den"),
        opis: idx("opis"),
        slika: idx("slika"),
      };

      const get = (row: string[], i: number) => (i >= 0 ? (row[i] ?? "").trim() : "");

      return rows
        .slice(1)
        .map((row, index) => ({
          id: String(index + 1),
          naslov: get(row, cols.naslov),
          datum: get(row, cols.datum),
          vreme: formatTime(get(row, cols.vreme)),
          den: get(row, cols.den),
          opis: get(row, cols.opis),
          slika: get(row, cols.slika),
        }))
        .filter((e) => e.naslov || e.datum);
    } catch {
      return [];
    }
  },
);
