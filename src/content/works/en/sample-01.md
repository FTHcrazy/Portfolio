---
title: Sample Work 01
tagline: One search box for the documentation a 40-person team had scattered across three systems.
summary: Rebuilt internal doc search and cut median time-to-answer from four minutes to twenty-five seconds.
year: 2025
order: 1
featured: true
role: Design and build, solo
duration: 11 weeks
stack: [Astro, TypeScript, SQLite FTS5, Cloudflare Workers]
tags: [Search, Frontend]
cover: media/covers/sample-01.svg
coverAlt: Placeholder cover for Sample Work 01, paper background with grid lines
demo:
  poster: media/gallery/sample-01-a.svg
  url: https://example.com
  note: The demo runs on anonymised data and needs no sign-in.
gallery:
  - src: media/gallery/sample-01-a.svg
    caption: Results page — highlighted keywords, grouped by source, filters pinned right.
  - src: media/gallery/sample-01-b.svg
    caption: Document view — body text beside the citation panel showing downstream references.
links:
  - label: Case study
    href: https://example.com
---

## Context

Documentation lived in a wiki, a shared drive, and exported chat logs. A new hire asking
"where is the deploy runbook" would get three contradictory answers. Before I touched
anything, the team was spending roughly six hours a week re-explaining the same handful
of processes.

I framed it as a **retrieval problem**, not a **tidying problem**. The goal was never a
perfect information architecture — it was that any question, arriving from any entry
point, would land on a specific paragraph within three steps.

## What I built

- **A single entry point.** All three sources sync into one index that keeps original
  links and never rewrites content, so authors still maintain exactly one copy.
- **Query understanding.** SQLite FTS5 handles recall; a thin rule layer handles Chinese
  tokenisation, synonyms, and the team's internal vocabulary ("deploy" / "ship" / "release"
  all mean the same thing here).
- **Visible trust signals.** Every result shows its last-updated date and owner. Anything
  untouched for 90 days is dimmed — a product decision that quietly forces maintenance.
- **No operational surface.** The site is static. The index is generated in CI and shipped
  as a plain file, so there is no service to keep alive.

## Outcome

Two months in, "where do I find…" questions in the support channel dropped 71%, while
document edits went *up* — nobody wants their page to be the one rendering in grey.

The lesson that stayed with me: retrieval quality is capped by the content itself.
Engineering's job is to stop good content from being buried, and little more.
