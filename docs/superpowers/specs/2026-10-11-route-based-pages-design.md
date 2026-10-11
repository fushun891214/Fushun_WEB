# Route-Based Portfolio Pages Design

## Goal

Replace the homepage's client-side page switching with Nuxt file-based routes so each request renders only its requested content. This eliminates the Resume first-paint flash and gives About, Resume, Transcripts, and CV stable indexable URLs.

## Scope

- Keep the existing page-content components and their visual styling.
- Use these routes: `/`, `/resume`, `/transcripts`, and `/cv`.
- Keep Chinese and English content on the same URL, using the existing locale switcher.
- Preserve the shared sidebar, navbar, and settings menu.
- Give every route its own localized title and description.
- Animate client-side route changes only; do not animate the initial SSR render.

## Architecture

`app/layouts/default.vue` will own the shared shell: `AppSidebar`, `AppNavbar`, and the `main-content` container. Each file under `app/pages/` will render exactly one existing `Page*.vue` component inside that shell.

The existing `activePage` state, `hidden` attributes, and generic `article.active` display/animation behavior will be removed. `AppNavbar` will render crawlable `NuxtLink` links and determine its active state from the current route.

## Routes and SEO

| Route | Rendered component | Localized SEO purpose |
| --- | --- | --- |
| `/` | `PageAbout` | Professional introduction and skills |
| `/resume` | `PageResume` | Work history, publications, and projects |
| `/transcripts` | `PagePortfolio` | Academic transcript content |
| `/cv` | `PageCv` | CV document |

SEO text will live under `seo.home`, `seo.resume`, `seo.transcripts`, and `seo.cv` in both locale files. The `<html lang>` attribute will move to `app/app.vue` so it is present on every route.

## Navigation and Animation

The navbar will retain its labels, settings menu, and styling. Its four page controls will change from event-emitting buttons to `NuxtLink` anchors. The selected link will use the existing `.active` class.

The old initial `article.active` animation will be replaced by Nuxt route-transition classes. Route navigation may fade in the newly selected page, but direct loads and browser refreshes must render fully opaque immediately.

## Verification

- Static generation creates HTML for all four routes.
- Each generated route contains only its own `data-page` article.
- Generated navigation has links to all four routes.
- Directly opening and refreshing every route renders its own content without another page's text.
- Existing content and locale tests continue to pass, except for any known pre-existing failures documented before this work.

## Out of Scope

- Rewriting the four existing page-content components.
- Adding new content, APIs, or a backend.
- Adding localized URL prefixes.
- Changing the visual design beyond removing the initial fade and using route navigation.
