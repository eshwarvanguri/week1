# Week 1 — Topic Notes

My working notes for the ten topics on the week 1 syllabus. Each section is
short on purpose: the point is to have the mental model written down, with the
practice living in [`tasks/`](tasks/).

---

## 1. Introduction to Web Development

A website is three languages doing three jobs:

| Language | Job | Analogy |
| --- | --- | --- |
| HTML | Structure and meaning | The skeleton |
| CSS | Presentation | The clothes |
| JavaScript | Behaviour | The muscles |

They layer, and they degrade gracefully in that order. A page with only HTML is
ugly but usable. A page with only JavaScript is nothing at all — which is why
markup comes first and behaviour last.

**Static vs dynamic:** a static site ships the same files to everyone (this
portfolio). A dynamic site builds the response per request, usually from a
database.

---

## 2. Internet & How the Web Works

What happens between pressing Enter and seeing a page:

1. **DNS lookup** — `example.com` is resolved to an IP address like `93.184.216.34`.
2. **TCP handshake** — a connection is opened to that IP on port 80/443.
3. **TLS handshake** — over HTTPS, keys are exchanged and traffic is encrypted.
4. **HTTP request** — `GET / HTTP/1.1` plus headers travels to the server.
5. **HTTP response** — a status code, headers, and the HTML body come back.
6. **Rendering** — the browser parses HTML into the DOM, CSS into the CSSOM,
   combines them into a render tree, lays it out, and paints. Scripts can block
   parsing, which is why `defer` and bottom-of-body placement matter.

**Status codes worth memorising:** `200` OK · `301` moved permanently ·
`304` not modified · `400` bad request · `401` unauthenticated ·
`403` forbidden · `404` not found · `500` server error.

**Methods:** `GET` reads, `POST` creates, `PUT`/`PATCH` update, `DELETE` removes.
`GET` should never change state.

---

## 3. Frontend vs Backend

| | Frontend | Backend |
| --- | --- | --- |
| Runs on | The visitor's browser | A server you control |
| Languages | HTML, CSS, JavaScript | Python, Node, Java, Go, … |
| Owns | Layout, interaction, accessibility | Data, business rules, auth |
| Visible? | Anyone can read the source | Never shipped to the client |

They meet at the HTTP request. The critical consequence: **anything on the
frontend can be edited by the visitor.** Client-side validation is a courtesy
that improves the experience; the server must validate again because the
frontend cannot be trusted. Never put a secret key in frontend code.

---

## 4. HTML5 Fundamentals & Semantic HTML

Semantic elements say what content *is*, not what it looks like:

- `<header>` `<nav>` `<main>` `<section>` `<article>` `<aside>` `<footer>` — landmarks
- `<figure>` / `<figcaption>` — media with a caption
- `<time>` `<mark>` `<details>` `<summary>` — meaning at the inline level

**Rules I try to keep:**

- One `<h1>` per page; never skip heading levels for visual size — that's CSS's job.
- Every `<img>` needs `alt`. Decorative images get `alt=""`, not a missing attribute.
- Every form control needs a `<label for="…">`.
- Set `lang` on `<html>` and `<meta charset="UTF-8">` first in `<head>`.
- Reach for `<div>` only when no semantic element fits.

See [`tasks/01-first-webpage/`](tasks/01-first-webpage/) — deliberately unstyled
so the structure is all that's left.

---

## 5. CSS3 Fundamentals

**The cascade** decides which rule wins: specificity first
(inline `1000` > id `100` > class `10` > element `1`), then source order as the
tiebreaker. `!important` overrides all of it and is almost always a sign
something else should be fixed.

**The box model** — `content → padding → border → margin`. Setting
`box-sizing: border-box` globally makes `width` mean the width you actually see,
padding and border included.

**Units:** `px` fixed · `rem` relative to the root font size (best for spacing
and type) · `em` relative to the parent · `%` of the parent · `vw`/`vh` of the
viewport · `ch` of the character width (great for line length).

**Custom properties** cascade and can be changed at runtime, which makes them
the natural basis for theming:

