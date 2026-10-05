import { categories } from "../data/categories";

// DummyJSON gives real product images. Later, replace this file with calls to your own backend.
const BASE_URL = "https://dummyjson.com/products";
const USD_TO_INR = 85;

function normalize(p) {
    const price = Math.round(p.price * USD_TO_INR);
    return {
        id: p.id,
        title: p.title,
        image: p.thumbnail,
        category: p.category,
        rating: p.rating,
        price,
        mrp: Math.round(price / (1 - p.discountPercentage / 100)),
    };
}

async function request(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Couldn't load products. Check your connection and try again.");
    return res.json();
}

export async function getProducts({ category = "all", search = "" } = {}) {
    if (search) {
        const data = await request(`${BASE_URL}/search?q=${encodeURIComponent(search)}&limit=24`);
        return data.products.map(normalize);
    }

    const selected = categories.find((c) => c.slug === category);
    const slugs = selected ? selected.apiSlugs : categories.flatMap((c) => c.apiSlugs);
    const perSlug = selected ? 6 : 2;

    const lists = await Promise.all(
        slugs.map((s) => request(`${BASE_URL}/category/${s}?limit=${perSlug}`).then((d) => d.products))
    );

    // interleave so "all" shows a mix of categories
    const merged = [];
    for (let i = 0; i < perSlug; i++) lists.forEach((l) => l[i] && merged.push(l[i]));
    return merged.map(normalize);
}
