import MenuSkeleton from "@/components/menu/MenuSkeleton";

// Server tərəf route streaming zamanı göstərilən instant loading state.
// Skeleton UI `MenuSkeleton` komponentində paylaşılır (həm də `page.tsx`-dəki
// `useSearchParams` Suspense boundary-nın fallback-i kimi istifadə olunur).
export default function Loading() {
  return <MenuSkeleton />;
}

