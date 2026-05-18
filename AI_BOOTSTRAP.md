# 🧠 AI_BOOTSTRAP.md
# THE FIRST FILE ANY AI MUST READ. PASTE THIS INTO SYSTEM INSTRUCTIONS OR FIRST MESSAGE.
# Version: 1.0 · Locked May 17, 2026

═══════════════════════════════════════════════════════════════════
SECTION 1 — STOP. READ THIS FIRST.
═══════════════════════════════════════════════════════════════════

You are joining an in-progress automotive ecosystem project called AutoProMax (APM).
This is NOT a new project. It has 17 completed batches, a full Brain architecture spec,
a locked design language, and clear constraints. Your job is to CONTINUE work, not
restart it.

Before writing a single line of code or making a single suggestion, you MUST:
1. Read every file in SECTION 5 (Mandatory Reading Order)
2. Confirm in your reply that you have read them, one by one
3. Read ROUND_TRACKER.md to know the CURRENT state
4. Read the NEXT BATCH brief at the bottom of ROUND_TRACKER.md
5. Follow all 12 ETERNAL RULES in SECTION 3 — no exceptions

If you cannot read a file, STOP and ask the user to paste it. Do not guess. Do not
invent state. Do not suggest features that contradict existing decisions in
DECISION_LOG.md.

═══════════════════════════════════════════════════════════════════
SECTION 2 — PROJECT IDENTITY (the 1-paragraph summary)
═══════════════════════════════════════════════════════════════════

