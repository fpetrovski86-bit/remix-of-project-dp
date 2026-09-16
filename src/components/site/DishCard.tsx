import { useEffect, useState } from "react";
import dishImg from "@/assets/dish.jpg";
import { useLang } from "@/lib/i18n";
import type { MenuItem } from "@/lib/menu-data";
import { menuPrice, menuText } from "@/lib/menu-i18n";

export function DishCard({ item }: { item?: MenuItem }) {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const name = item ? menuText(item.name, lang) : t("dishName");
  const price = item ? menuPrice(item.price, lang) : t("price");
  const img = item?.img ?? dishImg;
  const parts = menuText(item?.desc ?? "", lang)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => setVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const showPopup = () => {
    setOpen(true);
  };

  const hidePopup = () => {
    setVisible(false);
    window.setTimeout(() => setOpen(false), 300);
  };

  return (
    <article className="group text-center">
      <button
        type="button"
        className="block w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        onClick={showPopup}
        aria-label={`${t("content")}: ${name}`}
      >
        <span className="block aspect-[3/2] overflow-hidden bg-secondary">
          <img
            src={img}
            alt={name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </span>
        <span className="mt-3 block font-display text-xl uppercase text-foreground">{name}</span>
        <span className="mt-1 block text-sm font-semibold text-primary">{price}</span>
      </button>

      {open && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-4 transition-opacity duration-300 ease-out motion-reduce:transition-none ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          onClick={hidePopup}
        >
          <div
            className={`card-warm w-full max-w-md transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none p-6 ${
              visible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-left font-display text-2xl">{name}</h3>
              <button
                aria-label={t("close")}
                onClick={hidePopup}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground hover:bg-secondary"
              >
                ✕
              </button>
            </div>
            <div className="mt-5 space-y-4 text-left text-sm">
              {parts.length > 0 && (
                <div>
                  <p className="eyebrow">{t("ingredients")}</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                    {parts.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="border-t border-border pt-4 font-semibold text-primary">{price}</div>
            </div>
            <button className="btn-base btn-solid mt-6 w-full" onClick={hidePopup}>
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
