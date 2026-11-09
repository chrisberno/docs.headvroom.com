---
sidebar_label: Types & Tags
sidebar_position: 3
---

# Types & Tags

Give every node a **type** so a kind of thing stands out across the map, add **tags** that cut across your graphs, view a note as **plain Markdown**, and **name your links**.

## Types

A type is a kind of node (Person, Book, Project…) with its own **colour** and **icon**.

### Give a node a type

1. Open the node in the Info Panel.
2. Under its title, click the **Type** chip (it reads **+ Type** when the node has none).
3. Pick one of your types, or click **Add type**: a name (up to 40 characters), one of **24 icons**, and one of **10 colours** or a hex value such as `#FBBF24`. Then **Add**.

- The node takes the type's colour and icon **on the map, in the Info Panel, in the Links list and in embeds**.
- Setting a type **replaces the colour and icon that node had of its own**. Other nodes are not touched.
- **No type** takes the type off; the node goes back to the default look.
- Your types are **shared by all your graphs**. Two types cannot share a name (capitals do not count: `person` and `People` are different, `person` and `Person` are not).
- You start with no types; add them as you need them.

### Change or delete a type

Open the Type chip on any node and click the **pencil** beside the type.

- **Save** a new name, icon or colour: every node of that type changes at once.
- **Delete** asks first and says how many nodes use the type. Those nodes go back to the default look. **No node is ever deleted with a type.**

## Tags

Tags sit beside the Type chip, under the node's title.

- **Add:** click **+** (or **+ Tag**), type one or more tags separated by commas, then `Enter` or click elsewhere. `Esc` cancels.
- **Remove:** the **×** on a chip.
- **The rule:** a tag uses only `a`–`z`, `0`–`9`, `-` and `_`, and starts with a letter or digit (up to 64 characters). Capitals become lower case, a space becomes `-` (`big data` → `big-data`), a repeat is ignored, and anything else is refused with a message. A node holds up to **20** tags.
- Tags **cut across graphs**: the same tag can sit on nodes in any of your graphs.
- **One tag, two uses:** if your account has the Journal tab, it reads these same tags. Tag a node once and both work; the Journal tab has no tag box of its own.

### Every node with a tag

Click a tag chip, or type `#` and the tag in the **Search/Create** box (for example `#bizdev`) and press `Enter`.

The panel on the right lists **every node you have with exactly that tag, across all your graphs**, grouped by graph, A to Z. Click a node to go to it: in the graph you are on it is an ordinary visit (it joins the trail); a node in another graph opens that graph on that node.

## Markdown view of a note

On the **Notes** tab, click **Markdown** at the top right.

- The note shows as **plain Markdown**: headings as `#`, `**bold**`, `*italic*`, `- ` lists, `[links](url)` and fenced code blocks.
- It is **read-only**. **Copy** puts exactly that text on your clipboard.
- Click **Markdown** again to go back to the editor. **The note itself never changes.**
- This browser remembers whether Markdown view is on.

## Named links

**Right-click a link.** A name field sits at the top of its menu.

- Type up to **40 characters** and press `Enter`. `Esc` cancels. Clear the field and press `Enter` to remove the name.
- Names **always show** on the map, beside their link and **clear of nodes and of other names**. They appear a moment after the map settles.
- A name with no free spot shows while you **hover over or select** its link, or **hover its node's row** in the Info Panel's Connected Nodes list. Choosing that row keeps the name shown on the node it opens, so every name can be read even on a crowded map.

### Through MCP

The MCP write endpoint (`POST /api/mcp/write`) takes:

| Action | Params | What it does |
|---|---|---|
| `create_edge` | `graph_id`, `source`, `target`, `relationshipType`, optional `label` | Creates a link, named when `label` is given |
| `update_edge` | `edge_id`, `label` (and/or `metadata`) | Sets a name; `null` or `""` removes it. `metadata` is merged; the relationship and gates never change here |

- A name longer than 40 characters (up to 200) is kept as sent and shown as its **first 40 followed by `…`**.
- Tags and a type are set with `update_node` in `metadata` (`tags`, `typeId`).
- The `@headvroom/mcp` client package does not list `label` or `update_edge` yet; call the endpoint directly until it does.
