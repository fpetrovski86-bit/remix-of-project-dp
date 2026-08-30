import { Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";

export function TopBar() {
  const { t, lang, setLang } = useLang();
  const hour = new Date().getHours();
  const isOpen = hour >= 7;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-gold/20 bg-ink/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="font-display text-xl tracking-wide text-ink-foreground">
          {t("brand")}
        </Link>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-2 rounded-full border border-gold/30 px-3 py-1.5 text-xs uppercase tracking-widest text-ink-foreground">
            <span
              className={`h-2 w-2 rounded-full ${isOpen ? "bg-gold" : "bg-destructive"}`}
              aria-hidden
            />
            {isOpen ? t("open") : t("closed")}
          </span>

          <div className="flex overflow-hidden rounded-full border border-gold/30">
            {(["mk", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest transition-colors ${
                  lang === l ? "bg-gold text-ink" : "text-ink-foreground hover:bg-gold/20"
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
