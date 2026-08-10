# CoreGrid Web

The public CoreGrid website - the marketing pages (Home, About, Features, AI Decision Support, Contact) and
the product documentation (Architecture, Project Structure, User Manual, Planned Features), built with
[Docusaurus](https://docusaurus.io/).

This is a public, informational site, not the authenticated management application described in the product
SRS - there is no sign-in, no personal data and no asset data here.

## Structure

| Path | Content |
|---|---|
| `src/pages/` | Marketing pages: `/`, `/about`, `/features`, `/ai-decision-support`, `/contact` |
| `docs/` | Product documentation, served at `/docs/*` |
| `static/img/` | Logo and other static assets |
| `docusaurus.config.ts` | Site config: navbar, footer, theme |
| `sidebars.ts` | Documentation sidebar structure |

## Develop

```bash
npm install
npm start
```

## Build

```bash
npm run build
npm run serve   # preview the production build locally
```
