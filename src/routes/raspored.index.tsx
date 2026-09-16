import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLang } from "@/lib/i18n";
import { scheduleQueryOptions } from "@/lib/schedule";

export const Route = createFileRoute("/raspored/")({
  head: () => ({
    meta: [
      { title: "Распоред на настани — Ресторан Дион" },
      {
        name: "description",
        content:
          "Распоред на настани во Ресторан Дион: жива музика, прослави и вечери со датум, време и опис.",
      },
      { property: "og:title", content: "Распоред на настани — Ресторан Дион" },
      {
        property: "og:description",
        content: "Сите претстојни настани во Ресторан Дион со датум, време и опис.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(scheduleQueryOptions),
  component: SchedulePage,
  errorComponent: ({ error }) => (
    <main className="px-5 pb-24 pt-32 text-center" role="alert">
      {error.message}
    </main>
  ),
  notFoundComponent: () => <main className="px-5 pb-24 pt-32 text-center">—</main>,
});

function SchedulePage() {
  const { t } = useLang();
  const { data: events } = useSuspenseQuery(scheduleQueryOptions);

  return (
    <main className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="eyebrow">Dion</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t("events")}</h1>
          <div className="diamond-rule mt-5" />
          <p className="mt-5 text-muted-foreground">{t("eventsIntro")}</p>
        </div>

        {events.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">—</p>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e) => (
              <Link
                key={e.id}
                to="/raspored/$id"
                params={{ id: e.id }}
                className="card-warm group overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                {e.slika ? (
                  <img
                    src={e.slika}
                    alt={e.naslov}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-primary">
                    <span>{e.datum}</span>
                    <span>{e.den}</span>
                  </div>
                  <h2 className="mt-3 font-display text-xl uppercase">{e.naslov}</h2>
                  {e.vreme ? (
                    <p className="mt-2 text-sm text-muted-foreground">{e.vreme}</p>
                  ) : null}
                  {e.opis ? <p className="mt-3 text-sm text-muted-foreground">{e.opis}</p> : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
