# Explanations that don't eat their tail — Intent & Structure

## Core insight

A rigorous explanation builds from lower-level concepts to higher-level ones without cycles. "Lower" doesn't mean simpler or smaller — it means *depended upon*. If you need B to explain A, B is lower than A. Circular explanations sneak the conclusion into the premises. The real test is the "why?" question repeated until you bottom out — if you cycle instead, your explanation is broken, and you probably didn't realize it.

## The arc

1. **Opening demo:** "What's a radius?" "Half a diameter." "What's a diameter?" "Twice a radius." — the trap.
2. **Levels of concepts** — dependency, not grandness.
3. **Why bottom-up works** — each step only uses what's already defined.
4. **The circularity trap** — Molière's dormitive virtue.
5. **The illusion of explanatory depth** — you think you understand until you have to explain.
6. **How to detect a broken explanation** — the repeated-why test.
7. **Top-down is fine as scaffolding** — but it must eventually ground.
8. **The Feynman test** — if you can't explain it simply, you don't understand it yet.

## Best framings from the draft (verbatim)

- **"It feels to me that concepts work very similar to code. You have higher level objects and lower level ones."**
- **"Explanations that only use concepts from a lower level. Meaning, you're deriving something from simpler to more complex, or from more fundamental to more emergent."**
- **The radius/diameter example:** "The radius is half of the diameter and diameter is radius doubled."

## Best framings worth keeping

- **Dormitive virtue (Molière).** "Opium causes sleep because it possesses a dormitive virtue." This is the archetypal broken explanation — giving the phenomenon a fancy name and calling it an answer.
- **Plato's Meno.** Socrates asks what virtue is, and every definition lands on itself.
- **Moon phases.** Well-explained: the moon is half-lit, we see different fractions depending on angle. Badly-explained: "because it's waxing."
- **The refrigerator.** Well-explained: heat pump cycles. Badly-explained: "it's designed to keep food cold."

## Target reader

Someone who teaches, writes, explains, or builds — and has the nagging feeling that some explanations "work" and others don't, without knowing why.

## Structure of the written article

1. **A demo.** Walk the reader into the radius/diameter trap before revealing it.
2. **The hierarchy of concepts is about dependency, not importance.**
3. **The dormitive-virtue mistake.** Fancy names aren't explanations.
4. **Bottom-up from the right level.** You can't always ground in quarks. Pick the right floor.
5. **Top-down is scaffolding.** But it must eventually ground.
6. **The repeated-why test.** How to detect circularity in the wild.
7. **The illusion of explanatory depth.** You know less than you think.
8. **Why this matters.** For teachers, writers, coders.

## Animation ideas

- **Hero: Concept dependency graph with cycles highlighted.** Click a node to see its definition; if the definition forms a cycle back to the clicked node, the cycle edges glow red and a label appears: "this is circular."
- **Optional: Explanation builder.** The user drags concept nodes and draws dependencies. If they try to build an explanation that doesn't ground out in base nodes, the UI rejects it.

Only animate if it earns its place — this post is happy with one strong visual.

## What to cut

- Most of the long AI-written article at the bottom of the draft (verbose, AI clichés).
- Kolmogorov complexity tangent.
- Formal DAG/graph-theory math. Say the intuition; skip the formalism.
- Repetitive "clarity vs accuracy" trade-off discussion.
- The long deductive/inductive/abductive reasoning taxonomy.
- Any "In essence" / "In conclusion" sentences.

## Voice notes

This post risks being dry. Rodrigo's voice should be *playful* — open with a deadpan circular example, walk the reader into the trap, let them laugh at themselves, then pay it off. Very short paragraphs. Concrete examples before abstract claims. The whole thing is 20% shorter than you think it should be.

**Target:** 1,500–1,800 words.
