"use client";

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/stats-card";
import { Eye, Download, DollarSign, TrendingUp, FileDown } from "lucide-react";
import { mockCampaigns, mockReportData } from "@/lib/mock-data";
import { ReportCharts } from "./report-charts";

export default function ReportsPage() {
  const [selectedCampaign, setSelectedCampaign] = useState(mockCampaigns[0].id);

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
    a.download = "campaign-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Campaign performance analytics</p>
        </div>
        <Button variant="outline" onClick={exportCsv}>
          <FileDown className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Campaign Selector */}
      <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
        <SelectTrigger className="w-full sm:w-72">
          <SelectValue placeholder="Select a campaign" />
        </SelectTrigger>
        <SelectContent>
          {mockCampaigns.map((c) => (
            <SelectItem key={c.id} value={c.id}>
              {c.bundleName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Impressions"
          value={`${(totals.impressions / 1000).toFixed(0)}K`}
          icon={Eye}
        />
        <StatsCard
          title="Total Downloads"
          value={totals.downloads.toLocaleString()}
          icon={Download}
        />
        <StatsCard
          title="Total Spend"
          value={`$${totals.spend.toLocaleString()}`}
          icon={DollarSign}
        />
        <StatsCard
          title="CPM Achieved"
          value={`$${avgCpm.toFixed(2)}`}
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <ReportCharts data={mockReportData} />
    </div>
  );
}
