import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — Polar Learning Modules & Quizzes" },
      {
        name: "description",
        content:
          "Student-friendly polar science: learning modules, quizzes, expedition timelines and simplified explainers.",
      },
      { property: "og:title", content: "Polar Education — Modules, Quizzes & Timelines" },
      {
        property: "og:description",
        content: "Learn how polar research works, from sea ice to ice cores.",
      },
    ],
  }),
  component: EducationPage,
});

const modules = [
  { title: "Introduction to the cryosphere", level: "School", lessons: 6, progress: 0 },
  { title: "Reading weather data", level: "School", lessons: 5, progress: 0 },
  { title: "Glaciers and mass balance", level: "Undergraduate", lessons: 8, progress: 0 },
  { title: "Ocean circulation & carbon", level: "Undergraduate", lessons: 7, progress: 0 },
];

const quiz = [
  {
    q: "Which Indian station is located in the Arctic?",
    options: ["Maitri", "Himadri", "Bharati", "Himansh"],
    answer: 1,
  },
  {
    q: "What does an ice core mainly preserve?",
    options: ["Ancient air bubbles", "Fossil fish", "Volcanic lava", "Sea salt crystals only"],
    answer: 0,
  },
  {
    q: "Mass balance of a glacier compares…",
    options: ["Height and width", "Snow gained and ice lost", "Salt and fresh water", "Wind and pressure"],
    answer: 1,
  },
];

const timeline = [
  { year: "1981", text: "First Indian Scientific Expedition to Antarctica." },
  { year: "1989", text: "Maitri station commissioned in the Schirmacher Oasis." },
  { year: "2008", text: "Himadri opens at Ny-Ålesund, Svalbard." },
  { year: "2012", text: "Bharati station inaugurated at Larsemann Hills." },
  { year: "2016", text: "Himansh high-altitude glaciology laboratory established." },
  { year: "2026", text: "43rd expedition and open polar data repository launched." },
];

function EducationPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const score = quiz.filter((q, i) => answers[i] === q.answer).length;

  return (
    <>
      <PageHeader
        eyebrow="Learning"
        title="Polar education hub"
        description="Modules, quizzes, timelines and plain-language explainers for students, teachers and curious readers."
      />

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Learning modules</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <Card key={m.title}>
              <CardHeader>
                <GraduationCap className="size-6 text-primary" />
                <CardTitle className="mt-2 text-base">{m.title}</CardTitle>
                <CardDescription>
                  {m.level} • {m.lessons} lessons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={m.progress} />
                <Button variant="outline" size="sm" className="w-full">
                  Start module
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-semibold">Quick quiz</h2>
              <div className="mt-6 space-y-6">
                {quiz.map((q, qi) => (
                  <Card key={q.q}>
                    <CardHeader>
                      <CardTitle className="text-base">
                        {qi + 1}. {q.q}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-2 sm:grid-cols-2">
                      {q.options.map((o, oi) => {
                        const selected = answers[qi] === oi;
                        const correct = submitted && oi === q.answer;
                        return (
                          <Button
                            key={o}
                            variant={correct ? "default" : selected ? "secondary" : "outline"}
                            size="sm"
                            className="justify-start"
                            onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                          >
                            {o}
                          </Button>
                        );
                      })}
                    </CardContent>
                  </Card>
                ))}
                <div className="flex items-center gap-3">
                  <Button onClick={() => setSubmitted(true)}>Check answers</Button>
                  {submitted && (
                    <Badge variant="secondary">
                      Score: {score} / {quiz.length}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold">Expedition timeline</h2>
              <ol className="mt-6 space-y-4 border-l border-border pl-6">
                {timeline.map((t) => (
                  <li key={t.year} className="relative">
                    <span className="absolute -left-[31px] top-1 size-3 rounded-full bg-primary" />
                    <p className="text-sm font-semibold">{t.year}</p>
                    <p className="text-sm text-muted-foreground">{t.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold">Simplified explainers</h2>
        <Accordion type="single" collapsible className="mt-4">
          {[
            {
              q: "Why do scientists study the poles?",
              a: "The poles respond fastest to a warming climate. Changes in ice, ocean and atmosphere there shape sea level, monsoon patterns and weather far away from them.",
            },
            {
              q: "What is sea ice, and how is it different from an iceberg?",
              a: "Sea ice is frozen seawater floating on the ocean surface. Icebergs break off from glaciers and ice shelves, which are made of compressed snow from land.",
            },
            {
              q: "How does India work in Antarctica?",
              a: "Under the Antarctic Treaty, India runs peaceful research stations. Teams travel each summer, and small crews stay through winter to keep instruments running.",
            },
          ].map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <BookOpen className="size-4 text-primary" /> {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
