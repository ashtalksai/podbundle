import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PriceCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export function PriceCard({ name, price, period, description, features, highlighted, ctaText = "Get Started" }: PriceCardProps) {
  return (
    <Card className={`relative flex flex-col ${highlighted ? "border-indigo-600 border-2 shadow-lg scale-105" : ""}`}>
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <div className="mt-2">
          <span className="text-4xl font-bold font-mono">{price}</span>
          {period && <span className="text-muted-foreground">/{period}</span>}
        </div>
        <p className="text-sm text-muted-foreground mt-2">{description}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className={`w-full ${highlighted ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}
          variant={highlighted ? "default" : "outline"}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
}
