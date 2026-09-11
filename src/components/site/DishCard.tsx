import { useState } from "react";
import dishImg from "@/assets/dish.jpg";
import { useLang } from "@/lib/i18n";

export function DishCard() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <article className="card-warm group flex flex-col overflow-hidden ">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={dishImg}
          alt={t("dishName")}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl">{t("dishName")}</h3>
          <span className="whitespace-nowrap text-sm font-semibold text-primary">
            {t("price")}
          </span>
        </div>
        <button className="btn-base btn-quiet mt-auto w-full" onClick={() => setOpen(true)}>
          {t("content")}
        </button>
      </div>

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
