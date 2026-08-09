"use client";
import { useState } from "react";
import type { ReactNode } from "react";
import { whatsappLink } from "@/lib/utils";

type OptionField = "variant" | "size" | "colour" | "mugType" | "posterSize" | "orientation";
type ProductDef = { value: string; fields: OptionField[]; placement: string };

const productDefs: ProductDef[] = [
  { value: "T-Shirt", fields: ["variant", "size", "colour"], placement: "Front" },
  { value: "Oversized T-Shirt", fields: ["variant", "size", "colour"], placement: "Front" },
  { value: "Hoodie", fields: ["variant", "size", "colour"], placement: "Front" },
  { value: "Sweatshirt", fields: ["variant", "size", "colour"], placement: "Front" },
  { value: "Gym Wear", fields: ["variant", "size", "colour"], placement: "Front" },
  { value: "Tote Bag", fields: ["colour"], placement: "Front" },
  { value: "Mug", fields: ["mugType"], placement: "Full wrap" },
  { value: "Cap", fields: ["colour"], placement: "Front" },
  { value: "Poster", fields: ["posterSize", "orientation"], placement: "Full print" },
  { value: "Print", fields: ["posterSize", "orientation"], placement: "Full print" },
  { value: "Other / Custom", fields: [], placement: "To be confirmed" },
];
const variants = ["Men's", "Women's", "Kids"];
const sizes = ["S", "M", "L", "XL", "XXL"];
const colours = ["Black", "White", "Warm White", "Sage", "Navy"];
const mugTypes = ["Standard Mug", "Photo Mug"];
const posterSizes = ["A5", "A4", "A3", "A2"];
const orientations = ["Portrait", "Landscape"];
const journey = ["Design", "Product", "Customize", "Submit", "WhatsApp"];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`button !px-4 !py-2 text-sm ${active ? "button-clay" : ""}`}>
      {children}
    </button>
  );
}

function OptionGroup({ label, options, value, onSelect }: { label: string; options: string[]; value: string | null; onSelect: (value: string) => void }) {
  return (
    <div className="mt-8">
      <p className="mb-3 text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((item) => <Chip key={item} active={value === item} onClick={() => onSelect(item)}>{item}</Chip>)}
      </div>
    </div>
  );
}

