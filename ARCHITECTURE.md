# 🏗️ AUTOPRO ARCHITECTURE
# Last Updated: Step 3 Complete

## PROJECT STRUCTURE

src/
├── components/
│   ├── Icon.tsx           (55 typed lucide-react icons)
│   ├── Layout.tsx         (Bottom nav + trust bar + safe-area)
│   ├── Header.tsx         (Sticky header with logo, search, notifications, cart, profile)
│   ├── Footer.tsx         (Links, social, trust badges, copyright)
│   ├── ProductCard.tsx    (Product card with image, price, rating, bookmark)
│   ├── ProductDetail.tsx  (Full product detail with 3 tabs)
│   ├── RoleSelector.tsx   (Bottom-sheet role switcher)
│   └── Skeleton.tsx       (Loading skeletons)
├── pages/
│   ├── GaragePage.tsx     (Vehicle management + VehicleDetailPage)
│   ├── ServicesPage.tsx   (4 service sections with providers)
│   ├── MechanicsPage.tsx  (Mechanic finder)
│   ├── VINPage.tsx        (VIN decoder)
│   ├── TrackPage.tsx      (Order tracking)
│   ├── HelpPage.tsx       (Support + FAQs)
│   ├── CategoriesPage.tsx (Category grid)
│   ├── EPCPage.tsx        (OEM parts catalog)
│   ├── ProPage.tsx        (B2B wholesale)
│   ├── ReturnsPage.tsx    (Return management)
│   ├── NotificationsPage.tsx (Notification list)
│   ├── SavedPage.tsx      (Saved/bookmarked items)
│   └── SearchPage.tsx     (Search with filters)
├── stores/
│   ├── index.ts           (Barrel export)
│   ├── cartStore.ts       (Cart management)
│   ├── authStore.ts       (Auth + role)
│   ├── garageStore.ts     (Vehicle management)
│   ├── settingsStore.ts   (Theme, country, currency)
│   ├── toastStore.ts      (Notifications)
│   ├── roleStore.ts       (5-role system)
│   └── saveStore.ts       (Bookmark/save system)
├── data/
│   └── products.ts        (10 mock products)
├── lib/
│   └── compatibilityEngine.ts (Vehicle-part matching)
├── App.tsx                (Router + page dispatcher)
├── index.css              (Design tokens)
└── main.tsx               (React entry)
package.json
vite.config.ts
tsconfig.json
index.html

## DESIGN SYSTEM
- Primary: #6FB81A (Autopro Green)
- Secondary: #FF9900 (Amazon Orange)
- Light theme default, Night mode toggle in Profile → Settings
- 8px grid spacing, Inter/system fonts

## STATE MANAGEMENT
7 Zustand stores (all persisted to localStorage):
cartStore, authStore, garageStore, settingsStore, toastStore, roleStore, saveStore

## PAGE ROUTES
17 routes: home, search, cart, chat, profile, services, garage, categories, mechanics, vin, track, help, epc, pro, returns, notifications, saved

## MISSING COMPONENTS (Next Steps)
1. Checkout flow (4 steps)
2. Real Supabase data integration
3. Service Provider Dashboard
4. Supplier Portal
5. Fleet Management
6. Shipping Integration
7. PWA install prompt

---

## 🆕 v4.1 ADDENDUM — R2 Security Hardening + R3 Checkout
## Locked: May 17, 2026

### What R2 added (security)
- Admin session expiry (4h TTL with 5-min warning)
- Login attempt limiter (5 failures → 15-min lockout)
- Audit log writes on every admin login + shell mount + logout
- Soft-lock check: `VITE_LOCK_ADMIN=true` blocks all logins except `VITE_ADMIN_EMAIL`
- Session timer visible in admin top bar (click to extend)
- Demo mode banner clearly marks dev builds

### What R3 added (commerce)
- 4-step checkout: Shipping → Payment → Review → Confirmation
- 5 payment methods (Card, PayPal, APM Wallet, COD, Bank Transfer)
- Auto-generated order IDs (APM-XXXXX-XXXX)
- Free shipping over $500, 8% tax
- Cart auto-clears on successful order
- `checkout:start` + `checkout:complete` events fire through eventBus
- `checkout:complete` writes to auditLog (Pillar 46)

### Production lock checklist (before public launch)
- [ ] Set `VITE_LOCK_ADMIN=true` on Vercel
- [ ] Set `VITE_ADMIN_EMAIL=your-real-email` on Vercel
- [ ] Verify only your email passes admin login
- [ ] Verify session timer shows 4h after login
- [ ] Verify 5 wrong attempts triggers 15-min lockout
- [ ] Test checkout end-to-end on production
- [ ] Verify localStorage audit log captures login + checkout events

### Still pending → R4
- Real Supabase Auth backend
- Real Stripe payment processing
- Real product catalog from database
- Email receipts via SendGrid
- Brain Bridge live connection

---

## 🆕 ARCHITECTURE UPDATE — R2 + R3 + R3.5 (May 17, 2026)

### NEW FILES ADDED

**Config (Batch R1):**
- `src/core/config/security.ts` — runtime security flags + policy constants
- `src/core/config/release.ts` — release stamp (current: R3.5)

**Libraries (Batch R1):**
- `src/lib/eventBus.ts` — cross-tier event emitter
- `src/lib/auditLog.ts` — Pillar 46 Merkle-chain audit log (localStorage)
- `src/lib/brainBridge.ts` — dormant Tier 2→1 event queue

