import { notFound } from "next/navigation";
import type { MenuItem, RestaurantInfo } from "@/types";

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

  const grouped = menu.reduce<Record<string, MenuItem[]>>(
    (acc, item) => {
      const category = item.category || "Digər";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    },
    {},
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {restaurant.logo && (
              <div className="h-20 w-20 rounded-2xl overflow-hidden flex-shrink-0 ring-1 ring-gray-200">
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {restaurant.name}
              </h1>
              {restaurant.description && (
                <p className="mt-2 text-gray-600">{restaurant.description}</p>
              )}
              <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                {restaurant.address && (
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {restaurant.address}
                  </span>
                )}
                {restaurant.phone && (
                  <span className="flex items-center gap-1.5">
                    <svg
                      className="h-4 w-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {restaurant.phone}
                  </span>
                )}
              </div>
              {restaurant.workingHours && (
                <p className="mt-2 text-sm text-gray-500">
                  {restaurant.workingHours}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">Menyu məhsulları yoxdur.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(grouped).map(([category, items]) => (
              <section key={category}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  {category}
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-shadow"
                    >
                      {item.image && (
                        <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h3>
                          <span className="text-lg font-bold text-black whitespace-nowrap">
                            {item.price.toFixed(2)} ₼
                          </span>
                        </div>
                        {item.description && (
                          <p className="mt-1.5 text-sm text-gray-600 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                      </div>
                      {!item.isAvailable && (
                        <div className="mt-3 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 w-fit">
                          Hazır deyil
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
