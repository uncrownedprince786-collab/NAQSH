import Link from "next/link";
import { prisma } from "@/lib/db";
import type { InquiryStatus } from "@prisma/client";

const statuses: Array<[InquiryStatus, string]> = [
  ["NEW", "New"], ["CONTACTED", "Contacted"], ["QUOTE_SENT", "Quote sent"],
  ["PAYMENT_PENDING", "Payment pending"], ["CONFIRMED", "Confirmed"],
  ["PRODUCTION", "Production"], ["READY", "Ready"], ["COMPLETED", "Completed"],
];

export default async function Admin() {
  const counts = await prisma.inquiry.groupBy({ by: ["status"], _count: { _all: true } });
  const countMap = new Map(counts.map((item) => [item.status, item._count._all]));
  return <>
    <p className="eyebrow">Good to see you</p>
    <h1 className="mt-2 text-3xl">Dashboard</h1>
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {statuses.map(([status, label]) => <div className="card p-4" key={status}><p className="text-sm text-neutral-600">{label}</p><strong className="mt-3 block text-3xl">{countMap.get(status) ?? 0}</strong></div>)}
    </div>
    <h2 className="mt-10 text-xl">Quick actions</h2>
    <div className="mt-4 flex flex-wrap gap-3">{[["Add product", "/admin/products"], ["Add category", "/admin/categories"], ["Add collection", "/admin/collections"], ["Upload media", "/admin/media"], ["Edit homepage", "/admin/website"], ["View inquiries", "/admin/inquiries"]].map(([label, href]) => <Link key={label} className="button" href={href}>{label}</Link>)}</div>
  </>;
}
