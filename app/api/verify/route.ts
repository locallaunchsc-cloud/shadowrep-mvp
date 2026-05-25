import { NextResponse } from "next/server";
import { z } from "zod";
import { getMockWalletSnapshot } from "@/lib/walletAnalytics";
import { evaluateGate } from "@/lib/gates";

const Body = z.object({
  walletAddress: z.string().min(32),
  requirements: z.object({
    minWalletAgeDays: z.number().optional(),
    minTxCount: z.number().optional(),
    minSwapCount: z.number().optional(),
    minVolumeTier: z.enum(["$0-$100", "$100-$1K", "$1K-$10K", "$10K-$50K", "$50K+"]).optional(),
    requireCleanSignals: z.boolean().optional(),
    requiredProtocols: z.array(z.string()).optional(),
  }),
});

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const snapshot = await getMockWalletSnapshot(parsed.data.walletAddress);
  const gateResult = evaluateGate(snapshot, parsed.data.requirements);

  return NextResponse.json({ gateResult });
}
