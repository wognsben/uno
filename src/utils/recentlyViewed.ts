/* ==========================================================
   recentlyViewed.ts

   UNOTRAVEL
   Recently Viewed Product Storage

   역할
   ------------------------------------------
   - 최근 본 상품 저장
   - 최근 본 상품 조회
   - 최대 5개 유지
   - 중복 제거
   - 같은 상품 재방문 시 맨 앞으로 이동
   - Header / ProductDetail 공용 사용
========================================================== */

export const RECENTLY_VIEWED_STORAGE_KEY = "unotravel_recently_viewed_products";

export type RecentlyViewedProductType = "semi" | "daily";

export type RecentlyViewedProduct = {
  id: string;
  title: string;
  thumbnail?: string;
  productType?: RecentlyViewedProductType;
  country?: string;
  duration?: string;
  price?: string | number;
  href: string;
};

const MAX_RECENT_PRODUCTS = 5;

function normalizeRecentlyViewedProduct(
  product: Partial<RecentlyViewedProduct>,
): RecentlyViewedProduct | null {
  if (!product?.id || !product?.title || !product?.href) return null;

  const rawProductType = String(product.productType ?? "").toLowerCase();
  const normalizedProductType: RecentlyViewedProductType | undefined =
    rawProductType === "daily" || rawProductType.includes("데일리") || rawProductType.includes("일일")
      ? "daily"
      : rawProductType === "semi" || rawProductType.includes("세미")
        ? "semi"
        : undefined;

  return {
    id: String(product.id),
    title: String(product.title),
    thumbnail: product.thumbnail,
    productType: normalizedProductType,
    country: product.country,
    duration: product.duration,
    price: product.price,
    href: String(product.href),
  };
}

export function getRecentlyViewedProducts(): RecentlyViewedProduct[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.sessionStorage.getItem(RECENTLY_VIEWED_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => normalizeRecentlyViewedProduct(item))
      .filter((item): item is RecentlyViewedProduct => Boolean(item))
      .slice(0, MAX_RECENT_PRODUCTS);
  } catch {
    return [];
  }
}

export function saveRecentlyViewedProduct(product: RecentlyViewedProduct) {
  if (typeof window === "undefined") return;

  const normalized = normalizeRecentlyViewedProduct(product);
  if (!normalized) return;

  const previousProducts = getRecentlyViewedProducts();
  const nextProducts = [
    normalized,
    ...previousProducts.filter((item) => item.id !== normalized.id),
  ].slice(0, MAX_RECENT_PRODUCTS);

  window.sessionStorage.setItem(
    RECENTLY_VIEWED_STORAGE_KEY,
    JSON.stringify(nextProducts),
  );

  window.dispatchEvent(new Event("unotravel:recently-viewed-updated"));
}

export function clearRecentlyViewedProducts() {
  if (typeof window === "undefined") return;

  window.sessionStorage.removeItem(RECENTLY_VIEWED_STORAGE_KEY);
  window.dispatchEvent(new Event("unotravel:recently-viewed-updated"));
}
