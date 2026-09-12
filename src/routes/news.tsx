import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { newsItems } from "@/lib/portal-data";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Expeditions, Workshops & Conferences" },
      {
        name: "description",
        content:
          "Latest expedition updates, workshops, conferences and dataset releases from India's polar research programme.",
      },
      { property: "og:title", content: "Polar Science News & Updates" },
      {
        property: "og:description",
        content: "Expedition news, workshops and dataset releases from NCPOR.",
      },
    ],
  }),
  component: NewsPage,
});

const tags = ["All", "Expedition", "Workshop", "Research", "Collaboration", "Dataset"];

function NewsPage() {
  const [tag, setTag] = useState("All");
  const items = newsItems
    .filter((n) => tag === "All" || n.tag === tag)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const [lead, ...rest] = items;

  return (
    <>
      <PageHeader
        eyebrow="Newsroom"
        title="News & updates"
        description="Expedition reports, workshops, conferences and new dataset releases from India's polar science community."
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={tag === t ? "default" : "outline"}
              onClick={() => setTag(t)}
            >
              {t}
            </Button>
          ))}
        </div>

        {!lead && (
          <p className="mt-10 text-sm text-muted-foreground">No stories in this category yet.</p>
        )}

        {lead && (
          <Card className="mt-8 border-primary/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Badge>{lead.tag}</Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(lead.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
                </span>
              </div>
              <CardTitle className="mt-2 text-2xl">{lead.title}</CardTitle>
              <CardDescription className="text-base">{lead.excerpt}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">
                Read full story
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <Card key={n.title}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{n.tag}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {new Date(n.date).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                  </span>
                </div>
                <CardTitle className="mt-2 text-lg">{n.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{n.excerpt}</p>
                <Button variant="ghost" size="sm" className="px-0">
                  Read more →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
