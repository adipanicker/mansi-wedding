"use client";

import { motion, type Variants } from "framer-motion";
import { Mandala } from "./ui/Ornaments";
import { wedding } from "@/data/wedding";

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.28, delayChildren: 1.5 } },
};
const item: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};

function Divider() {
    return (
        <div className="flex items-center justify-center gap-3">
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-gold-500/70" />
            <span className="text-[10px] text-gold-500">◆</span>
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-gold-500/70" />
        </div>
    );
}

export default function InvitationCover({
    revealed,
    onOpen,
    guestName,
}: {
    revealed: boolean;
    onOpen: () => void;
    guestName: string;
}) {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="fixed inset-0 overflow-hidden text-maroon-900"
            style={{
                background:
                    "radial-gradient(ellipse at 50% 38%, #fffaf0 0%, #fbeee2 55%, #f4dcd6 100%)",
            }}
        >
            {/* soft glow behind text */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background:
                        "radial-gradient(ellipse 75% 50% at 50% 52%, rgba(255,250,240,.8), transparent 70%)",
                }}
            />

            {/* faint mandalas */}
            <Mandala className="absolute top-16 -left-14 w-56 text-gold-500/25" />
            <Mandala className="absolute -right-16 top-[42%] w-52 text-gold-500/20" />
            <Mandala className="absolute -bottom-16 -left-10 w-52 text-gold-500/20" />

            {/* top maroon header with gold line + zigzag edge */}
            <div className="absolute inset-x-0 top-0 z-10 drop-shadow-[0_6px_10px_rgba(74,10,18,.25)]">
                <div
                    className="h-3 border-b-2 border-gold-400/80"
                    style={{
                        background: "linear-gradient(180deg, #4a0a12 0%, #6b0f1a 100%)",
                    }}
                />
                <svg width="100%" height="14" className="block">
                    <defs>
                        <pattern id="zz" width="24" height="14" patternUnits="userSpaceOnUse">
                            <polygon points="0,0 24,0 12,14" fill="#6b0f1a" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="14" fill="url(#zz)" />
                </svg>
            </div>

            {/* content */}
            <motion.div
                variants={container}
                initial="hidden"
                animate={revealed ? "show" : "hidden"}
                className="relative z-10 flex h-full flex-col items-center overflow-y-auto px-6 pt-16 pb-28 text-center sm:pt-24"
            >
                {/* blessing block */}
                <motion.img
                    variants={item}
                    src={wedding.images.ganesha}
                    alt=""
                    className="h-12 w-auto opacity-90 sm:h-16"
                />

                <motion.div variants={item} className="mt-3">
                    <p className="font-script text-2xl leading-tight text-maroon-900 sm:text-3xl">
                        Shree Ganeshaya Namah
                    </p>
                    <p className="mt-1 text-xs tracking-widest text-maroon-800/80 sm:text-sm">
                        ॥ श्री गणेशाय नमः ॥
                    </p>
                </motion.div>

                <motion.p
                    variants={item}
                    className="mt-3 font-sans text-[9px] leading-relaxed font-light tracking-[0.4em] text-gold-500 uppercase sm:mt-5 sm:text-[10px]"
                >
                    With blessings from our families
                </motion.p>

                {/* main block, centered in remaining space */}
                <div className="flex w-full flex-1 flex-col items-center justify-center py-3">
                    {/* guest */}
                    <motion.div variants={item} className="flex flex-col items-center">
                        <p className="text-base italic text-maroon-800/80">Dear</p>
                        <p className="relative mt-0.5 px-4 pb-2 font-script text-4xl leading-none text-maroon-900 sm:text-5xl">
                            {guestName}
                            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
                        </p>
                    </motion.div>

                    {/* invite line */}
                    <motion.p
                        variants={item}
                        className="mt-4 text-base italic text-maroon-900 sm:mt-6 sm:text-lg"
                    >
                        You&apos;re invited to the wedding of
                    </motion.p>

                    {/* couple */}
                    <motion.h1
                        variants={item}
                        className="mt-2 font-script text-5xl leading-[1.1] text-gold-500 drop-shadow-sm sm:text-6xl"
                    >
                        {wedding.couple.brideFirst}
                    </motion.h1>
                    <motion.span
                        variants={item}
                        className="font-script text-2xl leading-none text-maroon-800 sm:text-3xl"
                    >
                        &amp;
                    </motion.span>
                    <motion.h1
                        variants={item}
                        className="font-script text-5xl leading-[1.1] text-gold-500 drop-shadow-sm sm:text-6xl"
                    >
                        {wedding.couple.groomFirst}
                    </motion.h1>

                    {/* date + place */}
                    <motion.div variants={item} className="mt-4 w-full sm:mt-6">
                        <Divider />
                        <p className="mt-3 text-sm tracking-[0.2em] text-maroon-900 sm:text-base">
                            {wedding.dateDisplay}
                        </p>
                        <p className="mt-1 text-sm italic text-maroon-800 sm:text-base">
                            {wedding.locationDisplay}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            {/* open invitation button */}
            <motion.button
                initial={{ opacity: 0, y: 24 }}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.9, delay: 3.1 }}
                whileTap={{ scale: 0.96 }}
                onClick={onOpen}
                className="absolute inset-x-6 bottom-8 z-20 mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full py-4 text-lg text-cream-50 shadow-[0_8px_28px_rgba(212,149,42,.45)]"
                style={{ background: "linear-gradient(135deg, #e8b84a, #c9821f)" }}
            >
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                >
                    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
                    <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
                </svg>
                <span className="italic">Open Invitation</span>
            </motion.button>
        </motion.div>
    );
}