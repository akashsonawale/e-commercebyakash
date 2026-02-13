const BASE_URL = "https://dummyjson.com";

async function fetchJson(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}) ${path}${text ? `: ${text}` : ""}`);
  }
  return await res.json();
}

function normalizeProduct(p) {
  return {
    id: p.id,
    title: p.title,
    img: p.thumbnail,
    price: p.price,
    company: p.brand || "Generic",
    info: p.description || "",
    category: p.category || "",
    inCart: false,
    count: 0,
    total: 0
  };
}

export async function fetchProducts({ limit = 100 } = {}) {
  const data = await fetchJson(`/products?limit=${encodeURIComponent(limit)}`);
  return (data.products || []).map(normalizeProduct);
}

export async function fetchCategories() {
  const data = await fetchJson(`/products/categories`);
  if (!Array.isArray(data)) return [];
  // Support both legacy string[] and newer { slug, name, url }[]
  return data
    .map((c) => {
      if (typeof c === "string") return c;
      if (c && typeof c === "object") {
        return c.slug || c.name || "";
      }
      return "";
    })
    .filter(Boolean);
}

export async function fetchProductsByCategory(category) {
  const data = await fetchJson(`/products/category/${encodeURIComponent(category)}`);
  return (data.products || []).map(normalizeProduct);
}

export async function searchProducts(query) {
  const q = (query || "").trim();
  if (!q) return [];
  const data = await fetchJson(`/products/search?q=${encodeURIComponent(q)}`);
  return (data.products || []).map(normalizeProduct);
}

export async function fetchProductById(id) {
  const data = await fetchJson(`/products/${encodeURIComponent(id)}`);
  return normalizeProduct(data);
}

export async function fetchElectronics({ limit = 20 } = {}) {
  // DummyJSON doesn't have a single 'electronics' bucket; fetch a bulk and filter
  const data = await fetchJson(`/products?limit=100`);
  const all = data.products || [];
  const filtered = all
    .filter((p) => {
      const cat = (p.category || "").toLowerCase();
      return cat.includes("phone") || cat.includes("laptop") || cat.includes("electronics") || cat.includes("smart");
    })
    .slice(0, limit)
    .map(normalizeProduct);
  return filtered;
}


