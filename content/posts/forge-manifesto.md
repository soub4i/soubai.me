---
title: "The Forge Manifesto: A Case for Machines That Can Say No"
date: 2026-11-16T23:30:00.000Z
template: "post"
draft: false
slug: "forge-manifesto"
category: "engineering"
tags:
  - "AI"
  - "software engineering"
  - "automation"
  - "forge"
description: "A personal manifesto for Forge, a language-agnostic coding harness that loops until the machine gates and an independent reviewer agree. On trust, gates, and why autonomy without verification is just running in the dark."
socialImage: "media/printing-press.jpg"
---

_Cover art: “The Printer’s Workshop” — Jost Amman, 1568._

Here I am again, writing a manifesto in the age of agents that can generate a whole codebase before I finish my coffee. I know. The internet has enough manifestos. Most of them are written by people who want to sell you a course about how to fire your engineers and replace them with a prompt.

This is not that.

A disclaimer: I’m not advocating for replacing people with machines. I’m advocating for replacing the parts of the work that make people feel like machines.

## The problem with “it works”

The first time I saw an AI write code that actually ran, I felt the same thing I felt the first time I saw a computer play chess: wonder, followed by mild humiliation. Then I ran the code for real and felt something else entirely: the ancient fear of a test suite that passes for the wrong reason.

Because that’s the thing nobody tells you about generated code. It compiles. It looks right. It has comments. It even has tests, sometimes. And then a month later you find out that the tests assert the bug, the benchmark measures nothing, and the error handling was copied from a blog post that was wrong in 2019.

The problem was never “can the model write code?” The problem is “how do you know the code is any good?”

I don’t have a philosophical answer. I have a checklist.

## A harness, not a horse

Forge is a harness. Not the horse, not the rider, not the whip. The straps and the buckles and the bit. The thing that takes a powerful animal and makes it pull the cart without killing everyone.

The horse, in this analogy, is the model. It’s fast, it’s strong, and it has no idea what a cart is for. The rider is you. You choose the goal. The harness is the part that turns your intent into a direction, and the part that stops the whole thing from going into a ditch at 3 a.m.

Forge is a reusable, language-agnostic, multi-model coding harness. You give it a goal and a workspace. It plans, designs, implements, tests, benchmarks, security-reviews, independently reviews, and releases in a loop until the machine gates and a separate reviewer agree.

Not until the model says “done.” Not until the diff looks big enough. Until the checks pass.

## What the loop actually looks like

One iteration is boring in the best way. The architect writes a plan. The designer refines it. The implementer writes production code, tests, and scripts. The tester tries to break it. The benchmarker measures it. The gates run: install, lint, typecheck, build, test, coverage, benchmark, secret scan, external scanners. The fixer repairs what failed. Security attacks the result. The reviewer judges it with a read-only view of the production code. Release writes the documentation and, if you asked for it, a git tag.

Then the loop starts again if anything failed.

Each stage runs in a fresh OpenCode session and hands work to the next one through files. Every stage has a narrow write scope: security, review, and triage cannot touch production code; release may only touch documentation and release metadata. The reviewer can block the run. Security can block the run. The gates can block the run. The model cannot unblock itself.

Under the hood, models are routed by stage and tier: a reasoning model for architecture and review, cheaper ones for fixing and release. You can override any stage. The point is not to worship one model; the point is to make the model replaceable.

## The project owns its language

Forge does not care if you write Go, Rust, Python, TypeScript, Java, C, Swift, Elixir, or something you invented in your basement. It looks for the project’s manifests, package managers, and task runners, detects the native commands, and runs them. Explicit commands in `forge.config.json` always win. Detection fills the gaps.

It also doesn’t scaffold your app anymore. We removed the JavaScript starter templates in 1.2.0, because they were the last language-specific thing in a tool that is supposed to be language-agnostic. `forge init` now writes control files only: the config, the goal, the schema, the agent instructions, and a `.gitignore`. A new workspace requires a `--goal`, because there is no template goal to fall back on. The project stays yours.

That sounds like a small change. It is the whole point.

## The manifesto

1. **A model is not an engineer. A harness can be.** The model supplies the words. The harness supplies the discipline.
2. **The writer is not the judge.** The implementer and the reviewer are separate stages, usually on different models. A code review conducted by the author is a courtesy, not a control.
3. **“It works” is a claim, not evidence.** Tests, coverage, benchmarks, and scanners are how a claim becomes evidence. A green checkmark you didn’t earn is worse than a red one.
4. **Explicit commands beat clever detection.** Forge detects your toolchain, but your config has the final word. The project owns its language, its layout, and its conventions.
5. **No model is load-bearing.** Every stage can be routed to a different model. The harness should survive when the model of the month disappears.
6. **A budget is a design constraint.** Iterations, dollars, and minutes are part of the design, not an afterthought. Autonomy without limits is just running in the dark.
7. **Boring gates beat impressive demos.** A green gate is not exciting. That’s the point. Excitement is what you feel right before you ship the bug.
8. **The goal is not to remove humans.** It’s to remove the parts of the work that make humans feel like machines.

## The machine is not special

The nice thing about building a harness is that you can point it at itself. Forge’s own repository has a `forge.config.json` that requires 70% statement coverage, `go vet`, a successful build, and a parser benchmark above 100,000 operations per second. At the time of writing, the suite is around 79%, the benchmark is comfortably above the line, and the same harness that runs the loop is the one being gated.

This is not a flex. It’s a sanity check. If the harness cannot survive its own gates, why would you trust it with yours?

The first time Forge failed a run because coverage dropped by a fraction of a percent, I wanted to argue with it. Then I remembered I wrote the threshold. That’s the moment the whole thing clicked for me: the machine wasn’t being difficult. It was being consistent. Consistency is what I want from a harness. I can get agreement from a mirror.

## What I actually want

I panicked when the first demos landed, like many people did. I questioned my professional worth for a week, then I remembered that I have always borrowed tools and code from other people. The only difference is that now the borrowing is faster and the tool talks back. The panic was not really about the tool. It was about the part of my identity I had tied to typing.

I don’t want a machine that writes code so I can stop writing code. I like writing code. I like the moment when a bug finally gives up and the test goes green. I don’t want to give that away.

What I want is a machine that handles the parts I’m bad at: remembering to run the benchmark, checking the coverage report, noticing that the “temporary” secret is still in the diff, reading the same file for the fourth time at 2 a.m. and pretending it’s a fresh perspective.

I want a machine that can say “no” to me. That’s the whole trick. Not a machine that agrees with my goal, but one that checks whether the goal was actually met, and refuses to move on until it is.

The printing press didn’t write books. It made them reproducible. It didn’t make writers obsolete; it made the scribe’s wrist obsolete, and then it created a whole new set of arguments about what should be printed. I think coding harnesses are in that phase. The interesting question is not “will AI replace programmers?” The interesting question is “what do we want to make reproducible?”

Forge is my answer, at least for now. It’s a Go binary with no third-party dependencies, a config file, a loop, and a stubborn refusal to call something done because a model said so. It’s not a product. It’s a personal harness that got out of hand, and I’m releasing it because maybe you want one too.

You can find it at [github.com/soub4i/forge](https://github.com/soub4i/forge). The latest release is [v1.2.0](https://github.com/soub4i/forge/releases/tag/v1.2.0).

The machines are not coming for your job. They’re coming for your definition of done. Make it explicit.

Cheers.
