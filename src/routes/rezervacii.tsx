import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useLang } from "@/lib/i18n";
import { sendToFormspree } from "@/lib/formspree";

export const Route = createFileRoute("/rezervacii")({
  head: () => ({
    meta: [
      { title: "Резервации — Ресторан Дион" },
      {
        name: "description",
        content: "Резервирајте маса во Ресторан Дион. Отворено секој ден од 09:00 до 23:00.",
      },
      { property: "og:title", content: "Резервации — Ресторан Дион" },
      { property: "og:description", content: "Резервирајте маса во Ресторан Дион." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReservationsPage,
});

function Field({ label, type, name }: { label: string; type: string; name: string }) {
  return (
    <label className="block text-sm">
      <span className="text-muted-foreground">{label}</span>
      <input name={name} type={type} required className="mt-1 w-full border border-input bg-background p-3" />
    </label>
  );
}

function ReservationsPage() {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const form = new FormData(e.currentTarget);
    const ok = await sendToFormspree({
      tip: "Резервација / Reservation",
      ime: String(form.get("ime") ?? ""),
      telefon: String(form.get("telefon") ?? ""),
      datum: String(form.get("datum") ?? ""),
      vreme: String(form.get("vreme") ?? ""),
      gosti: String(form.get("gosti") ?? ""),
      zabeleska: String(form.get("zabeleska") ?? ""),
    });
    setStatus(ok ? "sent" : "error");
  };

  return (
    <main className="section-pad px-5 pt-32">
      <div className="mx-auto max-w-2xl">
        <Link to="/" className="btn-base btn-quiet mb-8">
          {t("back")}
        </Link>
        <div className="text-center">
          <p className="eyebrow">Dion</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">{t("reservations")}</h1>
          <div className="diamond-rule mt-4" aria-hidden />
          <p className="mt-4 text-muted-foreground">{t("reservationsIntro")}</p>
        </div>

        <form onSubmit={submit} className="card-warm mt-10 space-y-4 p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("name")} type="text" name="ime" />
            <Field label={t("phone")} type="tel" name="telefon" />
            <Field label={t("date")} type="date" name="datum" />
            <Field label={t("time")} type="time" name="vreme" />
            <Field label={t("people")} type="number" name="gosti" />
          </div>
          <label className="block text-sm">
            <span className="text-muted-foreground">{t("note")}</span>
            <textarea name="zabeleska" rows={3} className="mt-1 w-full border border-input bg-background p-3" />
          </label>
          <button disabled={status === "sending"} className="btn-base btn-solid w-full disabled:opacity-60">
            {status === "sending" ? "…" : t("send")}
          </button>
          {status === "sent" && <p className="text-sm text-primary">{t("sent")}</p>}
          {status === "error" && <p className="text-sm text-closed">{t("sendError")}</p>}
        </form>
      </div>
    </main>
  );
}
