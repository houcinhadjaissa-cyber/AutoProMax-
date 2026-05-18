# 🗺️ AUTOPRO MASTER PLAN
# Version: 3.0 — Rebuilding with proper architecture

## A — WHAT THE PROJECT IS
Autopro is a mobile-first automotive ecosystem: parts marketplace + service booking + vehicle garage + fleet management.
Autopro is Pillar 1 of a larger universal ecosystem.

## B — THE 6 PILLARS
1. Universal Identity & Data Graph Core
2. Reusable Project Template Engine
3. Unified Payment & Wallet Orchestrator
4. Event-Driven Automation & Sync Layer
5. Compliance & Security Orchestration
6. Developer Handoff & Extensibility Layer

## C — MULTI-ROLE ACCOUNT SYSTEM
1. Client (Buyer)
2. Service Provider (Mechanic)
3. Supplier (Manufacturer/Wholesaler)
4. Fleet Company
5. Shipping Company

## D — DESIGN SYSTEM
- Primary: #6FB81A (Autopro Green)
- Secondary: #FF9900 (Amazon Orange)
- Spacing: 8px grid
- Light theme default, Night mode toggle

## E — CURRENT STATUS
- ✅ Foundation: 16 pages, 6 stores, multi-role system
- 🔴 Next: Product Detail + Compatibility Engine
## ═══════════════════════════════════════════
## COMPLETED LOG (Append Only — Never Delete)
## ═══════════════════════════════════════════

### [Session 1 — Batches 1-8] Initial Build
- 16 page routes, 5 Zustand stores, design tokens
- ⚠️ Identified gaps: no header/footer/products/checkout/roles

### [Session 2 — Steps 1-3] Proper Architecture
- ✅ Step 1: Sticky Header + Footer + ProductCard + 10 mock products
- ✅ Step 2: Multi-Role Account System (5 roles + RoleSelector)
- ✅ Step 3: Product Detail + Compatibility Engine + Save System
- ✅ Deployment verified on Vercel (auto-pro-vite.vercel.app)
- ✅ Pipeline proven: Arena → GitHub → Vercel works

### Step 3 Details:
- Product Detail page: 3 tabs (Info/Compatibility/Reviews)
- Compatibility Engine: checks garage vehicle, shows ranked list with color-coded percentages
- Install count on product cards, expandable vehicle compatibility list
- Save system: Facebook-style bookmarks, grouped by vehicle, filters (date/price)
- Vehicle Detail page: TecDoc-style layout with emoji car images, specs, categories
- Services restructured: 4 sections (Mechanics, Car Wash, Diagnostics, Towing) with top 4 providers each
- Search page: single search bar with auto-results, brand/price filters
- EPC renamed (removed "7Zap"), search dropdown
- B2B hidden for non-business roles
- Night mode toggle moved to Profile → Settings (working)
- Notification bell moved to header
- Categories moved above products with swipeable gradient icon cards

---

## 🆕 v4.4 ADDENDUM — Memory System Lock + Corrected R4→R10 Roadmap
## Locked: May 17, 2026 · Batch 18.1

### Why this addendum exists

Earlier batches drifted toward suggesting public launch at R4 or R6. The project
owner corrected course: **launch is gated at the end of R10 with all 13
checkpoints green**. This addendum locks the corrected roadmap and the AI memory
system that enforces it.

### Memory System (Decision #005)

The GitHub repo IS the brain. Five files restore full context to any AI in 60s:

1. **AI_BOOTSTRAP.md** — entry point, 12 eternal rules, mandatory reading list
2. **ROUND_TRACKER.md** — live status board, current batch, next batch
3. **LAUNCH_GATE_R10.md** — the 13 launch checkpoints (contract)
4. **DECISION_LOG.md** — locked architectural decisions
5. **BATCH_LEDGER.md** — cumulative log of every batch

Every batch from now on MUST update at least ROUND_TRACKER + BATCH_LEDGER +
PROGRESS, in the same response that delivers code.

### Corrected R4→R10 Roadmap (Decision #006)

R4  Real Identity Layer (Supabase Auth + W3C DIDs/VCs + 4 logins)
R5  Core Data Graph + Event Bus (Oracle Free Tier VM with Neo4j/NATS/Temporal)
R6  Real Commerce + Ghost Button Audit (Stripe live + real catalog)
R7  Multi-Role Dashboards (business + employee + provider + fleet + shipping)
R8  Compliance + Crisis + ZK (OPA/Cedar + circom + DPP/EPR)
R9  Synthetic Stress (50–100 REAL brands — Decision #004)
R10 MBA Bridge + 13-Checkpoint Validation → LAUNCH

### Locked Decisions (full text in DECISION_LOG.md)

- #001 Primary color = #2563EB APM Blue
- #002 Frontend = React + Vite (FlutterFlow rejected)
- #003 Infra = Oracle Cloud Free Tier
- #004 Stress test = real brands, not Faker
- #005 Memory system = AI_BOOTSTRAP + 4 files
- #006 Launch gate = R10 with 13 checkpoints
- #007 No AI builders (Bolt/Lovable/Replit rejected)

### What this addendum INVALIDATES from earlier addenda

- v4.0 / v4.1 / v4.2 / v4.3 references to "soft launch at R4" → INVALID
- Any "ready for users" suggestion before R10 → INVALID
- FlutterFlow PWA option from MASTER_PLAN v1 → INVALID (see Decision #002)

### What stays UNCHANGED from prior versions

- 6 pillars from v2 (now mapped into Brain Master Plan Layer 1)
- 5-role multi-account system from v3
- Algeria + Nigeria launch markets
- Phone-first, free-tier-only, GitHub-main-to-Vercel pipeline
- Zustand persist on all stores
- APM design language (DESIGN_SYSTEM.md)

═══════════════════════════════════════════════════════════════════
END OF v4.4 ADDENDUM
═══════════════════════════════════════════════════════════════════
