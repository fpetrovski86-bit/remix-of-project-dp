import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { MENU } from "@/lib/menu-data";
import { menuText } from "@/lib/menu-i18n";

export const Route = createFileRoute("/meni")({
  head: () => ({
    meta: [
      { title: "Мени — Дион Центар" },
      {
        name: "description",
        content: "Мени на Дион Центар: појадок, салати, тестенини, скара, пица и десерти.",
      },
      { property: "og:title", content: "Мени — Дион Центар" },
      { property: "og:description", content: "Јадења подредени по категории со цени." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t, lang } = useLang();

  return (
    <main className="section-pad px-5 pt-32">
      <div className="mx-auto max-w-7xl">
        <Link to="/" className="btn-base btn-quiet mb-8">
          {t("back")}
        </Link>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">à la carte</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t("menuTitle")}</h1>
          <div className="diamond-rule mt-4" aria-hidden />
          <p className="mt-4 text-muted-foreground">{t("menuIntro")}</p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {MENU.map((cat) => (
            <article key={cat.id} className="card-warm group overflow-hidden">
              <div className="aspect-[9/6] overflow-hidden">
                <img
                  src={cat.items[0]?.img}
                  alt={menuText(cat.name, lang)}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <h2 className="font-display text-xl uppercase">{menuText(cat.name, lang)}</h2>
                <Link
                  to="/kategorija/$id"
                  params={{ id: cat.id }}
                  className="btn-base btn-quiet shrink-0"
                >
                  {t("browse")}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
