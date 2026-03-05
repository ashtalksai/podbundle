"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PodcastCard } from "@/components/podcast-card";
import { Search, LayoutGrid, List } from "lucide-react";
import { mockPodcasts } from "@/lib/mock-data";

const ITEMS_PER_PAGE = 12;

export default function PodcastsPage() {
  const [search, setSearch] = useState("");
  const [niche, setNiche] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [selectedPodcasts, setSelectedPodcasts] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return mockPodcasts.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesNiche = niche === "all" || p.niche === niche;
      return matchesSearch && matchesNiche;
    });
  }, [search, niche]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const togglePodcast = (id: string) => {
    setSelectedPodcasts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Podcast Directory</h1>
        <p className="text-muted-foreground">Browse and discover podcasts for your campaigns</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search podcasts..."
            className="pl-10"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <Select value={niche} onValueChange={(v) => { setNiche(v); setPage(1); }}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Niches" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Niches</SelectItem>
            <SelectItem value="tech_saas">Tech & SaaS</SelectItem>
            <SelectItem value="business_finance">Business & Finance</SelectItem>
            <SelectItem value="health_wellness">Health & Wellness</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-1 border rounded-lg p-1">
          <Button
            variant={view === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={view === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Selected count */}
      {selectedPodcasts.size > 0 && (
        <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
          <span className="text-sm font-medium text-indigo-700">
            {selectedPodcasts.size} podcast{selectedPodcasts.size > 1 ? "s" : ""} selected
          </span>
          <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 ml-auto">
            Create Bundle with Selected
          </Button>
        </div>
      )}

      {/* Results */}
      <div className="text-sm text-muted-foreground">
        {filtered.length} podcast{filtered.length !== 1 ? "s" : ""} found
      </div>

      <div className={view === "grid"
        ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        : "space-y-4"
      }>
        {paginated.map((podcast) => (
          <PodcastCard
            key={podcast.id}
            {...podcast}
            onAddToBundle={togglePodcast}
            isSelected={selectedPodcasts.has(podcast.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-4">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
