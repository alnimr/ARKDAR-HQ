import { useTranslations } from "next-intl";

export default function AlBawwabaPage() {
  const nav = useTranslations("nav");
  const section = useTranslations("section");

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="text-3xl font-semibold text-accent-highlight">
        {nav("bawwaba.label")}
      </h1>
      <p className="mt-2 text-foreground/70">{nav("bawwaba.subtitle")}</p>
      <p className="mt-8 text-foreground/50">{section("placeholder")}</p>
    </div>
  );
}
