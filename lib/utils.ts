export function money(value: string | number) { return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(Number(value)); }
export function whatsappLink(number: string | null | undefined, message: string) { const phone = (number || "923000000000").replace(/\D/g, ""); return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`; }
export function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
