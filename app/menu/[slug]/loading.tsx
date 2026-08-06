export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="animate-pulse">
          <div className="flex items-start gap-6 mb-10">
            <div className="h-20 w-20 rounded-2xl bg-gray-200 flex-shrink-0" />
            <div className="flex-1 space-y-3 pt-1">
              <div className="h-8 w-64 bg-gray-200 rounded" />
              <div className="h-4 w-80 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="space-y-10">
            {[1, 2].map((section) => (
              <div key={section} className="space-y-4">
                <div className="h-7 w-40 bg-gray-200 rounded" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-white p-4 ring-1 ring-gray-200"
                    >
                      <div className="aspect-[4/3] rounded-xl bg-gray-200 mb-4" />
                      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
                      <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
