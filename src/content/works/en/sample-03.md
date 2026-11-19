---
title: Sample Work 03
tagline: Turning "shipping" from a ritual three people watch into a button anyone can press.
summary: Rebuilt a small team's release flow; deploy time fell from 18 minutes to 4, rollback to 40 seconds.
year: 2023
order: 3
featured: false
role: Platform engineering
duration: 9 weeks
stack: [Go, Docker, GitHub Actions, Postgres]
tags: [Developer experience, Backend]
cover: media/covers/sample-03.svg
coverAlt: Placeholder cover for Sample Work 03, paper background with grid lines
demo:
  url: https://example.com
  note: The public instance is an anonymised snapshot; the real one runs on an internal network.
gallery:
  - src: media/gallery/sample-03-a.svg
    caption: Release board — duration, changeset, and rollback entry point on one screen.
links:
  - label: Pipeline config
    href: https://example.com
---

## Context

Three engineers, eight services, one hand-rolled shell script. Every release needed
someone to ask "shall we ship now?", and two other people to stop what they were doing
and watch the logs. Failed releases took 40 minutes to diagnose, because the logs lived
in three different places.

The bottleneck wasn't the degree of automation. It was that **nobody knew what a given
release actually contained.**

## What I built

- **Releases as one atomic operation.** Image build, migration, health check, and traffic
  switch run inside a single transactional flow. A mid-flight failure stops where it is
  rather than leaving half a version live.
- **Changeset first.** The top of the release page isn't a progress bar — it's the commit
  list and the database migration plan. When something breaks, the first thing a human
  needs is *what changed*.
- **Rollback as a first-class action.** Any historical version restores in one click from
  the retained image and migration snapshot, targeting 40 seconds.
- **Correlated logs.** Build and runtime logs are joined by trace id, so a single link
  shows the whole path.

## Outcome

Median deploy time went from 18 minutes to 4. The busiest service now ships 11 times a
day with nobody scheduling a meeting around it. Rollback drills went from a quarterly
event to something people do casually — which is what actually made small, frequent
commits feel safe.

Looking back, the most valuable output wasn't the pipeline. It was the decision to put
*what changed* on the first screen.
