# 🧱 Masonry CSS Grid Layout Skill

A Claude Code skill that assesses any project, codebase, website, or plan for gallery and grid layout patterns, then produces a scored report with prioritised, copy-paste-ready implementation steps for migrating to **CSS Grid Lanes** (`display: grid-lanes`) — the new native browser masonry layout standard.

No more JavaScript layout libraries. No more fixed row hacks. Three lines of CSS.

---

## 📦 What's In This Repository

```
masonry-grid.skill          ← Install this in Claude Code
├── SKILL.md                ← Skill instructions & assessment pipeline
└── references/
    ├── MasonryCSS-grid-layout-grounding.md   ← Full technical reference
    └── MasonryCSS-grid.jsx                   ← Interactive demo component
```

---

## 🚀 What This Skill Does

Drop the `.skill` file into your Claude Code skills directory and Claude gains the ability to:

1. **Scan** any submitted HTML, CSS, JSX, or project plan for gallery/grid layout patterns
2. **Identify** migration targets — flex-wrap galleries, JS Masonry/Isotope, fixed row heights, column-count media queries, absolute-position grids
3. **Score** the project across 8 dimensions (migration complexity, content variance, responsive readiness, accessibility baseline, browser constraint risk, and more)
4. **Produce** a structured `[project]-masonry-assessment.md` report with phased implementation steps
5. **Output** a complete, copy-paste-ready CSS migration block with `@supports` progressive enhancement fallback

### The Assessment Report Includes

- **Dimension scorecard** — honest 0–10 scores with one-line evidence per dimension
- **Phase 1–5 implementation plan** — container migration → remove constraints → `flow-tolerance` config → spanning enhancements → JavaScript removal
- **Browser compatibility fallback** — `@supports (display: grid-lanes)` wrapper with CSS `columns` fallback for broad support
- **Updated source file** — optionally produces your file with changes already applied

---

## 🎯 When to Use It

Trigger this skill when you say things like:

- *"Assess my gallery for masonry migration"*
- *"Convert this flex grid to CSS masonry"*
- *"Use the masonry-grid skill on this component"*
- *"My photo gallery uses Masonry.js — help me remove it"*
- *"Adapt my product grid to grid-lanes"*

Or simply submit any HTML/CSS/JSX containing grid or column-based layouts and ask Claude to improve or modernise it.

---

## ⚡ Quick Start — Demo Component

The `references/MasonryCSS-grid.jsx` component is a self-contained interactive demonstration you can drop into any React project today. It renders a live masonry layout of educational cards — each card describing an aspect of the CSS Grid Lanes methodology — and includes:

- **Interactive `flow-tolerance` simulator** — switch between `0em` and `8em` and see the live CSS update
- **14 cards** across four height tiers (`hero`, `tall`, `medium`, `short`) — the varying heights demonstrate the layout itself
- **Copy buttons** on every code block
- **Dark editorial aesthetic** — DM Serif Display + JetBrains Mono, per-card accent colours, grain overlay

To use it:

```bash
# Requires React + Google Fonts (loaded via @import in the component)
# No other dependencies
```

```jsx
import MasonryCSSGrid from './MasonryCSS-grid.jsx';

export default function App() {
  return <MasonryCSSGrid />;
}
```

> **Note on browser support:** The demo uses CSS `columns` as a compatibility layer so it works in all browsers today. The live code snippet in the header shows the actual `display: grid-lanes` syntax. For full grid-lanes behaviour, open in [Safari Technology Preview 234+](https://developer.apple.com/safari/technology-preview/).

---

## 📖 Technical Grounding

The `references/MasonryCSS-grid-layout-grounding.md` document is a complete implementation reference covering:

- **Core concept** — the "highway" mental model for how grid-lanes places items
- **Three-line minimal setup** — the only CSS you need for a responsive masonry gallery
- **Layout directions** — waterfall (columns) vs. brick (rows) and how `grid-auto-flow: normal` infers direction
- **Lane sizing** — alternating narrow/wide columns, `repeat(auto-fill, minmax(...))`, fixed counts
- **Spanning & placement** — `grid-column: span N` for editorial hierarchy, negative indices for pinned items
- **`flow-tolerance`** — the new property that controls how aggressively items seek the shortest column, with accessibility implications
- **Complete property reference table** — every property with purpose and example
- **Five worked examples** — photo gallery, alternating columns, newspaper layout, pinned header, brick layout
- **JS Masonry comparison table** — dependencies, infinite scroll, keyboard nav, performance, spanning

---

## 🔧 Installation

1. Download `masonry-grid.skill`
2. Place it in your Claude Code skills directory:
   ```
   ~/.claude/skills/masonry-grid.skill
   ```
3. Restart Claude Code — the skill is now available

---

## 🌐 The Technology

CSS Grid Lanes is a new CSS display mode being standardised by the CSS Working Group, currently available in **Safari Technology Preview 234+**.

```css
/* That's it. A full masonry layout. */
.container {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  flow-tolerance: 1em;
}
```

Key advantages over JavaScript masonry libraries:

| | CSS Grid Lanes | JS Masonry |
|---|---|---|
| Dependencies | None | External library |
| Infinite scroll | Native | JS recalculation |
| Keyboard navigation | DOM source order | Can break tab order |
| Responsive | Automatic | Resize handlers |
| Performance | Browser-native | JS overhead |
| Spanning/placement | Full CSS Grid power | Limited |

Live demos from the WebKit team: [webkit.org/demos/grid3](https://webkit.org/demos/grid3)

---

## 📚 Citation

### Academic Citation

If you use this codebase in your research or project, please cite:

```bibtex
@software{masonry_css_grid_layout_skill,
  title = {Masonry CSS Grid Layout Skill: Claude Code skill for assessing and migrating grid layouts to CSS Grid Lanes},
  author = {[Drift Johnson]},
  year = {2025},
  url = {https://github.com/MushroomFleet/masonry-css-grid-layout-skill},
  version = {1.0.0}
}
```

### Donate:

[![Ko-Fi](https://cdn.ko-fi.com/cdn/kofi3.png?v=3)](https://ko-fi.com/driftjohnson)
