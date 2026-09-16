const KEY = "solgreen_recently_viewed_v1";
const MAX = 8;

export function addRecentlyViewed(id) {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    const next = [id, ...raw.filter((x) => x !== id)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function getRecentlyViewed(excludeId) {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return raw.filter((x) => x !== excludeId);
  } catch {
    return [];
  }
}
