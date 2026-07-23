import { useLocale, useTranslations } from "next-intl";
import { GirihBackground } from "@/components/brand/GirihBackground";
import { DecagonalRosette } from "@/components/brand/DecagonalRosette";

export function SectionPlaceholder({
  navKey,
}: {
  navKey: "diwan" | "mayadin" | "itad" | "multaqa" | "bawwaba";
}) {
  const nav = useTranslations("nav");
  const section = useTranslations("section");
  const locale = useLocale();
  const subtitleClass = locale === "ar" ? "text-body-m" : "text-label";

  return (
    <div className="relative overflow-hidden">
      <GirihBackground opacity={0.08} scale={0.9} />
      <div className="relative z-10 mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-h1 text-accent-highlight">
          {nav(`${navKey}.label`)}
        </h1>
        <p className={`${subtitleClass} mt-3 text-foreground/70`}>
          {nav(`${navKey}.subtitle`)}
        </p>
        <div className="mx-auto mt-8 flex justify-center">
          <DecagonalRosette size={64} layers={3} opacity={0.65} />
        </div>
        <p className="text-body-m mt-8 text-foreground/50">
          {section("placeholder")}
        </p>
      </div>
    </div>
  );
}
