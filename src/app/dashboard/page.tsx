import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatsCard } from "@/components/stats-card";
import { CampaignStatusBadge } from "@/components/campaign-status-badge";
import { Megaphone, DollarSign, Eye, TrendingUp, Plus, Radio } from "lucide-react";
import { mockCampaigns } from "@/lib/mock-data";

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here&apos;s your campaign overview.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/podcasts">
            <Button variant="outline" size="sm">
              <Radio className="h-4 w-4 mr-2" />
              Browse Podcasts
            </Button>
          </Link>
          <Link href="/dashboard/bundles/new">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Bundle
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Campaigns"
          value="3"
          icon={Megaphone}
          trend={{ value: "1", positive: true }}
        />
        <StatsCard
          title="Total Spend"
          value="$21,500"
          icon={DollarSign}
          trend={{ value: "12%", positive: true }}
        />
        <StatsCard
          title="Total Impressions"
          value="171K"
          icon={Eye}
          trend={{ value: "8%", positive: true }}
        />
        <StatsCard
          title="Avg CPM"
          value="$25.40"
          icon={TrendingUp}
          trend={{ value: "3%", positive: false }}
        />
      </div>

      {/* Recent Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead className="text-right">Spend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.bundleName}</TableCell>
                  <TableCell>
                    <CampaignStatusBadge status={campaign.status} />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{campaign.startDate}</TableCell>
                  <TableCell className="font-mono text-sm">{campaign.endDate}</TableCell>
                  <TableCell className="text-right font-mono font-medium">${campaign.spend}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
