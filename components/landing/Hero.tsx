"use client";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Restoranlar üçün{" "}
              <span className="text-black">sürətli və asan</span> QR menu sistemi
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Menovo ilə müştəriləriniz sürətli və rahat sifariş verin. QR menunu yaradın, sifarişləri idarə edin və biznesinizi böyüdün.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://admin.menovo.rest/register"
                className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition-colors"
              >
                Başla
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="https://admin.menovo.rest/login"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 transition-colors"
              >
                Daxil ol
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              İlk 14 gün pulsuz. Kart məlumatı tələb olunmur.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 sm:mt-20 lg:mt-24">
            <div className="relative rounded-2xl bg-gray-900 p-2 shadow-2xl ring-1 ring-gray-900/10">
              <div className="rounded-xl bg-gray-900 aspect-[16/9] flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="mx-auto h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-white/80 text-lg font-medium">Admin Panel Önizləməsi</p>
                  <p className="text-white/50 text-sm mt-2">QR Menyu İdarəetmə Sistemi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}