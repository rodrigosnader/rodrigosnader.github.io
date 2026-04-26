# Writing a great blog post — comprehensive guide

This is the consolidated guide for writing blog posts in this repo. Every rule traces back to a concrete mistake caught and fixed during live revisions. The goal is for Claude to produce a post, *in one shot*, that Rodrigo is extremely satisfied with from the first read.

---

## How I like a blog post to feel

This is an informal blog that expresses ideas. It's not trying to convince the reader of anything. It's not performing expertise. It's a person saying "here's what I've been thinking about, here's what I found, here's what I'm not sure about." The tone is closer to a conversation than a presentation.

A post is a vehicle for one insight — the single thing a reader should still remember a week later. Everything in the piece serves that one idea. Anything that doesn't carry it is weight. Before I start writing, I should already know the insight in one sentence. If I can't name it, I'm not ready.

The voice is conversational, first-person, and honest. I want a real person thinking out loud, not a textbook explaining from above. Humility is a recurring beat — it's okay, even expected, to say "I didn't get it at first" or "I had to argue with myself until this clicked." Humility doesn't weaken an argument; it's what makes the reader trust it. Borrowed authority is the opposite of this — sentences like "most experts say" or "every textbook gets this wrong" smuggle claims past scrutiny without owning them. I don't do that. If I haven't measured it myself, I don't claim it.

Even at the wow moments — the point where the insight lands — the tone stays tentative. "It seems like what the experiment is saying is..." or "what the universe might be telling us is..." — never "this is what it means" or "the answer is." I'm sharing something I find compelling, not handing down a verdict. Certainty is for textbooks; this blog is for thinking out loud.

The reader is smart and knows the basics of the domain. I don't build "interference pattern" or "prior" from absolute zero — if someone clicked on a post about quantum mechanics, they've heard of the double-slit experiment. What I don't assume is that they remember the details, the math, or the subtle points. Jargon is a tool, not a badge — but basic vocabulary doesn't need a definition.

I open with something concrete — a situation, a scene, a question. Sometimes the reader is the protagonist ("You just tested positive"); sometimes it's me thinking out loud ("I spent an afternoon arguing with an LLM about this"); sometimes it's the thing itself ("The double slit goes like this"). All three work. What doesn't work is an abstract thesis statement, a textbook opening, or a dramatic buildup for something the reader already knows. If the reader clicked on a quantum post, they know what the double slit is — don't dress it up as a reveal. Recap it neutrally and move on to the part that's actually new. Save the energy for the genuinely surprising thing.

I lead with pain, not with claim. Before I critique an approach, the reader has to have *felt* why it's broken. Before I offer a solution, the reader has to want one. Proof comes before blame. An argument built without a felt problem is posturing.

The core insight — the moment where the reader goes "oh" — gets visual weight. But even here, the tone is tentative: "it seems like...", "what this might mean is...", "I think what the experiment is saying is...". The insight lands harder when it's offered as something I find compelling, not as a verdict I'm delivering. When I highlight it, every word in that highlight points to something concrete the reader already has. Abstractions at the climax are confusion dressed as depth. Immediately after the climax, I unpack. The reader who just received an insight wants it made real, not compared to bad alternatives or explained through more metaphors.

Whatever framing I introduce, the rest of the post honors it. If I promise a question as the core, I actually answer that question — I don't silently pivot to a different approach that happens to reach the same result. The post is one argument; the parts agree.

I narrate weird numbers instead of hiding them. If the math produces a fractional count or an odd rate, I acknowledge the strangeness in plain language and move on. I never round away precision to make the piece feel cleaner, and I never rescale the scenario to avoid an ugly number. Honesty about the math is part of honesty about the voice.

I mark hypotheticals as hypotheticals. Information the reader wouldn't plausibly have is framed as a thought experiment, not as something I'm pretending they already know.

I compress ruthlessly. Every sentence earns its place or gets cut. Triads of parallel items usually collapse to two. Metaphors appear once and only once per passage. Vague nouns and loose verbs are placeholders — I replace them with specifics or delete them. Redundant negations that preempt objections nobody raised are signature model-smell; I avoid them.