export function DesignRequest({ design, allowedProductTypes, whatsappNumber }: { design: { name: string; slug: string; description: string }; allowedProductTypes: string[]; whatsappNumber: string | null }) {
  const [product, setProduct] = useState<string | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [colour, setColour] = useState<string | null>(null);
  const [mugType, setMugType] = useState<string | null>(null);
  const [posterSize, setPosterSize] = useState<string | null>(null);
  const [orientation, setOrientation] = useState<string | null>(null);
  const [quantity, setQuantity] = useState("1");
  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"config" | "submitting" | "submitted">("config");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  const available = allowedProductTypes.length ? productDefs.filter((item) => allowedProductTypes.includes(item.value)) : productDefs;
  const config = product ? available.find((item) => item.value === product) ?? null : null;

  function chooseProduct(value: string) {
    setProduct(value);
    setVariant(null);
    setSize(null);
    setColour(null);
    setMugType(null);
    setPosterSize(null);
    setOrientation(null);
  }

  function selectedDetails(): { label: string; value: string }[] {
    const rows: { label: string; value: string }[] = [];
    if (variant) rows.push({ label: "Range", value: variant });
    if (size) rows.push({ label: "Size", value: size });
    if (colour) rows.push({ label: "Colour", value: colour });
    if (mugType) rows.push({ label: "Mug type", value: mugType });
    if (posterSize) rows.push({ label: "Print size", value: posterSize });
    if (orientation) rows.push({ label: "Orientation", value: orientation });
    rows.push({ label: "Quantity", value: quantity });
    return rows;
  }

  async function submit() {
    if (!product || !config) return;
    if (!customerName.trim()) { setError("Please add your name."); return; }
    if (!whatsapp.trim()) { setError("Please add your WhatsApp number."); return; }
    if (!Number.isInteger(Number(quantity)) || Number(quantity) < 1) { setError("Please add a quantity of at least 1."); return; }
    setError("");
    setStatus("submitting");
    const details = selectedDetails().map((row) => `${row.label}: ${row.value}`).join("\n");
    const payload = {
      customerName: customerName.trim(),
      whatsapp: whatsapp.trim(),
      productType: product,
      quantity: Number(quantity),
      size: size || undefined,
      color: colour || undefined,
      printPosition: config.placement,
      designDescription: `Design artwork: ${design.name}. ${design.description}`,
      additionalNotes: `Design: ${design.name}\nProduct: ${product}\n${details}\nPlacement: ${config.placement}`,
    };
    try {
      const response = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      let json: { reference?: string; error?: string } = {};
      try { json = await response.json(); } catch { /* non-JSON response */ }
      if (!response.ok || !json.reference) throw new Error(json.error || "Something went wrong. Please try again.");
      setReference(json.reference);
      setStatus("submitted");
    } catch (err) {
      setStatus("config");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "submitted") {
    const details = selectedDetails();
    const message = [
      `Hi NAQSH, I want to use the ${design.name} design on a ${product}.`,
      ...details.map((row) => `${row.label}: ${row.value}`),
      "",
      `Inquiry ID: ${reference}`,
      "Please help me finalise this.",
    ].join("\n");
    return (
      <div className="card p-7">
        <p className="eyebrow">Request received</p>
        <h2 className="mt-3 text-3xl">Your design request is in.</h2>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between gap-4"><dt className="text-neutral-600">Design</dt><dd className="text-right">{design.name}</dd></div>
          <div className="flex justify-between gap-4"><dt className="text-neutral-600">Product</dt><dd className="text-right">{product}</dd></div>
          {details.map((row) => <div className="flex justify-between gap-4" key={row.label}><dt className="text-neutral-600">{row.label}</dt><dd className="text-right">{row.value}</dd></div>)}
        </dl>
        <p className="mt-6">Your inquiry ID is <strong>{reference}</strong>. Continue on WhatsApp and we will confirm the print details and final quote.</p>
        <a className="button button-clay mt-6 w-full" target="_blank" rel="noreferrer" href={whatsappLink(whatsappNumber || "923000000000", message)}>Continue on WhatsApp</a>
        <p className="mt-3 text-center text-xs text-neutral-500">The full details above are included in your WhatsApp message.</p>
      </div>
    );
  }

  const currentStep = product ? 3 : 2;

  return (
    <div className="card p-5 sm:p-8">
      <p className="eyebrow">Custom design request</p>
      <h2 className="mt-3 text-3xl">How would you like this design?</h2>
      <p className="mt-3 text-sm leading-6 text-neutral-600">Choose what you want the <strong>{design.name}</strong> artwork printed on. This is a made-to-order request, not an instant order.</p>

      <ol className="mt-7 grid grid-cols-5 gap-px overflow-hidden border border-line bg-line text-center" aria-label="Request steps">
        {journey.map((label, index) => {
          const step = index + 1;
          const done = step < currentStep;
          const current = step === currentStep;
          return (
            <li key={label} className={`px-1 py-2.5 ${current ? "bg-ink text-paper" : done ? "bg-white/70 text-clay" : "bg-white/70 text-neutral-400"}`}>
              <span className="block text-[10px] font-bold tracking-[.18em]">{String(step).padStart(2, "0")}</span>
              <span className="mt-0.5 block text-[11px] font-medium leading-tight">{label}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-9">
        <p className="mb-3 text-sm font-medium">Choose a product</p>
        <div className="flex flex-wrap gap-2">
          {available.map((item) => <Chip key={item.value} active={product === item.value} onClick={() => chooseProduct(item.value)}>{item.value}</Chip>)}
        </div>
      </div>

      {config && config.fields.includes("variant") && <OptionGroup label="Range" options={variants} value={variant} onSelect={setVariant} />}
      {config && config.fields.includes("size") && <OptionGroup label="Size" options={sizes} value={size} onSelect={setSize} />}
      {config && config.fields.includes("colour") && <OptionGroup label="Colour" options={colours} value={colour} onSelect={setColour} />}
      {config && config.fields.includes("mugType") && <OptionGroup label="Mug type" options={mugTypes} value={mugType} onSelect={setMugType} />}
      {config && config.fields.includes("posterSize") && <OptionGroup label="Print size" options={posterSizes} value={posterSize} onSelect={setPosterSize} />}
      {config && config.fields.includes("orientation") && <OptionGroup label="Orientation" options={orientations} value={orientation} onSelect={setOrientation} />}

      {config && (
        <div className="mt-8">
          <label className="text-sm font-medium" htmlFor="design-quantity">Quantity</label>
          <input id="design-quantity" className="field mt-2 max-w-[160px]" type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </div>
      )}

      {config && (
        <div className="mt-9 border border-line bg-paper/60 p-5 sm:p-6">
          <p className="eyebrow">Your request</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4"><dt className="text-neutral-600">Design</dt><dd className="text-right">{design.name}</dd></div>
            <div className="flex justify-between gap-4"><dt className="text-neutral-600">Product</dt><dd className="text-right">{product}</dd></div>
            {selectedDetails().map((row) => <div className="flex justify-between gap-4" key={row.label}><dt className="text-neutral-600">{row.label}</dt><dd className="text-right">{row.value}</dd></div>)}
          </dl>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium" htmlFor="design-name">Your name</label>
              <input id="design-name" className="field mt-2" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium" htmlFor="design-whatsapp">WhatsApp number</label>
              <input id="design-whatsapp" className="field mt-2" type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-clay">{error}</p>}
          <button type="button" className="button button-clay mt-6 w-full" disabled={status === "submitting"} onClick={submit}>{status === "submitting" ? "Sending…" : "Request This Design"}</button>
          <p className="mt-3 text-center text-xs text-neutral-500">This creates a request only — no payment. We confirm details and pricing on WhatsApp.</p>
        </div>
      )}
    </div>
  );
}
