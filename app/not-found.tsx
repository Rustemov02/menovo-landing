import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-8xl font-bold text-gray-900 sm:text-9xl">404</h1>
      <p className="mt-4 text-xl text-gray-600 sm:text-2xl">
        Səhifə tapılmadı
      </p>
      <p className="mt-2 text-gray-500">
        Axtardığınız səhifə mövcud deyil və ya silinib.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-colors"
      >
        Ana səhifəyə qayıt
      </Link>
    </div>
  );
}
