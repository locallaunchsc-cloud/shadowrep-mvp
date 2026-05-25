import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletProviders } from "@/components/WalletProviders";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://shadowrep.vercel.app";
const description =
  "ShadowRep turns your Solana on-chain history into selective-disclosure credentials. Verify trader credibility, gate communities, and filter bots — without exposing wallets.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ShadowRep — Prove your Solana reputation. Privately.",
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
    title: "ShadowRep — Prove your Solana reputation. Privately.",
    description,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ShadowRep — Prove your Solana reputation. Privately.",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <WalletProviders>{children}</WalletProviders>
      </body>
    </html>
  );
}
