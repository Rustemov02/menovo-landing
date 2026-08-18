import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { MenuItem, RestaurantInfo } from "@/types";
import MenuClient from "./menu-client";

interface MenuApiResponse {
  restaurant: RestaurantInfo;
  menu: MenuItem[];
}

async function getMenu(slug: string): Promise<MenuApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
  }

  const res = await fetch(`${baseUrl}/menu/${slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    throw new Error("Failed to fetch menu");
  }

  return res.json();
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getMenu(slug);
  const { restaurant, menu } = data;

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  console.log("Slug:", slug);
  console.log("DATA : ", restaurant, menu);

  // MenuClient `useSearchParams` istifadə etdiyi üçün prerender zamanı
  // "URL data outside of Suspense" xətasını qarşısını almaq üçün Suspense
  // boundary-yə bükülür.
  return (
    <Suspense fallback={null}>
      <MenuClient restaurant={restaurant} menu={menu} />
    </Suspense>
  );
}
