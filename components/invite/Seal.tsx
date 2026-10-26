"use client";

import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

export default function Seal({ open }: { open: boolean }) {
    return (
        <motion.div
            className="h-full w-full rounded-full border-[5px] border-gold-400 bg-cream-50 p-[6%]"
            style={{
                boxShadow: `
          0 0 30px rgba(232,184,74,.28),
          inset 0 0 24px rgba(212,149,42,.20)
        `,
            }}
            animate={
                open
                    ? { scale: 0.96, opacity: 0.92 }
                    : { scale: [1, 1.025, 1], opacity: 1 }
            }
            transition={
                open
                    ? { duration: 0.45, ease: "easeOut" }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={wedding.images.logo}
                alt="Wedding emblem"
                draggable={false}
                className="h-full w-full select-none object-contain"
            />
        </motion.div>
    );
}