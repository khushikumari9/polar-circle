import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { CheckCircle2, ShieldAlert, XCircle } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useAuth, roleLabels } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Polar Science Portal" },
      {
        name: "description",
        content:
          "NCPOR staff dashboard for approving datasets and managing outreach, careers and collaboration content.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Admin Dashboard — Polar Science Portal" },
      { property: "og:description", content: "Internal review and content management workspace." },
    ],
  }),
  component: DashboardPage,
});

type Item = { id: number; title: string; owner: string; date: string; status: string };

const initialDatasets: Item[] = [
  { id: 1, title: "Maitri AWS hourly records 2026", owner: "Dr. S. Kulkarni", date: "2026-09-01", status: "Pending" },
  { id: 2, title: "Chandra basin mass balance stakes", owner: "Dr. M. Thomas", date: "2026-08-28", status: "Pending" },
  { id: 3, title: "Southern Ocean pCO₂ underway", owner: "Dr. V. Naidu", date: "2026-08-19", status: "Approved" },
];

const initialOutreach: Item[] = [
  { id: 1, title: "Diary: crossing the Antarctic Circle", owner: "Dr. A. Rane", date: "2026-09-03", status: "Pending" },
  { id: 2, title: "Photo set: Himadri winter", owner: "Media team", date: "2026-08-30", status: "Approved" },
];

const initialCareers: Item[] = [
  { id: 1, title: "PhD — Southern Ocean carbon cycling", owner: "Recruitment", date: "2026-09-05", status: "Open" },
  { id: 2, title: "Summer internship 2027", owner: "Recruitment", date: "2026-09-02", status: "Draft" },
];

const initialCollab: Item[] = [
  { id: 1, title: "Proposal: joint Arctic aerosol campaign", owner: "NPI, Norway", date: "2026-09-04", status: "Pending" },
  { id: 2, title: "MoU renewal — AWI Germany", owner: "AWI", date: "2026-08-21", status: "Approved" },
];

function ReviewTable({
  items,
  onDecision,
}: {
  items: Item[];
  onDecision: (id: number, status: string) => void;
}) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Submitted by</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-medium">{i.title}</TableCell>
                <TableCell className="text-muted-foreground">{i.owner}</TableCell>
                <TableCell className="text-muted-foreground">{i.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      i.status === "Approved" || i.status === "Open" ? "default" : "secondary"
                    }
                  >
                    {i.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="sm" variant="outline" onClick={() => onDecision(i.id, "Approved")}>
                      <CheckCircle2 className="size-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => onDecision(i.id, "Rejected")}>
                      <XCircle className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function DashboardPage() {
  const { isAdmin, loading, role, user } = useAuth();
  const [datasets, setDatasets] = useState(initialDatasets);
  const [outreach, setOutreach] = useState(initialOutreach);
  const [careers, setCareers] = useState(initialCareers);
  const [collab, setCollab] = useState(initialCollab);

  const decide =
    (setter: React.Dispatch<React.SetStateAction<Item[]>>) => (id: number, status: string) => {
      setter((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
      toast.success(`Item marked as ${status.toLowerCase()}.`);
    };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-muted-foreground">
        Checking your access…
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <PageHeader eyebrow="Restricted" title="Administrator dashboard" />
        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card>
            <CardHeader>
              <ShieldAlert className="size-6 text-primary" />
              <CardTitle className="mt-2">NCPOR staff access only</CardTitle>
              <CardDescription>
                {user
                  ? `You are signed in as ${roleLabels[role]}. Administrator rights are granted by NCPOR staff.`
                  : "Sign in with an administrator account to review submissions."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user && (
                <Button asChild>
                  <Link to="/auth">Go to login</Link>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  const pending =
    datasets.filter((d) => d.status === "Pending").length +
    outreach.filter((d) => d.status === "Pending").length +
    collab.filter((d) => d.status === "Pending").length;

  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="NCPOR admin dashboard"
        description="Approve dataset submissions, publish outreach content, and manage careers and collaboration requests."
      >
        <Badge variant="secondary">{pending} items awaiting review</Badge>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-4">
          {[
            { label: "Datasets", value: datasets.length },
            { label: "Outreach items", value: outreach.length },
            { label: "Career listings", value: careers.length },
            { label: "Collaborations", value: collab.length },
          ].map((s) => (
            <Card key={s.label}>
              <CardHeader>
                <CardTitle className="text-3xl">{s.value}</CardTitle>
                <CardDescription>{s.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="datasets" className="mt-10">
          <TabsList className="flex-wrap">
            <TabsTrigger value="datasets">Datasets</TabsTrigger>
            <TabsTrigger value="outreach">Outreach</TabsTrigger>
            <TabsTrigger value="careers">Careers</TabsTrigger>
            <TabsTrigger value="collab">Collaboration</TabsTrigger>
          </TabsList>
          <TabsContent value="datasets" className="mt-6">
            <ReviewTable items={datasets} onDecision={decide(setDatasets)} />
          </TabsContent>
          <TabsContent value="outreach" className="mt-6">
            <ReviewTable items={outreach} onDecision={decide(setOutreach)} />
          </TabsContent>
          <TabsContent value="careers" className="mt-6">
            <ReviewTable items={careers} onDecision={decide(setCareers)} />
          </TabsContent>
          <TabsContent value="collab" className="mt-6">
            <ReviewTable items={collab} onDecision={decide(setCollab)} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
