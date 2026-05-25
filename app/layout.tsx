import type { Metadata } from "next";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletProviders } from "@/components/WalletProviders";

export const metadata: Metadata = {
  title: "ShadowRep",
  description: "Prove your crypto reputation without exposing your wallet.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WalletProviders>{children}</WalletProviders>
      </body>
    </html>
  );
}
