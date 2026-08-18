"use client";

import { useEffect } from "react";

// Server tərəf menyu sorğusu uğursuz olduqda (şəbəkə xətası, vaxt aşımı,
// etibarsız token, itkin tableId və s.) loading/skeleton vəziyyətində
// ilişib qalmaması üçün aydın səhv ekranı göstərilir və istifadəçi yenidən
// cəhd edə bilər.
export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Səhvi konsola yaz (yalnız development üçün faydalıdır).
    console.error("Menu page error:", error);
  }, [error]);

  const message =
    error?.message && error.message !== "Failed to fetch menu"
      ? error.message
      : "Menyu yüklənə bilmədi. Zəhmət olmasa yenidən cəhd edin.";

  return (
    <div className="mx-auto w-full min-h-[100dvh] bg-background text-on-background flex flex-col items-center justify-center gap-5 p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-tertiary-container text-on-tertiary flex items-center justify-center font-headline-md text-headline-md">
        !
      </div>
      <div className="space-y-2">
        <h2 className="font-headline-md text-headline-md text-on-surface">
          Menyu yüklənə bilmədi
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-2 px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-body-lg shadow-lg active:scale-[0.98] transition-transform"
      >
        Yenidən cəhd et
      </button>
    </div>
  );
}
