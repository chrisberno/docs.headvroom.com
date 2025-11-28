---
sidebar_label: Notes
sidebar_position: 2
---

# Notes

Add rich text notes to any node in your graph.

## Overview

Each node can have rich text notes attached. Notes support formatting, lists, headings, and links.

## Adding Notes

1. Click a node to open the InfoPanel
2. Click **Add Notes** (or start typing if notes exist)
3. Use the formatting toolbar
4. Notes save automatically (100ms debounce)

## Formatting Options

The rich text editor supports:

- **Bold** and *italic* text
- Headings (H1, H2, H3)
- Bullet lists and numbered lists
- Inline links

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + B` | Bold |
| `Cmd/Ctrl + I` | Italic |
| `Escape` | Close InfoPanel |

## Auto-Save

Notes save automatically as you type. No save button needed.

Changes are:
- Persisted to Supabase immediately
- Synced across devices
- Available after page refresh
