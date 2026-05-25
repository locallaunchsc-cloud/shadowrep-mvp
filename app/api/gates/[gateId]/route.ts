import { NextResponse } from "next/server";
import { gateStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { gateId: string } }) {
  const gate = gateStore.get(params.gateId);
  if (!gate) {
    return NextResponse.json({ error: "Gate not found" }, { status: 404 });
  }
  return NextResponse.json({ gate });
}
