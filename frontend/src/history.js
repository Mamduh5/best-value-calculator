const KEY = "bvc-history";
const MAX_ITEMS = 10;

export function loadHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(item) {
  const history = loadHistory();

  const updated = [
    item,
    ...history.filter(h => h.id !== item.id),
  ].slice(0, MAX_ITEMS);

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}
