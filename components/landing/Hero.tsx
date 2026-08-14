import Link from "next/link";
import { BadgeCheck, MessageCircle, Plus, Star, Zap } from "lucide-react";
import { DEMO_ROUTE, WHATSAPP_LINK } from "@/utils/site";

const dishImages = {
  header:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDFiWTibH9P5vI2t3zgWYJD8eK9WoJwcz7JFGrXjr-JQwqVPVtkjpVSczVWOZjmxhQmMaSO5gjvM4pihU4OgmTDfTRmQm7t7p5P44utWyCdEkS0HVCfppCF0VigLHQ7uOCQtzUy3xCsLFAIUYncNP78Xo_c5q6eafVbzpvyD6O581U-0RYAb-9TuFbCYS02rfJcfCmoLWj-HpBjW3YpbP91E8751forcfrSOiJyHnAjwruZLm8JL4OG",
  ribeye:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAF5auzHzrct_Wcknf5GQYnUsO8E_sq56BA6Bx62nF3zqQnS6Q7C6psHwSob6OkC-7saQQy_JJGl_swcCkn8aVBAX_9HG9ysMvnuG3zDCXJhStpnbp-0RoNHqD7bSyGKDvs2rzyuDBP1Pj_j8FNdJWQFtbIW3bZTSbd8ntuQiYNXlYnms0GqwlL_Dq-enR-LlQtqEYa8xYeaWvWOCPovnVZKPSU8Kpwhc7NyLrKTu_dFlQREUJVUGQ2",
  sezar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB2scBBG_5im59rMH8wFD3e_cvExG4ScEYQfYAuZ2cHwFcKVa2B0QuW1JlVsUnyEnuOebMhdh_tqC6pGcWGdXW53tOcJyWltqc6S9WGJRg7P32Yg_4S6jsQk5lc-nAYZbtxc0kXrg8sRieCwcRSx5EqbcWhmSeJgXYsbH7RhXxkLWLGqYDtLWIcJhIcqquK_L33r_a8LlgJNAwrvBCPiLXFVTylit_rhWB-MumUld7Km4rJCZk6Z8ap",
};

export default function Hero() {
  return (
    <main className="pt-[120px] pb-xl px-gutter max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        {/* Hero Content */}
        <div className="flex flex-col gap-lg z-10">
          <div className="inline-flex items-center gap-xs bg-primary-container/15 text-primary px-sm py-xs rounded-full w-max border border-primary/20 backdrop-blur-sm">
            <Zap size={16} className="fill-current" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider">
              Restoran Texnologiyası 2.0
            </span>
          </div>

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
              className="bg-[#10B981] hover:bg-[#059669] text-white px-xl py-md rounded-lg font-title-md text-title-md font-bold transition-all flex items-center justify-center gap-sm shadow-[0_10px_30px_rgba(16,185,129,0.3)] hover:-translate-y-1"
            >
              <MessageCircle size={24} className="fill-current" />
              WhatsApp-la Sifariş Et
            </a>
            <Link
              href={DEMO_ROUTE}
              className="bg-transparent border-[1.5px] border-outline-variant text-inverse-surface hover:border-primary hover:text-primary px-xl py-md rounded-lg font-title-md text-title-md transition-all flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
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

          {/* Mockup Container */}
          <div className="relative w-[280px] h-[580px] rounded-[2.5rem] border-[8px] border-surface-container-high bg-surface-container-lowest shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 glass-panel">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-20"></div>

            {/* App UI Placeholder */}
            <div className="w-full h-full bg-surface relative">
              {/* Header */}
              <div className="h-48 bg-gradient-to-b from-primary-container/40 to-surface w-full relative">
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: `url('${dishImages.header}')` }}
                ></div>
              </div>

              <div className="px-md -mt-10 relative z-10 pb-md h-full overflow-y-auto hide-scrollbar">
                {/* Restaurant Info */}
                <div className="bg-surface-container rounded-xl p-md border border-outline-variant/20 shadow-lg flex flex-col gap-sm">
                  <h3 className="font-title-md text-title-md text-on-surface">
                    The Obsidian Grill
                  </h3>
                  <div className="flex gap-sm">
                    <span className="bg-primary/15 text-primary text-[10px] px-2 py-1 rounded-sm uppercase tracking-wide font-bold">
                      Steakhouse
                    </span>
                    {/* <span className="flex items-center text-[12px] text-on-surface-variant">
                      <Star
                        size={14}
                        className="text-primary-container mr-1 fill-current"
                      />
                      4.9
                    </span> */}
                  </div>
                </div>

                {/* Categories */}
                <div className="flex gap-sm mt-md overflow-x-auto pb-sm hide-scrollbar">
                  <div className="bg-primary-container text-on-primary-container px-md py-sm rounded-full text-sm font-semibold whitespace-nowrap shadow-[0_4px_10px_rgba(245,158,11,0.3)]">
                    Əsas Yeməklər
                  </div>
                  <div className="bg-surface-container text-on-surface-variant px-md py-sm rounded-full text-sm whitespace-nowrap border border-outline-variant/30">
                    Salatlar
                  </div>
                  <div className="bg-surface-container text-on-surface-variant px-md py-sm rounded-full text-sm whitespace-nowrap border border-outline-variant/30">
                    İçkilər
                  </div>
                </div>

                {/* Menu Items */}
                <div className="mt-sm flex flex-col gap-sm">
                  <div className="bg-surface-container rounded-lg p-sm border border-outline-variant/20 flex gap-sm relative overflow-hidden">
                    <div className="w-20 h-20 rounded-md bg-surface-container-high shrink-0 overflow-hidden relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${dishImages.ribeye}')`,
                        }}
                      ></div>
                    </div>
                    <div className="flex flex-col justify-between w-full">
                      <h4 className="font-body-md text-body-md font-semibold text-on-surface leading-tight">
                        Ribeye Steak
                      </h4>
                      <p className="text-[11px] text-on-surface-variant line-clamp-2">
                        Premium qara anqus əti, kərə yağı və rozmarin ilə
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-title-md text-title-md text-primary font-bold">
                          45 ₼
                        </span>
                        <button
                          type="button"
                          className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center text-primary-container"
                          aria-label="Əlavə et"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container rounded-lg p-sm border border-outline-variant/20 flex gap-sm relative overflow-hidden">
                    <div className="w-20 h-20 rounded-md bg-surface-container-high shrink-0 overflow-hidden relative">
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                          backgroundImage: `url('${dishImages.sezar}')`,
                        }}
                      ></div>
                    </div>
                    <div className="flex flex-col justify-between w-full">
                      <h4 className="font-body-md text-body-md font-semibold text-on-surface leading-tight">
                        Sezar Salatı
                      </h4>
                      <p className="text-[11px] text-on-surface-variant line-clamp-2">
                        Toyuq filesi, aysberq kələmi, parmezan pendiri
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-title-md text-title-md text-primary font-bold">
                          14 ₼
                        </span>
                        <button
                          type="button"
                          className="w-6 h-6 rounded-full bg-surface-bright flex items-center justify-center text-primary-container"
                          aria-label="Əlavə et"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
