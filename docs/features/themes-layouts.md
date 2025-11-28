---
sidebar_label: Themes & Layouts
sidebar_position: 6
---

# Themes & Layouts

Customize the visual appearance of your graph.

## Themes

Four visual themes available via the **palette icon** in the header.

| Theme | Description |
|-------|-------------|
| **Dark** (default) | Charcoal background, cyan accents. Low-light friendly. |
| **Light** | White background, blue accents. Daytime use. |
| **Outer Space** | Deep space with animated starfield, purple nebula effects. |
| **Custom** | Placeholder for future user-defined themes. |

### Theme Features

- Instant switching with smooth transitions
- Preference syncs across devices via Supabase
- Respects `prefers-reduced-motion` accessibility setting

---

## Layout Algorithms

Four ways to arrange your graph. Switch via the **layout dropdown** in the toolbar.

### Center Focus (Radial)

Focused node at center, connections arranged in a circle.

**Best for:** Exploring a node's immediate neighborhood.

### Hierarchical

Top-to-bottom tree structure using dagre algorithm.

**Best for:** Org charts, dependency trees, workflows.

### Force-Directed

Physics simulation balancing attraction and repulsion.

**Best for:** Discovering natural clusters in your graph.

### Organic

Softer force-directed with radial clustering.

**Best for:** Large graphs with natural, spread-out appearance.

---

## Persistence

Both theme and layout preferences:
- Save automatically when changed
- Persist across sessions
- Sync across devices (same account)
