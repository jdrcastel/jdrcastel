import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Skill } from "@/i18n/shared";

export type SkillGroup = { id: string; icon: string; title: string; skills: Skill[] };
export type LearningCard = { id: string; icon: string; title: string; summary: string; applying: string; items: string[] };

type Props = {
  groups: SkillGroup[];
  learning: LearningCard[];
  labels: { tabSkills: string; tabLearning: string; legendCore: string; legendUsed: string; applyingLabel: string };
};

const Icon = ({ children }: { children: string }) => (
  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-lg" aria-hidden="true">
    {children}
  </span>
);

export default function SkillsTabs({ groups, learning, labels }: Props) {
  return (
    <Tabs defaultValue="skills" className="gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList>
          <TabsTrigger value="skills">{labels.tabSkills}</TabsTrigger>
          <TabsTrigger value="learning">🌱 {labels.tabLearning}</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Badge className="font-mono font-normal">Aa</Badge> {labels.legendCore}
          </span>
          <span className="flex items-center gap-1.5">
            <Badge variant="outline" className="font-mono font-normal">Aa</Badge> {labels.legendUsed}
          </span>
        </div>
      </div>

      <TabsContent value="skills">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <li key={g.id}>
              <Card className="h-full gap-4 py-5">
                <CardHeader className="flex-row items-center gap-3 px-5">
                  <Icon>{g.icon}</Icon>
                  <CardTitle>{g.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-5">
                  <ul className="flex flex-wrap gap-1.5">
                    {g.skills.map((s) => (
                      <li key={s.name}>
                        <Badge variant={s.core ? "default" : "outline"} className="font-mono font-normal">
                          {s.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </TabsContent>

      <TabsContent value="learning">
        <ul className="grid gap-4 md:grid-cols-2">
          {learning.map((l) => (
            <li key={l.id}>
              <Card className="h-full gap-4 py-5">
                <CardHeader className="flex-row items-center gap-3 px-5">
                  <Icon>{l.icon}</Icon>
                  <CardTitle>{l.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4 px-5">
                  <p className="text-sm text-muted-foreground">{l.summary}</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {l.items.map((item) => (
                      <li key={item}>
                        <Badge variant="outline" className="border-dashed font-mono font-normal">
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <p className="border-t pt-3 text-sm">
                    <span className="block text-xs font-medium tracking-wide text-brand uppercase">
                      {labels.applyingLabel}
                    </span>
                    {l.applying}
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </TabsContent>
    </Tabs>
  );
}
