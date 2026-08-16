export default function Loading() {
  return (
    <div className="mx-auto w-full min-h-0 bg-background text-on-background md:relative md:my-auto md:flex md:flex-col md:w-[390px] md:h-[720px] md:max-h-[calc(100vh_-_80px)] md:min-h-0 md:flex-shrink-0 md:border-[6px] md:border-slate-800/90 md:rounded-[44px] md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] md:overflow-hidden">
      {/* iPhone Dynamic Island - zərif, yalnız desktop iPhone mockup-da görünür */}
      <div className="hidden md:block absolute top-2.5 left-1/2 -translate-x-1/2 z-50 w-24 h-4 bg-slate-900 rounded-full mx-auto pointer-events-none" />

      {/* iPhone daxili viewport */}
      <div className="relative w-full min-h-0 bg-background md:flex-1 md:flex md:flex-col md:min-h-0 md:overflow-hidden md:rounded-[38px]">
        <div className="animate-pulse">
          {/* Cover skeleton */}
          <div className="relative w-full h-64 bg-surface-container-high overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />
            <div className="absolute bottom-4 px-4 w-full">
              <div className="h-8 w-48 bg-white/40 rounded-lg" />
              <div className="mt-2 h-5 w-24 bg-white/30 rounded-md" />
            </div>
          </div>

          {/* Info chips skeleton */}
          <div className="py-4 border-b border-surface-variant">
            <div className="flex gap-2 px-margin-mobile">
              <div className="h-9 w-24 rounded-full bg-surface-container-high" />
              <div className="h-9 w-24 rounded-full bg-surface-container-high" />
              <div className="h-9 w-24 rounded-full bg-surface-container-high" />
            </div>
          </div>

          {/* Search + category bar skeleton */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md px-margin-mobile py-3 shadow-sm border-b border-surface-variant">
            <div className="h-11 rounded-2xl bg-surface-container-high" />
            <div className="flex gap-2 mt-3 overflow-hidden">
              <div className="h-8 w-20 rounded-full bg-surface-container-high" />
              <div className="h-8 w-20 rounded-full bg-surface-container-high" />
              <div className="h-8 w-20 rounded-full bg-surface-container-high" />
            </div>
          </div>

          {/* Menu item cards skeleton */}
          <div className="px-margin-mobile mt-6 space-y-6">
            <div className="h-6 w-32 bg-surface-container-high rounded" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex bg-surface-container-lowest rounded-2xl overflow-hidden border border-slate-100"
              >
                <div className="w-32 h-32 bg-surface-container-high" />
                <div className="p-4 flex flex-col justify-between grow">
                  <div className="space-y-2">
                    <div className="h-5 w-3/4 bg-surface-container-high rounded" />
                    <div className="h-4 w-1/2 bg-surface-container-high rounded" />
                  </div>
                  <div className="h-5 w-24 bg-surface-container-high rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
