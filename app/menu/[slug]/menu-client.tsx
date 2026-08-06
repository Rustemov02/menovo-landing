"use client";

import { useState } from "react";
import type { MenuItem, RestaurantInfo } from "@/types";

function AddButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        setClicked(true);
        setTimeout(() => setClicked(false), 800);
      }}
      className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-all ${
        clicked
          ? "bg-tertiary-container text-on-tertiary"
          : "bg-primary text-on-primary"
      }`}
    >
      <span className="material-symbols-outlined">
        {clicked ? "check" : "add"}
      </span>
    </button>
  );
}

function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: string[];
  activeCategory: string;
  onSelect: (cat: string) => void;
}) {
  const allCategories = ["Hamısı", ...categories];

  return (
    <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-md py-4 shadow-sm border-b border-surface-variant">
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-margin-mobile">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => {
              onSelect(category);
              if (window.navigator.vibrate) {
                window.navigator.vibrate(10);
              }
            }}
            className={`whitespace-nowrap px-6 py-2 rounded-full font-label-sm text-label-sm transition-all duration-200 ${
              activeCategory === category
                ? "active-category"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-variant"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default function MenuClient({
  restaurant,
  menu,
}: {
  restaurant: RestaurantInfo;
  menu: MenuItem[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>("Hamısı");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const systemMode = restaurant.systemMode || "FULL_ORDERING";

  const grouped = menu?.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const category = item.category || "Digər";
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {});

  const categories = Object.keys(grouped || {});

  if (categories.length > 0 && !activeCategory) {
    setActiveCategory(categories[0]);
  }

  const filteredCategories =
    activeCategory === `Hamısı`
      ? categories
      : categories.filter((c) => c === activeCategory);

  return (
    <div
      className={`min-h-screen bg-background text-on-background font-body-md ${systemMode === "VIEWER_ONLY" ? "pb-6" : "pb-32"}`}
    >
      <main className="pb-6">
        <header className="relative w-full h-64 bg-surface-container-high overflow-hidden">
          <img
            alt="Restaurant interior"
            className="w-full h-full object-cover"
            src={
              restaurant.coverImage ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAC7pGIwOZtAlasOgXdYnlJQVoDgc512RGr-NUR13Q5kHpZK1iSqedEIVyHGLyE8UWiXIYzDJkdAhgxcBApyrTZpVs0Mxbggn-Cg4c0ixJ9_q1G-ga7OucWlGh76lHhkoerpIxtAtxz2CtZPc-hWgFeYO8swX5w0F4x32XJIWW7l5p97GB_YXaknwxevaRSFaGWBKIpA77fKQtZtLk1Qy5VbExTCVgPPoUw8DNV8QCCRPHMxMK6VtEc"
            }
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-4 w-full px-4 flex justify-between items-center z-10">
            {/* <button className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors duration-200">
              <span className="material-symbols-outlined">search</span>
            </button> */}
            {systemMode !== "VIEWER_ONLY" && (
              <button className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors duration-200">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
            )}
          </div>
          <div className="absolute bottom-4 px-4 w-full flex items-end gap-4 z-10">
            {restaurant.logo && (
              <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg shrink-0 overflow-hidden">
                <img
                  alt="Restaurant Logo"
                  className="w-full h-full object-cover rounded-full"
                  src={restaurant.logo}
                />
              </div>
            )}
            <div className="text-white mb-1">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile shadow-sm">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-3 mt-1 font-label-sm">
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

        <div className="bg-background py-4 border-b border-surface-variant">
          <div className="flex gap-2 overflow-x-auto no-scrollbar px-margin-mobile">
            <button
              onClick={() => setIsModalOpen(true)}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm hover:bg-primary/20 transition-all duration-200 flex items-center gap-2"
            >
              <span>ℹ️</span> Haqqında
            </button>
            {restaurant.address && (
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2">
                <span>📍</span> Ünvan
              </button>
            )}
            {restaurant.workingHours && (
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2">
                <span>🕒</span> {restaurant.workingHours}
              </button>
            )}
            {restaurant.phone && (
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2">
                <span>📞</span> Əlaqə
              </button>
            )}
          </div>
        </div>

        {categories.length > 0 && (
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        )}

        <div className="px-margin-mobile mt-6 space-y-4">
          {Object.keys(grouped || {}).length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-on-surface-variant">
                Menyu məhsulları yoxdur.
              </p>
            </div>
          ) : (
            filteredCategories.map((category) =>
              (grouped?.[category] || []).map((item) => (
                <div
                  key={item._id}
                  onClick={() => setSelectedItem(item)}
                  className="flex bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container-low transition-transform active:scale-[0.98] cursor-pointer"
                >
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      className="w-full h-full object-cover"
                      alt={item.name}
                      src={item.image || ""}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface">
                        {item.name}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-primary font-body-lg text-body-lg">
                        {(item.price ?? 0).toFixed(2)} AZN
                      </span>
                      {systemMode !== "VIEWER_ONLY" && <AddButton />}
                    </div>
                  </div>
                </div>
              )),
            )
          )}
        </div>
      </main>

      {systemMode !== "VIEWER_ONLY" && (
        <div className="fixed bottom-6 left-margin-mobile right-margin-mobile z-40">
          <button className="w-full h-16 bg-on-background text-background rounded-2xl flex items-center justify-between px-6 shadow-2xl transition-transform active:scale-95 group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined text-[28px]">
                  shopping_basket
                </span>
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-on-background font-bold">
                  2
                </span>
              </div>
              <div className="text-left">
                <span className="font-label-sm text-label-sm block opacity-70">
                  Səbət (2 məhsul)
                </span>
                <span className="font-headline-md text-headline-md block leading-tight">
                  16.50 AZN
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              <span className="font-label-sm text-label-sm">Səbətə bax</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </button>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/60 transition-opacity"
            onClick={() => setSelectedItem(null)}
          />
          <div className="relative z-10 w-full bg-surface rounded-t-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-6" />
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Məhsul Detayı
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-on-surface-variant p-2 rounded-full hover:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined">X</span>
              </button>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto no-scrollbar pb-6">
              {selectedItem.image && (
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-48 object-cover rounded-2xl"
                />
              )}
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
                  {selectedItem.name}
                </h3>
                <p className="text-body-md text-on-surface-variant">
                  {selectedItem.description}
                </p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-surface-variant">
                <span className="font-bold text-primary font-body-lg text-body-lg">
                  {(selectedItem.price ?? 0).toFixed(2)} AZN
                </span>
                {systemMode !== "VIEWER_ONLY" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="px-6 py-3 bg-primary text-on-primary rounded-full font-label-sm text-label-sm flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      add_shopping_cart
                    </span>
                    Səbətə əlavə et
                  </button>
                )}
              </div>
              {selectedItem.category && (
                <div className="inline-block px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-sm">
                  {selectedItem.category}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Restaurant Info Modal */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ${
          isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsModalOpen(false)}
      />
      <div
        className={`fixed bottom-0 left-0 right-0 z-[70] bg-surface rounded-t-[32px] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-out mx-auto ${
          isModalOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-6" />
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Restoran Haqqında
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-on-surface-variant p-2 rounded-full hover:bg-surface-variant transition-colors"
          >
            <span className="material-symbols-outlined">X</span>
          </button>
        </div>
        <div className="space-y-6 max-h-[70vh] overflow-y-auto no-scrollbar pb-6">
          {restaurant.description && (
            <p className="text-body-md text-on-surface-variant">
              {restaurant.description}
            </p>
          )}
          {restaurant.address && (
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                {/* <span className="material-symbols-outlined text-primary">
                  location_on
                </span> */}
                <span className="font-bold text-on-surface">Ünvan</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">
                {restaurant.address}
              </p>
              <div className="flex gap-3">
                {/* {restaurant.googleMapsUrl && (
                  <a
                    href={restaurant.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      map
                    </span>{" "}
                    Google Maps
                  </a>
                )} */}
                {restaurant.wazeUrl && (
                  <a
                    href={restaurant.wazeUrl}
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
          {restaurant.workingHours && (
            <div className="flex justify-between items-center p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
              <div className="flex items-center gap-3">
                {/* <span className="material-symbols-outlined text-primary">
                  schedule
                </span> */}
                <span className="font-bold text-on-surface">İş saatları</span>
              </div>
              <span className="text-sm text-on-surface-variant">
                {restaurant.workingHours}
              </span>
            </div>
          )}
          {restaurant.wifiSsid && (
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                {/* <span className="material-symbols-outlined text-primary">
                  wifi
                </span> */}
                <span className="font-bold text-on-surface">Qonaq Wi-Fi</span>
              </div>
              <div className="flex justify-between items-center bg-surface-container p-3 rounded-xl">
                <div className="text-sm text-on-surface">
                  <p className="opacity-70 mb-1">
                    SSID:{" "}
                    <span className="font-medium opacity-100">
                      {restaurant.wifiSsid}
                    </span>
                  </p>
                  {restaurant.wifiPassword && (
                    <p className="font-mono">
                      Şifrə:{" "}
                      <span className="font-medium">
                        {restaurant.wifiPassword}
                      </span>
                    </p>
                  )}
                </div>
                {restaurant.wifiPassword && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(restaurant.wifiPassword!);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-primary font-bold text-sm px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    {copied ? "Kopyalandı" : "Kopyala"}
                  </button>
                )}
              </div>
            </div>
          )}
          <div className="flex gap-4 justify-center pt-2">
            {restaurant.instagram && (
              <a
                href={`https://instagram.com/${restaurant.instagram.replace("@", "")}`}
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
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            )}
            {/* {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone}`}
                className="w-12 h-12 rounded-full bg-surface-container-lowest border border-surface-container-low shadow-sm flex items-center justify-center text-primary hover:bg-surface-variant transition-colors"
              >
                <span className="material-symbols-outlined">call</span>
              </a>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
