import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { Content } from "@/i18n";

type Labels = Content["experience"];

const kindStyle: Record<string, string> = {
  work: "bg-brand-soft text-brand",
  internship: "bg-brand-soft text-brand",
  certification: "bg-warning/15 text-warning",
  education: "bg-success/15 text-success",
  volunteer: "",
};

export default function ExperienceList({ labels }: { labels: Labels }) {
  return (
    <ol className="relative flex flex-col gap-8 border-l pl-6">
      {labels.items.map((x) => {
        const [first, ...rest] = x.bullets;
        return (
          <li key={`${x.org}-${x.role}`} className="relative">
            <span
              className="absolute top-1.5 -left-[31px] size-3 rounded-full border-2 border-brand bg-background"
              aria-hidden="true"
            />
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Badge variant="secondary" className={kindStyle[x.kind]}>
                {labels.kinds[x.kind as keyof Labels["kinds"]]}
              </Badge>
              <span className="font-mono">{x.when}</span>
            </div>
            <h3 className="mt-2 text-lg font-semibold">{x.role}</h3>
            <p className="text-sm font-medium text-muted-foreground">{x.org}</p>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">{first}</p>
            {rest.length > 0 && (
              <Accordion type="single" collapsible>
                <AccordionItem value="more" className="border-b-0">
                  <AccordionTrigger className="py-2 text-sm">{labels.more}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                      {rest.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </li>
        );
      })}
    </ol>
  );
}
