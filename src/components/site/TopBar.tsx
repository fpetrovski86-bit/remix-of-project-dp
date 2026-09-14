import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { EVENTS } from "@/lib/data";
import { MENU } from "@/lib/menu-data";
import dionLogo from "@/assets/dion-logo.png";

function Dropdown({
  label,
  solid,
  wide = false,
  children,
}: {
  label: string;
  solid: boolean;
  wide?: boolean;
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
    <div className={wide ? "static" : "relative"} ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={`flex items-center gap-2 font-display text-lg font-semibold uppercase transition-colors hover:text-primary ${
          solid ? "text-foreground" : "text-ink-foreground"
        }`}
      >
        {label}
        <span className={`text-[0.6rem] transition-transform ${open ? "rotate-180" : ""}`}>⌃</span>
      </button>

      {open && (
        <div
          className={
            wide
              ? "absolute inset-x-0 top-full z-50 max-h-[70vh] overflow-y-auto border-y border-border bg-popover shadow-[var(--shadow-warm)]"
              : "absolute left-0 top-full z-50 mt-4 max-h-[70vh] w-72 overflow-y-auto border border-border bg-popover shadow-[var(--shadow-warm)]"
          }
        >
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

export function TopBar() {
  const { t, lang, setLang } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const solid = true;

  useEffect(() => {
    const updateOpenStatus = () => {
      const now = new Date();
      const day = new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        timeZone: "Europe/Skopje",
      }).format(now);
      const hour = Number(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          hour12: false,
          timeZone: "Europe/Skopje",
        }).format(now),
      );

      const isWeekend = day === "Fri" || day === "Sat";
      const open = isWeekend ? hour >= 9 || hour < 1 : hour >= 9 && hour < 24;
      setIsOpen(open);
    };

    updateOpenStatus();
    const interval = window.setInterval(updateOpenStatus, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const itemCls =
    "block border-b border-border px-4 py-3 text-sm text-foreground transition-colors last:border-b-0 hover:bg-secondary hover:text-primary";

  const linkCls = `font-display text-lg font-semibold uppercase transition-colors hover:text-primary ${
    solid ? "text-foreground" : "text-ink-foreground"
  }`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-background shadow-[var(--shadow-warm)]">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-5 sm:px-5">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            to="/"
            aria-label={t("brand")}
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <img
              src={dionLogo}
              alt={t("brand")}
              width={846}
              height={297}
              className="h-auto w-28 object-contain sm:w-40 lg:w-48"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
             <Dropdown label={t("menuTitle")} solid={solid} wide>
               {(close) => (
                 <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-7 sm:grid-cols-3 lg:grid-cols-4">
                   {MENU.map((cat, index) => (
                     <Link
                       key={cat.id}
                       to="/kategorija/$id"
                       params={{ id: cat.id }}
                       onClick={close}
                       className={`flex min-h-14 items-center border-b border-border px-5 py-3 font-display text-base font-semibold uppercase text-foreground transition-colors hover:bg-secondary hover:text-primary sm:text-lg ${
                         index % 2 !== 0 ? "border-l" : ""
                       } ${index % 3 !== 0 ? "sm:border-l" : "sm:border-l-0"} ${
                         index % 4 !== 0 ? "lg:border-l" : "lg:border-l-0"
                       }`}
                     >
                       {cat.name}
                     </Link>
                   ))}
                 </div>
               )}
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
          <Link to="/naracki" className="btn-base btn-solid hidden px-6 py-3 text-sm md:inline-flex">
            {t("orderNow")}
          </Link>
          <Link to="/rezervacii" className="btn-base btn-solid hidden px-6 py-3 text-sm md:inline-flex">
            {t("reserveTable")}
          </Link>

          <span
            className={`flex items-center gap-2 border px-3 py-2 text-[10px] uppercase tracking-widest ${
              solid
                ? "border-border text-muted-foreground"
                : "border-ink-foreground/40 text-ink-foreground"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${isOpen ? "bg-open" : "bg-closed"}`}
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
                className={`px-3 py-2 text-xs uppercase tracking-widest transition-colors ${
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
