import { createFileRoute } from "@tanstack/react-router";
import { Camera, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export const Route = createFileRoute("/outreach")({
  head: () => ({
    meta: [
      { title: "Outreach — Expedition Diaries, Photos & Films" },
      {
        name: "description",
        content:
          "Expedition diaries, photo galleries, documentary films and infographics from India's polar missions.",
      },
      { property: "og:title", content: "Polar Outreach — Expedition Diaries & Media" },
      {
        property: "og:description",
        content: "Stories, images and films from Maitri, Bharati, Himadri and Himansh.",
      },
    ],
  }),
  component: OutreachPage,
});

const diaries = [
  {
    title: "Crossing the Antarctic Circle",
    author: "Dr. A. Rane • 43rd ISEA",
    date: "2026-01-08",
    text: "Twenty-two days at sea, and the first tabular iceberg appears at 66°S. The team begins hourly bird and mammal counts from the bridge.",
  },
  {
    title: "Winter darkness at Maitri",
    author: "S. Kulkarni • Station engineer",
    date: "2026-06-21",
    text: "Midwinter day. Diesel generators, greenhouse lettuce and a nine-person crew keeping every instrument alive through the polar night.",
  },
  {
    title: "Drilling the Chandra basin",
    author: "Dr. M. Thomas • Himansh",
    date: "2026-05-14",
    text: "Stake networks re-surveyed at 4,900 m. Melt streams are running two weeks earlier than the decadal average.",
  },
];

const gallery = [
  "Aurora over Maitri station",
  "Adélie penguin colony survey",
  "Ice-core extraction at Himansh",
  "Research vessel in Southern Ocean swell",
  "Ny-Ålesund aerosol laboratory",
  "Automatic weather station install",
];

export default function OutreachPage() {
  return (
    <>
      <PageHeader
        eyebrow="Media dissemination"
        title="Outreach & expedition stories"
        description="Diaries from the field, photographs, documentary films and infographics that translate polar science for everyone."
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Expedition diaries</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {diaries.map((d) => (
            <Card key={d.title}>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  {new Date(d.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                </Badge>
                <CardTitle className="mt-2 text-lg">{d.title}</CardTitle>
                <CardDescription>{d.author}</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{d.text}</CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-2xl font-semibold">Photo gallery</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Placeholder frames — station photographers upload approved images here.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((caption) => (
              <figure key={caption} className="overflow-hidden rounded-lg border border-border bg-card">
                <AspectRatio ratio={4 / 3}>
                  <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary to-background text-muted-foreground">
                    <Camera className="size-8" />
                  </div>
                </AspectRatio>
                <figcaption className="px-3 py-2 text-xs text-muted-foreground">{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Films & documentaries</h2>
            <div className="mt-6 space-y-4">
              {["Life at Maitri: a year in the ice", "Himansh — measuring a shrinking glacier"].map(
                (title) => (
                  <Card key={title} className="overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <div className="flex size-full items-center justify-center bg-polar text-primary-foreground">
                        <Youtube className="size-10" />
                      </div>
                    </AspectRatio>
                    <CardHeader>
                      <CardTitle className="text-base">{title}</CardTitle>
                      <CardDescription>Video embed placeholder</CardDescription>
                    </CardHeader>
                  </Card>
                ),
              )}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Infographics</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Sea-ice extent explained", s: "How Antarctic sea ice grows and retreats each year." },
                { t: "Anatomy of an ice core", s: "What 1,000 years of trapped air can tell us." },
                { t: "Polar food web", s: "From phytoplankton to leopard seals." },
                { t: "Life at −40 °C", s: "Keeping a station running through winter." },
              ].map((i) => (
                <Card key={i.t}>
                  <CardHeader>
                    <CardTitle className="text-base">{i.t}</CardTitle>
                    <CardDescription>{i.s}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <h2 className="mt-10 text-2xl font-semibold">Follow the programme</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                <Twitter className="size-4" /> Updates
              </Button>
              <Button variant="outline" size="sm">
                <Instagram className="size-4" /> Field photos
              </Button>
              <Button variant="outline" size="sm">
                <Facebook className="size-4" /> Community
              </Button>
              <Button variant="outline" size="sm">
                <Youtube className="size-4" /> Films
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
