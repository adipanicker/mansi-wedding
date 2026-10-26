"use client";

import { useState, useTransition } from "react";
import { submitRsvp } from "@/app/i/[slug]/actions";
import type { RsvpStatus } from "./types";

export default function RsvpSection({
  slug,
  initialStatus,
  onChange,
}: {
  slug: string;
  initialStatus: RsvpStatus;
  onChange?: (status: "yes" | "no") => void;
}) {
  const [status, setStatus] = useState<RsvpStatus>(initialStatus);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  function choose(next: "yes" | "no") {
    setError("");
    startTransition(async () => {
      const res = await submitRsvp(slug, next);
      if (res.ok) {
        setStatus(next);
        onChange?.(next);
      } else setError("Something went wrong. Please try again.");
    });
  }


    const btn = (active: boolean) => ({
        padding: "10px 20px",
        borderRadius: 8,
        border: active ? "2px solid white" : "1px solid #666",
        fontWeight: active ? 700 : 400,
        cursor: "pointer",
    });

    return (
        <section style={{ marginTop: 32 }}>
            <h2>Will you be gracing us with your presence?</h2>
            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <button disabled={isPending} onClick={() => choose("yes")} style={btn(status === "yes")}>
                    Joyfully accepts
                </button>
                <button disabled={isPending} onClick={() => choose("no")} style={btn(status === "no")}>
                    Regretfully declines
                </button>
            </div>
            {status && (
                <p style={{ marginTop: 8 }}>
                    Your response: {status === "yes" ? "Attending" : "Not attending"}. You can change it anytime.
                </p>
            )}
            {error && <p style={{ color: "tomato" }}>{error}</p>}
        </section>
    );
}