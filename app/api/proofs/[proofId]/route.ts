import { NextResponse } from "next/server";
import { proofStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { proofId: string } }) {
  const proof = proofStore.get(params.proofId);
  if (!proof) {
    return NextResponse.json({ error: "Proof not found" }, { status: 404 });
  }
  return NextResponse.json({ proof });
}