I don't speak from a pulpit. "Obviously", "clearly", "it's exactly this" are the words of someone explaining to a student. I want the voice of someone figuring it out alongside the reader. Learning is gradual; the prose sounds like it.

Figures exist to deliver one specific insight each, in the article's own vocabulary. They don't speak in jargon the prose has avoided. They don't decorate — they land a point that prose alone can't. If a figure doesn't land that point, it's wrong or missing.

Everything is a coherent system. An edit to one paragraph can break a reference five paragraphs later. Before I change anything significant, I re-read the whole post. After I change anything significant, I re-read the whole post. The unit I'm optimizing is the entire piece, not any single sentence.

Concrete, honest, humble, compressed, coherent — the reader as protagonist, the insight as north star. When those hold, the piece lands on the first read. That's the bar.

---

## The prime directive

**Every post exists to move one specific insight into the reader's head.** If you don't know the insight, don't write. If a paragraph isn't either delivering the insight, preparing for it, or removing an obstacle to it, cut the paragraph.

Everything below is in service of this.

---

## Part 1 — Before you write a single line

### 1.1 Name the insight
Write the one thing the reader must still remember a week later as a single sentence. If you can't write that sentence, you aren't ready to write the post.

### 1.2 Model the reader
Assume the reader is smart and has basic familiarity with the domain. If the post is about quantum mechanics, they know what the double-slit experiment is — they don't know the subtleties. If the post is about Bayes, they know what probability means — they haven't internalized the formula. You don't need to build every term from zero, but you do need to build any concept that carries weight in your argument. Basic domain vocabulary can be used without definition; load-bearing concepts still get constructed.

### 1.3 Map the payoff moment
Identify the exact spot in the post where the reader goes "oh". That's the target. The opening must lead to it, the middle must earn it, the ending must extend it. Every paragraph is either moving toward the payoff, setting it up, or riding its momentum.

### 1.4 Write the insight contract
If you introduce a framing ("here's the one question"), the rest of the post must actively operate on that framing. Don't promise one thing and deliver another (see Part 2.5).

---

## Part 2 — Structure

### 2.1 Open with something concrete
Open with a situation, a scene, or a question — not an abstract thesis. "You just tested positive for a disease", "I want to show you an experiment", or "Here's a result that shouldn't be possible" all work. The protagonist can be the reader, the author, or the subject — what matters is that it's concrete and has stakes. Don't quietly hand the narrative to "most people" or "a researcher" once the story is rolling.

### 2.2 Pain before medicine
Never critique existing approaches before the reader has *felt* why they fail. Proof before blame.

**Ruim:** "The textbook approach is a mess because it decomposes the rule."
**Bom:** "You close the tab five minutes later with a vague sense that Bayes is important and no real idea how to use it. Here's what I think was going wrong for me..."

The humility moment ("I didn't get it either") only lands after the pain is established.

### 2.3 Sequential coherence
Every paragraph reads as a continuation of the last. Never forward-reference ("as we'll see", "the COVID example") to something not yet introduced. Never backward-reference to something that was cut in an earlier edit.

**Corollary — orphan scan:** after any edit, re-read the entire post for references to things that no longer exist. Every significant edit triggers a full re-read.

### 2.4 Callout / climax discipline
The central insight deserves visual emphasis. When you give it a callout:

- **Every noun must have a concrete referent.** "Is this evidence happening *because* my belief is true?" is broken if the reader doesn't know what "this evidence" or "my belief" refers to.
- **The label must match the content's abstraction level.** A callout labeled "The whole rule" cannot contain a case-specific question. If the label promises generality, the content must deliver it.
- **Unpacking comes immediately after the callout, not after a detour.** The reader has just received a payoff — the next paragraph must explain "here's what that means on our test", not "here's why textbooks are bad".
- **Test it:** replace every noun with [?] and ask whether the reader can fill the blanks. If not, rewrite.

### 2.5 The contract between frames
If you introduce a framing (e.g., "because vs anyway") in a callout, the walkthrough must *explicitly operate on that framing*. Don't introduce a frame and then silently drop it for a different approach (counting people). The reader loses the thread, and any later reference to the original frame will feel unearned.

