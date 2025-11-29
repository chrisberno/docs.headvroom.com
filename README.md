# docs.headvroom.com

Documentation site for Headvroom - Interactive knowledge graph visualization.

## Quick Reference

| Resource | URL |
|----------|-----|
| Live Site | https://docs.headvroom.com |
| Fallback | https://chrisberno.github.io/docs.headvroom.com/ |
| Repository | https://github.com/chrisberno/docs.headvroom.com |

## Local Development

```bash
npm install
npm run start
```

Opens at http://localhost:3000

## Build

```bash
npm run build
```

Build must succeed before pushing.

## Deployment

**Automatic**: Push to `main` triggers GitHub Actions deployment.

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

See [Deployment Guide](docs/deployment-guide.md) for full protocol.

## Tech Stack

- Docusaurus 3.x
- TypeScript
- GitHub Pages
- GitHub Actions CI/CD

## Documentation Pattern

All feature docs use three-path tabs: Users | Developers | Agents