```css
:root { --brand: #3b5bfd; }
.button { background: var(--brand); }
```

---

## 6. Flexbox & CSS Grid

**Flexbox is one-dimensional** — a row or a column, distributing leftover space.

```css
.row { display: flex; flex-wrap: wrap; gap: 20px; }
.card { flex: 1 1 260px; }   /* grow | shrink | ideal width */
```

**Grid is two-dimensional** — rows and columns together.

```css
.grid { display: grid; gap: 20px;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
```

That one line is responsive with no media query: `auto-fit` collapses empty
tracks and `minmax` stops a column getting narrower than 250px.

**Choosing:** content-driven and one direction → Flexbox. Layout-driven,
two directions, or things must line up across rows → Grid. `justify-*` works
on the main axis, `align-*` on the cross axis, in both.

Both are compared side by side in
[`tasks/04-feature-cards/`](tasks/04-feature-cards/).

---

## 7. Responsive Web Design

Three non-negotiables:

1. `<meta name="viewport" content="width=device-width, initial-scale=1.0">` —
   without it a phone renders at ~980px and shrinks the result.
2. **Mobile-first** — write the narrow layout as the base, then use
   `@media (min-width: …)` to add what more space allows. It keeps the base
   simple and avoids overriding rules you just wrote.
3. **Fluid before fixed** — `max-width` over `width`, `clamp()` for type,
   percentages and `fr` over pixels.

```css
h1 { font-size: clamp(2rem, 5vw, 3.5rem); }  /* min, preferred, max */
```

Also worth respecting: `prefers-color-scheme` and `prefers-reduced-motion`.
Both are used across these tasks.

---

## 8. JavaScript (ES6+) Basics

- `const` by default, `let` when it must be reassigned, never `var` — `var` is
  function-scoped and hoists in ways that surprise people.
- Arrow functions are concise and take `this` from the enclosing scope.
- Template literals: `` `Hello ${name}` ``.
- Destructuring: `const { min, max } = state;`
- Spread/rest: `{ ...defaults, ...saved }` — the tidiest way to merge.
- Optional chaining `a?.b` and nullish coalescing `value ?? fallback`
  (`??` only falls through on `null`/`undefined`, unlike `||`).
- Array methods: `map` transforms, `filter` selects, `reduce` folds,
  `find` locates, `some`/`every` test.
- `===` compares without type coercion. Use it; `==` has surprising rules.
- Async: `Promise` and `async`/`await` for anything that takes time.

---

## 9. DOM Manipulation & Events

The DOM is the tree of objects the browser builds from the HTML — JavaScript
edits that tree, not the file.

```js
const btn = document.querySelector('#save');       // one
const all = document.querySelectorAll('.card');    // a static NodeList
btn.addEventListener('click', (e) => { … });
```

- `textContent` is safe; `innerHTML` parses markup and can inject scripts.
- Events **bubble** from the target up to the root, which enables **delegation** —
  one listener on a parent handles many children, including ones added later.
- `e.preventDefault()` stops the default action; `e.stopPropagation()` stops the
  bubbling. They're different things.
- Batch DOM writes; each one can force a reflow.

---

## 10. Git & GitHub Basics

```bash
git init                       # start tracking a folder
git status                     # what has changed
git add .                      # stage everything
git commit -m "message"        # save a snapshot
git log --oneline              # history
git branch feature-x           # branch off
git switch feature-x           # move onto it
git merge feature-x            # bring it back into main
git remote add origin <url>    # link a GitHub repo
git push -u origin main        # publish
git pull                       # fetch and merge remote work
git clone <url>                # copy an existing repo
```

**Commit messages** — imperative mood, one logical change per commit:
"Add responsive navbar", not "changes" or "fixed stuff".

**`.gitignore`** keeps generated and local files out: `node_modules/`, `.env`,
`.DS_Store`. A secret committed once stays in the history even after deletion —
rotate it rather than just removing the file.

**Git vs GitHub:** Git is the version control tool on your machine; GitHub is a
hosting service for Git repositories that adds pull requests, issues and Pages.
