import Link from "next/link";
export const metadata={title:"Contact"};
export default function Contact(){return <section className="wrap max-w-3xl py-16 sm:py-24"><p className="eyebrow">Let’s make something</p><h1 className="display mt-4 text-5xl sm:text-7xl">Talk to NAQSH.</h1><p className="mt-7 text-lg leading-8 text-neutral-600">For product questions, custom pieces and bulk requests, the fastest way to reach us is WhatsApp.</p><Link className="button button-clay mt-9" href="/custom-design">Start a request</Link></section>}
