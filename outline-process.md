# Outline process — the step before drafting

Two prep steps before writing prose. Sequential. Don't merge them, don't skip them, don't jump straight to the article.

The two-step prep — **extract wows**, then **build the outline** — makes you do structural thinking before sentence-level thinking. Each step has its own discipline. Each step requires explicit user approval before moving on.

This document is the rule-set. It exists because the failure mode of turning raw source material (a chat log, a conversation, a notebook) into a blog post is rushing into prose. You end up with a paraphrased transcript or a forced template. The two steps fix that.

---

## Step 1 — Extract the wow moments

A **wow moment** is the instant where the reader's mental model shifts. Not "interesting fact". Not "clever analogy". Not "important mechanism". A *shift*.

### Test for each candidate

Ask: did this *change how the reader thinks*, or did it just *explain* something they already half-knew?

Only the first kind is a wow.

### What is NOT a wow (it's scaffolding for later)

- **Mechanisms** — the *how* behind a wow. "Bekenstein derived this from thermodynamics" is mechanism, not wow. The wow is the conclusion ("info caps at area"); the derivation belongs in the outline phase.
- **Analogies** — illustrations that help a wow land. They serve a wow; they aren't one. A great analogy still doesn't change the model on its own.
- **Technical details** — math, history, names. They support a wow; they aren't independent shifts.
- **Caveats and disclaimers** — they qualify a wow without shifting any model.
- **Restatements** — the same wow in different words. Collapse them aggressively.

### Output

A numbered list. Each wow in 1-2 sentences. No scaffolding, no caveats.

### Discipline

- **Be strict.** Fourteen candidate wows? You probably have six real ones and eight pieces of scaffolding pretending. Cut.
- **Stop after step 1.** Show the user the wow list. Wait for approval before step 2.
- **Don't import wows.** If the wow isn't in the source, don't add it to "round out" the post. The source is the only legitimate origin. Your training data is not the source.
- **Each wow stands alone.** If you need three sentences and a paragraph of context to state a wow, it's not a wow yet — it's a scaffolded conclusion. Find the actual shift inside it.

---

## Step 2 — Build the outline

After the wows are approved, build the outline that will deliver them.

### Output

**One line per beat.** The whole outline must be reviewable in a single pass — by the user, in one glance.

If a beat takes more than ~5 seconds to read, compress it. If you can't compress it, the beat is doing too many things; split it.

### Beats are not only wows

The outline contains **wows** (moments of shift) and **bridges** (everything that earns and connects them). Both count as beats.

Bridges include:
- The opening scene
- The natural question
- The setup of the wrong intuition
- The locking move that commits the reader
- Transitions between sections
- Disclaimers
- The closing image

Each bridge must do real narrative work. Filler bridges get cut. A bridge that just says "now we move on to..." is filler.

### Wow 1 must be earned

The rule violated most often: **the first wow should land at roughly the middle of the article, not in the first third.**

Why: the first wow is usually the most important. It deserves the most buildup. Place it early and you waste your strongest moment on an unprepared reader. Worse: the remaining wows have nothing to build on top of, so they fall flat too.

A good rule of thumb: count beats. If wow 1 is at beat 3 of 11, that's wrong. If wow 1 is at beat 8 of 16, that's right.

### What the buildup before wow 1 looks like

Typical buildup walks the reader through:
1. A concrete scene (felt presence — the reader is *somewhere*, not abstract)
2. A natural question the scene provokes (not one you imposed)
3. A contextual anchor (why this question matters, who has asked it before)
4. The intuitive answer (what the reader would guess)
5. A locking move that commits the reader to the wrong answer
6. A signaled break ("but here's where it cracks")
7. Wow 1

You don't need exactly these beats. But you need *something* doing this work. A buildup that just says "let me tell you a fact" doesn't earn any surprise.

### Subsequent wows chain

After wow 1, wows can come faster. Each one builds on the previous.

A good post stacks wows like dominos: the first one needs a long shove, the rest fall on each other. The chain is the reward for the buildup.

### Don't manufacture pain

The "pain before medicine" pattern from writing-style.md is real, but pain has to be **real**, not fabricated.

Real pain comes from:
- A felt experience the reader has had
- A confusion the reader actually encountered
- The source material itself

Fake pain is:
- A textbook strawman the reader never read
- A complaint imported from training data
- A "common misconception" you can't actually point at
- A problem invented just so you can solve it

If you can't point to where the pain came from, cut the pain section. Better no pain than fake pain — readers smell fake.

---

## Process discipline

- Step 1 stops at the wow list. Don't sketch the outline yet.
- Step 2 stops at the outline. Don't write prose yet.
- Each step gets explicit user approval before moving on.
- If the wow list is wrong, fix the wow list before touching the outline.
- If the outline is structurally wrong, fix the outline before touching the prose.
- The outline is the structural contract. Time spent on it saves time later.
- Don't combine steps "to save time" — combining is what creates the failures this document exists to prevent.

---

## Anti-patterns

These come from real mistakes. Read them before each new post.

1. **Jumping straight to prose.** Skipping the two prep steps. Result: paraphrased transcript with paragraph breaks instead of a curated arc. The post reads like the conversation it came from, not like an article.

2. **Scaffolding listed as wows.** Analogies, mechanisms, technical details on the wow list. Result: real wows get diluted, the post commits to delivering things that aren't actually shifts, and the reader feels under-rewarded.

3. **Wow 1 in the first third.** Main insight placed too early. Result: rest of the post has nothing to build toward, and the reader wasn't ready when the surprise came. The strongest moment is wasted.

4. **Manufactured pain.** Strawman invented to satisfy the "pain before medicine" template. Symptom: you can't say where the pain comes from when asked. Result: the reader smells the dishonesty and the rest of the article loses trust.

5. **Long outline beats.** Each beat as a paragraph instead of one line. Result: the user can't review the structure at a glance and disengages. The user has to read three paragraphs to evaluate one structural decision.

6. **Outline as wow-only list.** Forgetting that bridges, openings, closings are beats too. Result: list of insights with nothing connecting them. The post jumps from peak to peak with no path between.

7. **Skipping the user.** Building the whole outline alone and showing it as a fait accompli. Result: the user wanted to validate each step (extract → review wows → build outline → review outline → write), not be handed a finished structure they then have to dismantle to give feedback on.

8. **Defending instead of revising.** When the user pushes back on a wow or a beat, the temptation is to justify why it belongs. Don't. Re-read the feedback, ask why it was raised, revise. Defense is a tell that you weren't listening.
