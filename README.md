# Week 1 — Web Development Fundamentals

All deliverables for week 1 of the **Traidix Tech** program: ten topics of
notes, seven hands-on tasks, and the mini project — a responsive personal
portfolio website.

Everything here is plain **HTML5, CSS3 and vanilla JavaScript (ES6+)**. No
frameworks, no build step, no dependencies. Open `index.html` in a browser and
it runs.

---

## Quick start

```bash
git clone <your-repo-url>
cd week-1
```

Then either open `index.html` directly, or serve the folder so relative paths
behave exactly as they will in production:

```bash
python -m http.server 8000     # then visit http://localhost:8000
# or
npx serve .
```

In VS Code, the **Live Server** extension does the same thing with one click.

---

## What's in here

```
week 1/
├── index.html              ← Mini project: the portfolio site
├── NOTES.md                ← Notes on all 10 syllabus topics
├── assets/
│   ├── css/style.css       ← Portfolio styles (design tokens + layout)
│   ├── js/main.js          ← Portfolio behaviour
│   └── resume.pdf          ← Placeholder resume for the download button
└── tasks/
    ├── 01-first-webpage/   ← Semantic HTML5, no CSS
    ├── 02-landing-page/    ← Responsive landing page
    ├── 03-navbar/          ← Responsive navigation bar
    ├── 04-feature-cards/   ← Flexbox vs CSS Grid
    ├── 05-contact-form/    ← Accessible form, native validation
    ├── 06-counter-app/     ← JavaScript counter
    └── 07-dark-mode/       ← Theme toggle with persistence
```

---

## Hands-on tasks

| # | Task | What it demonstrates | Open |
| --- | --- | --- | --- |
| 0 | Set up VS Code, Git and GitHub | Toolchain — see [Setup](#setup) below | — |
| 1 | First HTML web page | Semantic landmarks, tables, lists, forms — deliberately unstyled so only structure remains | [tasks/01-first-webpage/](tasks/01-first-webpage/index.html) |
| 2 | Responsive landing page | Mobile-first CSS, sticky header, pricing cards, `<details>` FAQ, zero JavaScript | [tasks/02-landing-page/](tasks/02-landing-page/index.html) |
| 3 | Responsive navigation bar | Sticky bar, dropdown, animated hamburger, mobile drawer, correct ARIA | [tasks/03-navbar/](tasks/03-navbar/index.html) |
| 4 | Responsive feature cards | The same cards in Flexbox and in Grid, plus a two-dimensional bento layout | [tasks/04-feature-cards/](tasks/04-feature-cards/index.html) |
| 5 | Contact form | Labels, fieldsets, native validation, `:user-invalid` styling — no JavaScript | [tasks/05-contact-form/](tasks/05-contact-form/index.html) |
| 6 | JavaScript counter app | State-driven rendering, DOM events, press-and-hold, keyboard shortcuts, `localStorage` | [tasks/06-counter-app/](tasks/06-counter-app/index.html) |
| 7 | Dark mode toggle | CSS custom properties, `prefers-color-scheme`, saved preference, no flash on load | [tasks/07-dark-mode/](tasks/07-dark-mode/index.html) |
| 8 | Push to GitHub with a README | This repository | — |
| 9 | Deploy | See [Deployment](#deployment) below | — |

---

## Mini project — Personal Portfolio Website

[`index.html`](index.html) — every required feature from the brief:

- ✅ **Responsive navigation bar** — sticky, blurred, collapses to a drawer under 900px
- ✅ **Hero section** — headline, intro, two calls to action
- ✅ **About me** — bio alongside a stat grid
- ✅ **Skills section** — four grouped categories of tags
- ✅ **Projects showcase** — every task above, as cards
- ✅ **Contact form** — live validation with inline error messages
- ✅ **Social media links** — GitHub, LinkedIn, X, email
- ✅ **Resume download button** — hero and contact section
- ✅ **Dark mode toggle** (bonus) — follows the OS, remembers your choice
- ✅ **Mobile responsive design** — verified from 320px upward

Two extras beyond the brief: **scroll-spy** navigation that highlights the
section you're reading (via `IntersectionObserver`), and a **skip link** plus
visible focus rings for keyboard users.

### Before you publish it

Three placeholders need your real details:

1. `index.html` — the GitHub, LinkedIn and X URLs in the `.socials` block.
2. `assets/resume.pdf` — swap in your actual resume, same filename.
3. `index.html` — the About and Projects copy, once you have more to show.

---

## Setup

**VS Code** — install [code.visualstudio.com](https://code.visualstudio.com/),
then add *Live Server*, *Prettier* and *ESLint*.

**Git** — install [git-scm.com](https://git-scm.com/), then identify yourself:

```bash
git config --global user.name  "Your Name"
git config --global user.email "you@example.com"
```

**GitHub** — create a repository, then:

```bash
git init
git add .
git commit -m "Add week 1 tasks and portfolio mini project"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

---

## Deployment

### GitHub Pages

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment**.
3. Source: *Deploy from a branch*. Branch: `main`, folder: `/ (root)`.
4. Save, wait a minute, and the site is live at
   `https://<you>.github.io/<repo>/`.

The `.nojekyll` file in this repo tells Pages to serve the files as-is rather
than running them through Jekyll.

### Vercel

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

Vercel detects a static site automatically — no configuration needed. Or import
the GitHub repo from the dashboard and every push deploys itself.

> **Note on the folder name.** This directory is called `week 1`, with a space.
> Spaces in URLs become `%20` and are a nuisance. If you push this folder as the
> repository root the name doesn't matter; if you keep it as a subfolder, rename
> it to `week-1` first.

---

## Browser support

Modern evergreen browsers — Chrome, Edge, Firefox and Safari. Two features are
newer than the rest and degrade rather than break:

- `:user-invalid` (task 5) — older browsers simply show no live error colour.
- `color-mix()` (portfolio nav) — falls back to no background tint.

---

## Notes

Study notes for all ten topics are in **[NOTES.md](NOTES.md)** — how the web
works, semantic HTML, the cascade, Flexbox vs Grid, responsive strategy, ES6+,
the DOM, and Git.

---

**Author:** Eshwar Vanguri · **Program:** Traidix Tech, Week 1
