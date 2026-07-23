import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const SECTIONS = [
  { key: "diwan", href: "/al-diwan" },
  { key: "mayadin", href: "/al-mayadin" },
  { key: "itad", href: "/al-itad" },
  { key: "multaqa", href: "/al-multaqa" },
  { key: "bawwaba", href: "/al-bawwaba" },
] as const;

export function SiteNav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  // Subtitles are Latin words on non-Arabic locales, so they take the
  // Cinzel "Label" role; on Arabic they're short Scheherazade New body text.
  const subtitleClass = locale === "ar" ? "text-body-m text-sm" : "text-label";

  return (
    <header className="border-b border-border-subtle">
      <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="text-lg font-medium tracking-wide text-accent [font-family:var(--font-heading)]"
        >
          ARKDAR
        </Link>
        <ul className="flex flex-wrap items-center gap-6">
          {SECTIONS.map((section) => (
            <li key={section.key}>
              <Link
                href={section.href}
                className="group flex flex-col items-center text-center"
              >
                <span className="text-base text-foreground transition-colors group-hover:text-accent-highlight [font-family:var(--font-heading)]">
                  {t(`${section.key}.label`)}
                </span>
                <span className={`${subtitleClass} text-foreground/60`}>
                  {t(`${section.key}.subtitle`)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
