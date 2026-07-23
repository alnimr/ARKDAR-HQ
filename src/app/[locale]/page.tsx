import { useTranslations } from "next-intl";
import { GirihBackground } from "@/components/brand/GirihBackground";

export default function Home() {
  const t = useTranslations("home");

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
      <GirihBackground opacity={0.12} scale={1} />
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <h1 className="text-display text-accent-highlight">{t("title")}</h1>
        <p className="text-body-m mt-4 text-foreground/80">{t("tagline")}</p>
      </div>
    </div>
  );
}
