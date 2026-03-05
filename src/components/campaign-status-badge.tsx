import { Badge } from "@/components/ui/badge";

interface CampaignStatusBadgeProps {
  status: string;
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-gray-100 text-gray-700 hover:bg-gray-100" },
  active: { label: "Active", className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" },
  paused: { label: "Paused", className: "bg-amber-100 text-amber-700 hover:bg-amber-100" },
  completed: { label: "Completed", className: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100" },
};

export function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <Badge variant="secondary" className={config.className}>
      {config.label}
    </Badge>
  );
}
