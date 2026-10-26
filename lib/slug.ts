import { randomUUID } from "node:crypto";

export function createGuestSlug(name: string) {
  const normalized = name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const suffix = randomUUID().replace(/-/g, "").slice(0, 8);
  return `${normalized || "guest"}-${suffix}`;
}
