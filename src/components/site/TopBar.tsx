import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { CATEGORY_IDS, EVENTS } from "@/lib/data";

function Dropdown({
  label,
  solid,
  children,
}: {
  label: string;
  solid: boolean;
  children: (close: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex items-center gap-2 font-display text-xl font-semibold uppercase tracking-[0.12em] transition-colors hover:text-primary ${
          solid ? "text-foreground" : "text-ink-foreground"
        }`}
      >
        {label}
        <span className={`text-[0.6rem] transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-4 max-h-[70vh] w-64 overflow-y-auto border border-border bg-popover shadow-[var(--shadow-warm)]">
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function TopBar() {
  const { t, lang, setLang } = useLang();
  const hour = new Date().getHours();
  const isOpen = hour >= 7;
  const solid = true;

  const itemCls =
    "block border-b border-border px-4 py-3 text-sm text-foreground transition-colors last:border-b-0 hover:bg-secondary hover:text-primary";

  const linkCls = `font-display text-xl font-semibold uppercase tracking-[0.12em] transition-colors hover:text-primary ${
    solid ? "text-foreground" : "text-ink-foreground"
  }`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background shadow-[var(--shadow-warm)]">
      <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-6 px-6 py-6">
        <div className="flex items-center gap-9">
          <Link
            to="/"
            className={`font-display text-4xl font-bold uppercase tracking-[0.14em] transition-colors ${
              solid ? "text-foreground" : "text-ink-foreground"
            }`}
          >
            {t("brand")}
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <Dropdown label={t("menuTitle")} solid={solid}>
              {(close) =>
                CATEGORY_IDS.map((id) => (
                  <Link
                    key={id}
                    to="/kategorija/$id"
                    params={{ id }}
                    onClick={close}
                    className={itemCls}
                  >
                    {t("category")} {id}
                  </Link>
                ))
              }
            </Dropdown>

            <Dropdown label={t("schedule")} solid={solid}>
              {(close) =>
                EVENTS.map((e) => (
                  <Link
                    key={e.id}
                    to="/raspored/$id"
                    params={{ id: e.id }}
                    onClick={close}
                    className={itemCls}
                  >
                    <span className="mr-2 font-display text-primary">{e.d}</span>
                    {lang === "mk" ? e.mk : e.en}
                  </Link>
                ))
              }
            </Dropdown>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/naracki" className="btn-base btn-solid hidden px-7 py-4 text-base md:inline-flex">
            {t("orderNow")}
          </Link>
          <Link to="/rezervacii" className="btn-base btn-solid hidden px-7 py-4 text-base md:inline-flex">
            {t("reserveTable")}
          </Link>

          <span
            className={`flex items-center gap-2 border px-3 py-2 text-xs uppercase tracking-widest ${
              solid
                ? "border-border text-muted-foreground"
                : "border-ink-foreground/40 text-ink-foreground"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${isOpen ? "bg-primary" : "bg-destructive"}`}
              aria-hidden
            />
            {isOpen ? t("open") : t("closed")}
          </span>

          <div
            className={`flex overflow-hidden border ${
              solid ? "border-border" : "border-ink-foreground/40"
            }`}
          >
            {(["mk", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-4 py-3 text-sm uppercase tracking-widest transition-colors ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : solid
                      ? "text-foreground hover:bg-secondary"
                      : "text-ink-foreground hover:bg-ink-foreground/15"
                }`}
              >
                {l === "mk" ? "МК" : "EN"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
