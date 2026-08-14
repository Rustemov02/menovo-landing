import { ArrowRight, BadgeCheck } from "lucide-react";
import { WHATSAPP_LINK } from "@/utils/site";

const perks = [
  "Limitsiz kateqoriya və məhsul əlavəsi",
  "7/24 WhatsApp dəstəyi",
  "Sürətli bulud (Cloud) hostinq",
  "Avadanlıq xərci yoxdur",
];

export default function Pricing() {
  return (
    <section
      className="py-xl px-gutter max-w-container-max mx-auto flex flex-col items-center"
      id="qiymat"
    >
      <div className="text-center mb-xl">
        <h2 className="font-headline-lg md:text-display-lg text-on-surface mb-sm">
          Sadə və Şəffaf Qiymətləndirmə
        </h2>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Gizli xərclər yoxdur. Ehtiyacınız olan hər şey tək paketdə.
        </p>
      </div>

      {/* Single Pricing Card */}
      <div className="w-full max-w-md glass-panel rounded-2xl p-xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.1)] border-primary/40 transform hover:-translate-y-2 transition-transform duration-300">
        {/* Popular Badge */}
        <div className="absolute top-0 right-0 bg-primary-container text-on-primary-container px-lg py-xs rounded-bl-lg font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-md">
          Ən Populyar
        </div>

        <div className="flex flex-col gap-sm border-b border-outline-variant/20 pb-lg mb-lg">
          <h3 className="font-title-md text-title-md text-primary font-bold">
            Rüblük Paket
          </h3>
          <div className="flex items-baseline gap-xs">
            <span className="font-display-lg text-display-lg text-on-surface font-bold text-gradient">
              60 AZN
            </span>
            <span className="text-on-surface-variant font-body-md">/ 3 ay</span>
          </div>
          <span className="bg-surface-container-high text-on-surface-variant text-sm px-sm py-1 rounded-md w-fit mt-1 border border-outline-variant/30">
            Ayı cəmi 20 AZN-ə düşür
          </span>
        </div>

        <ul className="flex flex-col gap-md mb-xl">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-sm">
              <BadgeCheck size={20} className="text-secondary shrink-0 fill-current" />
              <span className="text-on-surface font-body-md">{p}</span>
            </li>
          ))}
        </ul>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-primary-container hover:bg-primary-container/90 text-on-primary-container py-md rounded-lg font-title-md text-title-md font-bold transition-all shadow-[0_4px_15px_rgba(245,158,11,0.4)] flex items-center justify-center gap-xs"
        >
          İndi Qoşul
          <ArrowRight size={20} />
        </a>
      </div>
    </section>
  );
}