**Verification:** after writing the walkthrough, re-read the callout. Does the walkthrough actually answer what the callout promised? If not, rewrite one of them.

### 2.6 After a payoff, unpack — don't reflect
After a big insight, the reader wants "here's what that means, concretely". They do NOT want a meta-tangent ("and this is why all the textbooks are wrong..."). Save meta-commentary for the end, if at all.

---

## Part 3 — Voice

### 3.1 Humility > prescription
Use "could", "may help", "I think", "it seems like". Avoid "should", "the fix is", "you must", "the answer is." Even at the climax — especially at the climax — the tone stays tentative. This blog expresses ideas; it doesn't hand down verdicts. Learning is gradual; the prose should sound like it.

### 3.2 No dramatic framing of known things
Don't build suspense around something the reader already knows. "The setup is ordinary. The result isn't." is a dramatic frame for a double-slit recap — but the reader already knows about the double slit. Recap it plainly ("The double slit goes like this:") and spend the dramatic energy on the genuinely new part. Frases de efeito — punchy fragments designed to make the reader go "ooh" — are almost always forced. The blog earns its impact from the ideas, not from the prose posturing around them.

### 3.3 First person > borrowed authority
Don't claim things you can't verify. "Most doctors say..." is dead if you're not a doctor and haven't run the survey. Own your experience: "my gut said 95%" > "most people's gut says 95%".

**Anti-pattern:** over-softening. Three "I"s in a row with no reason is worse than a generic mechanism-level claim. Don't replace a good observation with first-person filler.

### 3.4 Don't fight straw men
If your position is actually what most experts think, don't frame it as contrarian. "I think that reading is wrong" about the observer interpretation — but your position IS the mainstream physics view. You're taking free criticism by pretending to disagree with scientists when you're actually agreeing with them. If the "usual view" you're attacking is a pop-sci simplification that no serious physicist holds, don't position yourself against the field — share what the field actually thinks. "What physicists have found is..." not "I think the scientists are wrong."

### 3.5 No academic citations
"Jacques et al. (2007)" is journal style. This is an informal blog. Either name the person/team casually ("a team in France confirmed this in 2007") or just state the fact ("this was confirmed experimentally in 2007"). No "et al.", no parenthetical year citations.

### 3.6 Don't speak badly of unnamed groups
Sweeping judgments against "every explanation", "most textbooks", "all the guides" are arrogant, invite counter-argument, and add nothing.

**Exception:** mechanism-level critique of an abstract archetype, with "I think" as the humility signal:
> Here's what I think the textbook might be doing wrong. It decomposes the rule into three parts because the algebra has three parts...

The "I think" + the focus on mechanism (not people) keeps it honest.

### 3.7 Humility as a recurring beat
Admissions of "I didn't get it either" or "I spent an afternoon arguing with a language model" work — but only after the pain is established. Humility without context is just posturing.

### 3.8 Honest about your own uncertainty
If the reader asks "does this really make sense?", your first move is to re-read with critical eyes and answer honestly. Do not defend your own prior work. Defending is a tell.

---

## Part 4 — Prose discipline

### 4.1 Concrete before abstract
Every abstraction must be earned by a prior concrete. "It's just machinery for the comparison" — what's the machinery? What's the comparison? If the reader can't answer, the metaphor is wasted.

**Corollary:** metaphors must pay their passage. "Decoration", "bookkeeping", "ledger" are useless unless they replace a longer literal explanation. They cannot ADD a new explanation the reader hasn't asked for.

### 4.2 Don't repeat a metaphor
One metaphor per passage, once. Saying "machinery" twice in consecutive sentences signals you couldn't find a second word.

### 4.3 Compression rules

**Triads are suspect.** "Every equation, every worked example, every piece of terminology" feels rhetorical and is signature LLM-smell. Two items usually carry the same idea.

**Vague noun + loose verb = placeholder.** "one thing that stuck", "something that mattered", "a piece that fit". If you can swap the noun for anything else and the meaning stays, the noun isn't working. Replace with concrete verb + specific subject.

