export const CATEGORY_IDS = Array.from({ length: 12 }, (_, i) => String(i + 1));

export const EVENTS = [
  { id: "1", d: "05.09", mk: "Жива музика — тамбураши", en: "Live music — tamburitza band", tagMk: "Петок", tagEn: "Friday" },
  { id: "2", d: "12.09", mk: "Вечер на скара", en: "Grill evening", tagMk: "Петок", tagEn: "Friday" },
  { id: "3", d: "20.09", mk: "Резервиран ден — свадба", en: "Reserved day — wedding", tagMk: "Резервирано", tagEn: "Reserved" },
  { id: "4", d: "04.10", mk: "Жива музика — народни песни", en: "Live music — folk songs", tagMk: "Петок", tagEn: "Friday" },
  { id: "5", d: "18.10", mk: "Резервиран ден — крштевка", en: "Reserved day — christening", tagMk: "Резервирано", tagEn: "Reserved" },
  { id: "6", d: "31.12", mk: "Дочек на Нова Година", en: "New Year's Eve celebration", tagMk: "Празник", tagEn: "Holiday" },
] as const;
