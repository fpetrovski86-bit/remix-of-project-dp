import { useState } from "react";
import dishImg from "@/assets/dish.jpg";
import { useLang } from "@/lib/i18n";

export function DishCard() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <article className="group text-center">
      <button
        type="button"
        className="block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        onClick={() => setOpen(true)}
        aria-label={`${t("content")}: ${t("dishName")}`}
      >
        <span className="block aspect-[3/2] overflow-hidden bg-secondary">
          <img
            src={dishImg}
            alt={t("dishName")}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </span>
        <span className="mt-3 block font-display text-xl uppercase text-foreground">
          {t("dishName")}
        </span>
        <span className="mt-1 block text-sm font-semibold text-primary">{t("price")}</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="card-warm w-full max-w-md  p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-3xl">{t("dishName")}</h3>
              <button
                aria-label={t("close")}
                onClick={() => setOpen(false)}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:bg-secondary"
              >
                ✕
              </button>
            </div>
            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="eyebrow">{t("ingredients")}</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                  <li>{lang === "mk" ? "намирница 1" : "ingredient 1"}</li>
                  <li>{lang === "mk" ? "намирница 2" : "ingredient 2"}</li>
                  <li>{lang === "mk" ? "намирница 3" : "ingredient 3"}</li>
                </ul>
              </div>
              <div>
                <p className="eyebrow">{t("quantity")}</p>
                <p className="mt-1 text-muted-foreground">300g</p>
              </div>
              <div className="border-t border-border pt-4 text-primary">{t("price")}</div>
            </div>
            <button className="btn-base btn-solid mt-6 w-full" onClick={() => setOpen(false)}>
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
