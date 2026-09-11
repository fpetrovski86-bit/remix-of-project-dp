import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { CATEGORY_IDS, EVENTS } from "@/lib/data";

function Dropdown({
  label,
  children,
}: {
  label: string;
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
        className="flex items-center gap-1.5 font-display text-sm uppercase tracking-[0.12em] text-foreground transition-colors hover:text-primary"
      >
        {label}
        <span className={`text-[0.6rem] transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 max-h-[70vh] w-64 overflow-y-auto border border-border bg-popover shadow-[var(--shadow-warm)]">
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

  const itemCls =
    "block border-b border-border px-4 py-3 text-sm text-foreground transition-colors last:border-b-0 hover:bg-secondary hover:text-primary";

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-7">
          <Link to="/" className="font-display text-xl uppercase tracking-[0.14em] text-foreground">
            {t("brand")}
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <Dropdown label={t("menuTitle")}>
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

            <Dropdown label={t("schedule")}>
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

            <Link
              to="/"
              hash="galerija"
              className="font-display text-sm uppercase tracking-[0.12em] text-foreground transition-colors hover:text-primary"
            >
              {t("gallery")}
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/" hash="rezervacii" className="btn-base btn-solid hidden py-2.5 text-xs md:inline-flex">
            {t("orderNow")}
          </Link>
          <Link to="/" hash="rezervacii" className="btn-base btn-solid hidden py-2.5 text-xs md:inline-flex">
            {t("reserveTable")}
          </Link>

          <span className="flex items-center gap-2 border border-border px-3 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
            <span
              className={`h-2 w-2 rounded-full ${isOpen ? "bg-primary" : "bg-destructive"}`}
              aria-hidden
            />
            {isOpen ? t("open") : t("closed")}
          </span>

          <div className="flex overflow-hidden border border-border">
            {(["mk", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                  lang === l
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
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
