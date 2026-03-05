import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Layers } from "lucide-react";
import { mockBundles } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  draft: "bg-gray-100 text-gray-700",
  submitted: "bg-amber-100 text-amber-700",
  active: "bg-emerald-100 text-emerald-700",
  completed: "bg-indigo-100 text-indigo-700",
};

export default function BundlesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bundles</h1>
          <p className="text-muted-foreground">Manage your podcast advertising bundles</p>
        </div>
        <Link href="/dashboard/bundles/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Bundle
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Your Bundles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Podcasts</TableHead>
                <TableHead className="text-right">Budget</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBundles.map((bundle) => (
                <TableRow key={bundle.id}>
                  <TableCell className="font-medium">{bundle.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[bundle.status]}>
                      {bundle.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{bundle.podcastCount}</TableCell>
                  <TableCell className="text-right font-mono font-medium">${bundle.totalBudget}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground">{bundle.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
