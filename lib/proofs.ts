import crypto from "crypto";
import { z } from "zod";
import type { ReputationResult } from "@/lib/scoring";

const ProofPayloadSchema = z.object({
  proofId: z.string(),
  walletHash: z.string(),
  score: z.number(),
  tier: z.string(),
  badges: z.array(z.string()),
  issuedAt: z.string(),
  expiresAt: z.string(),
});

export type ProofPayload = z.infer<typeof ProofPayloadSchema> & { signature: string };

function secret() {
  return process.env.SHADOWREP_ISSUER_SECRET || "dev-secret-only";
}

export function createProof(result: ReputationResult): ProofPayload {
  const payload = {
    proofId: crypto.randomUUID(),
    walletHash: result.snapshot.walletHash,
    score: result.score,
    tier: result.tier,
    badges: result.badges.map((b) => b.name),
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  };
  const signature = crypto.createHmac("sha256", secret()).update(JSON.stringify(payload)).digest("hex");
  return { ...payload, signature };
}

export function verifyProof(proof: ProofPayload) {
  const { signature, ...payload } = proof;
  ProofPayloadSchema.parse(payload);
  const expected = crypto.createHmac("sha256", secret()).update(JSON.stringify(payload)).digest("hex");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
