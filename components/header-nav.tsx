"use client";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/lib/taxonomy";
import { whatsappLink } from "@/lib/utils";

export function HeaderNav({ brandName, logoUrl, whatsappNumber, whatsappMessage }: { brandName: string; logoUrl: string | null; whatsappNumber: string | null; whatsappMessage: string }) {
  const [open, setOpen] = useState(false);
  const wa = whatsappLink(whatsappNumber || "923000000000", whatsappMessage);
  return (
    <header className="border-b border-line bg-paper/95">
      <div className="wrap flex min-h-18 items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-[.18em]">
          {logoUrl ? <img src={logoUrl} alt={brandName} className="h-8 w-auto" /> : brandName}
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className="hover:text-clay">{link.name}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a className="button button-clay hidden sm:inline-flex" href={wa} target="_blank" rel="noreferrer">WhatsApp</a>
          <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-ink md:hidden">
            <span className={`h-px w-5 bg-ink transition ${open ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-ink transition ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile navigation" className="border-t border-line bg-paper md:hidden">
          <div className="wrap flex flex-col py-4">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path} onClick={() => setOpen(false)} className="border-b border-line py-3 text-base">{link.name}</Link>
            ))}
            <a className="button button-clay mt-4 w-full" href={wa} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>WhatsApp</a>
          </div>
        </nav>
      )}
    </header>
  );
}
