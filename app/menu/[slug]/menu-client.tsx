"use client";

import { useEffect, useMemo, useState } from "react";
import type { MenuItem, RestaurantInfo } from "@/types";
import {
  Check,
  ChevronRight,
  Navigation,
  Plus,
  Search,
  ShoppingBasket,
  ShoppingCart,
  X,
} from "lucide-react";

/**
 * İş saatları (~ "09:00-22:00", "09:00 – 22:00", "09:00–14:00, 17:00-23:00") mətnini
 * hazırkı vaxtla müqayisə edərək restoranın açıq olub-olmadığını hesablayır.
 *
 * - `workingHours` yoxdursa və ya heç bir vaxt diapazonu parse oluna bilmirsə `null`
 *   qaytarır (nəticədə "Açıqdır/Bağlıdır" badge-i göstərilmir).
 * - Hazırda açıqdırsa `true`, bağlıdırsa `false` qaytarır.
 */
function isRestaurantOpen(
  workingHours: string | undefined,
  now: Date = new Date(),
): boolean | null {
  if (!workingHours || !workingHours.trim()) return null;

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  // "09:00-22:00", "09:00 – 22:00", "09:00–22:00" formalarını dəstəkləyir.
  // Eyni gündə çoxsaylı diapazon (nahar + axşam növbəsi) üçün hamısı yoxlanılır.
  const rangeRegex = /(\d{1,2}):(\d{2})\s*[-–—~]\s*(\d{1,2}):(\d{2})/g;
  let match: RegExpExecArray | null;
  let found = false;

  while ((match = rangeRegex.exec(workingHours)) !== null) {
    found = true;
    const open = parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
    const close = parseInt(match[3], 10) * 60 + parseInt(match[4], 10);

    if (close < open) {
      // Gecə yarısını keçən növbə (məs. 22:00-06:00)
      if (nowMinutes >= open || nowMinutes < close) return true;
    } else if (nowMinutes >= open && nowMinutes < close) {
      return true;
    }
  }

  return found ? false : null;
}

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
      {clicked ? <Check size={18} /> : <Plus size={18} />}
    </button>
  );
}

function MenuItemCard({
  item,
  systemMode,
  onSelect,
}: {
  item: MenuItem;
  systemMode: string;
  onSelect: (item: MenuItem) => void;
}) {
  const hasImage = Boolean(item.image);

  const content = (
    <>
      <h3 className="font-headline-md text-headline-md text-on-surface">
        {item.name}
      </h3>
      {item.description && (
        <p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">
          {item.description}
        </p>
      )}
    </>
  );

  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-transform active:scale-[0.98] cursor-pointer"
    >
      {hasImage ? (
        <div className="flex">
          <div className="w-28 shrink-0 self-stretch overflow-hidden">
            <img
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-l-2xl"
              alt={item.name}
              src={item.image}
            />
          </div>
          <div className="p-4 flex flex-col justify-between grow min-w-0">
            <div>{content}</div>
            <div className="flex justify-between items-center mt-2">
              <span className="font-bold text-primary font-body-lg text-body-lg">
                {(item.price ?? 0).toFixed(2)} AZN
              </span>
              {systemMode !== "VIEWER_ONLY" && <AddButton />}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">{content}</div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-bold text-primary font-body-lg text-body-lg whitespace-nowrap">
              {(item.price ?? 0).toFixed(2)} AZN
            </span>
            {systemMode !== "VIEWER_ONLY" && <AddButton />}
          </div>
        </div>
      )}
    </div>
  );
}

