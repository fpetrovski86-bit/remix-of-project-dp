import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import dion1 from "@/assets/dion/dion-1.jpg.asset.json";
import dion2 from "@/assets/dion/dion-2.jpg.asset.json";
import dion3 from "@/assets/dion/dion-3.jpg.asset.json";
import dion4 from "@/assets/dion/dion-4.jpg.asset.json";
import dion5 from "@/assets/dion/dion-5.jpg.asset.json";
import dion6 from "@/assets/dion/dion-6.jpg.asset.json";
import dion7 from "@/assets/dion/dion-7.jpg.asset.json";
import dion8 from "@/assets/dion/dion-8.jpg.asset.json";
import dion9 from "@/assets/dion/dion-9.jpg.asset.json";
import dion10 from "@/assets/dion/dion-10.jpg.asset.json";
import dion11 from "@/assets/dion/dion-11.jpg.asset.json";
import dion12 from "@/assets/dion/dion-12.jpg.asset.json";
import dion13 from "@/assets/dion/dion-13.jpg.asset.json";
import dion14 from "@/assets/dion/dion-14.jpg.asset.json";
import dion15 from "@/assets/dion/dion-15.jpg.asset.json";
import dion16 from "@/assets/dion/dion-16.jpg.asset.json";
import dion17 from "@/assets/dion/dion-17.jpg.asset.json";
import dion18 from "@/assets/dion/dion-18.jpg.asset.json";
import dion19 from "@/assets/dion/dion-19.jpg.asset.json";

const HERO_IMAGES = [dion1.url, dion2.url, dion3.url];
const GALLERY_IMAGES = [
  dion4, dion5, dion6, dion7, dion8, dion9, dion10, dion11,
  dion12, dion13, dion14, dion15, dion16, dion17, dion18, dion19,
].map((a) => a.url);

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
