import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Globe2, Handshake, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/collaboration")({
  head: () => ({
    meta: [
      { title: "Collaboration — MoUs, Partners & Proposals" },
      {
        name: "description",
        content:
          "International partnerships, memoranda of understanding, researcher directory and proposal submission for polar research.",
      },
      { property: "og:title", content: "Polar Research Collaboration" },
      {
        property: "og:description",
        content: "Partner with India's polar programme: MoUs, joint campaigns and proposals.",
      },
    ],
  }),
  component: CollaborationPage,
});

const mous = [
  { partner: "Norwegian Polar Institute", country: "Norway", theme: "Arctic atmospheric observation", until: "2031" },
  { partner: "Alfred Wegener Institute", country: "Germany", theme: "Ice-core and palaeoclimate", until: "2029" },
  { partner: "National Institute of Polar Research", country: "Japan", theme: "Aurora & space weather", until: "2028" },
  { partner: "Australian Antarctic Division", country: "Australia", theme: "Southern Ocean logistics", until: "2030" },
  { partner: "British Antarctic Survey", country: "United Kingdom", theme: "Glaciology & remote sensing", until: "2027" },
];

const directory = [
  { name: "Dr. Aparna Rane", field: "Sea-ice physics", station: "Bharati" },
  { name: "Dr. Mahesh Thomas", field: "Glaciology", station: "Himansh" },
  { name: "Dr. Ritu Bhattacharya", field: "Atmospheric aerosols", station: "Himadri" },
  { name: "Dr. Vikram Naidu", field: "Marine biogeochemistry", station: "Southern Ocean" },
  { name: "Dr. Sneha Kulkarni", field: "Geophysics", station: "Maitri" },
];

function CollaborationPage() {
  const { user } = useAuth();
  const [sending, setSending] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Proposal submitted for review by the NCPOR collaboration desk.");
    }, 600);
  };

  return (
    <>
      <PageHeader
        eyebrow="Partnerships"
        title="Collaboration & partnerships"
        description="Formal agreements, joint field campaigns and a growing directory of researchers across India's polar programme."
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { icon: Handshake, label: "Active MoUs", value: "18" },
            { icon: Globe2, label: "Partner countries", value: "12" },
            { icon: Users, label: "Listed researchers", value: "240+" },
          ].map((s) => (
            <Card key={s.label}>
              <CardHeader>
                <s.icon className="size-6 text-primary" />
                <CardTitle className="mt-2 text-3xl">{s.value}</CardTitle>
                <CardDescription>{s.label}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <h2 className="mt-12 text-2xl font-semibold">Memoranda of understanding</h2>
        <Card className="mt-4">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner institution</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Theme</TableHead>
                  <TableHead className="text-right">Valid until</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mous.map((m) => (
                  <TableRow key={m.partner}>
                    <TableCell className="font-medium">{m.partner}</TableCell>
                    <TableCell>{m.country}</TableCell>
                    <TableCell className="text-muted-foreground">{m.theme}</TableCell>
                    <TableCell className="text-right">{m.until}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <h2 className="mt-12 text-2xl font-semibold">Researcher directory</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Placeholder listing — full contact details are visible to signed-in researchers.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {directory.map((d) => (
            <Card key={d.name}>
              <CardHeader>
                <CardTitle className="text-base">{d.name}</CardTitle>
                <CardDescription>{d.field}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Badge variant="secondary">{d.station}</Badge>
                {user ? (
                  <Button variant="ghost" size="sm">
                    Contact
                  </Button>
                ) : (
                  <Button asChild variant="ghost" size="sm">
                    <Link to="/auth">Sign in to contact</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Submit a collaboration proposal</h2>
          <Card className="mt-6">
            <CardContent className="pt-6">
              <form className="grid gap-4" onSubmit={submit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="lead">Lead investigator</Label>
                    <Input id="lead" required placeholder="Name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="org">Institution / country</Label>
                    <Input id="org" required placeholder="Institute, country" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="title">Proposal title</Label>
                  <Input id="title" required placeholder="Joint campaign on…" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea id="summary" rows={5} placeholder="Objectives, stations involved, duration…" />
                </div>
                <Button type="submit" disabled={sending}>
                  {sending ? "Submitting…" : "Submit proposal"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
