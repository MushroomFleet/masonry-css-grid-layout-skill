# MasonryCSS Grid Layout — Technical Grounding

A complete reference for implementing masonry-style layouts using CSS Grid Lanes (`display: grid-lanes`), as introduced in Safari Technology Preview 234+.

---

## What Is CSS Grid Lanes?

CSS Grid Lanes is a new CSS display mode (`display: grid-lanes`) that enables native masonry-style layouts — where items of varying heights stack tightly in columns (or rows) without uniform row heights. This eliminates the need for JavaScript layout libraries like Masonry.js.

It uses the full power of CSS Grid's `grid-template-*` syntax to define lanes, and introduces a new placement algorithm that decides where items go based on which column is closest to the top of the container.

**Browser support:** Safari Technology Preview 234+ (as of early 2026).

---

## Core Concept: The "Highway" Mental Model

Think of items being placed like cars merging onto a highway in bumper-to-bumper traffic. Each new item "changes lanes" to end up in whichever column gets it **closest to the top** (i.e. the shortest column at that moment). This produces the tight, gap-free stacking characteristic of masonry layouts.

---

## Minimal Setup — Three Lines of CSS

```css
.container {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
```

**What each line does:**

- `display: grid-lanes` — activates the Grid Lanes container and placement algorithm.
- `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))` — creates as many columns as will fit, each at least 250px wide, sharing available space equally. The browser calculates column count automatically — no media queries needed.
- `gap: 16px` — applies a 16px gap both between columns (lanes) and between items within each lane.

**HTML structure:**

```html
<main class="container">
  <figure><img src="photo-1.jpg"></figure>
  <figure><img src="photo-2.jpg"></figure>
  <figure><img src="photo-3.jpg"></figure>
  <!-- etc. -->
</main>
```

---

## Layout Direction: Waterfall vs. Brick

Grid Lanes supports two flow directions, determined by which axis you define lanes on.

### Waterfall (columns → items fall downward)

Define lanes using `grid-template-columns`. Items are placed top-to-bottom within each column.

```css
.container {
  display: grid-lanes;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

### Brick (rows → items flow left to right)

Define lanes using `grid-template-rows`. Items are placed left-to-right within each row.

```css
.container {
  display: grid-lanes;
  grid-template-rows: 1fr 1fr 1fr;
}
```

**How the direction is inferred:** A new default value `normal` for `grid-auto-flow` automatically detects whether to flow by columns or rows based on which `grid-template-*` property you set. You don't need to set `grid-auto-flow` explicitly as long as it hasn't been overridden elsewhere. If it has, `unset` it.

> ⚠️ The CSS Working Group is still finalising whether explicit direction control will use `grid-auto-flow` or a new property like `grid-lanes-direction`. The `normal` default works today without that decision.

---

## Lane Sizing Techniques

Because Grid Lanes uses standard `grid-template-*` syntax, any CSS Grid sizing pattern works for lanes.

### Alternating narrow and wide columns

```css
.container {
  display: grid-lanes;
  grid-template-columns:
    repeat(auto-fill, minmax(8rem, 1fr) minmax(16rem, 2fr))
    minmax(8rem, 1fr);
}
```

This creates a repeating pattern of narrow–wide pairs, with the first and last columns always narrow, across any viewport width.

### Fixed number of equal columns

```css
.container {
  display: grid-lanes;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
```

---

## Spanning Items Across Lanes

Items can be told to span multiple lanes using standard `grid-column` (or `grid-row` for brick layouts). This enables editorial-style designs with hero items, secondary items, and small items in the same flow.

```css
main {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(20ch, 1fr));
  gap: 2lh;
}

/* Default: all items span one column */
article {
  grid-column: span 1;
}

/* At wider viewports: give key items more prominence */
@media (1250px < width) {
  article:nth-child(1) {
    grid-column: span 4;   /* Hero item */
  }

  article:nth-child(2),
  article:nth-child(3),
  article:nth-child(4),
  article:nth-child(5),
  article:nth-child(6),
  article:nth-child(7),
  article:nth-child(8) {
    grid-column: span 2;   /* Secondary items */
  }
}
```

Items not explicitly spanned remain at `span 1` (small/tertiary items). This creates a newspaper-style hierarchy within the same masonry flow.

---

## Explicitly Placing Items

Items can be pinned to specific lane positions using negative `grid-column` indices — useful for persistent headers or sidebars regardless of column count.

```css
main {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(24ch, 1fr));
}