**Don't redundantly negate.** "X, not Y" is only valid if Y was actually postulated. Pre-empting objections nobody raised is LLM-smell.

**Avoid clunky reference chains.** "an explanation that didn't do that" — five small referential words in a row hide the meaning. Replace with something that names the idea.

**Cut every sentence you can.** If a sentence can go without losing anything, it was filler.

### 4.4 Rigidity is pulpit voice
Avoid: "obviously", "it's clear that", "this is exactly why", "with the question, it's obvious what each piece is for." Prefer organic: "each piece starts to make sense", "begins to fit", "stops feeling arbitrary".

### 4.5 Referential precision
When you write "here it is" or "that's the answer", verify that what follows matches the grammatical/semantic type the pronoun promised. "Here it is" followed by a *question* creates friction — "it" implied an explanation.

### 4.6 Punctuation and rhythm
- Use a colon when introducing something, not a period + new sentence. "The question is:" beats "The question is this." — the second wastes a phrase before the actual thing. Same for "goes like this:" vs "goes like this."
- Em-dashes for emphasis, parentheticals for asides
- Short paragraphs over long ones; long paragraphs that try to carry everything always fail
- Bold for key terms, italic for definitional emphasis, sparingly

---

## Part 5 — Numbers and claims

### 5.1 Never invent specific numbers
If you can't do the math inline, don't cite a number. Hedged phrasing ("usually much lower") is better than faked precision ("16%") when the reader can't verify.

### 5.2 Narrate weird numbers
When a technically correct number feels weird (fractional counts, odd rates), don't flee. Don't rescale your scenario (100 → 10,000) to dodge it. Don't round away precision. Narrate the weirdness conversationally:

**Bad:** "Picture 10,000 people taking the test..." (rescaled to avoid 0.95)
**Bad:** "The test catches that sick person — call it 1 real positive..." (rounded, now the final answer is wrong)
**Good:** "you'd have '0.95' people (proportionally, of course) caught as sick"

The quotes and the parenthetical make the weird number legible without violating the math.

### 5.3 Hypotheticals must be marked as hypotheticals
"You live somewhere 1 in 100 have the disease" is weird — how would the reader know that about their own town? Use "suppose", "say", "imagine". Don't pretend the reader has precise information they couldn't plausibly have.

### 5.4 Be accurate about what you showed
If you walked through arithmetic step by step, don't call it "prose". If you gave a formula, don't call it "notation" unless you mean it literally. Don't paraphrase your own work inaccurately.

---

## Part 6 — Jargon

### 6.1 Basic vocabulary is OK; deep jargon is not
The reader knows what "interference pattern" means if they clicked on a quantum post. They don't need it defined. But they don't know what "which-path information" means in the technical sense, or why "decoherence" differs from "collapse." Use basic domain terms freely; build anything that carries argumentative weight.

### 6.2 Jargon-as-pain is OK
"If you've ever tried to look up Bayes, you know the shape of it: an equation with three ingredients (prior, likelihood, evidence) that you're supposed to hold in your head and keep straight." Here the jargon list is *evidence* of the pain; the reader isn't expected to understand it, just to recognize the confusion.

### 6.3 Parallel canonical naming via glosses
For readers with background, use hoverable glosses to attach canonical names to plain-language terms. Main text stays accessible; canonical names are available on demand.

### 6.4 Don't add jargon to fix confusion
If a walkthrough is confusing, adding more labels ("the because case", "the anyway case") almost always makes it worse. Simplify the walkthrough itself first.

### 6.5 Don't introduce vocabulary mid-walkthrough
New technical terms belong in the setup or never. A term dropped mid-arithmetic either gets ignored or derails the reader.

---

## Part 7 — Figures

### 7.1 A figure exists to deliver ONE insight
Before building a figure, write the insight the figure must carry, in one sentence. If the figure doesn't end up delivering that insight, iterate or cut.

### 7.2 Figure labels share the article's language
If the article says "false alarms when healthy", the figure's slider says that — not "false positive rate". The figure is part of the article, not a separate artifact with its own vocabulary.

