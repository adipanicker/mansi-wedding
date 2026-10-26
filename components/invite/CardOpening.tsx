"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Seal from "./Seal";
import { Mandala } from "./ui/Ornaments";

const SEAL_SIZE = "min(62vw, 280px)";

function Door({
    side,
    open,
    onDone,
}: {
    side: "left" | "right";
    open: boolean;
    onDone: () => void;
}) {
    const isLeft = side === "left";

    return (
        <motion.div
            className="absolute top-0 h-full w-1/2 overflow-hidden"
            style={{
                ...(isLeft ? { left: 0 } : { right: 0 }),
                transformOrigin: isLeft ? "left center" : "right center",
                backfaceVisibility: "hidden",
                backgroundColor: "#5a0a14",
                backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(0,0,0,.18) 0 2px, transparent 2px 6px), linear-gradient(180deg, #6b0f1a, #3d070e)",
                ...(isLeft
                    ? { borderRight: "3px solid #e8b84a" }
                    : { borderLeft: "3px solid #e8b84a" }),
                boxShadow: "inset 0 0 80px rgba(0,0,0,.45)",
            }}
            animate={{ rotateY: open ? (isLeft ? -100 : 100) : 0 }}
            transition={{ duration: 1.6, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() => {
                if (open && isLeft) onDone();
            }}
        >
            {/* gold dots along the outer edge */}
            <div
                className={`absolute inset-y-0 flex flex-col justify-evenly ${isLeft ? "left-5" : "right-5"
                    }`}
            >
                {Array.from({ length: 9 }).map((_, i) => (
                    <span
                        key={i}
                        className="h-3 w-3 rounded-full bg-gold-400 shadow-[0_0_8px_rgba(232,184,74,.6)]"
                    />
                ))}
            </div>

            {/* mandalas top + bottom */}
            <Mandala
                className={`absolute top-[6%] w-28 text-gold-500/60 ${isLeft ? "right-[8%]" : "left-[8%]"
                    }`}
            />
            <Mandala
                className={`absolute bottom-[6%] w-28 text-gold-500/60 ${isLeft ? "right-[8%]" : "left-[8%]"
                    }`}
            />

            {/* each door holds one half of the seal (clipped by overflow-hidden) */}
            <div
                className="absolute top-1/2"
                style={{
                    width: SEAL_SIZE,
                    height: SEAL_SIZE,
                    marginTop: `calc(${SEAL_SIZE} / -2)`,
                    ...(isLeft
                        ? { right: `calc(${SEAL_SIZE} / -2)` }
                        : { left: `calc(${SEAL_SIZE} / -2)` }),
                }}
            >
                <Seal open={open} />
            </div>
        </motion.div>
    );
}

export default function CardOpening({
    onDone,
    onOpenStart,
}: {
    onDone: () => void;
    onOpenStart?: () => void;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="fixed inset-0 z-50 cursor-pointer"
            style={{ perspective: "1600px" }}
            onClick={() => {
                if (open) return;
                setOpen(true);
                onOpenStart?.();
            }}
        >
            <Door side="left" open={open} onDone={onDone} />
            <Door side="right" open={open} onDone={onDone} />

            <AnimatePresence>
                {!open && (
                    <motion.p
                        exit={{ opacity: 0 }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.4, repeat: Infinity }}
                        className="absolute bottom-[12%] w-full text-center font-sans text-xs tracking-[0.35em] text-gold-300 uppercase"
                    >
                        Tap to open
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}