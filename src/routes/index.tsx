import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Database, GraduationCap, Map, Mountain, Newspaper, Ship, Snowflake, Waves } from "lucide-react";
import heroImage from "@/assets/polar-hero.jpg";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { stations, newsItems } from "@/lib/portal-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Discover India's Polar Science — NCPOR Portal" },
      {
        name: "description",
        content:
          "Real-time data, expedition archives and outreach from Maitri, Bharati, Himadri, Himansh and Southern Ocean expeditions.",
      },
      { property: "og:title", content: "Discover India's Polar Science — NCPOR Portal" },
      {
        property: "og:description",
        content: "Real-time data • Expedition archives • Outreach from India's polar research stations.",
      },
    ],
  }),
  component: Home,
});

const quickLinks = [
  { to: "/datasets", icon: Database, title: "Datasets", text: "Station-wise observations with CSV, JSON and NetCDF downloads." },
  { to: "/visualization", icon: Map, title: "Visualization", text: "Interactive station map, dashboards and natural-language search." },
  { to: "/education", icon: GraduationCap, title: "Education", text: "Quizzes, learning modules and student-friendly explainers." },
  { to: "/news", icon: Newspaper, title: "News", text: "Expedition updates, workshops and conference announcements." },
] as const;

const stationIcons: Record<string, typeof Snowflake> = {
  maitri: Snowflake,
  bharati: Waves,
  himadri: Mountain,
  himansh: Mountain,
  "southern-ocean": Ship,
};

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Indian polar research station on an Antarctic ice shelf under an aurora"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-deep/75" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 text-deep-foreground sm:py-32">
          <Badge variant="secondary" className="mb-6 animate-fade-in">National Centre for Polar and Ocean Research</Badge>
          <h1 className="max-w-4xl animate-fade-in text-3xl font-semibold sm:text-5xl">
            Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal
          </h1>
          <p className="mt-5 max-w-2xl text-base opacity-90 sm:text-lg">
            Discover India's Polar Science – Real-time Data • Expedition Archives • Outreach
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/datasets">Explore datasets <ArrowRight className="size-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link to="/outreach">Expedition stories</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">Featured datasets</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Observation records from Indian research stations across the poles and the third pole.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/datasets">View all datasets</Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stations.map((station, i) => {
            const StationIcon = stationIcons[station.slug] ?? Snowflake;
            return (
              <Reveal key={station.slug} delay={i * 80}>
                <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-polar">
                  <div className="h-1.5 bg-polar" />
                  <CardHeader>
                    <span className="mb-2 flex size-10 items-center justify-center rounded-md bg-ice text-ice-foreground">
                      <StationIcon className="size-5" />
                    </span>
                    <CardTitle className="flex items-center justify-between gap-2 text-lg">
                      {station.name}
                      <Badge variant="outline">{station.established}</Badge>
                    </CardTitle>
                    <CardDescription>{station.region}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{station.blurb}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {station.parameters.slice(0, 3).map((p) => (
                        <Badge key={p} variant="secondary" className="font-normal">{p}</Badge>
                      ))}
                    </div>
                    <Button asChild variant="link" className="px-0">
                      <Link to="/datasets" hash={station.slug}>Open station data</Link>
                    </Button>
                  </CardContent>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="bg-icefield py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Across the portal</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {quickLinks.map(({ to, icon: Icon, title, text }) => (
              <Link key={to} to={to} className="group">
                <Card className="h-full transition-shadow group-hover:shadow-polar">
                  <CardHeader>
                    <span className="flex size-10 items-center justify-center rounded-md bg-ice text-ice-foreground">
                      <Icon className="size-5" />
                    </span>
                    <CardTitle className="mt-3 text-base">{title}</CardTitle>
                    <CardDescription>{text}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-2xl font-semibold sm:text-3xl">Latest from the field</h2>
          <Button asChild variant="outline"><Link to="/news">All updates</Link></Button>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {newsItems.slice(0, 3).map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">{item.tag}</Badge>
                <CardTitle className="mt-2 text-base">{item.title}</CardTitle>
                <CardDescription>{new Date(item.date).toDateString()}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
