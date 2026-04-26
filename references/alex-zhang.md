# Alex L. Zhang

- Site: https://alexzhang13.github.io
- Style: Long, dense, technical deep-dives. Few posts per year but substantial — mixes research insights with accessible explanations.
- Topics: ML systems optimization, LLM efficiency, inference strategies, emerging AI architectures.

## Posts

- [The Mismanaged Geniuses Hypothesis](https://alexzhang13.github.io/blog/2026/mgh/) — Apr 9, 2026. How frontier language models are underutilized due to suboptimal individual model calls.
- [Language Models will be Scaffolds](https://alexzhang13.github.io/blog/2026/scaffold/) — Feb 25, 2026. Argues future LMs will function as scaffolding infrastructure.
- [Recursive Language Models](https://alexzhang13.github.io/blog/2025/rlm/) — Oct 15, 2025. Inference strategy enabling models to recursively interact with unbounded context.
- [A Meticulous Guide to Advances in Deep Learning Efficiency](https://alexzhang13.github.io/blog/2024/efficient-dl/) — 2024. Comprehensive overview of improvements across algorithms, hardware, libraries, and compilers.
- [The Annotated Kolmogorov-Arnold Network (KAN)](https://alexzhang13.github.io/blog/2024/annotated-kan/) — 2024. Detailed guide to understanding KANs.
- [Highlights of NeurIPS 2023](https://alexzhang13.github.io/blog/2024/neurips2023/) — 2024. Analysis of conference trends from reviewing all 3,584 paper abstracts.

---

## Openings of famous posts

### *A Meticulous Guide to Advances in Deep Learning Efficiency over the Years* (2024)

> The field of deep learning has flourished in the past decade to the point where it is hard as both a researcher and a student to keep track of what is going on. Sometimes, I even find it hard to keep track of the **actual** direction of the field. In a field that often feels hand-wavy and where many methods and results feel lackluster in practice, I wanted to at least get a sense for progress in how we got to where we are now.
>
> I wanted to write this post in a narrative form — to 1) be digestible to the reader rather than an information dump, and 2) allow the reader to view the field from a macroscopic lens and understand why the field moved the way it did. I have tried to be as paper-focused as possible (similar to Lilian Weng style blogs!) and include as many landmark (or just cool) works as I saw fit; if the reader feels something should be included or edited, please let me know. I really hope all of the information is correct and I've tried to make sure of it as much as possible, but it is possible I've made errors! If you find any, feel free to shoot me an email and let me know! I'm quite a young person, so I was probably playing Minecraft hypixel when some of these breakthroughs happened. Finally, I always recommend reading the original paper when you want to understand something in more depth.

### *The Annotated Kolmogorov-Arnold Network (KAN)* (2024)

> Deep neural networks have been the driving force of developments in AI in the last decade. However, they currently suffer from several known issues such as a lack of interpretability, scaling issues, and data inefficiency — in other words, while they are powerful, they are not a perfect solution.
>
> Kolmogorov-Arnold Networks (KANs) are an alternative representation to standard multi-layer perceptrons (MLPs). In short, they parameterize activation functions by re-wiring the "multiplication" in an MLP's weight matrix-vector multiplication into function application. While KANs are not nearly as provably accomplished as MLPs, they are an exciting prospect for the field of AI and deserve some time for exploration.

### *Recursive Language Models* (Oct 2025)

> We propose Recursive Language Models (RLMs), an inference strategy where language models can decompose and recursively interact with input context of unbounded length through REPL environments.
>
> We explore language models that **recursively call themselves or other LLMs** before providing a final answer. Our goal is to enable the processing of essentially unbounded input context length and output length and to mitigate degradation "context rot".
>
> We propose **Recursive Language Models**, or **RLMs**, a general inference strategy where language models can decompose and recursively interact with their input context as a variable. We design a specific instantiation of this where GPT-5 or GPT-5-mini is queried in a Python REPL environment that stores the user's prompt in a variable.

