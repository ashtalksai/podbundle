import { NextRequest, NextResponse } from "next/server";
import { mockBundles } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const bundle = mockBundles.find((b) => b.id === params.id);
  if (!bundle) {
    return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
  }
  return NextResponse.json({ bundle });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const bundle = mockBundles.find((b) => b.id === params.id);
  if (!bundle) {
    return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
  }

  const body = await request.json();
  const updated = { ...bundle, ...body };
  return NextResponse.json({ bundle: updated });
}
