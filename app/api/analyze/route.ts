import { NextResponse } from "next/server";
import { z } from "zod";
import { getMockWalletSnapshot } from "@/lib/walletAnalytics";
import { scoreWallet } from "@/lib/scoring";
import { createProof } from "@/lib/proofs";
import { proofStore } from "@/lib/store";

const Body = z.object({ walletAddress: z.string().min(32) });

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const snapshot = await getMockWalletSnapshot(parsed.data.walletAddress);
  const result = scoreWallet(snapshot);
  const proof = createProof(result);
  proofStore.set(proof.proofId, proof);

  return NextResponse.json({ result, proof });
}
