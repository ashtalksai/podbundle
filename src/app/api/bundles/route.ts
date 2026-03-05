import { NextRequest, NextResponse } from "next/server";
import { mockBundles } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ bundles: mockBundles });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, totalBudget, podcasts } = body as {
    name: string;
    totalBudget: string;
    podcasts: Array<{ podcastId: string; allocation: number }>;
  };

  if (!name || !totalBudget || !podcasts?.length) {
    return NextResponse.json(
      { error: "Missing required fields: name, totalBudget, podcasts" },
      { status: 400 }
    );
  }

  const newBundle = {
    id: `b${Date.now()}`,
    name,
    status: "draft",
    totalBudget,
    podcastCount: podcasts.length,
    createdAt: new Date().toISOString().split("T")[0],
  };

  return NextResponse.json({ bundle: newBundle }, { status: 201 });
}
