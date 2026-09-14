import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { MENU } from "@/lib/menu-data";

export const Route = createFileRoute("/naracki")({
  head: () => ({
    meta: [
      { title: "Нарачки — Ресторан Дион" },
      {
        name: "description",
        content: "Нарачајте храна за дома или за понесување од Ресторан Дион.",
      },
      { property: "og:title", content: "Нарачки — Ресторан Дион" },
      { property: "og:description", content: "Нарачајте храна за дома или за понесување." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrdersPage,
});

function Field({ label, type }: { label: string; type: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input type={type} className="mt-1 w-full border border-input bg-background p-3" />
    </label>
  );
}

type Line = { name: string; price: number; img: string; qty: number };

function OrdersPage() {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const [catId, setCatId] = useState(MENU[0].id);
  const [lines, setLines] = useState<Line[]>([]);

  const category = useMemo(() => MENU.find((c) => c.id === catId) ?? MENU[0], [catId]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const addItem = (name: string, price: number, img: string) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.name === name);
      if (i === -1) return [...prev, { name, price, img, qty: 1 }];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + 1 };
      return next;
    });
  };

  const setQty = (name: string, delta: number) => {
    setLines((prev) =>
      prev
        .map((l) => (l.name === name ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <main className="section-pad px-5 pt-32">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="btn-base btn-quiet mb-8">
          {t("back")}
        </Link>
        <div className="text-center">
          <p className="eyebrow">Dion</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t("orders")}</h1>
          <div className="diamond-rule mt-4" aria-hidden />
          <p className="mt-4 text-muted-foreground">{t("ordersIntro")}</p>
        </div>

        <form onSubmit={submit} className="card-warm mt-10 space-y-6 p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("name")} type="text" />
            <Field label={t("phone")} type="tel" />
          </div>
          <Field label={t("address")} type="text" />

          <div>
            <p className="font-display text-xl uppercase tracking-wide">{t("pickDishes")}</p>
            <div className="diamond-rule mt-2 mb-4" aria-hidden />

            <label className="block text-sm">
              <span className="text-muted-foreground">{t("chooseCategory")}</span>
              <select
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                className="mt-1 w-full border border-input bg-background p-3 font-display uppercase"
              >
                {MENU.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <ul className="mt-4 max-h-80 space-y-2 overflow-y-auto pr-1">
              {category.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center gap-3 border border-border bg-background/60 p-2"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.price} ден</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => addItem(item.name, item.price, item.img)}
                    className="btn-base btn-outline-brand px-4 py-2 text-xs"
                  >
                    {t("addItem")}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-xl uppercase tracking-wide">{t("yourOrder")}</p>
            <div className="diamond-rule mt-2 mb-4" aria-hidden />
            {lines.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("emptyOrder")}</p>
            ) : (
              <ul className="space-y-2">
                {lines.map((l) => (
                  <li
                    key={l.name}
                    className="flex items-center gap-3 border border-border bg-secondary/50 p-2"
                  >
                    <span className="min-w-0 flex-1 truncate text-sm">{l.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="-"
                        onClick={() => setQty(l.name, -1)}
                        className="h-7 w-7 border border-border text-sm hover:border-primary hover:text-primary"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                      <button
                        type="button"
                        aria-label="+"
                        onClick={() => setQty(l.name, 1)}
                        className="h-7 w-7 border border-border text-sm hover:border-primary hover:text-primary"
                      >
                        +
                      </button>
                    </div>
                    <span className="w-20 text-right text-sm text-muted-foreground">
                      {l.price * l.qty} ден
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {lines.length > 0 && (
              <p className="mt-3 text-right font-display text-lg uppercase">
                {t("total")}: <span className="text-primary">{total} ден</span>
              </p>
            )}
          </div>

          <label className="block text-sm">
            <span className="text-muted-foreground">{t("note")}</span>
            <textarea rows={3} className="mt-1 w-full border border-input bg-background p-3" />
          </label>

          <button className="btn-base btn-solid w-full">{t("send")}</button>
          {done && <p className="text-sm text-primary">{t("sent")}</p>}
        </form>
      </div>
    </main>
  );
}
