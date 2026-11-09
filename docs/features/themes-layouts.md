---
sidebar_label: Themes & Layouts
sidebar_position: 6
---

# Themes & Layouts

Choose how HeadVroom looks, and see how the Map lays out your graph.

## Themes

Open **Settings** (your avatar, top right) → **Appearance**, and pick a theme from the dropdown (the palette icon, showing the current theme's name). Typing `theme` in the Settings search box finds it.

| Theme | Description |
|-------|-------------|
| **Dark** (default) | Charcoal background, cyan accents. Low-light friendly. |
| **Light** | Light background, blue accents. Daytime use. |
| **Outer Space** | Deep blue-black background, violet accents. |
| **Custom** | A placeholder for themes of your own, for now the same colours as Dark. |

- A new theme **applies at once**, on the page you are on and the graph behind the Settings panel, with no Save button. The Settings panel follows it too.
- It is **saved to your account**, so it follows you to any browser.
- The colours fade over a moment when you switch; with your system's **reduce motion** setting on, they switch instantly.
- **Embeds** of your nodes on other sites always show in Dark.

The **Dot grid** switch sits in the same Appearance section; see [Views → Dot grid](./views.md#dot-grid).

---

## Layout

There is no layout chooser: the **Map** always lays your graph out around the node you are on (the *active* node), the way TheBrain does.

- The **active node** sits in the middle.
- Its **parents** sit in a row above it, its **children** in rows below it.
- Its **lateral links** (jumps) sit in a column on the left, and its **siblings** (the other children of its parents) in a column on the right.
- Only these relatives are shown; every other node waits until you move closer to it.
- **Click a node** to make it the active node: the Map glides to the new layout around it.

The same graph and the same active node always give the same layout, so a place you come back to looks the way you left it.

To see the **whole graph** at once, switch to **Tree**; to scan a node's children, switch to **Cards**. See [Views](./views.md).