/* Always place the header in the last two columns */
header {
  grid-column: -3 / -1;
}
```

Negative indices count from the end, so `-3 / -1` means "the last two columns", no matter how many columns the viewport produces.

---

## Flow Tolerance

### The Problem

Because items have varying heights, tiny differences can cause the placement algorithm to send items to unexpected columns. For example, if column A is 2px shorter than column B, the next item goes into column A — even though the difference is imperceptible and the resulting DOM order (for keyboard/screenreader users) may be confusing.

### The Solution: `flow-tolerance`

`flow-tolerance` defines a threshold below which column height differences are treated as a **tie**. When columns are within this tolerance of each other, items are placed in source order rather than optimising for the shortest column.

```css
.container {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  flow-tolerance: 1em; /* default */
}
```

**Default value:** `1em` — differences smaller than 1em are ignored and treated as ties.

**Higher tolerance** → items flow more left-to-right (orderly, predictable tabbing order). Use for text-heavy content where reading order matters.

**Lower tolerance** → items aggressively seek the shortest column (tighter packing, more visual shuffling). Use for pure image galleries where packing density matters more than order.

**Accessibility consideration:** Users tabbing through the page or using a screenreader experience items in DOM source order. A low tolerance can cause keyboard focus to jump back and forth across the layout unpredictably. Set tolerance appropriately for your content.

> **Note on naming:** This property was called `item-tolerance` in the original spec and in Safari Technology Preview 234. The CSS Working Group renamed it to `flow-tolerance` on January 7, 2026. Updated in Safari Technology Preview 236.

---

## Accessibility Benefits

CSS Grid Lanes has built-in accessibility advantages over JavaScript masonry libraries:

**Keyboard navigation** — Because items can fill columns in approximate source order (via `flow-tolerance`), users tabbing through the page move across currently-visible content naturally, rather than descending all the way to the bottom of column one before moving to column two.

**Infinite scroll compatibility** — Grid Lanes handles dynamic content loading natively. As new items are appended to the container, the layout algorithm places them correctly without requiring JavaScript to recalculate positions.

---

## Complete Property Reference

| Property | Purpose | Example |
|---|---|---|
| `display: grid-lanes` | Activates the Grid Lanes container | `display: grid-lanes` |
| `grid-template-columns` | Defines vertical lanes (waterfall mode) | `repeat(auto-fill, minmax(250px, 1fr))` |
| `grid-template-rows` | Defines horizontal lanes (brick mode) | `1fr 1fr 1fr` |
| `gap` | Space between lanes and between items | `16px` |
| `grid-column` | Span or place an item across lanes | `span 4`, `-3 / -1` |
| `flow-tolerance` | Threshold for treating columns as equal height | `1em` (default) |
| `grid-auto-flow` | Flow direction (use `normal` or `unset`) | `normal` (default) |

---

## Worked Examples Summary

### 1. Responsive Photo Gallery

```css
.gallery {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}
```

Zero media queries. Columns adapt automatically to viewport width.

### 2. Alternating Column Widths

```css
.gallery {
  display: grid-lanes;
  grid-template-columns:
    repeat(auto-fill, minmax(8rem, 1fr) minmax(16rem, 2fr))
    minmax(8rem, 1fr);
  gap: 1rem;
}
```

Narrow → wide → narrow alternating rhythm, always ending on a narrow column.

### 3. Editorial / Newspaper Layout

```css
main {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(20ch, 1fr));
  gap: 2lh;
}
article { grid-column: span 1; }
@media (1250px < width) {
  article:nth-child(1) { grid-column: span 4; }
  article:nth-child(2),
  article:nth-child(3),
  article:nth-child(4),
  article:nth-child(5),
  article:nth-child(6),
  article:nth-child(7),
  article:nth-child(8) { grid-column: span 2; }
}
```

### 4. Pinned Header in Last Column(s)

```css
main {
  display: grid-lanes;
  grid-template-columns: repeat(auto-fill, minmax(24ch, 1fr));
}
header {
  grid-column: -3 / -1;
}
```

### 5. Horizontal Brick Layout

```css
.bricks {
  display: grid-lanes;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 12px;
}
```

Items fill left-to-right across rows instead of top-to-bottom in columns.

---

## Key Differences from JavaScript Masonry

| | CSS Grid Lanes | JavaScript Masonry |
|---|---|---|
| Dependencies | None | External library required |
| Infinite scroll | Native | Requires JS recalculation |
| Keyboard navigation | DOM source order | Can break tab order |
| Responsive | Automatic | Requires resize handlers |
| Performance | Browser-native | JavaScript overhead |
| Spanning/placement | Full CSS Grid power | Limited |

---

## Live Demos

All demos available in Safari Technology Preview at `webkit.org/demos/grid3`:

- Photo gallery (basic + alternating columns)
- Newspaper article layout
- Museum website with pinned header
- Mega menu footer

---

## Specification Status

CSS Grid Lanes is being standardised by the CSS Working Group. The current implementation in Safari Technology Preview 234+ reflects the working specification. Key open issues:

- Direction control property: whether to extend `grid-auto-flow` or introduce `grid-lanes-direction` (use `normal` default to remain compatible with either outcome).
- `flow-tolerance` naming was finalised on January 7, 2026 (previously `item-tolerance`).
