import { useState } from "react";

interface RestaurantHeaderProps {
  restaurantName: string;
  bannerImage?: string;
  logo?: string;
  address?: string;
  phone?: string;
  workingHours?: string;
  wifiSsid?: string;
  wifiPassword?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
  instagram?: string;
  description?: string;
  cartCount: number;
  isViewerOnly: boolean;
  onSearchClick: () => void;
  onCartClick: () => void;
  onOrdersClick: () => void;
}

export default function RestaurantHeader({
  restaurantName,
  bannerImage,
  logo,
  address,
  phone,
  workingHours,
  wifiSsid,
  wifiPassword,
  googleMapsUrl,
  wazeUrl,
  instagram,
  description,
  cartCount,
  isViewerOnly,
  onSearchClick,
  onCartClick,
  onOrdersClick,
}: RestaurantHeaderProps) {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [showWifiPassword, setShowWifiPassword] = useState(false);

  const hours = workingHours || "10:00 - 23:00";
  const wifiName = wifiSsid || "FastQR_Guest";
  const wifiPass = wifiPassword || "authentic-flavors";
  const bio =
    description ||
    "Təzə hazırlanmış, dəqiqələr ərzində masanıza çatdırılır. Bizim missiyamız sizə ən dadlı və ənənəvi ləzzətləri təqdim etməkdir.";

  const copyWifiPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const origText = btn.innerText;
    navigator.clipboard.writeText(wifiPass);
    btn.innerText = "Kopyalandı";
    setTimeout(() => (btn.innerText = origText), 2000);
  };

  return (
    <>
      {/* Prominent Banner Header */}
      <header className="relative w-full h-64 bg-surface-container-high overflow-hidden">
        {bannerImage ? (
          <img
            alt="Restaurant"
            className="w-full h-full object-cover"
            src={bannerImage}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-container via-primary to-primary-fixed-dim" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Top Actions */}
        <div className="absolute top-4 w-full px-4 flex justify-between items-center z-10">
          <button
            onClick={onSearchClick}
            className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors duration-200"
            aria-label="Axtar"
          >
            <span className="material-symbols-outlined">search</span>
          </button>
          <div className="flex items-center gap-2">
            {!isViewerOnly && (
              <button
                onClick={onOrdersClick}
                className="px-3 py-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors duration-200 flex items-center gap-1.5 text-[12px] font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">
                  receipt_long
                </span>
                <span className="hidden sm:inline">Sifarişlərim</span>
              </button>
            )}
            {!isViewerOnly && (
              <button
                onClick={onCartClick}
                className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors duration-200 relative"
                aria-label="Səbət"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-black/30 font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Restaurant Info Overlay */}
        <div className="absolute bottom-4 px-4 w-full flex items-end gap-4 z-10">
          <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg shrink-0 overflow-hidden">
            {logo ? (
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container text-[36px]">
                  restaurant
                </span>
              </div>
            )}
          </div>
          <div className="text-white mb-1 min-w-0">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile shadow-sm truncate">
              {restaurantName}
            </h1>
            <div className="flex items-center gap-1.5 mt-1 font-label-sm">
              <span className="flex items-center gap-1 bg-green-500/20 text-green-300 px-2 py-1 rounded-md backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                Açıqdır
              </span>
              <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                <span className="text-yellow-400">⭐</span> 4.9
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Action Bar */}
      <div className="bg-background py-4 border-b border-surface-variant">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-margin-mobile">
         <button
            onClick={() => setIsInfoOpen(true)}
            className="whitespace-nowrap px-4 py-2 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm hover:bg-primary/20 transition-all duration-200 flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">info</span>
            Haqqında
          </button>
          {address && (
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                location_on
              </span>
              {address}
            </button>
          )}
          <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              schedule
            </span>
            {hours}
          </button>
          {phone && (
            <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">call</span>
              {phone}
            </button>
          )}
        </div>
      </div>

      {/* Info Bottom Sheet (Modal) */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isInfoOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsInfoOpen(false)}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[70] bg-surface rounded-t-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out max-w-md mx-auto ${
          isInfoOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-6"></div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Restoran Haqqında
          </h2>
          <button
            onClick={() => setIsInfoOpen(false)}
            className="text-on-surface-variant p-2 rounded-full hover:bg-surface-variant transition-colors"
            aria-label="Bağla"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar pb-6">
          {/* Bio */}
          <p className="text-body-md text-on-surface-variant">{bio}</p>

          {(address || googleMapsUrl || wazeUrl) && (
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
                <span className="font-bold text-on-surface">Ünvan</span>
              </div>
              {address && (
                <p className="text-sm text-on-surface-variant mb-4">
                  {address}
                </p>
              )}
              <div className="flex gap-3">
                {googleMapsUrl && (
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      map
                    </span>{" "}
                    Google Maps
                  </a>
                )}
                {wazeUrl && (
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      navigation
                    </span>{" "}
                    Waze
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Hours */}
          <div className="flex justify-between items-center p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">
                schedule
              </span>
              <span className="font-bold text-on-surface">İş saatları</span>
            </div>
            <span className="text-sm text-on-surface-variant">{hours}</span>
          </div>

          {/* Wi-Fi */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-primary">
                wifi
              </span>
              <span className="font-bold text-on-surface">Qonaq Wi-Fi</span>
            </div>
            <div className="flex justify-between items-center bg-surface-container p-3 rounded-xl">
              <div className="text-sm text-on-surface">
                <p className="opacity-70 mb-1">
                  SSID: <span className="font-medium opacity-100">{wifiName}</span>
                </p>
                <p className="font-mono">
                  Şifrə:{" "}
                  <span className="font-medium">
                    {showWifiPassword ? wifiPass : "••••••••••"}
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <button
                  className="text-primary font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                  onClick={copyWifiPassword}
                >
                  Kopyala
                </button>
                <button
                  className="text-on-surface-variant font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-surface-variant transition-colors"
                  onClick={() => setShowWifiPassword((v) => !v)}
                >
                  {showWifiPassword ? "Gizlət" : "Göstər"}
                </button>
              </div>
            </div>
          </div>

          {/* Social Media & Contact */}
          <div className="flex gap-4 justify-center pt-2">
            {instagram && (
              <a
                href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container-low shadow-sm flex items-center justify-center text-primary hover:bg-surface-variant transition-colors"
              >
                <svg
                  fill="none"
                  height="20"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container-low shadow-sm flex items-center justify-center text-primary hover:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined">call</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}