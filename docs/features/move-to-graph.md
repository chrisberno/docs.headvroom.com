---
sidebar_label: Move to graph
sidebar_position: 4
---

# Move to graph

Put a branch, or a whole graph, under a node in another graph.

## How

- **A branch:** right-click a node on the canvas → **Move to graph…**. It moves that node and everything under it.
- **A whole graph:** right-click its card in the [Library](library) → **Move to graph…**.

Then:

1. Pick the graph to move it to.
2. Pick the node to put it under (type to search by name or notes).
3. Read the summary and click **Move**.

It lands as a **child** of the node you picked. **Cancel**, **×**, **Esc** or a click outside closes it with nothing changed.

## What moves with it

- The nodes keep their **notes**, **files** and **GitHub links**, and the **links between them** move too. Nothing is copied: the nodes themselves move.
- **Links to nodes that stay behind** (including the link to its old parent) are removed. The summary lists every one of them before anything changes.
- Moving a **whole graph** deletes the emptied graph afterwards. The summary names it.
- **All or nothing:** if something changed in the meantime (say the target node was deleted), nothing moves and you are told why.

## When a move is refused

- A graph's **stem node** cannot be moved as a branch: move the whole graph from its card in the Library instead.
- A branch cannot go under **one of its own nodes**.
- Your **stem graph** cannot be moved (set another graph as the stem first), and a graph cannot be moved **into itself**.

## Undo

Every change a move makes is kept in history, with who made it and when, so it can be restored. The screen to browse and restore history comes in a later release.
