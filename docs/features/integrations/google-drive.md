---
sidebar_label: Google Drive
sidebar_position: 1
---

# Google Drive Integration

Connect your Google Drive folders to Headvroom nodes.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="users" label="Users" default>

## For Users

Connect your Google Drive to access files directly from your knowledge graph.

### How It Works

1. **Click a node** to open the InfoPanel
2. **Scroll to Google Drive section**
3. **Click "Connect Google Drive"**
4. **Authorize with Google** (one-time per session)
5. **Select a folder** from the picker
6. **Folder contents appear** in the node

### What You Can Do

You can browse files and subfolders, click files to open in Google (Docs, Sheets, etc.), see recent activity in connected folders, and connect different folders to different nodes.

### Requirements

You need a Google account with Drive access, a Headvroom account, and a modern browser (Chrome, Firefox, Safari, Edge).

### Google Workspace Users

If you're using a Google Workspace account (your company/organization email), you may encounter additional authorization steps.

**"Access Blocked" or "403" errors:** Your organization's admin may need to approve Headvroom. Contact your IT administrator and ask them to allow Headvroom in the Google Workspace Admin Console.

**What to tell your admin:**

> "I need to use Headvroom's Google Drive integration. Can you add it as a trusted app in Admin Console → Security → API Controls → App Access Control? The Client ID is provided by the Headvroom instance administrator."

**After admin approval:**

1. **Disconnect** Google Drive in Headvroom (if previously connected)
2. **Reconnect** - go through the full OAuth flow again
3. This registers the proper scopes with your Workspace

### Troubleshooting

**"Google Drive not configured"** - The administrator hasn't set up Google Cloud credentials yet. Contact your administrator or check the Developers Guide.

**Authorization fails** - Clear browser cache and try again. Ensure pop-ups are allowed for headvroom.com. Try a different browser.

**Files not showing** - Refresh the page. Re-authorize Google Drive. Check folder permissions in Google Drive.

</TabItem>
<TabItem value="developers" label="Developers">

## For Developers

Set up Google Drive integration for self-hosted instances.

### Environment Variables

Add these to your `.env.local`:

```bash
# Google OAuth (server-side)
GOOGLE_SERVER_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret

# Google Picker (client-side)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_API_KEY=your-api-key
NEXT_PUBLIC_GOOGLE_APP_ID=your-project-number
```

### Google Cloud Setup

