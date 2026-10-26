"use client";

import { useState } from "react";

export default function CopyLinkButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(`${window.location.origin}/i/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return <button onClick={copy}>{copied ? "Copied!" : "Copy link"}</button>;
}
