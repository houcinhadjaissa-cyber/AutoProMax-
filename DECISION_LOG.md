# 🔒 DECISION_LOG.md
# ARCHITECTURAL DECISIONS — ONCE LOCKED, NEVER REVISITED
# Started May 17, 2026

═══════════════════════════════════════════════════════════════════
HOW THIS FILE WORKS
═══════════════════════════════════════════════════════════════════

Each decision is numbered, dated, scoped, and locked. To reopen a locked
decision, a new entry must be added with explicit reasoning. The original
entry stays in place forever as history.

Format:
  #NNN  YYYY-MM-DD  STATUS  TITLE
  Context: why the question arose
  Decision: the final answer
  Alternatives rejected: what we did NOT choose and why
  Consequences: what this enables / forbids
  Owner: who decided

═══════════════════════════════════════════════════════════════════
DECISIONS
═══════════════════════════════════════════════════════════════════

─────────────────────────────────────────────────────────────────
#001  2026-05-16  🔒 LOCKED  Primary brand color
─────────────────────────────────────────────────────────────────
Context: Original Master Plan v2 specified #6FB81A (Autopro Green).
Replit build introduced #2563EB APM Blue as primary.
Decision: PRIMARY = #2563EB (APM Blue). Green #10B981 becomes secondary
("verified / scan / secure action" semantic).
Alternatives rejected: Keep green (rejected — Apple-inspired blue conveys
trust + finance, matches Stripe/PayPal/Apple/Samsung).
Consequences: Every future page must use APM Blue for primary actions.
DESIGN_SYSTEM.md is the source of truth.
Owner: Project owner.

─────────────────────────────────────────────────────────────────
#002  2026-05-17  🔒 LOCKED  Frontend framework
─────────────────────────────────────────────────────────────────
Context: Original Master Plan mentioned FlutterFlow as PWA option.
Actual build was done in React + Vite via Replit.
Decision: STAY React + Vite. FlutterFlow REJECTED — was never used,
no migration value, costs 10+ batches with zero gain.
Alternatives rejected: FlutterFlow migration (rejected — no value),
Next.js migration (rejected — Vite SPA works).
Consequences: All future ecosystems use the same React + Vite stack.
The "FlutterFlow PWA" line in older prompts is HISTORICAL — ignore it.
Owner: Project owner.

─────────────────────────────────────────────────────────────────
#003  2026-05-17  🔒 LOCKED  Infrastructure hosting
─────────────────────────────────────────────────────────────────
Context: R5 requires self-hosted Neo4j + NATS + Temporal + TimescaleDB
+ Weaviate + OPA + Falco. Need a free VM that can run all of these.
Decision: ORACLE CLOUD FREE TIER VM (24GB RAM, forever free, ARM-based).
Alternatives rejected: AWS Free Tier (expires after 12 months),
GCP Free Tier (limited), Fly.io (free tier too small for all services),
Hetzner (paid).
Consequences: One Oracle Always-Free VM hosts all backend infra.
Setup guide will be written in R5.
Owner: Project owner.

─────────────────────────────────────────────────────────────────
#004  2026-05-17  🔒 LOCKED  Stress test data strategy
─────────────────────────────────────────────────────────────────
Context: R9 requires 50–100 brand accounts to stress test the platform.
Decision: REAL BRANDS WITH REAL PRODUCTS loaded before launch as the
final pressure test. Not synthetic Faker data — actual onboarded brands.
Alternatives rejected: Generic Brand_001/Brand_002 names (rejected —
not realistic enough to expose real bottlenecks).
Consequences: R9 requires real brand outreach + onboarding before
launch validation. Faker is allowed for unit tests only, not R9.
Owner: Project owner.

─────────────────────────────────────────────────────────────────
#005  2026-05-17  🔒 LOCKED  AI Memory System
─────────────────────────────────────────────────────────────────
Context: Claude/ChatGPT/Gemini all lose context between sessions.
Tracking 17+ batches of work requires a portable memory protocol.
Decision: GITHUB REPO IS THE BRAIN. AI_BOOTSTRAP.md + 4 supporting
files (ROUND_TRACKER, LAUNCH_GATE_R10, DECISION_LOG, BATCH_LEDGER)
restore full context to ANY AI in 60 seconds.
Alternatives rejected: Claude's saved memory (locked to Claude),
ChatGPT memory (locked to ChatGPT), Notion (AI can't read it).
Consequences: Project is now AI-agnostic. Can migrate from Claude to
Gemini to GPT-5 to any future AI without context loss.
Owner: Project owner.

─────────────────────────────────────────────────────────────────
#006  2026-05-17  🔒 LOCKED  Launch gate
─────────────────────────────────────────────────────────────────
Context: Earlier conversations suggested soft launching at R4 or R6.
Project owner pushed back — full Brain plan requires R10.
Decision: PUBLIC LAUNCH AT END OF R10, with ALL 13 CHECKPOINTS green.
No exceptions, no "show it to 5 friends" before then.
Alternatives rejected: Soft launch at R4 (rejected — too many ghost
buttons, demo auth, no multi-role), Soft launch at R6 (rejected — no
stress test, no compliance layer, no MBA bridge).
Consequences: Every batch is judged by "does this move us toward
checkpoint X". See LAUNCH_GATE_R10.md.
Owner: Project owner.

─────────────────────────────────────────────────────────────────
#007  2026-05-17  🔒 LOCKED  Workflow tools
─────────────────────────────────────────────────────────────────
Context: Bolt/Lovable/Replit all hit token limits or paywalls.
Decision: AI builders REJECTED for execution. Use Claude/Gemini/GPT
as planner+coder, GitHub Mobile as paste/push, Vercel as build+preview.
Alternatives rejected: Bolt.new (token trap), Lovable.dev (token trap),
Replit AI (already exhausted), Cursor alone (needs laptop + API key).
Consequences: $0/month workflow. AI-agnostic via AI_BOOTSTRAP.md.
Owner: Project owner.

═══════════════════════════════════════════════════════════════════
END OF DECISION_LOG.md
═══════════════════════════════════════════════════════════════════
