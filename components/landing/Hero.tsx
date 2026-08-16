import Link from "next/link";
import { BadgeCheck, MessageCircle, Zap } from "lucide-react";
import { DEMO_ROUTE, WHATSAPP_LINK } from "@/utils/site";
import MenuMockup from "@/components/landing/MenuMockup";

export default function Hero() {
  return (
    <main className="pt-[120px] pb-xl px-gutter max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        {/* Hero Content */}
        <div className="flex flex-col gap-lg z-10">
          {/* <div className="inline-flex items-center gap-xs bg-primary-container/15 text-primary px-sm py-xs rounded-full w-max border border-primary/20 backdrop-blur-sm">
            <Zap size={16} className="fill-current" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Restoran Texnologiyası 2.0
            </span>
          </div> */}

          <h1 className="font-display-lg text-display-lg text-on-surface leading-tight text-gradient drop-shadow-[0_2px_10px_rgba(245,158,11,0.2)]">
            Məkanınız üçün ən sürətli və sadə rəqəmsal QR menyu
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[90%] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            Mürəkkəb kassa proqramlarına və aylıq yüksək abunəliklərə son.
            Menyunuzu dərhal yaradın, istədiyiniz vaxt anında yeniləyin və
            dərhal istifadəyə verin.
          </p>

          <div className="flex flex-col sm:flex-row gap-md mt-sm">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#10B981] hover:bg-[#059669] text-white h-11 px-5 py-2.5 rounded-lg font-title-md text-base font-medium transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              <MessageCircle size={20} className="fill-current w-5 h-5 shrink-0" />
              WhatsApp-la Sifariş Et
            </a>
            <Link
              href={DEMO_ROUTE}
              className="bg-transparent border-[1.5px] border-outline-variant text-inverse-surface hover:border-primary hover:text-primary h-11 px-5 py-2.5 rounded-lg font-title-md text-base font-medium transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
            >
              Canlı Demoya Bax
            </Link>
          </div>

          <div className="mt-md flex items-center gap-sm text-on-surface-variant/80 font-label-sm text-label-sm">
            <BadgeCheck size={16} className="text-secondary shrink-0" />
            <span>Quraşdırma haqqı yoxdur</span>
            <span className="mx-sm border-r border-outline-variant/30 h-4" />
            <BadgeCheck size={16} className="text-secondary shrink-0" />
            <span>Dərhal aktivləşmə</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div className="relative flex justify-center z-0 lg:justify-end mt-xl lg:mt-0">
          {/* Abstract Glow */}
          <div className="absolute inset-0 bg-primary-container/20 blur-[100px] rounded-full mix-blend-screen -z-10 w-3/4 h-3/4 m-auto"></div>

          {/* Telefon Mockup — daxilində skrinşot şəkli olan statik çərçivə */}
          <MenuMockup />
        </div>
      </div>
    </main>
  );
}