# Spiking Neural Networks — Intent & Structure

## Core insight

The leak — membrane potential decaying continuously even with no input — is what makes SNNs fundamentally different from any other neural network. Not timing, not spikes, not sparsity. The leak. In an SNN, the internal state P decays by itself at every timestep, independent of any weight the network learned. An LSTM or Transformer only changes state if the network decides to — training controls it. But in a spiking neuron, the potential is always bleeding away physically, like water evaporating from a glass even when nobody is pouring. This creates a hard biological constraint: nearby events in time matter because they happen before the prior signal forgets itself. It's not about "temporal ordering" (LSTMs have that too) — it's that forgetting is involuntary, continuous, and governed by physics, not parameters.

## The arc

1. **It's just like a perceptron** — a neuron sums inputs and fires if they exceed a threshold. Feels like ReLU.
2. **Wait, there's memory** — no, the neuron has state that persists across timesteps.
3. **But LSTMs and Transformers have memory** — true. So why is SNN different?
4. **The difference is physical decay** — LSTM state only changes when the network decides. SNN state decays *always*, at every instant, no matter what. P loses a fraction of itself every millisecond.
5. **Why it matters** — creates a hard temporal window. Close spikes accumulate; distant spikes never add up. Timing is encoded by physics, not learned.
6. **When does this win?** — sparse, native-temporal data: audio, sensors, neuromorphic hardware. In text (dense, symbolic) it loses to Transformers. On CPU/GPU it's slower.
7. **Is it hype?** — for language models, yes. For edge sensors and streaming audio on neuromorphic chips, real.

## Best framings from the draft (verbatim)

- **"O neurônio fica vivo entre as palavras."** — "The neuron stays alive between words." Captures the essence: the state keeps existing between discrete inputs. Not "memory" — aliveness.
- **"Perceptron = foto, SNN = vídeo."** — a perceptron sees one frame and decides; an SNN watches time pass.
- **"N qro balde, qro numeros."** — "I don't want buckets, I want numbers." Rodrigo's demand for concrete, numeric examples over metaphors.
- **"No SNN, as palavras chegam uma por uma, e P vai acumulando enquanto elas chegam. A ordem importa."** — words arrive one-by-one, P accumulates, order matters.
- **"A diferença real é o leak — o esquecimento físico."** — the real difference is the leak, physical forgetting. The moment ChatGPT stops hiding behind "temporal order" and names the actual mechanism.
- **"É como uma torneira enchendo um copo. E o copo tem um furo."** — like a tap filling a glass with a hole.

## Best GPT framings worth keeping

- "É exatamente como o cérebro detecta de onde vem um som: a diferença de microsegundos entre o som chegar no ouvido esquerdo vs direito." — sound localization by timing.
- "Neurônio A disparou antes de B → a conexão entre eles fica mais forte." — STDP stated plainly.
- "Peso é diferente de P. P = estado temporário do neurônio → vaza e zera. peso = memória aprendida da rede → permanente."

## Target reader

Someone who knows Transformers, has heard "neuromorphic hardware" tossed around, and wants to know whether SNNs are hype or substance. Impatient with abstraction. Wants numbers and mechanisms. Already accepts that timing matters. Wants an honest answer: when does this work, when is it marketing?

## Structure of the written article

1. **The neuron as a leaky glass** — numbers, not metaphors.
2. **Walking through "o filme foi bom" word-by-word** — step through a sentence, P rising and leaking, until threshold.
3. **The perceptron vs the spiking neuron** — photo vs video. Memory in time.
4. **Why the leak is not just "temporal order"** — LSTMs have order. The leak is involuntary. Show P(t+1) = β·P(t) + input(t) without fetishizing the formula.
5. **Learning: STDP and the credit assignment problem** — one paragraph. Honestly mention most practical SNNs cheat with surrogate gradients.
6. **When SNNs actually win** — sparse data on neuromorphic chips, audio, event cameras, robotics. NOT chatbots.
7. **The honest close** — not hype, not magic. Different hardware, different data, different trade-offs.

## Animation ideas

- **LIF neuron receiving pulses, leak, threshold cross, spike** — P(t) line chart over time. Spikes arrive at t=1, 3, 7. P rises then decays between them. When P crosses 0.8, a spike fires and P resets. The decay curve is the star.
- **Side-by-side SNN vs ReLU** — same input stream. Left: LIF integrating over 10 timesteps. Right: ReLU firing immediately when input > 0. Same inputs, different behavior.
- **STDP** — two input neurons A and B onto C. Spike timing determines whether A→C weight strengthens or weakens.
- **Sparse vs dense energy** — 1000-neuron network. Dense input (everyone firing, full energy). Sparse input (most silent, almost free on neuromorphic hardware).

## What to cut

- The "balde" (bucket) back-and-forth and "N qro balde, qro numeros" frustration scene. Keep the principle, not the scene.
- All Portuguese phrases. Translate.
- The "PARA DE ASSUMIR QUE EU SEI" outburst.
- Rate coding / temporal coding / time-to-first-spike taxonomy. One sentence instead.
- Deep dive on surrogate gradients vs STDP vs backprop. Condense to one paragraph.
- PyTorch code block.
- Opening abstract comparison table.

## Voice notes

- Short sentences. Concrete examples.
- Willing to say "hype for text, real for THIS and THIS."
- Impatient with unnecessary complexity.
- Word-by-word walkthrough ("o filme foi bom") is the hero. Every technical idea gets a number.
- Honest skepticism. Rodrigo's stance: "look, here's the real difference, here's where it wins, everything else is marketing."

**Target word count:** 2,000–2,500 words.
