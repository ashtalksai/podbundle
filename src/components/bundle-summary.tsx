import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Radio, TrendingUp } from "lucide-react";

interface BundleSummaryProps {
  name: string;
  status: string;
  totalBudget: string;
  podcastCount: number;
  estimatedReach?: number;
}

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  submitted: "bg-amber-100 text-amber-700",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-indigo-100 text-indigo-700",
};

export function BundleSummary({ name, status, totalBudget, podcastCount, estimatedReach }: BundleSummaryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <Badge className={statusColors[status]}>{status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Budget</p>
              <p className="font-mono font-semibold">${totalBudget}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Radio className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Podcasts</p>
              <p className="font-mono font-semibold">{podcastCount}</p>
            </div>
          </div>
          {estimatedReach && (
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Est. Reach</p>
                <p className="font-mono font-semibold">{(estimatedReach / 1000).toFixed(0)}K</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
