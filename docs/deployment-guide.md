---
sidebar_label: Deployment Guide
sidebar_position: 20
---

# Deployment Guide

Standard operating procedures for docs.headvroom.com deployment and maintenance.

## Architecture Overview

| Component | Technology | Location |
|-----------|------------|----------|
| Source | Docusaurus 3.x + TypeScript | `main` branch |
| Build | GitHub Actions | `.github/workflows/deploy.yml` |
| Hosting | GitHub Pages | `gh-pages` branch |
| Domain | Custom CNAME | `docs.headvroom.com` |

## Repository

- **GitHub**: https://github.com/chrisberno/docs.headvroom.com
- **Live Site**: https://docs.headvroom.com
- **Fallback URL**: https://chrisberno.github.io/docs.headvroom.com/

## Deployment Protocol

### Standard Deployment (Automatic)

Push to `main` triggers automatic deployment:

```bash
# 1. Make changes to docs
# 2. Commit with clear message
git add .
git commit -m "Add feature X documentation"

# 3. Push to main
git push origin main

# 4. Verify deployment (wait ~60 seconds)
gh api repos/chrisberno/docs.headvroom.com/actions/runs \
  --jq '.workflow_runs[0] | {status: .status, conclusion: .conclusion}'

# Expected: {"status":"completed","conclusion":"success"}
```

### Pre-Push Verification (Required)

**Always verify before pushing:**

```bash
# Build must succeed
npm run build

# No errors allowed. Warnings are acceptable but should be addressed.
```

### Manual Deployment (Emergency Only)

If GitHub Actions fails, deploy manually:

```bash
# 1. Build locally
npm run build

# 2. Deploy using Docusaurus
GIT_USER=chrisberno npm run deploy
```

## CI/CD Pipeline

### Workflow Trigger

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

### Pipeline Steps

1. **Checkout** - Full history for proper builds
2. **Setup Node 20** - With npm cache
3. **Install** - `npm ci` for reproducible builds
4. **Build** - `npm run build`
5. **Deploy** - Push to `gh-pages` branch (main only)

### Monitoring Deployments

```bash
# Check latest workflow run
gh api repos/chrisberno/docs.headvroom.com/actions/runs \
  --jq '.workflow_runs[0] | {status, conclusion, created_at, html_url}'

# View workflow logs (if failed)
gh run view --repo chrisberno/docs.headvroom.com
```

## DNS Configuration

### Required DNS Record

```
Type:  CNAME
Host:  docs
Value: chrisberno.github.io
TTL:   3600 (or default)
```

### Verify DNS

```bash
# Check CNAME resolution
dig docs.headvroom.com CNAME +short
# Expected: chrisberno.github.io.

# Check site accessibility
curl -sI https://docs.headvroom.com | head -3
# Expected: HTTP/2 200
```

### GitHub Pages Settings

Configured via API, persisted in repo:

- **Source**: `gh-pages` branch, root (`/`)
- **Custom domain**: `docs.headvroom.com`
- **HTTPS**: Enforced (after DNS propagation)
- **CNAME file**: `static/CNAME` (auto-copied to build)

## File Structure

```
docs.headvroom.com/
├── .github/workflows/deploy.yml  # CI/CD pipeline
├── docs/                         # Documentation source
│   ├── index.md                  # Welcome page
│   ├── getting-started.md
│   ├── features/
│   │   ├── integrations/
│   │   │   ├── google-drive.md
│   │   │   └── media-images.md
│   │   └── ...
│   ├── users/index.md
│   ├── developers/index.md
│   └── agents/index.md
├── static/
│   ├── CNAME                     # Custom domain config
│   └── img/                      # Images and assets
├── src/
│   └── css/custom.css            # Theme customizations
├── docusaurus.config.ts          # Site configuration
├── sidebars.ts                   # Navigation structure
└── package.json
```

## Content Standards

### Three-Path Documentation Pattern

All feature documentation must include content for three audiences:

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="users" label="Users" default>
## For Users
[End-user focused content]
</TabItem>
<TabItem value="developers" label="Developers">
## For Developers
[Technical implementation details]
</TabItem>
<TabItem value="agents" label="Agents">
## For Agents
[Quick setup, validation checklists, troubleshooting tables]
</TabItem>
</Tabs>
```

### Commit Message Format

```
[Action] [Component]: Brief description

Examples:
- Add Google Drive integration documentation
- Update getting-started with new screenshots
- Fix broken link in developers guide
```

**Do NOT include:**
- AI/LLM attribution in commits
- Emoji in commit messages
- Co-authored-by lines referencing AI

## Troubleshooting

### Build Fails Locally

```bash
# Clear cache and rebuild
npm run clear
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

### GitHub Actions Fails

| Symptom | Cause | Fix |
|---------|-------|-----|
| `npm ci` fails | Lock file mismatch | Run `npm install` locally, commit `package-lock.json` |
| Build fails | MDX syntax error | Check for unclosed tags, invalid JSX |
| Deploy fails | Permission issue | Check repo settings → Actions → Workflow permissions |

### Site Shows 404

```bash
# Verify gh-pages branch exists
git ls-remote --heads origin gh-pages

# Verify Pages is enabled
gh api repos/chrisberno/docs.headvroom.com/pages

# Check if build output exists
gh api repos/chrisberno/docs.headvroom.com/contents?ref=gh-pages \
  --jq '.[].name' | head -5
```

### Custom Domain Not Working

```bash
# 1. Verify CNAME in gh-pages branch
gh api repos/chrisberno/docs.headvroom.com/contents/CNAME?ref=gh-pages \
  --jq '.content' | base64 -d

# 2. Verify DNS propagation
dig docs.headvroom.com CNAME +short

# 3. Re-enable custom domain if needed
gh api repos/chrisberno/docs.headvroom.com/pages -X PUT --input - <<EOF
{
  "cname": "docs.headvroom.com",
  "build_type": "legacy",
  "source": {"branch": "gh-pages", "path": "/"}
}
EOF
```

## Quality Checklist

Before any deployment, verify:

- [ ] `npm run build` succeeds with no errors
- [ ] All new pages have proper frontmatter (`sidebar_label`, `sidebar_position`)
- [ ] Feature docs use three-path tab pattern
- [ ] Images are in `static/img/` with descriptive names
- [ ] Internal links use relative paths (e.g., `/getting-started`)
- [ ] No broken links (check build warnings)
- [ ] Sidebar navigation updated in `sidebars.ts` if new pages added

## Agent Handoff Protocol

When a CDO or agent completes documentation work:

1. **Verify build**: `npm run build` must succeed
2. **Push to main**: Commit with clear message
3. **Confirm deployment**: Check workflow status
4. **Document changes**: Update this guide if procedures change
5. **Mirror to Google Drive**: If required by CEO (see CDO agent definition)

## Version History

| Date | Change | Author |
|------|--------|--------|
| 2024-11-28 | Initial deployment guide | CDO |
