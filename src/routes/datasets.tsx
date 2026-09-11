import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Download, Lock } from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stations, weatherSeries } from "@/lib/portal-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/datasets")({
  head: () => ({
    meta: [
      { title: "Polar Datasets — Maitri, Bharati, Himadri, Himansh" },
      {
        name: "description",
        content:
          "Station-wise polar observation datasets with charts, tables and CSV, JSON and NetCDF downloads.",
      },
      { property: "og:title", content: "Polar Datasets — NCPOR Portal" },
      {
        property: "og:description",
        content: "Weather, glaciology and ocean datasets from India's polar research stations.",
      },
    ],
  }),
  component: DatasetsPage,
});

const seriesKeyFor: Record<string, keyof (typeof weatherSeries)[number]> = {
  maitri: "maitri",
  bharati: "bharati",
  himadri: "himadri",
  himansh: "himansh",
  "southern-ocean": "bharati",
};

function DatasetsPage() {
  const { isResearcher, user } = useAuth();

  const download = (station: string, format: string) => {
    if (!isResearcher && format !== "CSV") {
      toast.error("Researcher access required for JSON and NetCDF downloads.");
      return;
    }
    toast.success(`Preparing ${station} ${format} export…`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Knowledge repository"
        title="Station datasets"
        description="Observation records from Indian Antarctic, Arctic, Himalayan and Southern Ocean programmes. Public visitors can preview and download summary CSVs; researchers unlock full-resolution JSON and NetCDF archives."
      >
        <Badge variant="secondary">
          {isResearcher ? "Researcher access active" : "Public access — summary data"}
        </Badge>
      </PageHeader>

      {!user && (
        <div className="mx-auto max-w-7xl px-4 pt-8">
          <Card className="border-dashed">
            <CardHeader className="flex-row items-center gap-3">
              <Lock className="size-5 text-muted-foreground" />
              <div>
                <CardTitle className="text-base">Unlock advanced datasets</CardTitle>
                <CardDescription>
                  Sign in as a researcher for full-resolution archives and submission forms.
                </CardDescription>
              </div>
              <Button asChild className="ml-auto" size="sm"><Link to="/auth">Login / Signup</Link></Button>
            </CardHeader>
          </Card>
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12">
        {stations.map((station) => {
          const key = seriesKeyFor[station.slug] ?? "maitri";
          return (
            <section key={station.slug} id={station.slug} className="scroll-mt-24">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-semibold">{station.name}</h2>
                  <p className="text-sm text-muted-foreground">{station.region}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["CSV", "JSON", "NetCDF"].map((fmt) => (
                    <Button
                      key={fmt}
                      size="sm"
                      variant={fmt === "CSV" ? "default" : "outline"}
                      onClick={() => download(station.name, fmt)}
                    >
                      <Download className="size-4" /> {fmt}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Monthly mean air temperature (°C)</CardTitle>
                    <CardDescription>Placeholder series — replace with live station feed.</CardDescription>
                  </CardHeader>
                  <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weatherSeries}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="month" fontSize={12} stroke="var(--muted-foreground)" />
                        <YAxis fontSize={12} stroke="var(--muted-foreground)" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey={key as string}
                          stroke="var(--chart-1)"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Available parameters</CardTitle>
                    <CardDescription>{station.blurb}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Parameter</TableHead>
                          <TableHead>Cadence</TableHead>
                          <TableHead className="text-right">Access</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {station.parameters.map((p, i) => (
                          <TableRow key={p}>
                            <TableCell className="font-medium">{p}</TableCell>
                            <TableCell>{i % 2 === 0 ? "Hourly" : "Daily"}</TableCell>
                            <TableCell className="text-right">
                              <Badge variant={i === 0 || isResearcher ? "secondary" : "outline"}>
                                {i === 0 || isResearcher ? "Open" : "Researcher"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              {isResearcher && (
                <Card className="mt-5 bg-icefield">
                  <CardHeader>
                    <CardTitle className="text-base">Submit data to {station.name}</CardTitle>
                    <CardDescription>
                      Researcher submission form placeholder — upload processed files with metadata for NCPOR review.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" onClick={() => toast.info("Submission workflow coming soon.")}>
                      Open submission form
                    </Button>
                  </CardContent>
                </Card>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
