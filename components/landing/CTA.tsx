export default function CTA() {
  return (
    <section className="py-20 sm:py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Hazırsınız?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            İlk 14 gün pulsuz sına. Kart məlumatı tələb olunmur.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://admin.menovo.rest/register"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
            >
              Pulsuz Başla
            </a>
            <a
              href="https://admin.menovo.rest/login"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-3.5 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              Daxil ol
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}