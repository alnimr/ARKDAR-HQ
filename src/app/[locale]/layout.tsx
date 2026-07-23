import type { Metadata } from "next";
import { El_Messiri, Cinzel, Scheherazade_New } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing, rtlLocales, type Locale } from "@/i18n/routing";
import { ThemeInitScript } from "@/components/theme/ThemeInitScript";
import { SiteNav } from "@/components/nav/SiteNav";
import "../globals.css";

// Typography per ARKDAR Brand Constitution v4.0 (supersedes v1.0/v3.0):
// El Messiri = brand voice, headings (AR + EN). Cinzel = Latin authority
// voice, overlines/labels/CTAs, Latin-only. Scheherazade New = Arabic body
// text only, never bold.
const fontBrand = El_Messiri({
  variable: "--font-brand",
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
});

const fontLatin = Cinzel({
  variable: "--font-latin",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const fontBody = Scheherazade_New({
  variable: "--font-body",
  subsets: ["arabic", "latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ARKDAR",
  description: "التراث المملوكي، مرجعية أصيلة للرماية الفارسية",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = rtlLocales.includes(locale as Locale) ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${fontBrand.variable} ${fontLatin.variable} ${fontBody.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeInitScript />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider>
          <SiteNav />
          <main className="flex-1">{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
