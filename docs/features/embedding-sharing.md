---
sidebar_label: Embedding & Sharing
sidebar_position: 7
---

# Embedding & Sharing

Share individual nodes publicly via iframe embed.

## Overview

Headvroom allows you to embed nodes on external websites without requiring viewers to log in.

## Enable Embedding

1. Click a node to open InfoPanel
2. Scroll to **Embed Settings** section
3. Toggle embedding **on**
4. Choose embed mode:
   - **Graph Only** - Just the graph visualization
   - **Graph + Panel** - Graph and content side-by-side
   - **Panel Only** - Just the node content
5. Copy the generated iframe code

## Share Tokens

Each node gets a unique UUID token for public access:

- Allows read-only viewing without authentication
- Can be regenerated (invalidates old embeds)
- Independent per node

### Regenerating Tokens

Click the refresh icon next to the token to generate a new one. This invalidates all existing embeds using the old token.

## Domain Whitelisting

Optionally restrict which domains can embed your node:

- Enter comma-separated domains: `myblog.com, docs.mycompany.com`
- Leave empty to allow all domains
- Subdomains are auto-allowed

## Embed Code Example

```html
<iframe
  src="https://headvroom.com/embed/node-id?shareToken=uuid"
  width="100%"
  height="600px"
  frameborder="0"
  allowfullscreen
></iframe>
```

## Use Cases

- Documentation: Embed knowledge nodes in your docs
- Blog posts: Showcase relevant graph sections
- Portfolios: Display project relationships
- Team wikis: Share specific nodes without full access
