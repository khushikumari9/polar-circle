import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { FileUp, Lock, UploadCloud } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reveal } from "@/components/reveal";
import { useAuth, roleLabels } from "@/lib/auth";
import { stations } from "@/lib/portal-data";

export const Route = createFileRoute("/submit-data")({
  head: () => ({
    meta: [
      { title: "Submit Data — Polar Science Portal" },
      {
        name: "description",
        content:
          "Researcher workspace for uploading polar datasets, reports and publications for NCPOR review.",
      },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Submit Data — Polar Science Portal" },
      {
        property: "og:description",
        content: "Upload datasets, reports and publications for NCPOR review.",
      },
    ],
  }),
  component: SubmitDataPage,
});

function SubmitDataPage() {
  const { isResearcher, loading, role, user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Submission received. NCPOR staff will review it shortly.");
    }, 600);
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center text-sm text-muted-foreground">
        Checking your access…
      </div>
    );
  }

  if (!isResearcher) {
    return (
      <>
        <PageHeader eyebrow="Restricted" title="Submit data & reports" />
        <div className="mx-auto max-w-2xl px-4 py-16">
          <Card>
            <CardHeader>
              <Lock className="size-6 text-primary" />
              <CardTitle className="mt-2">Researcher access required</CardTitle>
              <CardDescription>
                {user
                  ? `You are signed in as ${roleLabels[role]}. Request researcher access to upload datasets and reports.`
                  : "Sign in with a researcher account to upload datasets, reports and publications."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild>
                <Link to="/auth">{user ? "Manage account" : "Go to login"}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Researcher workspace"
        title="Submit data & reports"
        description="Upload observational datasets, expedition reports and publications. Every submission is reviewed by NCPOR staff before it appears in the repository."
      />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <Reveal>
          <Card>
            <CardHeader>
              <UploadCloud className="size-6 text-primary" />
              <CardTitle className="mt-2">New submission</CardTitle>
              <CardDescription>
                Placeholder form — files are acknowledged on screen and queued for review.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={submit}>
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" required placeholder="Maitri AWS hourly records 2026" />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Station / region</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a station" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map((s) => (
                          <SelectItem key={s.slug} value={s.slug}>
                            {s.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Submission type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dataset">Dataset</SelectItem>
                        <SelectItem value="report">Expedition report</SelectItem>
                        <SelectItem value="publication">Publication</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    required
                    placeholder="Instruments used, period covered, quality-control notes…"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="file">File (CSV, JSON, NetCDF, PDF)</Label>
                  <Input id="file" type="file" />
                </div>

                <Button type="submit" disabled={submitting} className="justify-self-start">
                  <FileUp className="size-4" /> {submitting ? "Uploading…" : "Submit for review"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Accepted formats", value: "CSV • JSON • NetCDF • PDF" },
            { label: "Typical review time", value: "5 working days" },
            { label: "Licence", value: "CC-BY 4.0 with attribution" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <Card className="h-full">
                <CardHeader>
                  <CardDescription>{s.label}</CardDescription>
                  <CardTitle className="text-base">{s.value}</CardTitle>
                </CardHeader>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
