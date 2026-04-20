# Project Context

SaaS dashboard built with:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Auth + Database)

Multi-tenant architecture:
- auth handled by Supabase
- app data stored in PostgreSQL (Supabase)
- authorization handled in app DB (roles/permissions)

# Design System

- Minimal and clean (Notion / GitHub style)
- Compact spacing (data-dense)
- Bordered cards (no shadows)
- Neutral colors + single primary accent
- Consistent typography and spacing

# UI Rules (STRICT)

- All UI must be reusable components
- Components live in /components/ui
- Layout components in /components/layout

🚨 CRITICAL:
- NEVER modify UI Kit components unless explicitly requested
- NEVER create new UI components without asking first
- Pages must ONLY compose existing components
- If a UI element is missing → ASK before creating it

# Architecture Rules

- Supabase handles authentication ONLY
- Application data comes from internal tables (usuario, tenant, etc.)
- Do NOT mix auth logic with business logic

- Server logic must live in:
  - Server Actions
  - lib/*
- UI must NEVER contain business logic

# CRUD Rules

- CRUD must be implemented using:
  - Server Actions (preferred)
  - Supabase queries from server side

- DO NOT:
  - create unnecessary API layers
  - introduce external state managers
  - duplicate logic

- Keep CRUD simple, explicit and readable

# Auth & Session Rules

- Use Supabase session as single source of truth
- Do NOT create custom session systems

- App user must be resolved from:
  auth.users → usuario (auth_user_id)

- Tenant context must come from:
  usuario_tenant

# Multi-Tenant Rules

- Always assume user can belong to multiple tenants
- Do NOT hardcode tenant logic
- Tenant context must be explicit and controlled

# Layout & Navigation Rules

- Sidebar must support:
  - grouped sections (with titles)
  - items with icons and labels
  - nested submenus

- Each role may have a different sidebar
- Navigation must respect permissions (later stage)

- Text labels must always be left-aligned
- Icons and labels must be grouped together
- Action icons aligned right

# Scope Control (VERY IMPORTANT)

- Only implement what is explicitly requested
- Do NOT anticipate future features
- Do NOT add extra fields, logic, or UI

- If something is unclear → ASK
- If something is missing → ASK
- If a decision affects architecture → ASK

# Development Approach

- Work step by step
- Small and controlled changes
- Prioritize clarity over completeness
- Avoid generating large code blocks

# Current Phase

We are currently implementing:

1. Authentication (Supabase)
2. Session context (usuario + tenant)
3. Protected routes

Next steps (NOT NOW):
- Superadmin CRUD (tenant + users)
- Role-based access
- Full CRUD modules

# UI Kit Protection

- The existing UI Kit is the visual source of truth
- Do NOT refactor, replace, restyle or restructure UI Kit components unless explicitly requested
- Do NOT change spacing, sizing, variants, naming or internal behavior of existing UI Kit components
- If a page needs UI that is not covered by the current UI Kit, ASK before creating or modifying components

# Auth / Access Control Boundaries

- Authentication and session resolution must be implemented first
- Do NOT start role-based navigation, sidebar switching, permission guards or CRUD pages until session context is resolved correctly
- Protected routes must depend on authenticated session first, and role/tenant logic only after session context is available

# Data Access Rules

- Supabase queries must be executed from server-side code
- Do NOT query business tables directly from client components
- Keep data access inside lib/* or Server Actions
- Prefer small helper functions over large mixed files

# Prompt Execution Rules

- For each task, implement only the requested step
- Do NOT continue with the next step automatically
- After implementing a step, stop and wait for review

# File / Folder Discipline

- Respect the existing project structure
- Do NOT move files unless explicitly requested
- Do NOT rename files, folders, routes, or imports unless explicitly requested
- New auth/session helpers must stay inside:
  - lib/auth/*
  - lib/supabase/*
- Route files must remain inside the existing app/* structure