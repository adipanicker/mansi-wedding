"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { postWish } from "@/app/i/[slug]/actions";
import type { RsvpStatus, Wish } from "./types";

function promptFor(status: RsvpStatus) {
  if (status === "yes")
    return "Wonderful, we can't wait to celebrate with you! Leave a wish for the couple before you come.";
  if (status === "no")
    return "We'll miss you, and that's perfectly alright. Leave a wish for the couple.";
  return "Leave a wish for the couple.";
}

export default function WishesWall({
  slug,
  rsvpStatus,
  wishes,
  myWish,
}: {
  slug: string;
  rsvpStatus: RsvpStatus;
  wishes: Wish[];
  myWish: string | null;
}) {
  const router = useRouter();
  const [message, setMessage] = useState(myWish ?? "");
  const [hasWish, setHasWish] = useState(!!myWish);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSent(false);
    startTransition(async () => {
      const res = await postWish(slug, message);
      if (res.ok) {
        setSent(true);
        setHasWish(true);
        router.refresh();
      } else {
        setError(res.error ?? "Something went wrong.");
      }
    });
  }

  return (
    <section className="mt-12">
      <h2 className="text-2xl">Wishes for the couple</h2>
      <p className="mt-2">{promptFor(rsvpStatus)}</p>

      <form onSubmit={submit} className="mt-4 grid gap-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={400}
          rows={4}
          placeholder="Write your wish for the couple..."
          className="w-full rounded-lg border p-3"
        />
        <div className="flex items-center justify-between text-sm">
          <span>{message.length}/400</span>
          <button
            disabled={isPending || message.trim().length === 0}
            className="rounded-full border px-5 py-2"
          >
            {isPending ? "Sending..." : hasWish ? "Update your wish" : "Send wishes"}
          </button>
        </div>
        {sent && <p>Thank you! Your wish is on the wall.</p>}
        {error && <p style={{ color: "tomato" }}>{error}</p>}
      </form>

      <div className="mt-8 grid gap-4">
        {wishes.length === 0 && <p>Be the first to leave a wish.</p>}
        {wishes.map((w) => (
          <article key={w.id} className="rounded-lg border p-4">
            <p className="text-xs uppercase tracking-widest">{w.author}</p>
            <p className="mt-1 break-words whitespace-pre-wrap">{w.message}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
