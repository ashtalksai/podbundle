"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Users, DollarSign } from "lucide-react";

interface PodcastCardProps {
  id: string;
  name: string;
  niche: string;
  audienceSize: number;
  cpm: string;
  description: string;
  onAddToBundle?: (id: string) => void;
  isSelected?: boolean;
}

const nicheLabels: Record<string, string> = {
  tech_saas: "Tech & SaaS",
  business_finance: "Business & Finance",
  health_wellness: "Health & Wellness",
};

const nicheColors: Record<string, string> = {
  tech_saas: "bg-indigo-100 text-indigo-700",
  business_finance: "bg-amber-100 text-amber-700",
  health_wellness: "bg-emerald-100 text-emerald-700",
};

export function PodcastCard({ id, name, niche, audienceSize, cpm, description, onAddToBundle, isSelected }: PodcastCardProps) {
  return (
    <Card className={`transition-all hover:shadow-md ${isSelected ? "ring-2 ring-indigo-600" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <Headphones className="h-5 w-5 text-indigo-600" />
            </div>
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
          <Badge variant="secondary" className={nicheColors[niche]}>
            {nicheLabels[niche]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{description}</p>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono font-medium">{(audienceSize / 1000).toFixed(0)}K</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono font-medium">${cpm} CPM</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => onAddToBundle?.(id)}
          variant={isSelected ? "secondary" : "default"}
          className={`w-full ${isSelected ? "" : "bg-indigo-600 hover:bg-indigo-700"}`}
          size="sm"
        >
          {isSelected ? "Remove from Bundle" : "Add to Bundle"}
        </Button>
      </CardFooter>
    </Card>
  );
}
