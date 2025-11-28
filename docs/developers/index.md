---
sidebar_label: Developers Guide
sidebar_position: 11
---

# Developers Guide

Technical documentation for self-hosting, integrating, and extending Headvroom.

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS
- **Graph**: @xyflow/react (React Flow)
- **State**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Magic Link
- **Storage**: Supabase Storage

## Self-Hosting

### Prerequisites

- Node.js 20.9+
- npm 9+
- Supabase account (free tier works)

### Quick Setup

```bash
# Clone repository
git clone https://github.com/chrisberno/headvroom.git
cd headvroom

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run migrations in Supabase SQL Editor
# Files: supabase/migrations/*.sql

# Start development server
npm run dev
```

### Environment Variables

```bash
# Required
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...

# For embed feature
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# For Google Drive (optional)
GOOGLE_SERVER_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
NEXT_PUBLIC_GOOGLE_API_KEY=...
NEXT_PUBLIC_GOOGLE_APP_ID=...
```

## Database Schema

### Tables

| Table | Purpose |
|-------|---------|
| `nodes` | Graph nodes with JSONB content |
| `edges` | Connections between nodes |
| `user_settings` | Layout, theme preferences |
| `user_google_oauth` | OAuth tokens for Drive |

### Row Level Security

All tables enforce RLS: `user_id = auth.uid()`

## API Routes

### Graph

- `GET /api/graph` - All nodes/edges for user
- `GET /api/graph/expand/[nodeId]` - Node + connected nodes/edges

### Nodes

- `POST /api/nodes` - Create node
- `PATCH /api/nodes` - Update node
- `DELETE /api/nodes?nodeId=` - Delete node

### Edges

- `POST /api/edges` - Create edge
- `DELETE /api/edges?edgeId=` - Delete edge

### Settings

- `GET /api/settings` - Get user preferences
- `POST /api/settings` - Update preferences

### Embed

- `GET /api/embed/[nodeId]?shareToken=` - Public embed data

### Google Drive

- `GET /api/google-drive/oauth` - Start OAuth flow
- `GET /api/google-drive/status` - Check connection status
- `GET /api/google-drive/contents/[folderId]` - List folder

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

Any Node.js hosting works. Set:
- `NODE_ENV=production`
- All environment variables
- Build: `npm run build`
- Start: `npm start`

## Extending

### Adding New Media Types

1. Add type to `types/graph.ts`
2. Create component in `components/panels/`
3. Add tab in `MediaSection.tsx`
4. Update node content schema

### Adding New Layouts

1. Add algorithm to `lib/graph-utils.ts`
2. Add to `LayoutAlgorithm` type
3. Add to layout dropdown in toolbar
4. Test with various graph sizes
