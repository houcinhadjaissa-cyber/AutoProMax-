# 📊 ROUND_TRACKER.md
# THE LIVE STATUS BOARD — UPDATED EVERY BATCH
# Last updated: May 17, 2026 · Batch 18.1

═══════════════════════════════════════════════════════════════════
HEADER
═══════════════════════════════════════════════════════════════════

Current Round    : R4 (about to begin)
Last Batch       : 18.1 — Memory System Lock (this one)
Next Batch       : R4.1 — Supabase Setup Guide + Auth Scaffolding
Launch Readiness : 0 / 13 checkpoints passing (~35% infrastructure complete)
Live URL         : https://auto-pro-vite.vercel.app
Repo             : github.com/houcinhadjaissa-cyber/AutoPro-Vite

═══════════════════════════════════════════════════════════════════
ROUND STATUS TABLE
═══════════════════════════════════════════════════════════════════

R1   ✅ DONE   Brain v3 + Admin Tier 2 + APM UX + Security Lock
R2   ✅ DONE   Security Hardening (session + lockout + audit)
R3   ✅ DONE   Checkout Flow + Orders Store
R3.5 ✅ DONE   Navigation history + tiered access control
R4   🟡 NEXT   Real Identity Layer (Supabase Auth + DIDs + 4 logins)
R5   🔴 OPEN   Core Data Graph + Event Bus (Oracle VM infra)
R6   🔴 OPEN   Real Commerce + Ghost Button Audit (Stripe + catalog)
R7   🔴 OPEN   Multi-Role Dashboards (business + employee + etc.)
R8   🔴 OPEN   Compliance + Crisis + ZK Layer (OPA + circom + DPP)
R9   🔴 OPEN   Synthetic Stress Environment (50–100 real brands)
R10  🔴 OPEN   MBA Bridge + Launch Validation (13 checkpoints)

═══════════════════════════════════════════════════════════════════
ACTIVE BLOCKERS
═══════════════════════════════════════════════════════════════════

[ ] Oracle Free Tier VM not yet provisioned — needed for R5
[ ] Supabase project not yet created — needed for R4
[ ] No laptop yet — slows infra setup for R5+

═══════════════════════════════════════════════════════════════════
ACTIVE DECISIONS (snapshot — full in DECISION_LOG.md)
═══════════════════════════════════════════════════════════════════

#001 ✅ Primary color: #2563EB APM Blue (replaced #6FB81A green)
#002 ✅ Frontend: React + Vite (FlutterFlow rejected)
#003 ✅ Infra hosting: Oracle Cloud Free Tier (24GB RAM forever free)
#004 ✅ Stress test data: real brands with real products (R9)
#005 ✅ Memory system: AI_BOOTSTRAP.md + 4 supporting files in repo
#006 ✅ Launch gate: R10 with all 13 checkpoints — never before

═══════════════════════════════════════════════════════════════════
NEXT BATCH BRIEF — Batch R4.1
═══════════════════════════════════════════════════════════════════

BATCH ID    : R4.1
CODENAME    : Supabase Setup + Auth Scaffolding
ESTIMATED   : ~6 files
PREREQUISITE: User must create free Supabase project (5 min guide included)

DELIVERABLES:
1. SUPABASE_SETUP.md         — 5-min step-by-step setup guide for user
2. src/lib/supabase.ts        — client init with graceful null-fallback
3. src/lib/auth/index.ts      — unified auth API (Supabase OR localStorage demo)
4. Updated src/stores/authStore.ts — uses new auth wrapper
5. Updated src/pages/admin/index.tsx — real TOTP when Supabase active
6. supabase/migrations/0001_init.sql — core_users_global + sessions tables w/ RLS

DEFINITION OF DONE:
- [ ] User can create real Supabase account, paste 3 env vars on Vercel
- [ ] When env vars present: real signup/login/TOTP works
- [ ] When env vars absent: existing demo mode still works (no regression)
- [ ] RLS policies prevent cross-user data leakage
- [ ] Audit log captures real login attempts
- [ ] Build is green on Vercel

═══════════════════════════════════════════════════════════════════
BATCHES THIS SESSION (Session 3 — chronological)
═══════════════════════════════════════════════════════════════════

R1     2026-05-16  ✅  Brain plan + admin + APM UX + security baseline
R2     2026-05-17  ✅  Security hardening (useSession, useLoginAttempts, AdminGate)
R3     2026-05-17  ✅  Checkout flow (4 steps + ordersStore + checkoutStore)
R3.5   2026-05-17  ✅  Navigation history + admin gating + tiered access
18.1   2026-05-17  ✅  Memory system lock (this batch)

═══════════════════════════════════════════════════════════════════
HOW TO USE THIS FILE
═══════════════════════════════════════════════════════════════════

