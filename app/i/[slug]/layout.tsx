import { Great_Vibes, Cormorant_Garamond, Poppins } from "next/font/google";

const greatVibes = Great_Vibes({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-great-vibes",
    display: "swap",
});

const cormorant = Cormorant_Garamond({
    weight: ["300", "400", "500", "600"],
    style: ["normal", "italic"],
    subsets: ["latin"],
    variable: "--font-cormorant",
    display: "swap",
});

const poppins = Poppins({
    weight: ["300", "400", "500"],
    subsets: ["latin"],
    variable: "--font-poppins",
    display: "swap",
});

export default function InviteLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className={`${greatVibes.variable} ${cormorant.variable} ${poppins.variable}`}
        >
            {children}
        </div>
    );
}