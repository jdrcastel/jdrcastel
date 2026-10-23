import { useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Content, ProjectStatus } from "@/i18n";
import type { ProjectMeta } from "@/i18n/shared";

type ProjectsContent = Content["projects"];
export type Labels = Pick<
  ProjectsContent,
  "title" | "filters" | "status" | "learnMore" | "stackLabel" | "links" | "extensionsTitle"
>;
type Filter = keyof Labels["filters"];
export type Project = ProjectsContent["items"][number] & ProjectMeta;

const statusStyle: Record<ProjectStatus, string> = {
  progress: "bg-warning/15 text-warning",
  use: "bg-success/15 text-success",
  shipped: "bg-success/15 text-success",
};

function ProjectCard({ p, labels }: { p: Project; labels: Labels }) {
  return (
    <Card className={cn("lift h-full", p.featured && "border-brand/40 md:col-span-2")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg leading-snug font-semibold">{p.title}</h3>
          <Badge variant="secondary" className={cn("shrink-0", statusStyle[p.status])}>
            {labels.status[p.status]}
          </Badge>
        </div>
        <p className="text-sm text-pretty text-muted-foreground">{p.summary}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <ul className="flex flex-wrap gap-1.5" aria-label={labels.stackLabel}>
          {p.stack.map((s) => (
            <li key={s.name}>
              <Badge variant={s.core ? "default" : "outline"} className="font-mono font-normal">
                {s.name}
              </Badge>
            </li>
          ))}
        </ul>
        <Accordion type="single" collapsible>
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
      <CardFooter className="mt-auto flex flex-wrap gap-2">
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
    </Card>
  );
}

export default function ProjectsGrid({ projects, labels }: { projects: Project[]; labels: Labels }) {
  const [filter, setFilter] = useState<Filter>("all");
  const main = projects.filter((p) => !p.group);
  const extensions = projects.filter((p) => p.group === "extension");
  const visible = main.filter((p) => filter === "all" || p.tags.some((tag) => tag === filter));

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label={labels.title}>
          {(Object.keys(labels.filters) as Filter[]).map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              className="rounded-full"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {labels.filters[f]}
            </Button>
          ))}
        </div>
        <div className="grid items-start gap-4 md:grid-cols-2">
          {visible.map((p) => (
            <ProjectCard key={p.id} p={p} labels={labels} />
          ))}
        </div>
      </div>

      {extensions.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-xs font-medium tracking-wider text-muted-foreground uppercase">
            {labels.extensionsTitle}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {extensions.map((p) => (
              <ProjectCard key={p.id} p={p} labels={labels} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
