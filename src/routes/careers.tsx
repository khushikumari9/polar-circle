import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Briefcase, CalendarDays, MapPin } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
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

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Internships, PhD & Post-doc in Polar Science" },
      {
        name: "description",
        content:
          "Internships, dissertation projects, PhD and post-doctoral openings in Indian polar and ocean research.",
      },
      { property: "og:title", content: "Careers in Indian Polar Science" },
      {
        property: "og:description",
        content: "Apply for internships, dissertations, PhD and post-doc positions with NCPOR.",
      },
    ],
  }),
  component: CareersPage,
});

const openings = [
  {
    title: "Summer internship — Cryosphere data analysis",
    type: "Internship",
    location: "Goa (hybrid)",
    close: "30 Oct 2026",
    detail: "Eight-week programme working with automatic weather station records from Maitri and Bharati.",
  },
  {
    title: "Dissertation project — Glacier mass balance modelling",
    type: "Dissertation",
    location: "Himansh / Goa",
    close: "15 Nov 2026",
    detail: "For final-year MSc students in geology, geography, physics or environmental science.",
  },
  {
    title: "PhD position — Southern Ocean carbon cycling",
    type: "PhD",
    location: "Goa",
    close: "05 Dec 2026",
    detail: "Four-year fellowship with sea-time on an annual Southern Ocean expedition.",
  },
  {
    title: "Post-doctoral fellow — Arctic aerosols & radiative forcing",
    type: "Post-doc",
    location: "Himadri, Ny-Ålesund",
    close: "20 Dec 2026",
    detail: "Two-year position including a field season at the Arctic station.",
  },
];

function CareersPage() {
  const [role, setRole] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success("Application received. The recruitment team will be in touch by email.");
    }, 600);
  };

  return (
    <>
      <PageHeader
        eyebrow="Join the programme"
        title="Careers & student opportunities"
        description="Internships, dissertation projects, doctoral fellowships and post-doctoral research positions across India's polar programme."
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Current openings</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {openings.map((o, i) => (
            <Reveal key={o.title} delay={i * 80}>
            <Card className="h-full transition-shadow hover:shadow-polar">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge>{o.type}</Badge>
                  <Badge variant="secondary" className="gap-1">
                    <CalendarDays className="size-3" /> Closes {o.close}
                  </Badge>
                </div>
                <CardTitle className="mt-2 text-lg">{o.title}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="size-3.5" /> {o.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{o.detail}</p>
                <Button variant="outline" size="sm" onClick={() => setRole(o.title)}>
                  <Briefcase className="size-4" /> Apply for this role
                </Button>
              </CardContent>
            </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Application form</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Placeholder form — submissions are acknowledged on screen and reviewed by NCPOR staff.
          </p>
          <Card className="mt-6">
            <CardContent className="pt-6">
              <form className="grid gap-4" onSubmit={submit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" required placeholder="Your name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" required placeholder="you@institute.ac.in" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" placeholder="University or organisation" />
                </div>
                <div className="grid gap-2">
                  <Label>Position</Label>
                  <Select value={role} onValueChange={setRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a position" />
                    </SelectTrigger>
                    <SelectContent>
                      {openings.map((o) => (
                        <SelectItem key={o.title} value={o.title}>
                          {o.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="statement">Statement of interest</Label>
                  <Textarea id="statement" rows={5} placeholder="Tell us about your research interests…" />
                </div>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting…" : "Submit application"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
