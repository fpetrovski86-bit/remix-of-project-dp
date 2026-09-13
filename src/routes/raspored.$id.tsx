import { createFileRoute } from "@tanstack/react-router";
import { useLang } from "@/lib/i18n";
import { EVENTS } from "@/lib/data";

export const Route = createFileRoute("/raspored/$id")({
  head: () => ({
    meta: [
      { title: "Настан — Ресторан Трла" },
      {
        name: "description",
        content: "Детали за настан од распоредот на Ресторан Трла: датум, тип и информации.",
      },
      { property: "og:title", content: "Настан — Ресторан Трла" },
      {
        property: "og:description",
        content: "Детали за настан од распоредот на Ресторан Трла.",
      },
    ],
  }),
  component: EventPage,
});

function EventPage() {
  const { id } = Route.useParams();
  const { t, lang } = useLang();
  const event = EVENTS.find((e) => e.id === id) ?? EVENTS[0];

  return (
    <main className="px-5 pb-24 pt-32">
      <div className="mx-auto max-w-3xl">
        <Link to="/" hash="nastani" className="btn-base btn-quiet">
          ← {t("back")}
        </Link>

        <div className="mt-10 text-center">
          <p className="eyebrow">{t("events")}</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">
            {lang === "mk" ? event.mk : event.en}
          </h1>
          <div className="diamond-rule mt-5 text-sm uppercase tracking-[0.2em]">{event.d}</div>
          <p className="mt-5 text-muted-foreground">{t("eventIntro")}</p>
        </div>

        <div className="card-warm mt-12 divide-y divide-border">
          <Row label={t("date")} value={event.d} />
          <Row label={t("time")} value="20:00" />
          <Row label={t("upcoming")} value={lang === "mk" ? event.tagMk : event.tagEn} />
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
