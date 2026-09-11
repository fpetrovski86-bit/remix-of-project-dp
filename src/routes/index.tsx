import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import galleryImg from "@/assets/gallery.jpg";

import { DishCard } from "@/components/site/DishCard";
import { useLang } from "@/lib/i18n";
import { EVENTS } from "@/lib/data";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Restoran+Trla+Makedonija";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ресторан Трла — традиционална кујна и скара" },
      {
        name: "description",
        content:
          "Ресторан Трла: домашна традиционална кујна, скара и пријатна атмосфера. Отворено секој ден од 07:00 до 00:00. Мени, резервации и нарачки.",
      },
      { property: "og:title", content: "Ресторан Трла" },
      {
        property: "og:description",
        content: "Традиционална кујна, скара и пријатна атмосфера. Отворено секој ден 07:00 – 00:00.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const { t } = useLang();
  const images = [hero1, hero2];
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % images.length), 4000);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden
          width={1920}
          height={1088}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-ink/65" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pt-24 text-center text-ink-foreground">
        <p className="text-xs uppercase tracking-[0.4em] text-gold">Est. 1998</p>
        <h1 className="mt-5 font-display text-4xl leading-tight sm:text-6xl">
          {t("heroTitle")}
        </h1>
        <p className="mt-5 text-sm uppercase tracking-[0.2em] opacity-85">{t("hours")}</p>

        <div className="mt-9">
          <Link to="/meni" className="btn-base btn-solid px-10 py-4 text-base">
            {t("menuBtn")}
          </Link>
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={MAPS_LINK} target="_blank" rel="noreferrer" className="btn-base btn-outline-gold">
            {t("findUs")}
          </a>
          <a href="#specijaliteti" className="btn-base btn-outline-gold">
            {t("todaySpecials")}
          </a>
          <Link to="/rezervacii" className="btn-base btn-outline-gold">
            {t("reservations")}
          </Link>
        </div>

      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl sm:text-5xl">{title}</h2>
      <div className="diamond-rule mt-4" aria-hidden />
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
    </div>
  );
}




function EventsCalendar() {
  const { lang, t } = useLang();
  return (
    <div className="mx-auto mt-12 max-w-4xl divide-y divide-border overflow-hidden border border-border bg-card">
      {EVENTS.map((e) => (
        <Link
          key={e.id}
          to="/raspored/$id"
          params={{ id: e.id }}
          className="flex items-center gap-5 p-5 transition-colors hover:bg-secondary"
        >
          <div className="w-16 shrink-0 text-center">
            <span className="font-display text-2xl text-primary">{e.d}</span>
          </div>
          <p className="flex-1 text-sm">{lang === "mk" ? e.mk : e.en}</p>
          <span className="bg-secondary px-3 py-1 text-xs uppercase tracking-widest text-secondary-foreground">
            {lang === "mk" ? e.tagMk : e.tagEn}
          </span>
        </Link>
      ))}
      <div className="bg-secondary/50 p-4 text-center text-xs uppercase tracking-widest text-muted-foreground">
        {t("upcoming")}
      </div>
    </div>
  );
}

function Home() {
  const { t } = useLang();

  return (
    <main>
      <Hero />

      {/* Специјалитети */}
      <section id="specijaliteti" className="section-pad px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHead
            eyebrow={t("menuTitle")}
            title={t("todaySpecials")}
            text={t("specialsIntro")}
          />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <DishCard key={i} />
            ))}
          </div>
        </div>
      </section>




      {/* Галерија */}
      <section id="galerija" className="section-pad bg-secondary/40 px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="Trla" title={t("gallery")} text={t("galleryIntro")} />
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 15 }).map((_, i) => (
              <img
                key={i}
                src={galleryImg}
                alt={`${t("gallery")} ${i + 1}`}
                loading="lazy"
                width={900}
                height={900}
                className="aspect-square w-full  object-cover transition-transform duration-500 hover:scale-[1.03]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Настани */}
      <section id="nastani" className="section-pad px-5">
        <div className="mx-auto max-w-7xl">
          <SectionHead eyebrow="Calendar" title={t("events")} text={t("eventsIntro")} />
          <EventsCalendar />
        </div>
      </section>
    </main>
  );
}
