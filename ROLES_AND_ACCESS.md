# 🔐 ROLES & ACCESS MODEL
# The tiered identity & access system for Autopro and all future ecosystems
# Locked: May 17, 2026 · Batch R3.5

---

## 🎯 OVERVIEW

Every user falls into ONE of FOUR account types. Each type has a different login flow, dashboard, permission set, and entry URL. This is the source of truth for who sees what.

**Account Types:**
- **customer** (default) — public site only, no dashboards
- **business** (verified) — own business dashboard (R4)
  - Sub-types: supplier, manufacturer, wholesaler, service provider, fleet, shipping
- **employee** (invited) — limited view of their business dashboard (R4)
- **admin** (platform owner) — full admin control panel (R3.5)

---

## 1. ACCOUNT TYPES

### customer — default for everyone
- Created automatically on first login
- Can: browse, buy, save, checkout, manage garage, book services
- Cannot see: admin button, business dashboard, employee tools
- Profile page shows: only customer-relevant actions

### business — verified business accounts
- Manually verified by admin (Sellers section in admin)
- Sub-types: supplier, manufacturer, wholesaler, service provider, fleet, shipping
- Can: everything customer can + list products + manage orders + see analytics
- Profile page shows: "Business Dashboard" button
- Login: same as customer + automatic role elevation on verification
- Round 4: dedicated `/business` dashboard

### employee — invited by a business
- Created when a business owner adds them in their dashboard
- Has limited view of THEIR business's data only
- Cannot manage finance or critical settings (configurable by business owner)
- Login: dedicated employee email + password
- Round 4: dedicated `/employee` dashboard (subset of business dashboard)

### admin — platform owner only
- Detected via email match against `VITE_ADMIN_EMAIL` env var
- Can: everything (full admin control panel, all sections)
- Profile page shows: "Open Admin Dashboard" button
- Login: standard customer login + email match triggers admin elevation
- Direct admin entry URL: `https://auto-pro-vite.vercel.app/#admin-login`

---

## 2. WHO SEES THE ADMIN BUTTON

| Condition | Admin button visible? |
|-----------|----------------------|
| `LOCK_ADMIN = false` (dev) | ✅ Yes — everyone (demo mode, with warning) |
| `LOCK_ADMIN = true` + email matches `VITE_ADMIN_EMAIL` | ✅ Yes |
| `LOCK_ADMIN = true` + email does NOT match | ❌ Hidden completely |
| Not logged in | ❌ Hidden completely |

Even when hidden, the admin login screen is reachable via the hash URL `#admin-login` — but only the matching email can pass step 1.

---

## 3. LOGIN FLOWS (current + future)

### Customer login (current — demo mode)
1. Click "Log In" anywhere
2. Enter email + password
3. `authStore.login(email)` → `detectAccountType(email)` checks:
   - email matches `VITE_ADMIN_EMAIL` → `accountType = 'admin'`
   - otherwise → `accountType = 'customer'`
4. Session starts immediately

### Admin login (current)
1. Navigate to `/#admin-login` OR click "Admin Master Control" in profile
2. Soft-lock check (`shouldAllowDemoLogin`):
   - `LOCK_ADMIN = false` → any email passes
   - `LOCK_ADMIN = true` → only `VITE_ADMIN_EMAIL` passes
3. Enter password (any value in demo, real bcrypt in R4)
4. Enter 6-digit TOTP (any 6 digits in demo, real RFC 6238 in R4)
5. Audit log entry written for every step
6. Session active for 4h (visible timer in admin top bar)
7. Click "End Admin Session" in Profile or LogOut in admin top bar to terminate

### Business login (R4 — planned)
1. Navigate to `/#business-login`
2. Enter business email + password
3. Server checks `business_accounts` table for verification status
4. If verified + active → load business dashboard
5. Session 8h (longer than admin, shorter than customer)

### Employee login (R4 — planned)
1. Navigate to `/#employee-login`
2. Enter employee email + temporary password (set by business owner)
3. Force password reset on first login
4. Loads employee dashboard scoped to ONE business
5. Session 4h, idle-timeout 30min

---

## 4. PERMISSION MATRIX (current R3.5)

| Action | Customer | Business | Employee | Admin |
|--------|----------|----------|----------|-------|
| Browse products | ✅ | ✅ | ✅ | ✅ |
| Place order | ✅ | ✅ | ❌ | ✅ |
| Manage garage | ✅ | ✅ | ❌ | ✅ |
| List products | ❌ | ✅ | configurable | ✅ |
| View business orders | ❌ | ✅ | configurable | ✅ |
| View business finance | ❌ | ✅ | ❌ (default) | ✅ |
| Approve sellers | ❌ | ❌ | ❌ | ✅ |
| View all platform data | ❌ | ❌ | ❌ | ✅ |
| Access AI Brain | ❌ | ❌ | ❌ | ✅ |
| Change platform settings | ❌ | ❌ | ❌ | ✅ |
| Trigger Brain directives | ❌ | ❌ | ❌ | ✅ |

Note: Business + Employee dashboards arrive in R4.

---

## 5. URL CONVENTIONS

| Tier | URL pattern | Purpose |
|------|-------------|---------|
| Public site | `/` (no hash) | Customer browsing |
| Admin login | `/#admin-login` | Hidden entry — admin login screen |
| Admin dashboard | `/#admin` (after auth) | Full admin control |
| Business login (R4) | `/#business-login` | Hidden entry — business login |
| Business dashboard (R4) | `/#business` | Business control panel |
| Employee login (R4) | `/#employee-login` | Hidden entry — employee login |

---

## 6. PRODUCTION CHECKLIST (before public launch)

- [ ] Set `VITE_ADMIN_EMAIL=your-real-email@gmail.com` on Vercel
- [ ] Set `VITE_LOCK_ADMIN=true` on Vercel
- [ ] Test: logged in as `your-real-email` → admin button visible
- [ ] Test: logged in as any other email → admin button hidden
- [ ] Test: not logged in → admin button hidden
- [ ] Test: direct URL `#admin-login` → login screen appears
- [ ] Test: 5 failed admin logins → 15-min lockout
- [ ] Test: admin session expires after 4h
- [ ] Test: "End Admin Session" button in Profile clears session
- [ ] Audit log captures every admin login attempt (check localStorage)

---

## 7. WHY THIS MATTERS

This model is **cloned to every future ecosystem** (Grocery, Medical, School, etc.). Each ecosystem will have:
- ONE admin (platform owner — same person across all ecosystems via Brain Tier 1)
- MANY businesses (per-ecosystem-specific)
- MANY employees (scoped to their business)
- MANY customers (the public)

The Brain (Tier 1) sees ALL admins from ALL ecosystems and orchestrates cross-ecosystem decisions. But each Tier-2 admin only sees its own ecosystem.

---

[END — ROLES_AND_ACCESS v1.0]