**Hooks (Batch R2):**
- `src/hooks/useSession.ts` — 4h admin session TTL with 5-min warning
- `src/hooks/useLoginAttempts.ts` — 5-fail lockout, 15-min duration

**Security components (Batch R2):**
- `src/components/security/RoleGuard.tsx` — per-action role gating
- `src/components/security/AdminGate.tsx` — session+lockout wrapper, exports `formatRemaining()`
- `src/components/security/LockoutBanner.tsx` — visual lockout state

**Checkout (Batch R3):**
- `src/stores/checkoutStore.ts` — 4-step checkout draft state (resumable)
- `src/stores/ordersStore.ts` — completed orders history
- `src/pages/CheckoutPage.tsx` — full 4-step flow + `OrderConfirmation` export

### UPDATED FILES

**Core routing (Batch R3.5):**
- `src/App.tsx` — navigation history stack (cap 30), `goBack()`, browser back integration via `popstate`, hash routing for `#admin-login`, admin button gating, "End Admin Session" button
- `src/components/Layout.tsx` — Page type adds `'checkout'`, `'orderConfirm'`; passes `goBack` + `canGoBack` to Header
- `src/components/Header.tsx` — animated back button (mobile + desktop), logo navigates home

**Auth (Batch R3.5):**
- `src/stores/authStore.ts` — added `accountType` field, `isAdmin()`/`isBusiness()` helpers, auto-elevation via email match against `VITE_ADMIN_EMAIL`

**Admin shell (Batch R2):**
- `src/pages/admin/index.tsx` — full rewrite with session+lockout integration, soft-lock check, audit log on every login attempt + shell mount + logout, session timer in top bar

**Frontend security (Batch R1):**
- `index.html` — CSP meta tag, X-Content-Type-Options, Referrer-Policy, theme-color

### NEW DATA FLOWS

**Cart → Checkout:**
`setPage('checkout')` from CartPage button → CheckoutPage Step 1 → user fills shipping → Step 2 payment → Step 3 review → "Place Order" → `addOrder()` → `eventBus.emit('checkout:complete')` → `auditLog.write()` → `brainBridge.queue()` → Confirmation page

**Admin login (any attempt):**
1. User enters email → soft-lock check → `auditLog.write({ type: 'admin:login', success: false/true })`
2. User enters TOTP → success → `auditLog.write({ step: 'totp-complete' })`
3. Session starts via `useSession.start()` → 4h TTL in localStorage
4. Shell mounts → `auditLog.write({ action: 'shell.mounted' })`

**Admin logout:**
`auditLog.write({ action: 'logout' })` → `session.end()` → `localStorage.removeItem('autopro-admin-session-v1')` → redirect to home

**Navigation history:**
`setPage(p)` → push onto `history[]` (cap 30) → `window.history.pushState({ apmPage: p })` → current page = `history[length - 1]`. `goBack()` → pop last → triggers re-render. `popstate` listener mirrors back.

**Hash routing for admin:**
On mount + on `hashchange` → if `window.location.hash === '#admin-login'` → `setPage('admin')` → clean hash to prevent loop.

### TIER MAPPING (current state)

| Tier | Status | Files |
|------|--------|-------|
| Tier 1 — Brain | 🔴 Not built (R5) — events queue safely in brainBridge.ts |
| Tier 2 — Admin | ✅ Hardened (R2) — `pages/admin/*` + `hooks/useSession.ts` + `components/security/*` |
| Tier 3 — Consumer | ✅ Live + Checkout (R3) + Navigation (R3.5) |

### ACCESS CONTROL (current)

See `ROLES_AND_ACCESS.md` for full details. Summary:
- `customer` (default, hidden admin)
- `business` (R4 — verified, sees business dashboard)
- `employee` (R4 — invited by business)
- `admin` (auto-detected via `VITE_ADMIN_EMAIL` match)

### URL ROUTING TABLE (current)

| URL fragment | Routes to |
|--------------|-----------|
| `/` (no hash) | Home page |
| `/#admin-login` | Admin login screen (always accessible) |
| (none — internal state) | All other pages via `setPage()` |

Browser back button now correctly maps to internal `goBack()`. Forward navigation pushes a new history entry.

### LOCAL STORAGE KEYS (all)

| Key | Purpose | Set by |
|-----|---------|--------|
| `autopro-cart` | Cart items | `cartStore` |
| `autopro-auth` | User + accountType | `authStore` |
| `autopro-saved` | Bookmarked items | `saveStore` |
| `autopro-garage` | Vehicles | `garageStore` |
| `autopro-settings` | Theme, country, currency | `settingsStore` |
| `autopro-role` | Active role for 5-role system | `roleStore` |
| `autopro-checkout` | Draft checkout state | `checkoutStore` |
| `autopro-orders` | Completed orders | `ordersStore` |
| `autopro-admin-session-v1` | 4h admin session | `useSession` |
| `autopro-login-attempts-v1` | Failure counter + lockout | `useLoginAttempts` |
| `autopro-audit-log-v1` | Merkle-chain audit entries | `auditLog` |
| `autopro-brain-queue-v1` | Dormant Tier 2→1 events | `brainBridge` |

---

[END — ARCHITECTURE UPDATE R2+R3+R3.5]
