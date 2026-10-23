import { useEffect, useState } from "react";
import { Check, Coins, PiggyBank, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { Content } from "@/i18n";
import { sampleBudget } from "@/i18n/shared";

type Labels = Content["casshy"]["dashboard"];
type Tone = keyof Labels["tones"];

// Amounts are stored in cents, like Casshy does, and only formatted for display
const money = (cents: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(cents / 100);

const barColors = ["bg-brand", "bg-success", "bg-sky-500", "bg-warning"];

export default function CasshyDashboard({ labels }: { labels: Labels }) {
  const [tone, setTone] = useState<Tone>("honest");
  const [done, setDone] = useState(() => labels.checklist.map((c) => c.done));
  // Bars grow from zero once the island hydrates (it hydrates when scrolled into view)
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const left = sampleBudget.budget - sampleBudget.spent;
  const stats = [
    { label: labels.stats.budget, value: sampleBudget.budget, Icon: Wallet },
    { label: labels.stats.spent, value: sampleBudget.spent, Icon: Coins },
    { label: labels.stats.left, value: left, Icon: PiggyBank, accent: true },
  ];
  const completed = done.filter(Boolean).length;
  const maxPct = Math.max(...labels.categories.map((c) => c.pct));

  return (
    <figure className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-center gap-1.5 border-b bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">
        <span className="size-2.5 shrink-0 rounded-full bg-[#ff5f57]" aria-hidden="true" />
        <span className="size-2.5 shrink-0 rounded-full bg-[#febc2e]" aria-hidden="true" />
        <span className="size-2.5 shrink-0 rounded-full bg-[#28c840]" aria-hidden="true" />
        <span className="ml-2 min-w-0 truncate">{labels.window}</span>
        <Badge variant="outline" className="ml-auto shrink-0 font-normal">
          {labels.sample}
        </Badge>
      </div>

      <div className="grid gap-4 p-4 sm:p-6">
        <div>
          <p className="text-xl font-semibold tracking-tight">{labels.greeting}</p>
          <p className="text-sm text-muted-foreground">{labels.subtitle}</p>
        </div>

        <Card className="gap-4 border-brand/20 bg-brand-soft/60 p-5">
          <div className="flex items-start gap-4">
            <span
              key={tone}
              className="grid size-12 shrink-0 animate-in place-items-center rounded-full bg-gradient-to-br from-amber-200 to-amber-500 text-amber-950 shadow-sm duration-300 zoom-in-90"
              aria-hidden="true"
            >
              <Coins className="size-6" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold">{labels.mood}</p>
              <p key={tone} className="animate-in text-sm text-pretty text-muted-foreground duration-300 fade-in" aria-live="polite">
                {labels.tones[tone].message}
              </p>
            </div>
          </div>
          <div className="flex w-fit gap-1 rounded-full bg-background/70 p-1" role="group" aria-label={labels.toneLabel}>
            {(Object.keys(labels.tones) as Tone[]).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tone === t}
                onClick={() => setTone(t)}
                className={cn(
                  "cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none",
                  tone === t ? "bg-brand text-white shadow-sm" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {labels.tones[t].label}
              </button>
            ))}
          </div>
        </Card>

        <ul className="grid gap-3 sm:grid-cols-3">
          {stats.map(({ label, value, Icon, accent }) => (
            <li key={label}>
              <Card className="flex-row items-center gap-3 p-4 transition-shadow hover:shadow-md">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted" aria-hidden="true">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className={cn("text-lg font-semibold tabular-nums", accent && "text-success")}>{money(value)}</p>
                </div>
              </Card>
            </li>
          ))}
        </ul>

        <div className="grid gap-3 md:grid-cols-2">
          <Card className="gap-4 py-5">
            <CardHeader className="flex-row items-baseline justify-between px-5">
              <CardTitle className="text-sm">{labels.spendingTitle}</CardTitle>
              <span className="text-xs text-muted-foreground">{labels.spendingPeriod}</span>
            </CardHeader>
            <CardContent className="px-5">
              <ul className="space-y-3">
                {labels.categories.map((c, i) => (
                  <li key={c.name} className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                    <span className="truncate">{c.name}</span>
                    <span className="h-2 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                      <span
                        className={cn("block h-full rounded-full transition-[width] duration-1000 ease-out", barColors[i % barColors.length])}
                        style={{ width: filled ? `${(c.pct / maxPct) * 100}%` : "0%", transitionDelay: `${i * 120}ms` }}
                      />
                    </span>
                    <span className="text-right text-muted-foreground tabular-nums">{c.pct}%</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="gap-4 py-5">
            <CardHeader className="px-5">
              <CardTitle className="text-sm">{labels.checklistTitle}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-5">
              <ul className="space-y-1">
                {labels.checklist.map((c, i) => (
                  <li key={c.label}>
                    <button
                      type="button"
                      aria-pressed={done[i]}
                      onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                      className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                    >
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                          done[i] ? "border-success bg-success text-white" : "border-muted-foreground/40",
                        )}
                        aria-hidden="true"
                      >
                        {done[i] && <Check className="size-3 animate-in zoom-in-50" />}
                      </span>
                      <span className={cn(done[i] && "text-muted-foreground line-through")}>{c.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="space-y-1.5 px-2">
                <Progress value={(completed / done.length) * 100} className="h-1.5 bg-muted [&>[data-slot=progress-indicator]]:bg-success" />
                <p className="text-xs text-muted-foreground">
                  {completed}/{done.length} {labels.progressLabel}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </figure>
  );
}