1. **Create Project** at [console.cloud.google.com](https://console.cloud.google.com)
2. **Enable APIs:** Google Drive API, Google Picker API
3. **Create OAuth 2.0 Client ID:** Application type: Web application. Authorized origins: `http://localhost:3000`, `https://yourdomain.com`. Authorized redirect URIs: `http://localhost:3000/api/google-drive/oauth/callback`, `https://yourdomain.com/api/google-drive/oauth/callback`
4. **Create API Key:** Restrict to Google Picker API
5. **Get Project Number:** IAM & Admin → Settings → Project Number

### Database Migration

Run the OAuth tokens migration:

```sql
-- 010_google_oauth.sql
CREATE TABLE IF NOT EXISTS user_google_oauth (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  access_token TEXT NOT NULL,
  refresh_token TEXT NOT NULL,
  token_expiry TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE user_google_oauth ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own oauth tokens"
  ON user_google_oauth FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own oauth tokens"
  ON user_google_oauth FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own oauth tokens"
  ON user_google_oauth FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own oauth tokens"
  ON user_google_oauth FOR DELETE
  USING (user_id = auth.uid());
```

### API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/google-drive/oauth` | GET | Initiates OAuth flow |
| `/api/google-drive/oauth/callback` | GET | Handles OAuth callback |
| `/api/google-drive/token` | GET | Returns access token for authenticated user |
| `/api/google-drive/status` | GET | Checks if user has valid OAuth tokens |
| `/api/google-drive/contents/[folderId]` | GET | Lists folder contents |

### OAuth Flow

The flow works as follows: User clicks "Connect Google Drive", frontend redirects to `/api/google-drive/oauth`, server redirects to Google consent screen, user authorizes, Google redirects to `/api/google-drive/oauth/callback`, server exchanges code for tokens and stores in `user_google_oauth`, user redirected back to app.

### Scopes Used

```typescript
const GOOGLE_OAUTH_SCOPES = [
  'openid',
  'email',
  'https://www.googleapis.com/auth/drive.metadata.readonly',
].join(' ')
```

### Google Workspace Considerations

When deploying for organizations using Google Workspace:

**OAuth Consent Screen:** Consider publishing your OAuth consent screen (moving out of "Testing" mode). Testing mode limits to manually-added test users only. Production mode allows any Google account (subject to Workspace policies).

**Workspace Admin Requirements:** Workspace admins need to approve your app. Provide them:

| Info | Where to Find |
|------|---------------|
| Client ID | Google Cloud Console → Credentials → OAuth Client |
| Required Scopes | `openid`, `email`, `drive.metadata.readonly` |
| App Name | Your OAuth consent screen app name |

**Admin Console Path:**

```
admin.google.com → Security → Access and data control → API controls → App access control
```

**Important:** The app won't appear in "Apps pending review" until a user from that Workspace actually attempts to OAuth. Have a test user connect first, THEN the admin can approve.

**Common Workspace Issues:**

| Symptom | Cause | Fix |
|---------|-------|-----|
| `invalid_client` | Env var has trailing newline | Re-add env vars without `\n` |
| 403 on folder picker | Workspace blocking `drive.metadata.readonly` scope | Admin must approve app with this scope |
| File picker works, folder picker doesn't | Different auth flows (client-side vs server-side) | Disconnect and reconnect to register scopes |
| "App hasn't requested access yet" in Admin | OAuth hasn't been attempted | Have user connect first, then admin approves |

**Vercel Env Var Warning:** When adding env vars via CLI, ensure no trailing newlines:

```bash
# WRONG - will break OAuth
echo "your-client-id" | vercel env add GOOGLE_SERVER_CLIENT_ID production

# CORRECT - use -n flag
echo -n "your-client-id" | vercel env add GOOGLE_SERVER_CLIENT_ID production
```

</TabItem>
<TabItem value="agents" label="Agents">

## For Agents

15-minute quickstart to get Google Drive working.

### Prerequisites

You need a Google Cloud account, a Supabase project with Headvroom schema, and Headvroom running locally or deployed.

### Quickstart Checklist

```bash
# 1. Create Google Cloud project (2 min)
# Go to: console.cloud.google.com
# Create new project, note the Project Number

# 2. Enable APIs (1 min)
# APIs & Services → Library → Enable:
# - Google Drive API
# - Google Picker API

# 3. Create OAuth credentials (3 min)
# APIs & Services → Credentials → Create Credentials → OAuth client ID
# Type: Web application
# Authorized origins: http://localhost:3000, https://your-domain.com
# Authorized redirect URIs:
#   http://localhost:3000/api/google-drive/oauth/callback
#   https://your-domain.com/api/google-drive/oauth/callback
# Note: Client ID, Client Secret

# 4. Create API Key (1 min)
# APIs & Services → Credentials → Create Credentials → API key
# Restrict to: Google Picker API
# Note: API Key

# 5. Add env vars (2 min)
cat >> .env.local << 'EOF'
GOOGLE_SERVER_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
NEXT_PUBLIC_GOOGLE_API_KEY=your-api-key
NEXT_PUBLIC_GOOGLE_APP_ID=your-project-number
EOF

# 6. Run migration (2 min)
# In Supabase SQL Editor, run:
# supabase/migrations/010_google_oauth.sql

# 7. Restart app (1 min)
npm run dev

# 8. Test (3 min)
# - Open any node
# - Click "Connect Google Drive"
# - Authorize with Google
# - Select a folder
# - Verify files appear
```

### Validation

```bash
# Check OAuth status
curl http://localhost:3000/api/google-drive/status \
  -H "Cookie: your-session-cookie"

# Expected: { "connected": true } or { "connected": false }
```

### Common Issues

| Symptom | Fix |
|---------|-----|
| "Not configured" message | Check all 5 env vars are set |
| OAuth fails | Verify redirect URIs match exactly |
| Picker doesn't load | Check NEXT_PUBLIC_ vars are set |
| Token expired | User needs to re-authorize |

### Google Workspace Quickstart Addendum

If the target user has a Google Workspace account:

```bash
# AFTER basic setup, if user gets 403/blocked errors:

# 1. User must attempt OAuth first (will fail, that's ok)
#    This registers the app with their Workspace

# 2. Workspace admin goes to:
#    admin.google.com → Security → API controls → App access control

# 3. Admin adds app by OAuth Client ID:
#    Your-Client-ID.apps.googleusercontent.com

# 4. Admin approves these scopes:
#    - openid
#    - email
#    - drive.metadata.readonly

# 5. User disconnects Google Drive in Headvroom

# 6. User reconnects - should work now
```

### Workspace Debugging

```bash
# If folder picker fails but file picker works:
# This indicates Workspace scope restrictions

# The two pickers use different auth:
# - FolderPickerButton: server-side OAuth (drive.metadata.readonly)
# - DrivePickerButton: client-side GIS (drive.file)

# Workspace may have approved drive.file but not drive.metadata.readonly
# Solution: Admin must approve the full scope list, then user disconnect/reconnect
```

### Done?

User should now be able to click "Connect Google Drive" on any node, complete OAuth flow, select folders, and see folder contents in the node.

</TabItem>
</Tabs>
