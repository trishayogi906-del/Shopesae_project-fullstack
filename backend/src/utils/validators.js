// str() makes sure we only work with plain strings (blocks NoSQL injection like { "$ne": null })
export const str = (v) => (typeof v === "string" ? v.trim() : "");
export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isPhone = (v) => /^\d{10}$/.test(v);
export const isPincode = (v) => /^\d{6}$/.test(v);
