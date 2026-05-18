# 🎨 DESIGN_SYSTEM.md — APM (AutoProMax) Design Language
# Locked May 16, 2026 — visual source of truth for ALL ecosystems
# Inspired by iOS 26 Fluid Glass · Original implementation

---

## 🎯 SCOPE
Every page, every ecosystem, every future build MUST follow these rules.
Lives in: `src/index.css` (tokens) + `Header.tsx` + `DynamicIsland.tsx` +
`Icon.tsx` + `src/components/sections/*`.

---

## 1. BRAND DECISION (LOCKED v4)
Primary color changed: `#6FB81A` (Autopro Green) → `#2563EB` (APM Blue).

| Token | Value | Use |
|---|---|---|
| `--color-apm-blue` | `#2563EB` | PRIMARY — buttons, links, brand |
| `--color-apm-green` | `#10B981` | VERIFIED / SCAN — VIN, security, success |
| `--color-apm-amber` | `#F59E0B` | STARS / DEALS — ratings, flash deals |
| `--color-apm-red` | `#EF4444` | ALERTS — cart badge, destructive |
| `--color-apm-gold` | `#C9963B` | PREMIUM — Platinum tier markers |

**Why blue:** trust + finance (Stripe, PayPal, Apple, Samsung). Green is now a
secondary semantic — "verified / scan / secure action".

---

## 2. SURFACE PALETTE

### Dark (default)
| Token | Value |
|---|---|
| `--color-apm-bg` | `#0D0D0D` |
| `--color-apm-surface` | `#111111` |
| `--color-apm-card` | `#1A1A1A` |
| `--color-apm-elevated` | `#242424` |
| `--color-apm-border` | `rgba(255,255,255,0.08)` |
| `--color-apm-border-strong` | `rgba(255,255,255,0.14)` |

### Light (used inside dark pages for contrast — e.g. ProductGrid)
| Token | Value |
|---|---|
| `--color-apm-light` | `#F8FAFC` |
| `--color-apm-light-card` | `#FFFFFF` |
| `--color-apm-light-border` | `#E2E8F0` |
| `--color-apm-light-text` | `#0F172A` |
| `--color-apm-light-muted` | `#64748B` |

### Text on dark
| Token | Value |
|---|---|
| `--color-apm-text` | `#FFFFFF` |
| `--color-apm-text-secondary` | `#A0A0A0` |
| `--color-apm-text-muted` | `#555555` |

---

## 3. GLASS SYSTEM (Signature)

**.glass** — standard surface:
- background: `rgba(20,20,22,0.78)`
- backdrop-filter: `blur(32px) saturate(180%)`
- border: `1px solid rgba(255,255,255,0.10)`
- Use for: modals, dropdowns, tooltips

**.glass-heavy** — modal-level:
- background: `rgba(14,14,16,0.92)`
- backdrop-filter: `blur(48px) saturate(180%)`
- border: `1px solid rgba(255,255,255,0.18)`
- Use for: full-screen overlays

**.glass-shimmer** — iridescent overlay
- 135deg gradient (peach → blue → green) at 4–8% opacity
- Use for: premium hero cards

**.fluid-pill** — the Dynamic Island:
- border-radius: 9999px
- background: `rgba(18,18,20,0.94)`
- backdrop-filter: `blur(32px) saturate(200%)`
- border: `1px solid rgba(255,255,255,0.14)`
- box-shadow: `0 8px 32px rgba(0,0,0,0.72), inset 0 1px 0 rgba(255,255,255,0.1)`
- Use for: floating mobile nav

---

## 4. MOTION LANGUAGE

### Framer Motion springs
- `SPRING` → `{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }` (default)
- `SPRING_BOUNCE` → `{ stiffness: 420, damping: 22, mass: 0.7 }` (tappy)
- `SPRING_SMOOTH` → `{ stiffness: 340, damping: 26 }` (panels)

### CSS easing tokens
- `--spring-bounce` → `cubic-bezier(0.34, 1.56, 0.64, 1)`
- `--spring-smooth` → `cubic-bezier(0.22, 1, 0.36, 1)`
- `--spring-snappy` → `cubic-bezier(0.4, 0, 0.2, 1)`

