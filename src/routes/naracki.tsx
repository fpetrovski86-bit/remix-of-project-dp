import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { MENU } from "@/lib/menu-data";
import { menuText, menuPrice } from "@/lib/menu-i18n";
import { sendToFormspree } from "@/lib/formspree";

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

function Field({ label, type, name }: { label: string; type: string; name: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input name={name} type={type} required className="mt-1 w-full border border-input bg-background p-3" />
    </label>
  );
}

type Line = { name: string; price: number; img: string; qty: number };

function OrdersPage() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [catId, setCatId] = useState(MENU[0]!.id);
  const [lines, setLines] = useState<Line[]>([]);

  const category = useMemo(() => MENU.find((c) => c.id === catId) ?? MENU[0]!, [catId]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0);

  const addItem = (name: string, price: number, img: string) => {
    setLines((prev) => {
      const i = prev.findIndex((l) => l.name === name);
      if (i === -1) return [...prev, { name, price, img, qty: 1 }];
      const next = [...prev];
      next[i] = { ...next[i]!, qty: next[i]!.qty + 1 };
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

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lines.length === 0) return;
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const ok = await sendToFormspree({
      tip: "Нарачка / Order",
      ime: String(form.get("ime") ?? ""),
      telefon: String(form.get("telefon") ?? ""),
      adresa: String(form.get("adresa") ?? ""),
      jadenja: lines.map((l) => `${l.qty} × ${l.name}`).join("\n"),
      vkupno: menuPrice(total, lang),
      zabeleska: String(form.get("zabeleska") ?? ""),
    });
    setStatus(ok ? "sent" : "error");
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
            <Field label={t("name")} type="text" name="ime" />
            <Field label={t("phone")} type="tel" name="telefon" />
          </div>
          <Field label={t("address")} type="text" name="adresa" />

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
                    {menuText(c.name, lang)}
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
                    alt={menuText(item.name, lang)}
                    loading="lazy"
                    className="h-14 w-14 shrink-0 object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{menuText(item.name, lang)}</p>
                    <p className="text-xs text-muted-foreground">{menuPrice(item.price, lang)}</p>
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
                    <span className="min-w-0 flex-1 truncate text-sm">{menuText(l.name, lang)}</span>
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
                      {menuPrice(l.price * l.qty, lang)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {lines.length > 0 && (
              <p className="mt-3 text-right font-display text-lg uppercase">
                {t("total")}: <span className="text-primary">{menuPrice(total, lang)}</span>
              </p>
            )}
          </div>

          <label className="block text-sm">
            <span className="text-muted-foreground">{t("orderNote")}</span>
            <textarea name="zabeleska" rows={3} className="mt-1 w-full border border-input bg-background p-3" />
          </label>

          <button
            disabled={status === "sending" || lines.length === 0}
            className="btn-base btn-solid w-full disabled:opacity-60"
          >
            {status === "sending" ? "…" : t("send")}
          </button>
          {status === "sent" && <p className="text-sm text-primary">{t("sent")}</p>}
          {status === "error" && <p className="text-sm text-closed">{t("sendError")}</p>}
        </form>
      </div>
    </main>
  );
}
