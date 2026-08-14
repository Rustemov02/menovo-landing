import { BadgeCheck, Check, MessageCircle, QrCode, Sparkles, X } from "lucide-react";

const traditionalCons = [
  "Mürəkkəb qeydiyyat və kassa inteqrasiyası tələb edir.",
  "Aylıq yüksək abunəlik haqları və gizli xərclər.",
  "Menyu yeniləmək üçün kompyuterə və təlimə ehtiyac var.",
  "Yavaş yüklənən səhifələr müştəriləri yorur.",
];

const menovoPros = [
  "Münasib rüblük ödəniş",
  "WhatsApp-dan mətni yapışdır",
  "100% Cloud, quraşdırma yoxdur",
  "İldırım sürəti ilə işləyən interfeys",
];

const steps = [
  {
    icon: MessageCircle,
    title: "1. Mətni Göndərin",
    description:
      "Menyunuzu mətn və ya şəkil formasında bizə WhatsApp vasitəsilə göndərin.",
  },
  {
    icon: Sparkles,
    title: "2. Avtomatik Yaranma",
    description:
      "Sistemimiz məlumatları dərhal emal edib, modern menyu yaradır.",
  },
  {
    icon: QrCode,
    title: "3. QR Kodunuz Hazırdır",
    description:
      "Masalara yerləşdirmək üçün xüsusi QR kodunuzu əldə edin.",
  },
];

export default function Features() {
  return (
    <>
      {/* Comparison Section */}
      <section className="py-xl px-gutter max-w-container-max mx-auto" id="mahsul">
        <div className="text-center mb-xl">
          <h2 className="font-display-lg text-headline-lg md:text-display-lg text-on-surface mb-sm">
            Niyə <span className="text-gradient">Menovo?</span>
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Köhnə sistemləri unudun. Restoran idarəetməsini sadələşdirmək üçün
            dizayn edildi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-md md:gap-0 max-w-4xl mx-auto">
          {/* Bad Side */}
          <div className="bg-surface-container border border-outline-variant/20 rounded-t-xl md:rounded-l-xl md:rounded-tr-none p-xl flex flex-col gap-lg">
            <div className="flex items-center gap-sm pb-md border-b border-outline-variant/20">
              <X size={28} className="text-error" strokeWidth={2} />
              <h3 className="font-title-md text-title-md text-on-surface/70 font-semibold">
                Ənənəvi QR Sistemlər
              </h3>
            </div>
            <ul className="flex flex-col gap-md">
              {traditionalCons.map((c) => (
                <li key={c} className="flex items-start gap-sm">
                  <X size={20} className="text-error/80 mt-1 shrink-0" />
                  <span className="text-on-surface-variant font-body-md">{c}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Good Side */}
          <div className="glass-panel border-primary/30 rounded-b-xl md:rounded-r-xl md:rounded-bl-none p-xl flex flex-col gap-lg relative overflow-hidden transform md:scale-105 z-10 shadow-[0_20px_40px_rgba(245,158,11,0.1)]">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-container/20 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-sm pb-md border-b border-primary/20">
              <BadgeCheck size={28} className="text-primary-container fill-current" />
              <h3 className="font-title-md text-title-md text-primary font-bold">
                Menovo
              </h3>
            </div>
            <ul className="flex flex-col gap-md relative z-10">
              {menovoPros.map((p) => (
                <li key={p} className="flex items-start gap-sm">
                  <Check size={20} className="text-secondary mt-1 shrink-0 fill-current" />
                  <span className="text-on-surface font-body-md font-semibold bg-surface/50 px-2 py-0.5 rounded border border-outline-variant/30">
                    {p}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-xl px-gutter max-w-container-max mx-auto" id="xususiyyatlar">
        <div className="text-center mb-xl">
          <h2 className="font-headline-lg md:text-display-lg text-on-surface mb-sm">
            Necə İşləyir?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Cəmi 3 sadə addımla menyunuzu rəqəmsallaşdırın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-outline-variant to-transparent z-0"></div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="flex flex-col items-center text-center gap-md z-10 group"
              >
                <div className="w-20 h-20 rounded-full glass-panel flex items-center justify-center text-primary-container shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:scale-110 transition-transform duration-300">
                  <Icon size={36} />
                </div>
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface mb-xs">
                    {step.title}
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
