# Andrej Karpathy

- Site: https://karpathy.ai (hub linking to his blogs across platforms)
- Blogs:
  - https://karpathy.github.io (oldest, most posts)
  - https://karpathy.medium.com (brief period)
  - https://karpathy.bearblog.dev/blog/ (current)
- Style: Accessible yet technically rigorous. Few posts, but most are iconic — combines education, personal narrative, and practical advice.
- Topics: Deep learning, neural networks, AI fundamentals, career guidance.

## Posts

- [A from-scratch tour of Bitcoin in Python](https://karpathy.github.io/2021/06/21/blockchain/) — Jun 2021. Detailed exploration of blockchain fundamentals by implementing from scratch.
- [Short Story on AI: Forward Pass](https://karpathy.github.io/2021/03/27/forward-pass/) — Mar 2021. Narrative approach to AI concepts.
- [Biohacking Lite](https://karpathy.github.io/2020/06/11/biohacking-lite/) — Jun 2020. Personal optimization and health exploration.
- [A Recipe for Training Neural Networks](https://karpathy.github.io/2019/04/25/recipe/) — Apr 2019. Practical guide for neural network development.
- [Software 2.0](https://karpathy.medium.com/software-2-0-a64152b37c35) — Nov 2017. Paradigm shift: neural networks as a new kind of software.
- [A Survival Guide to a PhD](https://karpathy.github.io/2016/09/07/phd/) — Sep 2016. Doctoral program navigation advice.
- [The Unreasonable Effectiveness of Recurrent Neural Networks](https://karpathy.github.io/2015/05/21/rnn-effectiveness/) — May 2015. Canonical RNN post with character-level generation demos.
- [What I learned from competing against a ConvNet on ImageNet](https://karpathy.github.io/2014/09/02/what-i-learned-from-competing-against-a-convnet-on-imagenet/) — Sep 2014. Human-vs-AI image classification analysis.

---

## Openings of famous posts

### *The Unreasonable Effectiveness of Recurrent Neural Networks* (May 2015)

> There's something magical about Recurrent Neural Networks (RNNs). I still remember when I trained my first recurrent network for Image Captioning. Within a few dozen minutes of training my first baby model (with rather arbitrarily-chosen hyperparameters) started to generate very nice looking descriptions of images that were on the edge of making sense. Sometimes the ratio of how simple your model is to the quality of the results you get out of it blows past your expectations, and this was one of those times. What made this result so shocking at the time was that the common wisdom was that RNNs were supposed to be difficult to train (with more experience I've in fact reached the opposite conclusion). Fast forward about a year: I'm training RNNs all the time and I've witnessed their power and robustness many times, and yet their magical outputs still find ways of amusing me. This post is about sharing some of that magic with you.
>
> We'll train RNNs to generate text character by character and ponder the question "how is that even possible?"

### *A Recipe for Training Neural Networks* (Apr 2019)

> Some few weeks ago I posted a tweet on "the most common neural net mistakes", listing a few common gotchas related to training neural nets. The tweet got quite a bit more engagement than I anticipated (including a webinar). Clearly, a lot of people have personally encountered the large gap between "here is how a convolutional layer works" and "our convnet achieves state of the art results".
>
> So I thought it could be fun to brush off my dusty blog to expand my tweet to the long form that this topic deserves. However, instead of going into an enumeration of more common errors or fleshing them out, I wanted to dig a bit deeper and talk about how one can avoid making these errors altogether (or fix them very fast). The trick to doing so is to follow a certain process, which as far as I can tell is not very often documented. Let's start with two important observations that motivate it.

### *Software 2.0* (Nov 2017)

> I sometimes see people refer to neural networks as just "another tool in your machine learning toolbox". They have some pros and cons, they work here or there, and sometimes you can use them to win Kaggle competitions. Unfortunately, this interpretation completely misses the forest for the trees. Neural networks are not just another classifier, they represent the beginning of a fundamental shift in how we develop software. They are Software 2.0.
>
> The "classical stack" of **Software 1.0** is what we're all familiar with — it is written in languages such as Python, C++, etc. It consists of explicit instructions to the computer written by a programmer. By writing each line of code, the programmer identifies a specific point in program space with some desirable behavior.
>
> In contrast, **Software 2.0** is written in much more abstract, human unfriendly language, such as the weights of a neural network. No human is involved in writing this code because there are a lot of weights (typical networks might have millions), and coding directly in weights is kind of hard (I tried).

