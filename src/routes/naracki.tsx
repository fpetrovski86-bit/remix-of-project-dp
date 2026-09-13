import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";

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

function OrdersPage() {
  const { t } = useLang();
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <main className="section-pad px-5 pt-32">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="btn-base btn-quiet mb-8">
          {t("back")}
        </Link>
        <div className="text-center">
          <p className="eyebrow">Dion</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t("orders")}</h1>
          <div className="diamond-rule mt-4" aria-hidden />
          <p className="mt-4 text-muted-foreground">{t("ordersIntro")}</p>
        </div>

        <form onSubmit={submit} className="card-warm mt-10 space-y-4 p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("name")} type="text" />
            <Field label={t("phone")} type="tel" />
          </div>
          <Field label={t("address")} type="text" />
          <label className="block text-sm">
            <span className="text-muted-foreground">{t("order")}</span>
            <textarea rows={4} className="mt-1 w-full border border-input bg-background p-3" />
          </label>
          <button className="btn-base btn-solid w-full">{t("send")}</button>
          {done && <p className="text-sm text-primary">{t("sent")}</p>}
        </form>
      </div>
    </main>
  );
}
