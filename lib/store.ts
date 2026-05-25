import type { ProofPayload } from "@/lib/proofs";
import type { GateRequirement } from "@/lib/types";

// In-memory stores for the MVP demo. Each serverless instance keeps its own
// copy, so values can disappear between invocations on Vercel. Swap to Prisma
// when a database is connected.
export const proofStore = new Map<string, ProofPayload>();

export type StoredGate = {
  id: string;
  name: string;
  requirements: GateRequirement;
  createdAt: string;
};

export const gateStore = new Map<string, StoredGate>();