AutoProMax (APM) is a mobile-first automotive ecosystem built in React + Vite + Tailwind
+ Zustand + Framer Motion, deployed on Vercel. It is the FIRST of multiple ecosystems
(future: GroceryMax, MediMax, SchoolMax, etc.) that will all feed into a separate native
Brain App (codename BRAIN-M56-OMEGA). The Brain App orchestrates all ecosystems using a
56-pillar + 7-meta-layer architecture. APM itself has 3 tiers: Tier-1 Brain App (not yet
built), Tier-2 Admin (built, 11 sections live), Tier-3 Consumer site (built, live at
https://auto-pro-vite.vercel.app). Launch market: Algeria + Nigeria. Launch is gated at
the end of R10 — never before — with 13 mandatory checkpoints (see LAUNCH_GATE_R10.md).

═══════════════════════════════════════════════════════════════════
SECTION 3 — THE 12 ETERNAL RULES (no exceptions)
═══════════════════════════════════════════════════════════════════

01. PASTE AI_BOOTSTRAP.md AT THE START OF EVERY NEW CHAT — no exceptions
02. NEVER OFFER SURGICAL EDITS — only full file replacements
03. EVERY BATCH UPDATES: ROUND_TRACKER.md + BATCH_LEDGER.md + PROGRESS.md
04. ONE ROUND AT A TIME — no skipping ahead, no premature launch suggestions
05. NO "WE'LL DOCUMENT IT LATER" — docs ship with code, in the same batch
06. NO GHOST BUTTONS SURVIVE A ROUND — every batch closes them or hides them
07. NO LAUNCH SUGGESTIONS BEFORE R10 — the 13 checkpoints are the contract
08. VERCEL BRANCH PREVIEWS BEFORE MAIN — never push untested to production
09. EACH FILE ≤ 800 LINES — easier to paste, debug, review
10. ALL ARCHITECTURE DECISIONS GO IN DECISION_LOG.md — settled = settled
11. CONFIRM READING ALL 15 MANDATORY FILES BEFORE WRITING CODE
12. WHEN CONTEXT DEGRADES, START A NEW CHAT WITH THIS FILE — never push through

═══════════════════════════════════════════════════════════════════
SECTION 4 — PROJECT STATE SNAPSHOT (current as of Batch 18.1)
═══════════════════════════════════════════════════════════════════

Live URL          : https://auto-pro-vite.vercel.app
Repo              : github.com/houcinhadjaissa-cyber/AutoPro-Vite
Current round     : R4 (about to begin) — see ROUND_TRACKER.md
Last completed    : Batch 18.1 — Memory System Lock
Launch readiness  : ~35% (0 of 13 checkpoints passing — see LAUNCH_GATE_R10.md)
Active blockers   : Oracle Free Tier VM not set up (needed for R5)
Active decisions  : See DECISION_LOG.md — 5 locked decisions
Tier-1 Brain App  : 🔴 NOT BUILT (post-launch, separate native app)
Tier-2 Admin      : ✅ LIVE — 11 sections, demo auth, session+lockout, audit log
Tier-3 Consumer   : ✅ LIVE — homepage + checkout + nav + role gating

═══════════════════════════════════════════════════════════════════
SECTION 5 — MANDATORY READING ORDER (15 files)
═══════════════════════════════════════════════════════════════════

Read in this exact order. After each one, state in your reply "✅ Read [filename]".

 1. AI_BOOTSTRAP.md            ← YOU ARE HERE
 2. ROUND_TRACKER.md            ← Current round, % complete, next batch brief
 3. LAUNCH_GATE_R10.md          ← The 13 launch checkpoints (non-negotiable)
 4. DECISION_LOG.md             ← Locked decisions — never revisit
 5. MASTER_PLAN.md              ← v4.4 — read addenda at bottom
 6. BRAIN_MASTER_PLAN.md        ← 56-pillar + 7-meta-layer M56-OMEGA spec
 7. THREE_TIER_ARCHITECTURE.md  ← Brain ↔ Admin ↔ Consumer mental model
 8. DESIGN_SYSTEM.md            ← APM Apple iOS 26 visual language (LOCKED)
 9. SECURITY_MASTER_ANALYSIS.md ← 17-point checklist + 8 gaps
10. ROLES_AND_ACCESS.md         ← customer/business/employee/admin tiers
11. AUTOPRO_ADMIN_PLAN.md       ← 11 admin sections mapped to pillars
12. AUTOPRO_SECURITY_PLAN.md    ← Consumer + admin security baseline
13. ECOSYSTEM_REGISTRY.md       ← APM = Ecosystem #1 of N
14. ARCHITECTURE.md             ← Current file tree + data flows
15. BATCH_LEDGER.md             ← Cumulative log of every batch done

═══════════════════════════════════════════════════════════════════
SECTION 6 — CONFIRMATION CHECKLIST (state these out loud before coding)
═══════════════════════════════════════════════════════════════════

Before delivering ANY batch, you must paste this checklist into your reply:

[ ] I have read all 15 files in SECTION 5
[ ] I have read the NEXT BATCH brief at the bottom of ROUND_TRACKER.md
[ ] I will deliver full file replacements only (no surgical edits)
[ ] I will update ROUND_TRACKER.md + BATCH_LEDGER.md + PROGRESS.md in this batch
[ ] I will use 4-backtick fences for all markdown files
[ ] I will not suggest any feature that contradicts DECISION_LOG.md
[ ] I will not suggest launch before R10 checkpoints are all green
[ ] I understand the user works phone-only via GitHub Mobile

If you cannot check all 8 boxes, STOP and ask the user for clarification.

═══════════════════════════════════════════════════════════════════
SECTION 7 — TIER ARCHITECTURE (1-paragraph reference)
═══════════════════════════════════════════════════════════════════

TIER 1 = THE BRAIN APP (separate native Rust+Tauri app, owner-only, NOT YET BUILT).
Runs 56 pillars + 7 meta-layers. Receives events from all ecosystems. Sends signed
directives back. Hardware-bound, ZK-verified, air-gap capable.

TIER 2 = PER-ECOSYSTEM ADMIN PANEL (this repo's /admin route). Implements Pillar 11
(Human Governance & Override UI). Receives directives from Tier 1, executes after
human approval. Currently LIVE with 11 sections, demo auth.

TIER 3 = PER-ECOSYSTEM CONSUMER APP (this repo's main routes). Public-facing.
Currently LIVE.

═══════════════════════════════════════════════════════════════════
SECTION 8 — LAUNCH GATE (13 checkpoints — read LAUNCH_GATE_R10.md for detail)
═══════════════════════════════════════════════════════════════════

Public launch is FORBIDDEN until ALL 13 of these pass:

 1. Knowledge Graph queries <200ms p95
 2. Event bus 10K msg/sec @ <50ms latency
 3. RLS + OPA: 100% zero tenant leakage (50–100 brands)
 4. k6 stress test: p95 <500ms, error rate <0.1%
 5. ZK-proof generation <2s for compliance/margin
 6. Offline CRDT sync auto-resolves on reconnect
 7. Crisis playbook activates <5s + human gate <10s
 8. Mobile PWA loads <3s on 3G, <10KB per response
 9. eBPF Falco detects simulated attack <100ms
10. Federated learning syncs without raw data exposure
11. EU DPP + China EPR reports auto-generate
12. OPA/Cedar blocks non-compliant routing (403 + audit)
13. MBA meta-layers optimize without bypassing human gate

═══════════════════════════════════════════════════════════════════
SECTION 9 — ROUND ROADMAP (R4 → R10 — read ROUND_TRACKER.md for live status)
═══════════════════════════════════════════════════════════════════

R4  Real Identity Layer       — Supabase Auth, W3C DIDs/VCs, 4 account-type logins
R5  Core Data Graph + Bus     — Neo4j + TimescaleDB + Weaviate + NATS + Temporal
R6  Real Commerce + Audit     — Stripe live, real catalog, ghost-button audit
R7  Multi-Role Dashboards     — Business + employee + service provider + fleet + shipping
R8  Compliance + Crisis + ZK  — OPA/Cedar, crisis playbooks, circom proofs, DPP/EPR
R9  Synthetic Stress (50–100) — Real-brand simulation + k6 + emergency scenarios
R10 MBA Bridge + Validation   — brainBridge live + Falco + federated learning + 13 checks

═══════════════════════════════════════════════════════════════════
SECTION 10 — ESCALATION PROTOCOL (when you get stuck)
═══════════════════════════════════════════════════════════════════

If you hit a wall mid-batch:

1. DO NOT push degraded work to GitHub
2. DO write a status update to ROUND_TRACKER.md ("Blocked on X")
3. DO summarize what you completed and what remains
4. DO suggest the user start a new chat with AI_BOOTSTRAP.md
5. DO NOT guess at missing context — ask explicitly

═══════════════════════════════════════════════════════════════════
SECTION 11 — NEXT BATCH BRIEF (always check ROUND_TRACKER.md for live version)
═══════════════════════════════════════════════════════════════════

The next batch ID and scope are ALWAYS defined at the bottom of ROUND_TRACKER.md.
Read it. Confirm the scope. Then deliver.

═══════════════════════════════════════════════════════════════════
END OF AI_BOOTSTRAP.md — Now proceed to ROUND_TRACKER.md
═══════════════════════════════════════════════════════════════════
