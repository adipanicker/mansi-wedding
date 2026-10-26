"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CardOpening from "./CardOpening";
import InvitationCover from "./InvitationCover";
import RsvpSection from "./RsvpSection";
import WishesWall from "./WishesWall";
import type { EventRow, RsvpStatus, Wish } from "./types";

type Props = {
  slug: string;
  guestName: string;
  rsvpStatus: RsvpStatus;
  events: EventRow[];
  wishes: Wish[];
  myWish: string | null;
};

export default function InvitationFlow({
  slug,
  guestName,
  rsvpStatus,
  events,
  wishes,
  myWish,
}: Props) {
  const [revealed, setRevealed] = useState(false);
  const [doorsDone, setDoorsDone] = useState(false);
  const [opened, setOpened] = useState(false);
  const [rsvp, setRsvp] = useState<RsvpStatus>(rsvpStatus);

  return (
    <div className="invite-root">
      {opened && (
        <main className="mx-auto min-h-dvh max-w-3xl p-6">
          <h1 className="text-3xl">You&apos;re Invited, {guestName}!</h1>

          <section className="mt-6 grid gap-4">
            {events.map((e) => (
              <article key={e.id} className="rounded-lg border p-4">
                <h2 className="text-xl">{e.title}</h2>
                <p>{e.description}</p>
                <p>
                  {e.event_date} {e.start_time}
                </p>
                <p>{e.venue}</p>
              </article>
            ))}
          </section>

          <RsvpSection slug={slug} initialStatus={rsvpStatus} onChange={setRsvp} />
          <WishesWall slug={slug} rsvpStatus={rsvp} wishes={wishes} myWish={myWish} />
        </main>
      )}

      <AnimatePresence>
        {!opened && (
          <InvitationCover
            key="cover"
            revealed={revealed}
            guestName={guestName}
            onOpen={() => setOpened(true)}
          />
        )}
      </AnimatePresence>

      {!doorsDone && (
        <CardOpening
          onOpenStart={() => setRevealed(true)}
          onDone={() => setDoorsDone(true)}
        />
      )}
    </div>
  );
}