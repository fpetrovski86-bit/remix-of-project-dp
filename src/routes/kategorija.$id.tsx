import { createFileRoute, Link } from "@tanstack/react-router";
import { DishCard } from "@/components/site/DishCard";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/kategorija/$id")({
  head: () => ({
    meta: [
      { title: "Категорија — Ресторан Трла" },
      {
        name: "description",
        content: "Јадења и пијалоци од оваа категорија во менито на Ресторан Трла.",
      },
      { property: "og:title", content: "Категорија — Ресторан Трла" },
      {
        property: "og:description",
        content: "Разгледајте ги јадењата од оваа категорија во менито на Ресторан Трла.",
      },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { id } = Route.useParams();
  const { t } = useLang();

  return (
    <main className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <Link to="/" hash="meni" className="btn-base btn-quiet">
          ← {t("back")}
        </Link>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="eyebrow">{t("menuTitle")}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            {t("category")} {id}
          </h1>
          <p className="mt-4 text-muted-foreground">{t("categoryDishes")}</p>
        </div>

        <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 15 }).map((_, i) => (
            <DishCard key={i} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/" hash="meni" className="btn-base btn-solid">
            ← {t("back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
