---
title: Novel Writer
tagline: A writing desk for long fiction that belongs only to you — from worldbuilding to drafting to self-checks and archiving, all on this machine.
summary: A local-first desktop writing desk for long novels — drafting, worldbuilding, self-checks and optional AI help, all kept on your machine.
year: 2026
order: 4
featured: false
role: Design and build, solo
duration: Ongoing
stack: [Electron, React, TypeScript, SQLite]
tags: [Desktop app, Writing tool, Local-first, AI-assisted]
cover: media/covers/novel-writer.svg
coverAlt: Placeholder cover for Novel Writer, paper background with page grid lines
gallery:
  - src: media/gallery/novel-writer-a.svg
    caption: Bookshelf — create, import, filter, sort, writing stats, and the shared inspiration library.
  - src: media/gallery/novel-writer-b.svg
    caption: Three-panel writing — chapter tree left, manuscript centre, five tabs right.
  - src: media/gallery/novel-writer-c.svg
    caption: AI and self-checks — continuation, summary consent, consistency and sensitive words.
links: []
draft: false
---

## What it is

Novel Writer is a desktop writing desk for long fiction. Writing, worldbuilding, self-checks, AI assistance and archiving all happen in one place — open it and write, even offline. Your manuscript and settings stay on this machine: nothing is uploaded or hosted.

Two things go wrong on a long book: you forget a detail you established fifty chapters ago, or you lose the draft. Novel Writer is built around those two fears — keeping your settings and your text in sync, and keeping every word safe on your own computer.

## Who it's for

- **Serialised web-novel authors** Volume order, word counts and unresolved threads, all in one view.
- **Writers with complex worlds** Characters, places, factions and ranks each get a card, so whatever you need lines up.
- **Anyone who cares about manuscript safety** Unpublished work never leaves your computer.
- **Writers who want AI's help without handing over the wheel** AI is a switch; turn it off and writing, worldbuilding and self-checks still work in full.

## What you can do

### Writing and chapters

- **Bookshelf** Every book on one page — filter by ongoing / completed, sort by last updated / created / word count, switch grid and list views, and search. A stats strip tracks total words, today's words and your writing streak; the right column is an inspiration library that follows you across books.
- **Three-panel writing view** Chapter tree on the left, manuscript in the centre, five tabs on the right — outline, entities, inspiration, search and tools — with a draggable divider.
- **Chapters and volumes** A first volume is created if none exists; drag to reorder chapters, and confirm the old and new positions before you let go. Deleted chapters and volumes go to the recycle bin.
- **Autosave and recovery** Your work saves as you write without interrupting your input method, and every chapter keeps several past versions. If the app closes unexpectedly, reopening offers the most recent snapshot — normally very little is lost — and each chapter remembers its own cursor and scroll position.
- **Focus and reading modes** `F11` for focus, `F12` for reading; four themes and switchable body fonts.
- **Search and guidance** Full-book search across works, volumes and chapters; a six-step first-run walkthrough and help on `F1`.
- **Import a whole book** Top bar → "Import TXT / DOCX". Common encodings are detected so older Chinese files don't come through garbled; volumes and chapters are split, ad lines and chapter numbers stripped, leaving a tree ready to continue.

### Settings and worldbuilding

- **Entity cards** Select a name or place in the text, right-click, and save it as a character, place, faction or item.
- **Linked annotations** Matched names are highlighted in the text; hover for a quick preview, click for the full card. Renaming a card asks whether to replace the old name throughout the manuscript.
- **Cultivation ranks** One rank ladder per book — add, reorder, bulk-generate, split or merge tiers, start from a preset template, and export to JSON / Markdown.
- **Outline and foreshadowing** The right-hand outline tab records a synopsis per chapter and tracks foreshadowing as it is planted and resolved; a generated summary fills in the one-line synopsis for you.
- **Inspiration quick notes** `Enter` to capture a note, `Shift+Enter` for a new line, pin what matters, or turn a note into foreshadowing in one click.

### Self-checks and quality control

- **Consistency check** Cross-checks names, aliases and the rank ladder across the whole book, sorting near-misses like "Li Xuan / Li Yuan" into "certain / possible" for you to judge.
- **Sensitive-word scan** Built-in red-line words plus your own dictionary; results are grouped by word and chapter, and clicking one jumps to the marked text.

