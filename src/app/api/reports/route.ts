import { NextRequest, NextResponse } from "next/server";
import { mockReportData } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const campaignId = searchParams.get("campaignId");

  if (!campaignId) {
    return NextResponse.json(
      { error: "campaignId query parameter is required" },
      { status: 400 }
    );
  }

  const totals = mockReportData.reduce(
    (acc, r) => ({
      impressions: acc.impressions + r.impressions,
      downloads: acc.downloads + r.downloads,
      spend: acc.spend + r.spend,
    }),
    { impressions: 0, downloads: 0, spend: 0 }
  );

  return NextResponse.json({
    campaignId,
    summary: {
      ...totals,
      cpm: totals.impressions > 0 ? (totals.spend / totals.impressions) * 1000 : 0,
    },
    data: mockReportData,
  });
}
