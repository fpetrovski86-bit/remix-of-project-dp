import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useLang } from "@/lib/i18n";
import { scheduleQueryOptions } from "@/lib/schedule";

export const Route = createFileRoute("/raspored/$id")({
  head: () => ({
    meta: [
      { title: "Настан — Ресторан Дион" },
      {
        name: "description",
        content: "Детали за настан од распоредот на Ресторан Дион: датум, време, ден и опис.",
      },
      { property: "og:title", content: "Настан — Ресторан Дион" },
      {
        property: "og:description",
        content: "Детали за настан од распоредот на Ресторан Дион.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(scheduleQueryOptions),
  component: EventPage,
  errorComponent: ({ error }) => (
    <main className="px-5 pb-24 pt-32 text-center" role="alert">
      {error.message}
    </main>
  ),
  notFoundComponent: () => <main className="px-5 pb-24 pt-32 text-center">—</main>,
});

function EventPage() {
  const { id } = Route.useParams();
  const { t } = useLang();
  const { data: events } = useSuspenseQuery(scheduleQueryOptions);
  const event = events.find((e) => e.id === id);

  if (!event) {
    return (
      <main className="px-5 pb-24 pt-32 text-center">
        <Link to="/raspored" className="btn-base btn-quiet">
          ← {t("back")}
        </Link>
      </main>
    );
  }

  return (
    <main className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <Link to="/raspored" className="btn-base btn-quiet">
          ← {t("back")}
        </Link>

        <div className="mt-10 text-center">
          <p className="eyebrow">{t("events")}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{event.naslov}</h1>
          <div className="diamond-rule mt-5 text-sm uppercase tracking-[0.2em]">{event.datum}</div>
        </div>

        {event.slika ? (
          <img
            src={event.slika}
            alt={event.naslov}
            className="mt-10 aspect-[16/9] w-full object-cover"
          />
        ) : null}

        {event.opis ? (
          <p className="mt-8 text-center text-muted-foreground">{event.opis}</p>
        ) : null}

        <div className="card-warm mt-10 divide-y divide-border">
          <Row label={t("date")} value={event.datum} />
          {event.vreme ? <Row label={t("time")} value={event.vreme} /> : null}
          {event.den ? <Row label={t("upcoming")} value={event.den} /> : null}
          <Row label={t("hoursTitle")} value={t("hours")} />
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 px-6 py-4 text-sm">
      <span className="font-display uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
