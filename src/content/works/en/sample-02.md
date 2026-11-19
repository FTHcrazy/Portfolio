---
title: Sample Work 02
tagline: When a store loses its network, the schedule still edits, syncs, and never silently overwrites.
summary: Offline-first shift board for 60 stores; four hours of continuous editing on weak connections, merged automatically on reconnect.
year: 2024
order: 2
featured: true
role: Frontend lead (team of three)
duration: 5 months
stack: [React, TypeScript, IndexedDB, Yjs, Vite]
tags: [Frontend, Offline]
cover: media/covers/sample-02.svg
coverAlt: Placeholder cover for Sample Work 02, paper background with grid lines
demo:
  url: https://example.com
  note: The demo runs on anonymised data and needs no sign-in.
gallery:
  - src: media/gallery/sample-02-a.svg
    caption: Week board — stores as rows, days as columns, drag to adjust a shift.
  - src: media/gallery/sample-01-b.svg
    caption: Conflict state — when two people edit the same shift, the diff is shown instead of overwritten.
links: []
---

## Context

Store managers built schedules on their phones, and back-of-house connectivity dropped
constantly. The old app threw a full-page error the moment the connection died, so
managers waited until they were back at a desk — which in peak season meant rebuilding
two days of shifts from scratch.

The hard part was never offline *storage*. It was: **two people edited the same table
while offline, and on reconnect, whose version wins?**

## What I built

- **A local-first data layer.** Every read and write hits IndexedDB first; the UI only
  ever reads local state and the network merely syncs. Cold start to interactive: 1.2s.
- **CRDTs instead of locks.** Shifts are independent entities merged with Yjs map
  semantics. Genuine conflicts — one shift assigned to two different people — are never
  hidden; they surface in red for the manager to resolve in one tap.
- **Restrained dragging.** Visual feedback during the drag, writes only on release, so
  the undo stack stays a single step. Mis-drags on mobile fell from 8% to 1.4%.
- **Explainable sync state.** A fixed header shows *Saved / Pending / Conflict*,
  replacing the spinner that never resolved.

## Outcome

Rework tickets caused by network failures went to zero. The more interesting shift:
managers started editing schedules on their commute, because the app had stopped
requiring them to "wait until there's signal".

The real value of offline capability isn't fault tolerance. It's moving the editing
into the hours people actually have free.
