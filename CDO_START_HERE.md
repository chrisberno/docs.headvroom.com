# HeadVroom Docs - CDO Start Here

## Documentation Structure

This is docs.headvroom.com - the official documentation for HeadVroom.

**Platform:** Docusaurus → GitHub Pages
**Domain:** docs.headvroom.com

---

## Three-Path Pattern (REQUIRED)

HeadVroom product documentation uses a three-audience structure. Each feature/topic should have content tailored for:

### Path 1: Users
- **Audience:** End users, non-technical
- **Tone:** "Click here, do this, see that"
- **Content:** How to use features, no code, no jargon
- **Example:** "Click the Google tab, authorize your account, pick a folder"

### Path 2: Developers
- **Audience:** Technical users, self-hosters, integrators
- **Tone:** "Here's the endpoint, here's the payload"
- **Content:** API docs, env vars, database schemas, architecture
- **Example:** "Add GOOGLE_CLIENT_ID to your .env, run migration 010"

### Path 3: Agents
- **Audience:** AI agents spinning up HeadVroom for their users
- **Tone:** Condensed, actionable, "do this in 15 mins"
- **Content:** Quick deploy checklists, minimal context, maximum efficiency
- **Example:** "1. Create GCP project 2. Add 5 env vars 3. Run migration 4. Test. Done."

---

## When to Use Three Paths

**USE three paths for:**
- Feature documentation (Google Drive, Notes, Embed, etc.)
- Setup/installation guides
- Integration guides
- Troubleshooting

**DON'T use three paths for:**
- Terms of service
- Privacy policy
- Marketing content
- Changelog/release notes

---

## Implementation Options

### Option A: Tabs within one doc
```markdown
# Google Drive Integration

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="users" label="Users" default>
    User content here...
  </TabItem>
  <TabItem value="developers" label="Developers">
    Developer content here...
  </TabItem>
  <TabItem value="agents" label="Agents">
    Agent quickstart here...
  </TabItem>
</Tabs>
```

### Option B: Separate pages with clear nav
```
/docs/features/google-drive/
├── index.md        (overview)
├── users.md        (user guide)
├── developers.md   (dev guide)
└── agents.md       (agent quickstart)
```

**Preferred:** Option A (tabs) for most features - keeps content together, easy to maintain.

---

## The Agent Value Prop

HeadVroom should be trivially easy for an agent to deploy for their user.

The Agents path exists so an agent can:
1. Land on docs.headvroom.com
2. Find the Agents tab/section
3. Follow a condensed runbook
4. Have HeadVroom running in 15 minutes

**"I spin up HeadVroom for you in 15 mins - it's very well documented"**

This is a first-class design goal, not an afterthought.

---

## Google Docs Mirroring

Per CDO protocol, all .md docs should also be mirrored to Google Drive:
- Target: chris@chrisberno.dev
- Location: My Drive > HeadVroom > Documentation > [mirror structure]

---

*Last updated: 2025-11-27*
