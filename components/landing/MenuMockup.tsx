import Image from "next/image";

/**
 * Hero bölməsindəki telefon (Phone Mockup).
 *
 * Manuel yazılmış statik HTML/Tailwind menyu tamamilə çıxarılıb və onun yerinə
 * `public/screen.webp` skrinşot şəkli qoyulur. Bu, "zero JS overhead" prinsipinə
 * uyğundur — komponent yalnız daimi telefon çərçivəsi (bezel, rounded corners,
 * dynamic island) + şəkli render edir.
 *
 * Şəkil telefon kənarlarına tam otursun və deformasiya olmasın deyə
 * `object-position: top center` (`object-top`) ilə skrinşot yuxarıya bərkidilir —
 * beləliklə status bar / header hissəsi heç vaxt kəsilmir, krop yalnız aşağıdan olur.
 * `overflow-hidden` və daxili radiuslar şəklin bezeldən kənara çıxmasının qarşısını alır.
 * Dynamic Island-ın skrinşotun üst hissəsini (header) örtməməsi üçün ekranın
 * yuxarısına kiçik bir təhlükəsiz boşluq (safe area) ayrılır.
 */
export default function MenuMockup() {
  return (
    /* Telefon çərçivəsi (bezel, rounded corners, dynamic island) saxlanılır */
    <div className="relative w-[280px] h-[503px] rounded-[2.5rem] border-[8px] border-surface-container-high bg-surface-container-lowest shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 glass-panel">
      {/* Dinamik ada (notch) — zərif, skrinşotun üstünü örtməsin */}
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-5 bg-black rounded-full z-30 pointer-events-none"></div>

      {/* Ekran — skrinşotun yerləşdiyi daxili viewport.
          `relative w-full h-full overflow-hidden` — şəkil heç vaxt kenarlardan dəşmir,
          üstü yuxarıda sabit qalır (object-top). */}
      <div className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-4xl bg-surface-container-lowest">
        {/* Dinamik ada (safe area) üçün təhlükəsiz boşluq — header hissəsini örtməz */}
        {/* <div className="shrink-0" aria-hidden="true" /> */}
        <div className="relative flex-1 min-h-0">
          <Image
            src="/screen.webp"
            alt="Meydan Bistro QR menyu ekran görüntüsü"
            quality={75}
            fill
            priority
            sizes="400px"
            className="w-full h-full object-cover object-top"
            style={{ objectPosition: "top center" }}
          />
        </div>
      </div>
    </div>
  );
}