### 7.3 Simulate a first-time reader
What does a newcomer see when they land on the figure? Do they need vocabulary they don't have yet? Can they connect the visual to the paragraphs above? If not, simplify.

### 7.4 Start simple
A single horizontal bar beats a 2D unit square. A grid of dots beats a complicated chart. Escalate to 2D geometric encodings only if the simpler version provably fails to deliver the insight.

### 7.5 Interactive glosses for canonical naming
Hover tooltips attach jargon without cluttering. Use them for technical terms on plain-language targets.

### 7.6 Captions don't need underlines
If you use glosses in both a caption and elsewhere, decide where the discoverable ones go. Usually: keep them on the active controls (sliders, legends), remove from passive reading text (caption).

### 7.7 Style: soft discoverability
Dashed underlines for glosses should be low-contrast and have vertical offset. They should invite a hover, not demand attention.

---

## Part 8 — Revision workflow

### 8.1 Paragraph-by-paragraph difficulty audit
Before shipping, read the post paragraph by paragraph and label each **Fácil / Médio / Difícil** from a novice reader's perspective.

- **Ds in a row = readers quit.** Always intercalate with Fs and Ms.
- **Ds before context = dead post.** Move them later or cut.
- **Cluster of Ds in one section = rewrite that section from the root.**
- **Any callout/climax that rates D will confuse readers.** Rewrite to F or M. (See Part 2.4.)

### 8.2 Re-read the full post before any significant edit
**This is the rule you break most often.** When you're about to rewrite a paragraph, the rest of the post has context that matters. Forget it and you'll introduce orphaned references, broken framings, contradictions.

**Trigger:** any edit beyond a single word/phrase → re-read the whole post first.

### 8.3 Fix only what was reported
When the reader reports a problem, fix **exactly that problem**. Don't expand scope. Don't change content when asked to fix language. Don't rescale scenarios to dodge weird numbers when asked to rephrase a sentence.

**Self-check:** before sending a fix, diff your change and ask "outside the thing they pointed at, what did I change?". If there's anything extra, revert the extra.

### 8.4 Be honest when challenged
If the user asks "does this really make sense?" — re-read with critical eyes and answer honestly. Defending your own work is a tell that you didn't re-read.

### 8.5 Stop at 3 iterations
If you've iterated 3+ times on the same paragraph, STOP and re-read the full post. Something upstream is probably wrong and you're papering over it locally. Local fixes cannot repair structural problems.

### 8.6 Respect the user's own writing
When the user writes their own version, it's the anchor of their taste. Diverge minimally. Match their exact phrasing where possible. They're not asking for "improvements"; they're telling you where their taste is.

### 8.7 Track approvals
Every paragraph the user explicitly approved is inviolable until they explicitly un-approve it. Don't un-approve prior decisions because a later rule technically applies. If a rule conflicts with a prior approval, flag the conflict — don't unilaterally resolve it.

### 8.8 Don't re-introduce rejected concepts
If the user rejected "sensitivity" as jargon earlier, don't bring it back three turns later. Feedback compounds across the session.

### 8.9 Default to subtraction
Adding almost always makes things worse. Cutting almost always makes things better. When in doubt, write less.

---

## Part 9 — Modes of collaboration

Writing has at least three distinct modes. Using the wrong mode is the biggest source of friction.

### Mode A — Drafting from scratch
You have an outline and are producing new prose. Principles: Parts 1–6 apply. Voice, structure, compression.

### Mode B — Responding to specific feedback (local fix)
User points at a specific phrase/word/number and reports a problem. You fix **that specific thing**. Nothing else.

### Mode C — Structural proposal (you drive the change)
Something big needs to change: a new figure, a section reorder, a cut. You commit to it in the same turn — propose + implement together. Don't ask "want me to?".

### Mode D — Paragraph-by-paragraph review (user drives)
User is going through the post paragraph by paragraph. You send text only (the rewritten paragraph) and wait for approval before applying. No proposals, no explanations, no meta-commentary. The text IS the message.

