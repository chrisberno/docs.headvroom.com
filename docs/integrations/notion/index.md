---
sidebar_label: Notion
sidebar_position: 2
---

# Notion Integration

Embed Notion pages directly in your Headvroom nodes.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="users" label="Users" default>

## For Users

Connect Notion pages to view and edit them directly within Headvroom.

### How It Works

1. **Click a node** to open the InfoPanel
2. **Click the Integrations tab**
3. **Select "Notion"** from the dropdown
4. **Paste your Notion embed URL** (see below for how to get it)
5. **Page appears** in an iframe - you can view and edit if logged into Notion

### Getting the Embed URL

This is the critical step. You need the **embed URL**, not the regular page URL.

1. Open your Notion page
2. Click **Share** in the top right
3. Click **Publish** (if not already published)
4. Look for **"Embed this page"** button
5. Click **"Copy code"**
6. The URL inside the iframe code is what you need

**The embed URL format:**
```
https://your-workspace.notion.site/ebd//page-id
```

Note the `/ebd//` path - this is different from the regular published URL!

### Common Mistakes

| Wrong URL | Right URL |
|-----------|-----------|
| `notion.so/Page-abc123` | `workspace.notion.site/ebd//abc123` |
| `workspace.notion.site/Page-abc123` | `workspace.notion.site/ebd//abc123` |

The regular URLs will show "refused to connect" errors.

### What You Can Do

- **View** any published Notion page inline
- **Edit** if you're logged into Notion (and have edit permissions)
- Changes save to Notion in real-time
- No sync needed - it's live

### Troubleshooting

**"Refused to connect" error** - You're using the wrong URL format. Make sure you copied from "Embed this page", not the browser address bar.

**Page won't load** - Ensure the page is published (Share → Publish).

**Can't edit** - Log into Notion in another tab first, then refresh. Your Notion account needs edit permissions on that page.

</TabItem>
<TabItem value="developers" label="Developers">

## For Developers

Technical details for the Notion iframe integration.

### Metadata Schema

Notion connection is stored in node metadata:

```typescript
interface NodeMetadata {
  notion?: {
    pageId: string       // 32-char hex ID (no hyphens)
    embedUrl: string     // Full embed URL with /ebd// path
    originalUrl: string  // Original published URL for "Open in Notion" link
    title?: string       // Optional display title
  }
}
```

### The /ebd// URL Format

Notion blocks regular URLs from iframe embedding via `X-Frame-Options: SAMEORIGIN`. However, they provide a special embed endpoint:

| URL Type | Format | Iframe? |
|----------|--------|---------|
| Internal | `notion.so/Page-{id}` | Blocked |
| Published | `workspace.notion.site/Page-{id}` | Blocked |
| **Embed** | `workspace.notion.site/ebd//{id}` | Works |

The embed URL is obtained from Notion's "Embed this page" feature, not by transforming the published URL.

### Key Files

| File | Purpose |
|------|---------|
| `components/panels/integrations/NotionPanel.tsx` | Main UI component |
| `lib/notion-utils.ts` | URL parsing utilities |

### NotionPanel Component

The component handles three states:

1. **No connection** - Shows URL input form
2. **Loading** - Shows spinner while iframe loads
3. **Connected** - Shows iframe with Notion page

```typescript
interface NotionConnection {
  pageId: string
  embedUrl: string
  originalUrl: string
  title?: string
}

// Connection is read from node.metadata.notion
const connection: NotionConnection | null = node.metadata?.notion ?? null
```

### notion-utils.ts

Utilities for parsing Notion URLs:

```typescript
// Extract page ID from various URL formats
extractNotionPageId(url: string): string | null

// Format ID with hyphens (8-4-4-4-12)
formatNotionPageId(rawId: string): string

// Parse URL and return connection info
parseNotionUrl(url: string): NotionPageInfo | null

// Validate URL is a Notion URL
isValidNotionUrl(url: string): boolean
```

**Note:** The current `generateNotionEmbedUrl()` function generates `notion.so/{id}` format which doesn't work for iframes. The embed URL must come from Notion's "Embed this page" feature or be manually constructed using the workspace's notion.site domain with `/ebd//` path.

### Iframe Sandbox

The iframe uses these sandbox permissions:

```html
<iframe
  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
  ...
/>
```

This allows Notion's editor to function while maintaining security.

### API Considerations

There's no backend API for Notion integration - it's purely client-side iframe embedding. The MCP tools (`mcp__notion-*`) are for API access (search, read, write) and are separate from the iframe display.

</TabItem>
<TabItem value="agents" label="Agents">

## For Agents

Quick reference for setting up Notion integration via MCP.

### Update Node Metadata

```bash
# Use HeadVroom MCP to add Notion connection
mcp__headvroom__update_node({
  node_id: "your-node-id",
  metadata: {
    notion: {
      pageId: "2ee849f5981d81abb3a5dc0b76222cf9",
      embedUrl: "https://workspace.notion.site/ebd//2ee849f5981d81abb3a5dc0b76222cf9",
      originalUrl: "https://workspace.notion.site/Page-Name-2ee849f5981d81abb3a5dc0b76222cf9"
    }
  }
})
```

### Critical: Embed URL Format

**The embed URL MUST use `/ebd//` path.**

```
WRONG: https://workspace.notion.site/Page-abc123
WRONG: https://notion.so/abc123
RIGHT: https://workspace.notion.site/ebd//abc123
```

### Getting the Embed URL

1. Page must be published in Notion
2. In Notion: Share → Publish → "Embed this page" → Copy code
3. Extract URL from the iframe code
4. URL will have format: `https://{workspace}.notion.site/ebd//{pageId}`

### Finding the Page ID

```bash
# Use Notion MCP to search
mcp__notion-{workspace}__notion_search({
  query: "Page Title"
})

# Response includes page ID in results[].id
# Format: 2ee849f5-981d-81ab-b3a5-dc0b76222cf9
# Remove hyphens for embedUrl: 2ee849f5981d81abb3a5dc0b76222cf9
```

### Workspace Domain

Each Notion workspace has a unique subdomain for published pages:
- `road-pram-0d9.notion.site` (example)
- Found in the published page URL

### Validation

After updating metadata, the node's Notion tab should:
1. Show the connection header with page title
2. Load the iframe without "refused to connect" error
3. Display the Notion page content

### Common Failures

| Symptom | Cause | Fix |
|---------|-------|-----|
| "refused to connect" | Wrong URL format | Use `/ebd//` URL |
| Spinner forever | embedUrl missing or malformed | Check metadata |
| 404 error | Page not published | Publish in Notion first |
| Can't find page | Page ID wrong | Verify with Notion search |

</TabItem>
</Tabs>
