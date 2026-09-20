# Preflight

Understand the build before you build it.

Most AI coding tools turn a prompt straight into an implementation, and you are
left with code you never followed. Preflight is the step before the IDE: it walks
you through the flow — the plan, the structure, the decisions and why they were
made — so that by the time you open your editor, you already understand what you
are building.

## The problem

Generated code arrives finished. You get files, folders and wiring all at once,
with no record of the thinking that produced them. That is fine until something
breaks, a reviewer asks why, or you need to extend it — and then you are reading
your own project like a stranger.

The usual fixes do not help much. Reading the diff afterwards shows you what was
written, not what was considered and rejected. Asking the model to explain gives
you a description of the code in front of you, reconstructed after the fact.
Neither tells you where the real decisions were.

## What Preflight does

Preflight sits before the implementation, not after it. You describe what you
want to build, and instead of producing code, it produces the build:

- **The plan** — what gets built, in what order, and what each step depends on.
- **The structure** — the files and modules that will exist, and what each one
  is responsible for.
- **The decisions** — the forks in the road, the options at each one, and the
  reasoning behind the choice.

You move through it, disagree with it, and change it while changing it is still
cheap. What you carry into the editor is a build you have already followed.

## Who it is for

- Developers using AI to build faster, who still want to own what ships.
- People learning by building, for whom the reasoning is the point.
- Anyone who has inherited a codebase from their own past prompt.

## What it is not

Not an IDE, not an agent that writes your code, and not a documentation
generator that explains code after it exists. Preflight ends where your editor
begins.

## Status

Concept stage. Nothing implemented yet. The idea is being shaped in the open —
the problem above is settled, the shape of the output is not.
