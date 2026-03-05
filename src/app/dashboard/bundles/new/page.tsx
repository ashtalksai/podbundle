"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Check, Headphones, DollarSign } from "lucide-react";
import { mockPodcasts } from "@/lib/mock-data";

type Step = 1 | 2 | 3;

const nicheLabels: Record<string, string> = {
  tech_saas: "Tech & SaaS",
  business_finance: "Business & Finance",
  health_wellness: "Health & Wellness",
};

export default function NewBundlePage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [allocations, setAllocations] = useState<Record<string, number>>({});

  const selectedPodcasts = mockPodcasts.filter((p) => selectedIds.has(p.id));
  const totalAllocation = Object.values(allocations).reduce((a, b) => a + b, 0);
  const budgetNum = parseFloat(budget) || 0;
  const estimatedReach = selectedPodcasts.reduce((sum, p) => {
    const alloc = allocations[p.id] || 0;
    return sum + (alloc / parseFloat(p.cpm)) * 1000;
  }, 0);

  const togglePodcast = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        const newAlloc = { ...allocations };
        delete newAlloc[id];
        setAllocations(newAlloc);
      } else {
        next.add(id);
        const equalShare = budgetNum / (prev.size + 1);
        const newAlloc: Record<string, number> = {};
        [Array.from(prev), id].flat().forEach((pid) => { newAlloc[pid] = Math.round(equalShare); });
        setAllocations(newAlloc);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    router.push("/dashboard/bundles");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Bundle</h1>
        <p className="text-muted-foreground">Build your podcast advertising bundle in 3 steps</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        {[
          { num: 1, label: "Details" },
          { num: 2, label: "Select Podcasts" },
          { num: 3, label: "Preview" },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= s.num ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
            }`}>
              {step > s.num ? <Check className="h-4 w-4" /> : s.num}
            </div>
            <span className={`text-sm font-medium ${step >= s.num ? "text-foreground" : "text-muted-foreground"}`}>
              {s.label}
            </span>
            {i < 2 && <div className={`w-12 h-0.5 ${step > s.num ? "bg-indigo-600" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Details */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Bundle Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Bundle Name</Label>
              <Input
                id="name"
                placeholder="e.g., Q1 Tech Launch"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Total Budget ($)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="budget"
                  type="number"
                  placeholder="10000"
                  className="pl-10 font-mono"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!name || !budget}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Select Podcasts */}
      {step === 2 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Select Podcasts</CardTitle>
              <p className="text-sm text-muted-foreground">
                {selectedIds.size} selected | Budget: ${budgetNum.toLocaleString()}
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {mockPodcasts.map((podcast) => {
                  const isSelected = selectedIds.has(podcast.id);
                  return (
                    <div
                      key={podcast.id}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        isSelected ? "border-indigo-600 bg-indigo-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => togglePodcast(podcast.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isSelected ? "bg-indigo-600 text-white" : "bg-gray-100"
                        }`}>
                          {isSelected ? <Check className="h-4 w-4" /> : <Headphones className="h-4 w-4 text-gray-400" />}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{podcast.name}</p>
                          <p className="text-xs text-muted-foreground">{nicheLabels[podcast.niche]}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="font-mono text-muted-foreground">{(podcast.audienceSize / 1000).toFixed(0)}K</span>
                        <span className="font-mono font-medium">${podcast.cpm}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Allocation Sliders */}
          {selectedPodcasts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Allocated: <span className="font-mono font-medium">${totalAllocation.toLocaleString()}</span> / ${budgetNum.toLocaleString()}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPodcasts.map((podcast) => (
                  <div key={podcast.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{podcast.name}</span>
                      <span className="text-sm font-mono">${(allocations[podcast.id] || 0).toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[allocations[podcast.id] || 0]}
                      max={budgetNum}
                      step={100}
                      onValueChange={([val]) => setAllocations({ ...allocations, [podcast.id]: val })}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button
              onClick={() => setStep(3)}
              disabled={selectedIds.size === 0}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Bundle Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Bundle Name</p>
                  <p className="font-semibold mt-1">{name}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="font-mono font-semibold mt-1">${budgetNum.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Podcasts</p>
                  <p className="font-mono font-semibold mt-1">{selectedPodcasts.length}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Est. Impressions</p>
                  <p className="font-mono font-semibold mt-1">{(estimatedReach / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Cost Breakdown</h3>
                <div className="space-y-2">
                  {selectedPodcasts.map((podcast) => {
                    const alloc = allocations[podcast.id] || 0;
                    const impressions = (alloc / parseFloat(podcast.cpm)) * 1000;
                    return (
                      <div key={podcast.id} className="flex items-center justify-between py-2 border-b last:border-0">
                        <div className="flex items-center gap-2">
                          <Headphones className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{podcast.name}</span>
                          <Badge variant="secondary" className="text-xs">{nicheLabels[podcast.niche]}</Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <span className="text-muted-foreground">{(impressions / 1000).toFixed(0)}K imp.</span>
                          <span className="font-mono font-medium">${alloc.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                <div>
                  <p className="font-semibold">Total + 10% Media Fee</p>
                  <p className="text-sm text-muted-foreground">Media fee is added on top of your budget</p>
                </div>
                <p className="text-2xl font-bold font-mono text-indigo-600">
                  ${(totalAllocation * 1.1).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep(2)}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700">
              Submit Bundle
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
