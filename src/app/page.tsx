"use client";

import { useState, type FormEvent } from "react";

type PlanResult = {
  plan: string[];
  structure: { path: string; purpose: string }[];
  decisions: { topic: string; choice: string; reasoning: string }[];
};

function generateMockPlan(description: string): PlanResult {
  return {
    plan: [
      "Define the input: what the user describes they want to build.",
      "Break the request into build steps, in dependency order.",
      "Draft the file/module structure needed to support those steps.",
      "Surface the key decisions at each fork, with the reasoning behind them.",
      "Let the user walk through and revise the plan before any code is written.",
    ],
    structure: [
      { path: "src/app/page.tsx", purpose: "Entry point where the user describes the build." },
      { path: "src/lib/plan.ts", purpose: "Turns a description into a plan/structure/decisions object." },
      { path: "src/components/PlanView.tsx", purpose: "Renders the plan for review and revision." },
    ],
    decisions: [
      {
        topic: "Where the plan comes from",
        choice: `Mock data for "${description || "your request"}" (no LLM wired up yet)`,
        reasoning: "Lets the input -> plan -> structure -> decisions flow be built and tested before committing to a provider.",
      },
      {
        topic: "Output shape",
        choice: "Three sections: plan, structure, decisions",
        reasoning: "Matches the three things Preflight promises in the README, kept as separate, scannable lists rather than one long document.",
      },
    ],
  };
}

export default function Home() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlanResult | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(generateMockPlan(description.trim()));
      setLoading(false);
    }, 400);
  }

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col gap-10 py-16 px-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
            Preflight
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Understand the build before you build it. Describe what you want to
            build, and get the plan, the structure, and the decisions behind it.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you want to build..."
            rows={4}
            className="w-full rounded-lg border border-black/[.08] bg-white p-4 text-base text-black outline-none focus:border-black/[.2] dark:border-white/[.145] dark:bg-zinc-900 dark:text-zinc-50"
          />
          <button
            type="submit"
            disabled={loading || !description.trim()}
            className="flex h-12 w-full items-center justify-center rounded-full bg-foreground px-5 text-base font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc] sm:w-[200px]"
          >
            {loading ? "Thinking..." : "Get the plan"}
          </button>
        </form>

        {result && (
          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Plan</h2>
              <ol className="flex flex-col gap-2 list-decimal pl-5 text-zinc-700 dark:text-zinc-300">
                {result.plan.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Structure</h2>
              <ul className="flex flex-col gap-2">
                {result.structure.map((item) => (
                  <li key={item.path} className="flex flex-col gap-0.5">
                    <code className="w-fit rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-sm dark:bg-white/[.08]">
                      {item.path}
                    </code>
                    <span className="text-zinc-600 dark:text-zinc-400">{item.purpose}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50">Decisions</h2>
              <ul className="flex flex-col gap-4">
                {result.decisions.map((d) => (
                  <li key={d.topic} className="flex flex-col gap-0.5">
                    <span className="font-medium text-black dark:text-zinc-50">{d.topic}</span>
                    <span className="text-zinc-700 dark:text-zinc-300">{d.choice}</span>
                    <span className="text-sm text-zinc-500 dark:text-zinc-500">{d.reasoning}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}
