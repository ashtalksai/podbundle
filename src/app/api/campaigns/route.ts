import { NextRequest, NextResponse } from "next/server";
import { mockCampaigns } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ campaigns: mockCampaigns });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { bundleId, startDate, endDate } = body as {
    bundleId: string;
    startDate: string;
    endDate: string;
  };

  if (!bundleId || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required fields: bundleId, startDate, endDate" },
      { status: 400 }
    );
  }

  const newCampaign = {
    id: `c${Date.now()}`,
    bundleId,
    bundleName: "New Campaign",
    status: "pending",
    startDate,
    endDate,
    spend: "0.00",
  };

  return NextResponse.json({ campaign: newCampaign }, { status: 201 });
}
