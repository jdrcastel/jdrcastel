import { useState } from "react";
import { AnimatePresence, LazyMotion, MotionConfig } from "motion/react";
import * as m from "motion/react-m";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Content, ProjectStatus } from "@/i18n";
import type { ProjectMeta } from "@/i18n/shared";
import ArchitectureDiagram from "./ArchitectureDiagram";

type ProjectsContent = Content["projects"];
export type Labels = Pick<ProjectsContent, "title" | "filters" | "status" | "learnMore" | "stackLabel" | "links" | "diagram">;
type Filter = keyof Labels["filters"];
export type Project = ProjectsContent["items"][number] & ProjectMeta;

const statusStyle: Record<ProjectStatus, string> = {
  progress: "bg-warning/15 text-warning",
  use: "bg-success/15 text-success",
  shipped: "bg-success/15 text-success",
};

// Motion's layout features download after the first render
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);
const ease = [0.2, 0.7, 0.2, 1] as const;

function ProjectCard({ p, labels }: { p: Project; labels: Labels }) {
  return (
    <Card className={cn("lift spotlight relative h-full", p.featured && "border-brand/40")}>
      {p.featured && <span className="beam" aria-hidden="true" />}
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-snug font-semibold">{p.title}</h3>
          <Badge variant="secondary" className={cn("shrink-0", statusStyle[p.status])}>
            {labels.status[p.status]}
          </Badge>
        </div>
        <p className="text-sm text-pretty text-muted-foreground">{p.summary}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3">
        {p.id === "fragments" && <ArchitectureDiagram labels={labels.diagram} />}
        <ul className="flex flex-wrap gap-1.5" aria-label={labels.stackLabel}>
          {p.stack.map((s) => (
            <li key={s.name}>
              <Badge variant={s.core ? "default" : "outline"} className="font-mono font-normal">
                {s.name}
              </Badge>
            </li>
          ))}
        </ul>
        <Accordion type="single" collapsible className="mt-auto">
          <AccordionItem value="more" className="border-t border-b-0">
            <AccordionTrigger className="py-3">{labels.learnMore}</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      {p.links.length > 0 && (
        <CardFooter className="flex flex-wrap gap-2">
          {p.links.map((l) => {
            const external = l.href.startsWith("http");
            return (
              <Button key={l.key} variant="link" size="sm" className="h-auto px-0" asChild>
                <a href={l.href} {...(external ? { target: "_blank", rel: "noopener" } : {})}>
                  {labels.links[l.key]}
                  {external ? <ArrowUpRight aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
                </a>
              </Button>
            );
          })}
        </CardFooter>
      )}
    </Card>
  );
}

export default function ProjectsGrid({ projects, labels }: { projects: Project[]; labels: Labels }) {
  const [filter, setFilter] = useState<Filter>("all");
  // "All" shows everything; web extensions also have their own filter
  const visible = projects.filter((p) => {
    if (filter === "all") return true;
    if (filter === "extensions") return p.group === "extension";
    return !p.group && p.tags.some((tag) => tag === filter);
  });

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label={labels.title}>
            {(Object.keys(labels.filters) as Filter[]).map((f) => {
              const active = filter === f;
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "relative isolate rounded-full",
                    active &&
                      "border-transparent bg-transparent text-primary-foreground shadow-none hover:bg-transparent hover:text-primary-foreground dark:border-transparent dark:bg-transparent dark:hover:bg-transparent",
                  )}
                >
                  {/* One pill shared by all filters: it slides to the active one */}
                  {active && (
                    <m.span
                      layoutId="active-filter"
                      className="absolute inset-0 -z-10 rounded-full bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  {labels.filters[f]}
                </button>
              );
            })}
          </div>
          <ul className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p) => (
                <m.li
                  key={p.id}
                  layout="position"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease }}
                  className={cn(p.featured && "md:col-span-2 lg:col-span-3")}
                >
                  <ProjectCard p={p} labels={labels} />
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </LazyMotion>
    </MotionConfig>
  );
}
