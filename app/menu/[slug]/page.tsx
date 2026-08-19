import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { MenuItem, RestaurantInfo } from "@/types";
import MenuClient from "./menu-client";
import MenuSkeleton from "@/components/menu/MenuSkeleton";

const FETCH_TIMEOUT_MS = 4000;

interface MenuApiResponse {
  restaurant: RestaurantInfo;
  menu: MenuItem[];
}

async function getMenu(slug: string): Promise<MenuApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  // Əsas menyu sorğusu yalnız `slug`-dən asılıdır. URL-dəki `tableId`,
  // `tableName`, `token` parametrləri bu sorğuya qarışdırılmır — menyu masa
  // doğrulamasından asılı olmayaraq hər zaman yüklənir.
  const url = `${baseUrl}/menu/${slug}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      // Sageh `error.tsx` vasitəsilə istifadəçiyə aydın mesajla qayıdır.
      throw new Error(`Menyu yüklənə bilmədi (HTTP ${res.status})`);
    }

    const data: MenuApiResponse = await res.json();
    if (!data?.restaurant || !Array.isArray(data.menu)) {
      throw new Error("Menyu məlumatı düzgün formatda deyil");
    }
    return data;
  } catch (err) {
    if (controller.signal.aborted) {
      throw new Error(
        "Menyu serveri cavab vermədi (zaman aşımı). Zəhmət olmasa yenidən cəhd edin.",
      );
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

async function MenuDataFetcher({ slug }: { slug: string }) {
  const data = await getMenu(slug);
  const { restaurant, menu } = data;

  return <MenuClient restaurant={restaurant} menu={menu} />
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; 

  return (
    <Suspense fallback={<MenuSkeleton />}>
      <MenuDataFetcher slug={slug} />
    </Suspense>
  );
}
