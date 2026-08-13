export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-on-background">
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
              className="flex bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container-low"
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
  );
}