Both run on your machine — no network, no model quota — and only flag things; they never rewrite your text. They work fine even if you never connect an AI model.

### AI writing assistant

AI is an optional layer: connect a model service you configure yourself (an OpenAI-compatible endpoint or Ollama). Flip the global switch off and the related buttons disappear entirely — nothing else changes.

- **Continuation** Put the cursor at the end of a paragraph, tap the button at bottom right, confirm what will be sent, and the text grows character by character. Stop partway, insert, and undo if you change your mind.
- **Polish** Select a passage, right-click "Polish this passage", preview the result, then replace, retry or dismiss.
- **Text transforms** Same selection menu — expand, condense, rewrite, change tone or switch point of view.
- **Chapter summary** Hover a chapter row and click the bolt, choose this chapter / selected passage / last three chapters, agree to the prompt, and generate. A one-line synopsis fills the outline, the full summary is archived, and "undo this batch" is available.
- **Setting extraction** Pull characters and other entities from a whole chapter; after deduplication nothing is added until you tick it.
- **Name generation** Driven by a local word pool that avoids names already used in this book; a connected model enhances it, but it works on its own too.

### Data safety

Autosave with past versions, full backups you can restore from, a recycle bin (works / volumes / chapters / entity cards, about 30 days), and export of a whole book / volume / chapter to TXT. See "Data and safety" below.

## A connected creative desk

Novel Writer is more than one writing box. Around a single long book, the everyday tools form a set that cross-reference each other, so you don't keep flipping back and forth.

- **Main writing view** The bookshelf manages books, the three-panel view manages chapters, and text, settings and outline sit side by side.
- **Pack** Track a protagonist's status, attributes, items, skills and outfit changes — open with `Ctrl+Shift+B`.
- **Relationship network** Put characters on a canvas, drag handles to draw connections, and write background into detail cards; the finished graph exports as an image.
- **Fictional map** A separate map editor for placing locations and marking territory (its binding to a book is still evolving).
- **Global setting centre** A setting library shared across books, so a new book doesn't rebuild its world from scratch.
- **Rank system and inspiration library** The ladder governs power levels; the library catches stray ideas.
- **Import, export and backup** Bring an old draft in, send a finished book out, and keep a packaged copy of everything.

From setting down rules, through volumes, drafting and self-checks, to the relationship graph, pack and map corroborating one another, and finally export and archive — on a long book the pieces line up, leaving you free to keep writing.

## Feature walkthrough

One path from a blank shelf to a finished book — and the parts of this app most worth watching. The clips are still being recorded; here is what each step looks like.

1. **Starting a book** "New work", a title, a genre if you like — and you are in chapter one. The blank page says only one thing: write the first chapter.
2. **Bringing in an old draft** "Import TXT / DOCX", pick a file, watch the progress; volumes and chapters are already lined up in the left tree, ready to continue.
3. **Building settings as you write** Select a name, right-click to save it as a card; from then on the word stays lit in your text, and a hover tells you who it is.
4. **Letting AI carry on** Cursor at the end of a paragraph, button at bottom right, confirm how much will be sent; the text arrives character by character, pausable, and undoable after you insert it.
5. **Checking the whole book** The consistency check lists misspelled names; the sensitive-word scan marks risky words in red. Both run on your machine and only point things out.
6. **Closing and keeping a copy** One click packs up everything. Deleted books, chapters and cards wait in the recycle bin for about 30 days.

## Data and safety

- **Your manuscript stays on your machine** Works, settings and text are stored locally — never uploaded, never hosted; writing works without a connection.
- **It stays intact** Autosave and past versions run quietly; after an unexpected exit, reopening offers the latest snapshot. Deleted items sit in a recycle bin for about 30 days before cleanup.
- **Easy to take with you** A full packaged backup is there for a new machine or a mistake; finished books export to TXT, settings to JSON / Markdown.
- **AI is your call** Without a model connected, self-checks, name generation, search and backup all work; with one connected, anything that sends text asks first and states plainly that your selected content goes to a third-party model service, with nothing relayed or stored on the way.

## Getting started

Install and open it, then head to the bookshelf: click "New work" to start a book, or "Import TXT / DOCX" to bring an old draft in. Write chapter one and build entity cards as you go. Connect your own model service when you want AI; otherwise leave it off. The six-step walkthrough is there on first run, and `F1` opens help any time. Take a backup now and then.
