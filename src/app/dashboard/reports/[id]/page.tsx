"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/stats-card";
import { ArrowLeft, Eye, Download, DollarSign, TrendingUp, FileDown } from "lucide-react";
import { mockCampaigns, mockReportData } from "@/lib/mock-data";
import { ReportCharts } from "../report-charts";

export default function CampaignReportPage({ params }: { params: { id: string } }) {
  const campaign = mockCampaigns.find((c) => c.id === params.id) || mockCampaigns[0];

  const totals = mockReportData.reduce(
    (acc, r) => ({
      impressions: acc.impressions + r.impressions,
      downloads: acc.downloads + r.downloads,
      spend: acc.spend + r.spend,
    }),
    { impressions: 0, downloads: 0, spend: 0 }
  );

  const avgCpm = totals.impressions > 0 ? (totals.spend / totals.impressions) * 1000 : 0;

  const exportCsv = () => {
    const headers = "Date,Impressions,Downloads,Spend\n";
    const rows = mockReportData.map((r) => `${r.date},${r.impressions},${r.downloads},${r.spend}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${campaign.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/reports">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{campaign.bundleName} Report</h1>
          <p className="text-muted-foreground">
            {campaign.startDate} to {campaign.endDate}
          </p>
        </div>
        <Button variant="outline" onClick={exportCsv}>
          <FileDown className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Impressions" value={`${(totals.impressions / 1000).toFixed(0)}K`} icon={Eye} />
        <StatsCard title="Total Downloads" value={totals.downloads.toLocaleString()} icon={Download} />
        <StatsCard title="Total Spend" value={`$${totals.spend.toLocaleString()}`} icon={DollarSign} />
        <StatsCard title="CPM Achieved" value={`$${avgCpm.toFixed(2)}`} icon={TrendingUp} />
      </div>

      <ReportCharts data={mockReportData} />
    </div>
  );
}
