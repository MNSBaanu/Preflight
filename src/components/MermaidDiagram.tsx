"use client";

import { useEffect, useId, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: false, theme: "neutral" });

export default function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
      if (!cancelled) setSvg(svg);
    });
    return () => {
      cancelled = true;
    };
  }, [id, chart]);

  if (!svg) return null;

  return (
    <div
      className="overflow-x-auto rounded-lg border border-black/[.08] bg-white p-4 dark:border-white/[.145] dark:bg-zinc-900"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
