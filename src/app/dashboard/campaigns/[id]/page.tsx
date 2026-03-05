import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatsCard } from "@/components/stats-card";
import { CampaignStatusBadge } from "@/components/campaign-status-badge";
import { ArrowLeft, DollarSign, Eye, Download, TrendingUp } from "lucide-react";
import { mockCampaigns } from "@/lib/mock-data";

export default function CampaignDetailPage({ params }: { params: { id: string } }) {
  const campaign = mockCampaigns.find((c) => c.id === params.id) || mockCampaigns[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/campaigns">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{campaign.bundleName}</h1>
            <CampaignStatusBadge status={campaign.status} />
          </div>
          <p className="text-muted-foreground">
            {campaign.startDate} to {campaign.endDate}
          </p>
        </div>
        <Link href={`/dashboard/reports/${campaign.id}`}>
          <Button className="bg-indigo-600 hover:bg-indigo-700">View Report</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Spend" value={`$${campaign.spend}`} icon={DollarSign} />
        <StatsCard title="Impressions" value="85.2K" icon={Eye} />
        <StatsCard title="Downloads" value="3,420" icon={Download} />
        <StatsCard title="Effective CPM" value="$24.90" icon={TrendingUp} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Campaign Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Bundle</p>
              <p className="font-medium">{campaign.bundleName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <CampaignStatusBadge status={campaign.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Start Date</p>
              <p className="font-mono">{campaign.startDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">End Date</p>
              <p className="font-mono">{campaign.endDate}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spend</p>
              <p className="font-mono font-semibold">${campaign.spend}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Media Fee (10%)</p>
              <p className="font-mono font-semibold">${(parseFloat(campaign.spend) * 0.1).toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
