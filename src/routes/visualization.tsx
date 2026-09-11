import { Suspense, lazy, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { weatherSeries } from "@/lib/portal-data";
import { useAuth } from "@/lib/auth";

const StationMap = lazy(() => import("@/components/station-map"));

export const Route = createFileRoute("/visualization")({
  head: () => ({
    meta: [
      { title: "Visualization & Dashboards — Polar Science Portal" },
      {
        name: "description",
        content:
          "Interactive station map, chart dashboards and natural-language search across India's polar datasets.",
      },
      { property: "og:title", content: "Visualization & Dashboards — Polar Science Portal" },
      {
        property: "og:description",
        content: "Explore polar observations on an interactive map and dashboard.",
      },
    ],
  }),
  component: VisualizationPage,
});

const seaIce = weatherSeries.map((row) => ({
  month: row.month,
  extent: 12 + Math.abs(row.maitri) / 4,
  anomaly: (row.himadri + 10) / 3,
}));

function VisualizationPage() {
  const { isResearcher } = useAuth();
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        eyebrow="Data exploration"
        title="Visualization dashboards"
        description="Map-based station browsing, time-series dashboards and a natural-language query bar for finding the right dataset quickly."
      />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Sparkles className="size-4" /> AI-powered search
            </CardTitle>
            <CardDescription>Ask for data in natural language.</CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                setAnswer(
                  query.trim()
                    ? `Matching datasets for "${query.trim()}" will appear here once the search service is connected.`
                    : null,
                );
              }}
            >
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. Show winter wind speeds at Maitri since 2020"
                aria-label="Ask for data in natural language"
              />
              <Button type="submit">Search</Button>
            </form>
            {answer && <p className="mt-4 text-sm text-muted-foreground">{answer}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Station map</CardTitle>
            <CardDescription>Antarctic, Arctic, Himalayan and Southern Ocean observation sites.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[420px] overflow-hidden rounded-md border border-border">
              <ClientOnly fallback={<Skeleton className="size-full" />}>
                <Suspense fallback={<Skeleton className="size-full" />}>
                  <StationMap />
                </Suspense>
              </ClientOnly>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-5 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Sea ice extent (million km²)</CardTitle>
              <CardDescription>Dashboard placeholder</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={seaIce}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                  <Tooltip />
                  <Area type="monotone" dataKey="extent" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.25} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Temperature anomaly index</CardTitle>
              <CardDescription>Dashboard placeholder</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seaIce}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                  <Tooltip />
                  <Bar dataKey="anomaly" fill="var(--chart-4)" radius={4} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-icefield">
          <CardHeader>
            <CardTitle className="text-base">Advanced analysis workspace</CardTitle>
            <CardDescription>
              {isResearcher
                ? "Build multi-station comparisons, export figures and pin dashboards to your profile."
                : "Researcher sign-in unlocks multi-station comparison and export tools."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isResearcher ? (
              <Badge variant="secondary">Researcher tools enabled</Badge>
            ) : (
              <Button asChild variant="outline"><Link to="/auth">Sign in as researcher</Link></Button>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
