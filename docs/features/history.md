---
sidebar_label: History
sidebar_position: 4
---

# History

See every earlier version of a node and who made it, you or an agent, and put it back in one click. Bring back a node or a link that was deleted.

History is kept forever and cannot be edited or deleted. Moving a node on the canvas is not a version and is not listed.

## Where it is

Open a node and pick **History**, the last tab of the Info Panel. A switch at the top gives two views:

- **This node**: the node's own versions, and the links to other nodes it gained or lost.
- **This graph**: every change in the graph you are on.

Each entry says **who** made the change, **when**, and **what changed**, as chips: **Title**, **Notes**, **Links**, **Tags**. "Links" covers both the web links in a node's Links tab and the links between nodes on the graph.

## Who made a change

| Label | Meaning |
|---|---|
| **You** | A change you made in the app. Hover it to see the email. |
| **Agent · *key name*** | A change an agent made through the HeadVroom MCP, with that API key. |
| ***says: name*** | The name the agent gave for itself. Nothing checks it: read it as a claim, not proof. |
| **Restored by …** | A Put back or a restore. |
| **Outside the app** | A change made straight in the database, not through HeadVroom. |

## Put a node back to an earlier version

In **History → This node**, versions are listed newest first.

- **Grouped typing:** the note saves as you type, so edits by the same person within 5 minutes show as one entry. **N edits** opens them.
- **Preview** shows that version's name and note, read-only.
- **Put back** makes the node's name, note, web links and tags match that version at once. There is no confirm. The canvas and Notes show it straight away. Links to other nodes are not changed (use **Restore link** for those).
- The put-back is itself a new version (**Restored by You**), so you can undo it the same way.
- The newest entry is the node as it is now, so it has no Put back.

## Everything that changed in a graph

**History → This graph** lists every change in the graph, newest first, 50 at a time; **More** loads the next 50.

- The **Who** menu shows only one person's or one agent's changes.
- Click an entry for a node that still exists to go to it.

## Bring back a deleted node

**Delete Node** asks no question. Instead:

1. For **10 seconds**, a bar at the bottom of the graph says *Deleted "name"* with **Undo**. Undo brings the node back with its links and its GitHub link.
2. After that, open any node, go to **History → This graph**, and press **Restore** on the *Deleted* entry. A node an agent deleted comes back the same way.

A link to a node that is **also deleted** cannot come back yet; the message names it. Restore that other node too, and the link returns with it.

## Bring back a single link

A link removed on its own shows as *Removed link …* in History (This node or This graph), with **Restore link**. It comes back with the same ends, type and settings.

- It is refused while the link is already there, or while a node at either end is deleted.
- Links removed together with a deleted node come back when you restore that node, so they have no button of their own.

## What History cannot do yet

- Bring back a whole deleted graph (its data is kept).
- Let agents read History or restore through the MCP.
- Show an agent's change live while you have the graph open: it appears after you reopen the graph.
- Show a word-by-word diff. Preview shows the whole version.
