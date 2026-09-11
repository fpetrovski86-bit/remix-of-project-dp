import { createFileRoute, Link } from "@tanstack/react-router";
import categoryImg from "@/assets/category.jpg";
import { useLang } from "@/lib/i18n";
import { CATEGORY_IDS } from "@/lib/data";

export const Route = createFileRoute("/meni")({
  head: () => ({
    meta: [
      { title: "Мени — Ресторан Трла" },
      {
        name: "description",
        content: "Мени на Ресторан Трла: јадења и пијалоци подредени по категории.",
      },
      { property: "og:title", content: "Мени — Ресторан Трла" },
      { property: "og:description", content: "Јадења и пијалоци подредени по категории." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t } = useLang();

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
          {CATEGORY_IDS.map((id) => (
            <article key={id} className="card-warm group overflow-hidden">
              <div className="aspect-[9/6] overflow-hidden">
                <img
                  src={categoryImg}
                  alt={`${t("category")} ${id}`}
                  loading="lazy"
                  width={900}
                  height={700}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between gap-3 p-5">
                <h2 className="font-display text-2xl">
                  {t("category")} {id}
                </h2>
                <Link to="/kategorija/$id" params={{ id }} className="btn-base btn-quiet">
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
