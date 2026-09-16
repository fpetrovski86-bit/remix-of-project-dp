import { createFileRoute, Link } from "@tanstack/react-router";
import { DishCard } from "@/components/site/DishCard";
import { useLang } from "@/lib/i18n";
import { getCategory } from "@/lib/menu-data";
import { menuText } from "@/lib/menu-i18n";

export const Route = createFileRoute("/kategorija/$id")({
  head: () => ({
    meta: [
      { title: "Категорија — Дион Центар" },
      {
        name: "description",
        content: "Јадења од оваа категорија во менито на Дион Центар, со состав и цени.",
      },
      { property: "og:title", content: "Категорија — Дион Центар" },
      {
        property: "og:description",
        content: "Разгледајте ги јадењата од оваа категорија во менито на Дион Центар.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { id } = Route.useParams();
  const { t } = useLang();
  const cat = getCategory(id);

  return (
    <main className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <Link to="/meni" className="btn-base btn-quiet">
          ← {t("back")}
        </Link>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="eyebrow">{t("menuTitle")}</p>
          <h1 className="mt-3 font-display text-4xl uppercase sm:text-5xl">
            {cat ? menuText(cat.name, lang) : t("category")}
          </h1>
          <p className="mt-4 text-muted-foreground">{t("categoryDishes")}</p>
        </div>

        <div className="mt-12 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {cat?.items.map((item) => (
            <DishCard key={item.name} item={item} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link to="/meni" className="btn-base btn-solid">
            ← {t("back")}
          </Link>
        </div>
      </div>
    </main>
  );
}
