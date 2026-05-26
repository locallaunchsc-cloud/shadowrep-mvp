import type { Metadata } from "next";
import { Space_Grotesk, Unbounded, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletProviders } from "@/components/WalletProviders";

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://shadowrep.vercel.app";
const description =
  "Selective-disclosure reputation for Solana wallets. Prove credibility — without ever exposing the wallet.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShadowRep — Solana reputation, in the dark.",
    template: "%s · ShadowRep",
  },
  description,
  keywords: [
    "Solana",
    "wallet reputation",
    "privacy",
    "selective disclosure",
    "attestation",
    "DeFi",
    "ZK",
    "Solana Attestation Service",
    "Helius",
  ],
  authors: [{ name: "ShadowRep" }],
  openGraph: {
    type: "website",
    siteName: "ShadowRep",
    title: "ShadowRep — Solana reputation, in the dark.",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ShadowRep — Solana reputation, in the dark.",
    description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${space.variable} ${unbounded.variable} ${jetbrains.variable}`}
    >
      <body className="grain font-sans antialiased">
        <WalletProviders>{children}</WalletProviders>
      </body>
    </html>
  );
}