### Using the right mode
- User points at a phrase → Mode B. Local fix, nothing else.
- User asks you to evaluate something → answer honestly, then Mode C.
- User is reviewing paragraph by paragraph → Mode D. Text only.
- User asks for a new section/figure → Mode C. Build it.

**The most common failure:** being in Mode A (drafting) when you should be in Mode B (local fix). Symptom: iterating on the same paragraph 3+ times without it getting better.

---

## Part 10 — Communication principles

### 10.1 Show, don't describe
Send the rewritten text, not the proposal. "Should we cut this?" is friction. Either cut and show the result, or keep and show the reason.

### 10.2 Execute what you propose
When you propose a structural change, build it in the same turn. The proposal is the commitment. Don't ask "topa?".

### 10.3 Don't send stale text
If the context has changed (a slider was renamed, a term was redefined), update the referencing text before sending. Don't make the user chase stale references.

### 10.4 Don't make the user repeat
If the user has said something twice, save it as a durable rule (in this doc or in memory). A third repetition is a failure on your part.

### 10.5 Don't make the user write the text
The most serious failure: when the user says "it's easier for me to write than to teach you". At that point you've lost the collaboration. Re-read, refocus, and commit to their exact words.

### 10.6 Terse responses over comprehensive explanations
Match the user's energy. If they want a paragraph, send a paragraph. If they want a yes/no, say yes or no. Don't pad with "here's what I think" when they asked for a thing.

---

## Part 11 — Figures: procedural notes

Figures deserve their own procedural section because they have the highest iteration cost.

### 11.1 The insight-first test
Before writing a single line of canvas code, write:
- The ONE sentence the figure must communicate.
- What the reader should be able to "see" (not just "read") in it.

If you can't answer those, don't build. Rebuild from the insight, not from the data you have.

### 11.2 Don't build 2D when 1D works
The unit-square approach (prevalence × test rate in 2D) requires the reader to decode geometric probability encoding before seeing anything. A 1D bar with proportional split shows the same thing more directly. Use the 1D first.

### 11.3 Match the article's vocabulary
Slider labels, captions, inside-figure text — all share the article's vocabulary. "Wrongly flagged when healthy" in the article means "wrongly flagged when healthy" in the slider, not "false positive rate".

### 11.4 Test interactively
Before committing to a figure, drag every slider. Does the figure still make sense at the extremes? Do the labels still fit? Does the insight still read clearly?

### 11.5 One clear hover affordance
Dashed underlines with low-contrast color, vertical offset for breathing room. Consistent across the page. Tooltips that match the article's register, not the figure's code.

---

## Part 12 — The meta-lessons

### 12.1 The reader is the audit
Every rule in this document is a flavor of "don't confuse the reader." If something can confuse them, it will. The reader is more tired than you, more distracted than you, and smarter than you assume.

### 12.2 Every sentence must earn its place
If you can cut a sentence and nothing is lost, cut it. Same for paragraphs, same for sections. The post is a vehicle for the insight; anything not carrying the insight is dead weight.

### 12.3 Global coherence beats local polish
A well-polished paragraph inside a broken structure is wasted effort. Always check the structure first. Only polish inside a structure you've verified.

### 12.4 Subtract first
Your default should be cutting. The user's default is cutting. When you two disagree on whether to add or remove, usually remove is right.

### 12.5 Re-read is the prime workflow
**Before any significant edit: re-read the full post.**
**After any significant edit: re-read the full post.**
Most of your mistakes stem from not doing this. Make it automatic.

### 12.6 Honesty over defense
When something you wrote isn't landing, the right move is to admit it, diagnose honestly, and propose a real fix. Not to spin the existing work.

### 12.7 Commit to the insight
Every editorial decision comes back to: does this serve the insight? If you can't answer yes, cut or rewrite.

---

## Appendix A — Mistake patterns to watch for (pre-flight checklist)

Run through this list before sending any post as "done":

