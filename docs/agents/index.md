---
sidebar_label: Agents Guide
sidebar_position: 12
---

# Agents Guide

Condensed documentation for AI agents deploying or configuring Headvroom.

## 15-Minute Quickstart {#15-minute-quickstart}

Deploy a working Headvroom instance in 15 minutes.

### Prerequisites

- [ ] Supabase account (supabase.com - free tier OK)
- [ ] Node.js 20.9+ installed
- [ ] Git access to headvroom repo

### Deployment Checklist

```bash
# 1. Clone and install (2 min)
git clone https://github.com/chrisberno/headvroom.git
cd headvroom
npm install

# 2. Create Supabase project (3 min)
# Go to: supabase.com → New Project
# Note: Project URL, anon key, service role key

# 3. Configure env (1 min)
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
EOF

# 4. Run migrations (3 min)
# In Supabase Dashboard → SQL Editor
# Execute files in order:
#   001_initial_schema.sql
#   002_rls_policies.sql
#   003_updated_at_trigger.sql
#   004_storage_bucket.sql
#   005_user_settings.sql
#   006_updated_at_trigger_user_settings.sql

# 5. Configure auth (2 min)
# Supabase → Authentication → URL Configuration
# Site URL: http://localhost:3000 (dev) or https://yourdomain.com (prod)
# Redirect URLs: Add same URLs

# 6. Test locally (2 min)
npm run dev
# Open http://localhost:3000
# Login with email → check inbox → click magic link

# 7. Deploy (2 min)
# Push to GitHub → Import in Vercel → Add env vars → Deploy
```

### Validation

```bash
# Build succeeds
npm run build

# Type check passes
npm run type-check

# App loads
curl -I http://localhost:3000
# Should return 200
```

## Feature Configuration

### Google Drive Integration

```bash
# Time: 10 min
# See: /features/integrations/google-drive → Agents tab
```

### Embed Feature

Requires `SUPABASE_SERVICE_ROLE_KEY` env var.

### Themes

No configuration needed. Works out of the box.

## Common Tasks

### Add User Manually

```sql
-- In Supabase SQL Editor
-- Users self-register via Magic Link, no manual creation needed
```

### Reset User OAuth

```sql
DELETE FROM user_google_oauth WHERE user_id = 'uuid-here';
```

### Check Node Count

```sql
SELECT user_id, COUNT(*) FROM nodes GROUP BY user_id;
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Auth redirect fails | Check Supabase URL Configuration |
| RLS blocking queries | Verify user is authenticated |
| Google Drive "not configured" | Set all 5 Google env vars |
| Embed returns 401 | Check SUPABASE_SERVICE_ROLE_KEY |
| Build fails | Run `npm run type-check` for details |

## Quick Reference

### Env Vars (Required)

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Env Vars (Optional)

```
SUPABASE_SERVICE_ROLE_KEY (for embeds)
GOOGLE_SERVER_CLIENT_ID (for Drive)
GOOGLE_CLIENT_SECRET (for Drive)
NEXT_PUBLIC_GOOGLE_CLIENT_ID (for Drive)
NEXT_PUBLIC_GOOGLE_API_KEY (for Drive)
NEXT_PUBLIC_GOOGLE_APP_ID (for Drive)
```

### Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm run start     # Start production
npm run lint      # Check code style
npm run type-check # TypeScript validation
```

### Key Files

```
.env.local                    # Environment variables
supabase/migrations/*.sql     # Database schema
app/api/                      # API routes
components/panels/            # InfoPanel components
lib/graph-utils.ts            # Layout algorithms
```
