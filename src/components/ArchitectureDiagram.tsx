import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from "react";
import { Archive, Database, KeyRound, Monitor, Server } from "lucide-react";
import type { Content } from "@/i18n";

type Labels = Content["projects"]["diagram"];
type Ref = RefObject<HTMLSpanElement | null>;

function Node({ nodeRef, icon, label, caption, row }: { nodeRef: Ref; icon: ReactNode; label: string; caption?: string; row?: boolean }) {
  return (
    <div className={row ? "flex items-center gap-2" : "flex flex-col items-center gap-1.5"}>
      <span ref={nodeRef} className="relative grid size-9 place-items-center rounded-lg border bg-card text-foreground shadow-xs [&_svg]:size-4">
        {icon}
      </span>
      <span className={row ? "text-[11px] font-medium" : "text-center text-[11px] leading-tight font-medium"}>
        {label}
        {caption && <span className="block font-mono text-[10px] font-normal text-muted-foreground">{caption}</span>}
      </span>
    </div>
  );
}

/**
 * Fragments architecture with light pulses traveling along each connection.
 * The path math is adapted from Magic UI's AnimatedBeam (MIT); the pulse is a CSS animation (.beam-pulse).
 */
export default function ArchitectureDiagram({ labels }: { labels: Labels }) {
  const box = useRef<HTMLDivElement>(null);
  const ui: Ref = useRef(null);
  const api: Ref = useRef(null);
  const auth: Ref = useRef(null);
  const data: Ref = useRef(null);
  const meta: Ref = useRef(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [paths, setPaths] = useState<{ d: string; delay: number }[]>([]);
  // Pulses repaint every frame, so they only run while the diagram is on screen
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const edges: [Ref, Ref, number][] = [
      [ui, api, 0],
      [api, auth, 0.9],
      [api, data, 1],
      [api, meta, 1.1],
    ];
    const update = () => {
      const c = box.current?.getBoundingClientRect();
      if (!c) return;
      setSize({ w: c.width, h: c.height });
      setPaths(
        edges.flatMap(([from, to, delay]) => {
          const a = from.current?.getBoundingClientRect();
          const b = to.current?.getBoundingClientRect();
          if (!a || !b) return [];
          // From the right side of one node to the left side of the next, as a smooth S-curve
          const [x1, y1] = [a.right - c.left, a.top + a.height / 2 - c.top];
          const [x2, y2] = [b.left - c.left, b.top + b.height / 2 - c.top];
          const mx = (x1 + x2) / 2;
          return [{ d: `M ${x1},${y1} C ${mx},${y1} ${mx},${y2} ${x2},${y2}`, delay }];
        }),
      );
    };
    const resize = new ResizeObserver(update);
    const visibility = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    if (box.current) {
      resize.observe(box.current);
      visibility.observe(box.current);
    }
    update();
    return () => {
      resize.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <figure
      ref={box}
      role="img"
      aria-label={labels.alt}
      data-active={onScreen || undefined}
      className="relative flex items-center justify-between gap-6 rounded-lg border bg-muted/40 px-4 py-4"
    >
      <svg className="pointer-events-none absolute inset-0" width={size.w} height={size.h} aria-hidden="true">
        {paths.map(({ d, delay }) => (
          <g key={d}>
            <path className="beam-path" d={d} pathLength={100} />
            <path className="beam-pulse" d={d} pathLength={100} style={{ "--delay": `${delay}s` } as CSSProperties} />
          </g>
        ))}
      </svg>
      <Node nodeRef={ui} icon={<Monitor />} label={labels.ui} />
      <Node nodeRef={api} icon={<Server />} label={labels.api} caption="Docker · ECS" />
      <div className="flex flex-col gap-2.5">
        <Node row nodeRef={auth} icon={<KeyRound />} label="Cognito" />
        <Node row nodeRef={data} icon={<Archive />} label="S3" />
        <Node row nodeRef={meta} icon={<Database />} label="DynamoDB" />
      </div>
    </figure>
  );
}
