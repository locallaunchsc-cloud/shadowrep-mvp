import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { gateStore } from "@/lib/store";

export const dynamic = "force-dynamic";

const Body = z.object({
  name: z.string().min(1).max(120),
  requirements: z.object({
    minWalletAgeDays: z.number().optional(),
    minTxCount: z.number().optional(),
    minSwapCount: z.number().optional(),
    minVolumeTier: z.enum(["$0-$100", "$100-$1K", "$1K-$10K", "$10K-$50K", "$50K+"]).optional(),
    requireCleanSignals: z.boolean().optional(),
    requiredProtocols: z.array(z.string()).optional(),
  }),
});

export async function GET() {
  return NextResponse.json({ gates: Array.from(gateStore.values()) });
}

export async function POST(req: Request) {
  const parsed = Body.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const gate = {
    id: crypto.randomUUID(),
    name: parsed.data.name,
    requirements: parsed.data.requirements,
    createdAt: new Date().toISOString(),
  };
  gateStore.set(gate.id, gate);
  return NextResponse.json({ gate });
}