function CategoryTabs({
  categories,
  activeCategory,
  search,
  onSearchChange,
  onSelect,
}: {
  categories: string[];
  activeCategory: string;
  search: string;
  onSearchChange: (v: string) => void;
  onSelect: (cat: string) => void;
}) {
  const allCategories = ["Hamısı", ...categories];

  return (
    <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md shadow-sm border-b border-surface-variant">
      {/* Dinamik Search Bar */}
      <div className="px-margin-mobile pt-3 pb-2">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Məhsul və ya təsvir üzrə axtar..."
            className="w-full h-11 pl-10 pr-10 rounded-2xl bg-surface-container-high text-on-surface text-body-md placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
          />
          {search && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Axtarışı təmizlə"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant p-1.5 rounded-full hover:bg-surface-variant transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      {/* Üfüqi scroll oluna bilən kateqoriya barı */}
      <nav className="pb-3">
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
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
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
    </div>
  );
}

export default function MenuClient({
  restaurant,
  menu,
  embedded = false,
}: {
  restaurant: RestaurantInfo;
  menu: MenuItem[];
  embedded?: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("Hamısı");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [search, setSearch] = useState("");
  const systemMode = restaurant.systemMode || "FULL_ORDERING";

  // İş saatları varsa hazırkı vaxtla müqayisə edilib açıq/bağlı statusu hesablanır;
  // saat datası yoxdursa bu, `null` olur və badge ümumiyyətlə göstərilmir.
  const openStatus = isRestaurantOpen(restaurant.workingHours);

  const grouped = useMemo(() => {
    return (menu || []).reduce<Record<string, MenuItem[]>>((acc, item) => {
      const category = item.category || "Digər";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [menu]);

  const categories = Object.keys(grouped || {});

  // "Hamısı" seçildikdə bütün məhsullar kateqoriyasız ardıcıl göstərilir,
  // konkret kateqoriya seçildikdə yalnız həmin kateqoriyanın kartları süzülür.
  const isAll = activeCategory === "Hamısı";
  const displayItems = isAll
    ? menu || []
    : grouped?.[activeCategory] || [];

  const normalizedSearch = search.trim().toLowerCase();
  const searching = normalizedSearch.length > 0;

  const searchResults = useMemo(() => {
    if (!searching) return [];
    return (menu || []).filter(
      (item) =>
        item.name.toLowerCase().includes(normalizedSearch) ||
        (item.description || "").toLowerCase().includes(normalizedSearch),
    );
  }, [menu, searching, normalizedSearch]);

  // Modal açıq olduqda arxa fonda body scroll-u kilidlə (scroll bleed-in qarşısını alır)
  useEffect(() => {
    if (embedded) return;
    if (selectedItem || isModalOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [selectedItem, isModalOpen, embedded]);

  // Desktop (md+) rejimində brauzer window-unun özünün skrol olunmasını söndür —
  // yalnız iPhone çərçivəsi daxilindəki konteyner skrol olunsun.
  useEffect(() => {
    if (embedded) return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [embedded]);

  const handleSelectCategory = (cat: string) => {
    if (searching) return;
    setActiveCategory(cat);
  };

  return (
    <div
      className={
        embedded
          ? "relative w-full h-full max-w-[390px] bg-background text-on-background font-body-md flex flex-col overflow-hidden"
          : `mx-auto w-full min-h-[100dvh] flex flex-col bg-[#0d1629] text-on-background font-body-md shadow-2xl md:relative md:my-auto md:flex md:flex-col md:w-97.5 md:h-[720px] md:max-h-[calc(100vh_-_80px)] md:min-h-0 md:flex-shrink-0 md:border-[6px] md:border-slate-800/90 md:rounded-[44px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] md:overflow-hidden ${systemMode === "VIEWER_ONLY" ? "pb-6 md:pb-0" : "pb-32 md:pb-0"}`
      }
    >
      {/* iPhone Dynamic Island — yalnız desktop iPhone mockup-da görünür */}
      {/* {!embedded && (
        <div className="hidden md:block absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-24 h-4 bg-slate-900 rounded-full mx-auto pointer-events-none" />
      )} */}

      {/* iPhone daxili viewport — bütün məzmun və modallar bu çərçivənin içində qalır */}
      <div
        className={
          embedded
            ? "relative flex-1 flex flex-col min-h-0 overflow-hidden bg-background"
            : "relative w-full min-h-0 flex-1 flex flex-col bg-background md:flex-1 md:flex md:flex-col md:min-h-0 md:overflow-hidden md:rounded-[38px]"
        }
      >
        <main
          className={
            embedded
              ? "flex-1 min-h-0 overflow-y-auto pb-6 no-scrollbar bg-background flex flex-col"
              : "flex-1 min-h-0 pb-6 flex flex-col md:flex-1 md:min-h-0 md:overflow-y-auto md:rounded-[38px] no-scrollbar md:bg-background md:pb-32"
          }
        >
        <header className="relative w-full h-64 bg-surface-container-high">
          <img
            alt="Restaurant interior"
            className="w-full h-full object-cover"
            decoding="async"
            src={
              restaurant.coverImage ||
              "https://lh3.googleusercontent.com/aida-public/AB6AXuAC7pGIwOZtAlasOgXdYnlJQVoDgc512RGr-NUR13Q5kHpZK1iSqedEIVyHGLyE8UWiXIYzDJkdAhgxcBApyrTZpVs0Mxbggn-Cg4c0ixJ9_q1G-ga7OucWlGh76lHhkoerpIxtAtxz2CtZPc-hWgFeYO8swX5w0F4x32XJIWW7l5p97GB_YXaknwxevaRSFaGWBKIpA77fKQtZtLk1Qy5VbExTCVgPPoUw8DNV8QCCRPHMxMK6VtEc"
            }
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute top-4 w-full px-4 flex justify-between items-center z-10">
            {systemMode !== "VIEWER_ONLY" && (
              <button className="p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors duration-200">
                <ShoppingCart size={20} />
              </button>
            )}
          </div>
          <div className="absolute bottom-4 px-4 w-full flex items-end gap-4 z-10">
            {restaurant.logo && (
              <div className="w-20 h-20 rounded-full bg-white p-1 shadow-lg shrink-0 overflow-hidden">
                <img
                  alt="Restaurant Logo"
                  className="w-full h-full object-cover rounded-full"
                  loading="lazy"
                  decoding="async"
                  src={restaurant.logo}
                />
              </div>
            )}
            <div className="text-white mb-1">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile shadow-sm">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-3 mt-1 font-label-sm">
                {/* Yalnız iş saatı datası olduqda göstərilir və hazırkı vaxta görə
                    dinamik olaraq "Açıqdır" (yaşıl) / "Bağlıdır" (qırmızı) olur. */}
                {openStatus !== null && (
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-md backdrop-blur-sm ${
                      openStatus
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        openStatus ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>{" "}
                    {openStatus ? "Açıqdır" : "Bağlıdır"}
                  </span>
                )}
                {/* <span className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                  <span className="text-yellow-400">⭐</span> 4.9
                </span> */}
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
              <a
                href={
                  restaurant.googleMapsUrl ||
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    restaurant.address,
                  )}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2"
              >
                <span>📍</span> {restaurant.address}
              </a>
            )}
            {restaurant.workingHours && (
              <button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2">
                <span>🕒</span> {restaurant.workingHours}
              </button>
            )}
            {restaurant.phone && (
              <a
                href={`tel:${restaurant.phone.replace(/[^\d+]/g, "")}`}
                className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-variant transition-all duration-200 flex items-center gap-2"
              >
                <span>📞</span> {restaurant.phone}
              </a>
            )}
          </div>
        </div>

        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          search={search}
          onSearchChange={setSearch}
          onSelect={handleSelectCategory}
        />

        <div className="px-margin-mobile mt-6 flex-1 flex flex-col justify-start gap-4">
          {searching ? (
            searchResults.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-12 px-4">
                <p className="text-center text-body-md text-on-surface-variant">
                  Axtarış üzrə heç bir nəticə tapılmadı.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {searchResults.map((item) => (
                  <MenuItemCard
                    key={item._id}
                    item={item}
                    systemMode={systemMode}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            )
          ) : displayItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12 px-4">
              <p className="text-center text-body-md text-on-surface-variant">
                Bu kateqoriyada məhsul yoxdur
              </p>
            </div>
          ) : (
            <div>
              {!isAll && (
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mb-4">
                  {activeCategory}
                </h2>
              )}
              <div className="space-y-4">
                {displayItems.map((item) => (
                  <MenuItemCard
                    key={item._id}
                    item={item}
                    systemMode={systemMode}
                    onSelect={setSelectedItem}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {systemMode !== "VIEWER_ONLY" && (
        <div
          className={
            embedded
              ? "absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] z-40"
              : "fixed bottom-6 left-margin-mobile right-margin-mobile z-40 md:absolute md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-[calc(100%-32px)]"
          }
        >
          <button className="w-full h-16 bg-on-background text-background rounded-2xl flex items-center justify-between px-6 shadow-2xl transition-transform active:scale-95 group">
            <div className="flex items-center gap-3">
              <div className="relative">
                <ShoppingBasket size={28} />
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
              <ChevronRight size={20} />
            </div>
          </button>
        </div>
      )}

      {/* Item Detail Modal — iPhone çərçivəsinin içində (absolute) aşağıdan yuxarıya açılır */}
      {selectedItem && (
        <div className="fixed inset-0 z-70 flex items-end justify-center md:absolute">
          <div
            className="absolute inset-0 bg-black/60 transition-opacity"
            onClick={() => setSelectedItem(null)}
          />
          <div className="relative z-10 w-full bg-[#0d1629] rounded-t-4xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] animate-slideUp">
            <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-6" />
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-headline-md text-on-surface">
                Məhsul Detayı
              </h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-on-surface-variant p-2 rounded-full hover:bg-surface-variant transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4 max-h-[70dvh] overflow-y-auto no-scrollbar pb-6">
              {selectedItem.image && (
                <img
                  loading="lazy"
                  decoding="async"
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
                    <ShoppingCart size={20} />
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

      {/* Restaurant Info Modal — yalnız isModalOpen === true olduqda render olunur.
          Beləliklə modal state false ikən tamamilə DOM-dan silinir və heç bir CSS
          media-query / avtomatik açılma ssenarisində görünə bilməz. */}
      {isModalOpen && (
        <div className="fixed inset-0 z-60 md:absolute">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 z-70 bg-[#0d1629] rounded-t-4xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] mx-auto">
        <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-6" />
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Restoran Haqqında
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-on-surface-variant p-2 rounded-full hover:bg-surface-variant transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="space-y-6 max-h-[70dvh] overflow-y-auto no-scrollbar pb-6">
          {restaurant.description && (
            <p className="text-body-md text-on-surface-variant">
              {restaurant.description}
            </p>
          )}
          {restaurant.address && (
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-bold text-on-surface">Ünvan</span>
              </div>
              <p className="text-sm text-on-surface-variant mb-4">
                {restaurant.address}
              </p>
              <div className="flex gap-3">
                {restaurant.wazeUrl && (
                  <a
                    href={restaurant.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 rounded-xl bg-surface-container-low text-on-surface text-xs font-bold flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors"
                  >
                    <Navigation size={18} />{" "}
                    Waze
                  </a>
                )}
              </div>
            </div>
          )}
          {restaurant.workingHours && (
            <div className="flex justify-between items-center p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-low shadow-sm">
              <div className="flex items-center gap-3">
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
          </div>
        </div>
      </div>
    </div>
      )}
      </div>
    </div>
  );
}
