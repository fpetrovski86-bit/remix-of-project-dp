import { useLang } from "@/lib/i18n";

const MAPS_LINK =
  "https://www.google.com/maps/search/?api=1&query=Restoran+Trla+Makedonija";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Restoran%20Trla%20Makedonija&output=embed";

export function SiteFooter() {
  const { t } = useLang();

  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-2xl text-gold">{t("visitUs")}</h3>
          <div className="mt-4 overflow-hidden  border border-gold/20">
            <iframe
              title="Google Maps"
              src={MAPS_EMBED}
              className="h-44 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-block text-sm text-gold hover:underline"
          >
            {t("findUs")} →
          </a>
        </div>

        <div>
          <h3 className="font-display text-2xl text-gold">{t("contactUs")}</h3>
          <p className="mt-4 text-sm opacity-80">
            <a href="tel:+38970123456" className="hover:text-gold">
              +389 70 123 456
            </a>
          </p>
          <p className="mt-2 text-sm opacity-80">
            <a href="mailto:info@restorantrla.mk" className="hover:text-gold">
              info@restorantrla.mk
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-display text-2xl text-gold">{t("hoursTitle")}</h3>
          <p className="mt-4 text-sm opacity-80">{t("hours")}</p>
        </div>

        <div>
          <h3 className="font-display text-2xl text-gold">{t("followUs")}</h3>
          <div className="mt-4 flex flex-col gap-2 text-sm opacity-80">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-gold">
              Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-gold">
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gold/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs opacity-70 sm:flex-row">
          <span>© {new Date().getFullYear()} {t("brand")}. {t("rights")}</span>
          <span>{t("hours")}</span>
        </div>
      </div>
    </footer>
  );
}
