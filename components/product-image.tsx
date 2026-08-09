"use client";
import Image from "next/image";
import { useState } from "react";

const fallbackSrc = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#efe9dd"/><text x="400" y="480" font-family="Georgia,serif" font-size="34" fill="#20201e" text-anchor="middle">NAQSH</text><text x="400" y="528" font-family="Arial,sans-serif" font-size="16" letter-spacing="4" fill="#6d7569" text-anchor="middle">Where ideas take form</text></svg>'
);

export function ProductImage({ src, alt, className, sizes, priority = false, fill = true }: { src: string; alt: string; className?: string; sizes?: string; priority?: boolean; fill?: boolean }) {
  const [resolved, setResolved] = useState(src);
  const [errored, setErrored] = useState(false);
  const current = errored ? fallbackSrc : resolved;
  if (fill) {
    return <Image src={current} alt={alt} fill priority={priority} className={className} sizes={sizes} onError={() => setErrored(true)} />;
  }
  return <Image src={current} alt={alt} priority={priority} className={className} sizes={sizes} width={800} height={1000} onError={() => setErrored(true)} />;
}
