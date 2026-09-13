import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import galleryImg from "@/assets/gallery.jpg";

import { DishCard } from "@/components/site/DishCard";
import { MENU } from "@/lib/menu-data";
import { useLang } from "@/lib/i18n";

const MAPS_LINK = "https://maps.google.com/?q=41.995896,21.433633";

const SPECIALS = [
  MENU.find((c) => c.id === "skara")?.items[0],
  MENU.find((c) => c.id === "pica-34cm")?.items[6],
  MENU.find((c) => c.id === "tradicionalna-hrana")?.items[1],
  MENU.find((c) => c.id === "deserti")?.items[1],
].filter(Boolean);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Дион Центар — ресторан во Скопје, скара и домашна кујна" },
      {
        name: "description",
        content:
          "Дион Центар, Кеј 13-ти Ноември, Скопје: скара, пица, тестенини и домашна кујна. Отворено секој ден 09:00 – 23:00.",
      },
      { property: "og:title", content: "Дион Центар — ресторан во Скопје" },
      {
        property: "og:description",
        content: "Скара, пица, тестенини и домашна кујна. Отворено секој ден 09:00 – 23:00.",
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




function Home() {
  const { t } = useLang();

  return (
    <main>
      <Hero />

      {/* Специјалитети */}
      <section id="specijaliteti" className="section-pad bg-secondary/40 px-5">
        <div className="mx-auto max-w-6xl">
          <SectionHead
            eyebrow={t("menuTitle")}
            title={t("todaySpecials")}
            text={t("specialsIntro")}
          />
          <div className="mt-12 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {SPECIALS.map((item) => (
              <DishCard key={item!.name} item={item!} />
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/meni" className="btn-base btn-outline-brand px-14 py-4 text-lg">
              {t("menuBtn")}
            </Link>
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
    </main>
  );
}
