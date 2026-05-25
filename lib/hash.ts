import crypto from "crypto";

export function hashWallet(walletAddress: string) {
  return crypto.createHash("sha256").update(walletAddress).digest("hex");
}