- Update after EVERY batch (non-negotiable)
- Move completed batches into the chronological list
- Update "Next Batch Brief" with the new upcoming batch
- Update "Active Blockers" as they're resolved or added
- Keep "Launch Readiness" percentage honest

═══════════════════════════════════════════════════════════════════
END OF ROUND_TRACKER.md
═══════════════════════════════════════════════════════════════════
═══════════════════════════════════════════════════════════════════
HEADER
═══════════════════════════════════════════════════════════════════

Current Round    : R4 (in progress)
Last Batch       : R4.1 — Supabase Setup Guide + Auth Scaffolding ✅
Next Batch       : R4.2 — Account Creation Flow + W3C DID Scaffolding
Launch Readiness : 0 / 13 checkpoints passing (~38% infrastructure complete)
Live URL         : https://auto-pro-vite.vercel.app
Repo             : github.com/houcinhadjaissa-cyber/AutoPro-Vite

═══════════════════════════════════════════════════════════════════
ROUND STATUS TABLE
═══════════════════════════════════════════════════════════════════

R1   ✅ DONE   Brain v3 + Admin Tier 2 + APM UX + Security Lock
R2   ✅ DONE   Security Hardening (session + lockout + audit)
R3   ✅ DONE   Checkout Flow + Orders Store
R3.5 ✅ DONE   Navigation history + tiered access control
R4   🟡 ACTIVE Real Identity Layer (Supabase Auth + DIDs + 4 logins)
  - R4.1 ✅ Supabase Setup + Auth Scaffolding
  - R4.2 ⏳ Account Creation + DID Wallet Stub
  - R4.3 ⏳ 4 Account-Type Login Flows
  - R4.4 ⏳ Session Binding + Device Fingerprinting
R5   🔴 OPEN   Core Data Graph + Event Bus (Oracle VM infra)
R6   🔴 OPEN   Real Commerce + Ghost Button Audit (Stripe + catalog)
R7   🔴 OPEN   Multi-Role Dashboards (business + employee + etc.)
R8   🔴 OPEN   Compliance + Crisis + ZK Layer (OPA + circom + DPP)
R9   🔴 OPEN   Synthetic Stress Environment (50–100 real brands)
R10  🔴 OPEN   MBA Bridge + Launch Validation (13 checkpoints)

═══════════════════════════════════════════════════════════════════
ACTIVE BLOCKERS
═══════════════════════════════════════════════════════════════════

[ ] Oracle Free Tier VM not yet provisioned — needed for R5
[x] Supabase project created — env vars added to Vercel ✅
[ ] No laptop yet — slows infra setup for R5+

═══════════════════════════════════════════════════════════════════
NEXT BATCH BRIEF — Batch R4.2
═══════════════════════════════════════════════════════════════════

BATCH ID    : R4.2
CODENAME    : Account Creation Flow + W3C DID Scaffolding
ESTIMATED   : ~8 files
PREREQUISITE: Supabase project active, R4.1 tested

DELIVERABLES:
1. src/pages/RegisterPage.tsx — Multi-account-type signup form
2. src/lib/wallet/didWallet.ts — W3C DID stub (placeholder for real implementation)
3. src/components/forms/AccountTypeSelector.tsx — Customer/Business/Employee selection
4. src/lib/email/sendgridAdapter.ts — Email verification templates
5. src/pages/VerifyEmailPage.tsx — Magic link + OTP verification
6. Updated src/stores/authStore.ts — Register flow integration
7. Updated src/App.tsx — Register route + VerifyEmail route
8. docs/W3C_DID_GUIDE.md — Technical reference for future implementation

DEFINITION OF DONE:
- [ ] User can register with email/password
- [ ] Account type selected during registration
- [ ] Email verification sent (SendGrid adapter ready)
- [ ] DID wallet initialized (stub stores publicKeyHash)
- [ ] Verified users gain access immediately
- [ ] Unverified users see limited features
- [ ] All flows testable in demo mode (Supabase optional)
- [ ] Build green on Vercel
═══════════════════════════════════════════════════════════════════
BATCH R4.A — 2026-05-18 — Offline Sync (PWA) Foundation
═══════════════════════════════════════════════════════════════════

BATCH ID    : R4.A
CODENAME    : Offline Sync (PWA) Foundation
STATUS      : ✅ DELIVERED (awaiting user paste + test)
FILES ADDED : vite.config.ts (updated), public/manifest.json (new), src/service-worker.ts (new)
FILES MODIFIED: ROUND_TRACKER.md, BATCH_LEDGER.md

DEFINITION OF DONE:
- [x] PWA plugin configured in Vite
- [x] manifest.json with icons, shortcuts, screenshots
- [x] Service worker caches static assets + API responses
- [x] Background sync queue for cart/orders when offline
- [x] Mobile test instructions included
- [ ] USER TEST: "Add to Home Screen" prompt appears
- [ ] USER TEST: Offline cart items sync on reconnect

NEXT BATCH: R4.B — Supabase Real Auth Integration
