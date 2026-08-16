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
 * `object-cover` / `object-top` istifadə olunur; `overflow-hidden` və daxili
 * radiuslar şəklin bezeldən kənara çıxmasının qarşısını alır.
 */
export default function MenuMockup() {
  return (
    /* Telefon çərçivəsi (bezel, rounded corners, dynamic island) saxlanılır */
    <div className="relative w-[280px] h-[503px] rounded-[2.5rem] border-[8px] border-surface-container-high bg-surface-container-lowest shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden rotate-2 hover:rotate-0 transition-transform duration-500 glass-panel">
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-30 pointer-events-none"></div>

      {/* Ekran — telefon kenarlarına oturdulmuş skrinşşot şəkili */}
      <div className="absolute inset-0 z-10 overflow-hidden rounded-[1.75rem] bg-surface-container-lowest">
        <Image
          src="/screen.webp"
          alt="Meydan Bistro QR menyu ekran görüntüsü"
          quality={75}
          fill
          priority
          sizes="400px"
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>
  );
}