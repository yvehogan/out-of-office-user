/**
 * Cart-key manager.
 *
 * Generates a unique cart key per browser/user and persists it in
 * localStorage so returning visitors keep the same cart.
 */

const STORAGE_KEY = "ooo_cart_key";

/**
 * Generate a crypto-random UUID-v4-style string.
 * Falls back to Math.random if crypto.randomUUID is unavailable.
 */
function generateKey(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older environments
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Retrieve the existing cart key from localStorage, or create and
 * persist a fresh one if none exists yet.
 */
export function getCartKey(): string {
  if (typeof window === "undefined") {
    // SSR — return a throwaway key; real calls only happen client-side
    return "";
  }

  let key = localStorage.getItem(STORAGE_KEY);
  if (!key) {
    key = generateKey();
    localStorage.setItem(STORAGE_KEY, key);
  }
  return key;
}

/**
 * Explicitly clear the stored cart key (e.g. on logout or order completion).
 * The next call to `getCartKey()` will generate a new one.
 */
export function clearCartKey(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}