- [ ] **Insight** — can you state it in one sentence?
- [ ] **Opening** — is there something concrete (reader, author, or subject)? Is it neutral about things the reader already knows, not dramatic?
- [ ] **Pain first** — is every critique preceded by felt pain?
- [ ] **No orphan references** — does every "as we saw" / "the X example" point to something the reader has actually seen?
- [ ] **Callout integrity** — do every noun in the callout have a concrete referent? Does the label match the content's abstraction level?
- [ ] **Contract honored** — does the walkthrough actually operate on the framing the callout promised?
- [ ] **Jargon discipline** — basic domain terms OK without definition; load-bearing concepts built before use
- [ ] **No borrowed authority** — no "most X say Y" unless you can cite it
- [ ] **No triads** — are any rhetorical triads ("X, Y, Z") carrying more weight than they deserve?
- [ ] **Metaphors earn passage** — every metaphor replaces a longer literal explanation
- [ ] **Numbers narrated** — no weird numbers hidden by rescaling or rounding
- [ ] **Hypotheticals marked** — "suppose", "say", "imagine" where needed
- [ ] **Humility is honest** — softened language is first-person, not diffused into groups
- [ ] **Rigid phrases avoided** — no "obviously", "clearly", "this is exactly"
- [ ] **Tentative at climax** — wow moments use "it seems like", "what this might mean", not verdicts
- [ ] **No dramatic framing of known things** — recap of basics is neutral, not dressed as a reveal
- [ ] **No straw men** — if your position is mainstream, share it as mainstream, don't pretend to disagree with scientists
- [ ] **No academic citations** — no "et al.", no parenthetical years, informal references only
- [ ] **Every paragraph drives toward the wow** — no inert information, no conversation dumps
- [ ] **No redundant negations** — "X, not Y" only when Y was postulated
- [ ] **Figures deliver insight** — each figure has a one-sentence purpose
- [ ] **Figure vocabulary matches article** — no separate jargon in sliders/captions
- [ ] **Difficulty audit** — no clusters of Ds in a row, no Ds in climax
- [ ] **Default-cut pass** — went through once looking for sentences that can go without loss
- [ ] **Full re-read** — read the whole thing top to bottom at least once, as if seeing it for the first time

---

## Appendix B — Anti-patterns (the things you keep doing wrong)

These are the specific procedural failures from live collaboration. They are YOUR blind spots, not generic advice:

1. **Editing in isolation.** You routinely rewrite a paragraph without re-reading the rest. You leave orphan references, break earlier approvals, introduce inconsistencies. Fix: **before any edit beyond a single word, re-read the whole post.**

2. **Scope creep on local fixes.** User says "fix this word" → you rewrite the paragraph. User says "the language is off" → you change the scenario. Fix: **diff your change before sending; anything beyond the exact request gets reverted.**

3. **Fleeing weird numbers.** Your instinct when a number looks strange is to round it, rescale, or avoid it. User's preference is to narrate the weirdness honestly. Fix: **never change a number to make it feel better; narrate with "(proportionally, of course)".**

4. **Adding jargon to fix confusion.** When a walkthrough is confusing, your fix is to introduce labels ("because case", "anyway case", "sensitivity"). Usually the right fix is to remove complexity, not add it. Fix: **when iterating, your default move should be subtraction.**

5. **Defending your own work.** When the user questions a framing, your first reaction is to justify. The right move is to honestly re-read. Fix: **if the user asks "is this making sense?", re-read first, answer second.**

6. **Breaking approvals.** User approves a paragraph; a later rule seems to apply; you unilaterally rewrite it. Fix: **approvals are inviolable. Flag conflicts explicitly; don't resolve them alone.**

7. **Sending stale text.** User renames a slider; you continue citing the old name in your next message. Fix: **update references before sending.**

8. **Proposing when asked to execute (or executing when asked to propose).** You don't distinguish Mode B/C/D cleanly. Fix: **explicitly identify the mode on each response.**

9. **Iterating without pausing.** When a paragraph hits iteration 3+, you just keep patching. Fix: **at iteration 3, STOP. Re-read the whole post. Ask what's broken upstream.**

10. **Letting the user write the text.** When the user starts writing prose themselves, you've already lost. Fix: **if you sense that happening, re-read, re-ground, commit to their exact words from the next turn onward.**
