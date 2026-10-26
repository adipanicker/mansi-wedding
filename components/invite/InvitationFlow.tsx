"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import CardOpening from "./CardOpening";
import InvitationCover from "./InvitationCover";
import RsvpSection from "./RsvpSection";
import type { EventRow, RsvpStatus } from "./types";

type Props = {
    slug: string;
    guestName: string;
    rsvpStatus: RsvpStatus;
    events: EventRow[];
};

export default function InvitationFlow({ slug, guestName, rsvpStatus, events }: Props) {
    const [revealed, setRevealed] = useState(false); // doors started opening
    const [doorsDone, setDoorsDone] = useState(false); // doors finished
    const [opened, setOpened] = useState(false); // "Open Invitation" clicked

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

                    <RsvpSection slug={slug} initialStatus={rsvpStatus} />
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