### Keyframe library
- `islandNotifIn` — Dynamic Island notification slide-in
- `islandCartBurst` — cart icon burst on add (1 → 1.55 → 0.92 → 1)
- `islandColorBloom` — radial gradient explosion on action
- `shimmerSweep` — skeleton loading shimmer
- `ticker` — trust bar marquee scroll
- `flipIn` — countdown digit flip

### Stagger pattern (used in all grids)
- `transition={{ delay: Math.min(index * 0.06, 0.42) }}`
- Cap at 0.42s so grids of 50+ items don't cascade endlessly.

---

## 5. BORDER RADIUS
| Token | Value | Use |
|---|---|---|
| `.card-16` | 16px | small cards |
| `.card-20` | 20px | standard cards |
| `.card-28` | 28px | hero / signature (iOS 26 feel) |
| `rounded-full` | 9999px | pills, badges, Dynamic Island |

---

## 6. TYPOGRAPHY
- Font: **Inter** (variable, opsz 14–32) from Google Fonts
- Sizes: Tailwind defaults (`text-xs` → `text-2xl`)
- Tracking:
  - `.tracking-tight-hero` (-0.03em) — H1
  - `.tracking-tight-title` (-0.02em) — H2/H3
  - `.tracking-tight-sub` (-0.01em) — body
- Weights: 400, 500, 600, 700, 800, 900

---

## 7. THREE SIGNATURE COMPONENTS (reuse everywhere)

### A. Header (`src/components/Header.tsx`)
- Sticky dark; mobile + desktop variants
- Mobile: logo + search pill + menu drawer
- Desktop: logo + Browse dropdown + search + VIN/QR/Search + nav cluster
- One pattern. Don't redesign per page.

### B. Dynamic Island (`src/components/DynamicIsland.tsx`)
- Floating pill `bottom: 24px`, 148×42px
- Mobile-only (`md:hidden`)
- 3 buttons: Profile · Scan/Notif · Cart
- Color bloom on cart add
- Listens to `cart:add` CustomEvent

### C. Quick Search Modal (shared by Header + DynamicIsland)
- Bottom-sheet on mobile, centered on desktop
- Tabs: Search · VIN · QR
- Suggestion chips
- VIN input validates 17 chars
- QR shows simulated scanner with corner brackets

---

## 8. SECTION PATTERN (every homepage section)

Pseudo-structure:
- `<section>` with dark/light background
- `<p className="section-label">EYEBROW — UPPERCASE TRACKED</p>`
- `<h2 className="text-2xl font-extrabold tracking-tight">Section Title</h2>`
- Either a horizontal-scroll carousel OR a responsive grid
- Sections alternate dark/light/muted for rhythm

Rules:
1. Always start with EYEBROW (11px, 700 weight, 0.1em tracking, muted color)
2. H2 always tracking-tight
3. Horizontal carousels = browse content (deals, services, videos)
4. Grids = compare content (products, businesses)

---

## 9. DO / DON'T

✅ DO
- Use `style={{ background: '#...' }}` inline for brand colors (matches codebase)
- Use Framer Motion for all non-trivial animations
- Use the gradient catalog in `ProductGrid.tsx GRADIENTS` for category cards
- Emit `cart:add` CustomEvent on every cart action (powers Dynamic Island)
- Use `whileTap={{ scale: 0.97 }}` on every clickable
- Use `flexShrink: 0` on icons inside flex containers

❌ DON'T
- Don't use `bg-*` Tailwind classes for brand colors
- Don't introduce new colors outside the palette
- Don't use CSS transitions for entrance — always Framer Motion
- Don't put bottom nav on desktop — use Header
- Don't hide CTAs behind the Dynamic Island (use `pb-island`)
- Don't ship a section without an EYEBROW + H2

---

## 10. PER-ECOSYSTEM COLOR OVERRIDES

When cloning for a new ecosystem, change ONLY the primary brand color:

| Ecosystem | Primary | Why |
|---|---|---|
| Autopro | `#2563EB` blue | Trust + finance |
| GroceryMax | `#10B981` green | Fresh + organic |
| MediMax | `#0EA5E9` sky | Calm + clinical |
| SchoolMax | `#7C3AED` purple | Creative + youthful |
| EstateMax | `#C9963B` gold | Premium + property |
| CarSalesMax | `#EF4444` red | Bold + urgent |

Surfaces, glass, motion, components stay identical.
**One design language, infinite ecosystems.**

---

[END — DESIGN_SYSTEM v1.0]
