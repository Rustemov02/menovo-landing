import type { SystemMode } from "../types";

export function resolveSystemMode(
  mode?: SystemMode | string | null,
): SystemMode | null {
  if (mode === "VIEWER_ONLY") return "VIEWER_ONLY";
  if (mode === "FULL_ORDERING") return "FULL_ORDERING";
  return null; // Not yet loaded from API
}

export const RESERVED_PUBLIC_SLUGS = new Set([
  "admin",
  "login",
  "kitchen",
  "superadmin",
  "orders",
  "order-status",
  "menu",
]);
