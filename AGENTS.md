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

- Supabase handles authentication.
- Application data comes from internal tables such as usuario, tenant, cliente, persona, etc.
- Do NOT mix auth logic with business logic.

- Business data access must follow this flow:
  UI → lib/api → app/api → lib/server/services → lib/server/repositories → Supabase

- Server-side business logic must live in:
  - lib/server/services
  - lib/server/repositories
  - lib/server/context
  - lib/server/validators
  - lib/server/errors

- UI must NEVER contain Supabase business queries.
- Client components may call lib/api helpers only.

# CRUD Rules

- CRUD must be implemented through internal API routes.
- Client-side UI must call helper functions from lib/api.
- app/api route handlers must be thin controllers only.
- Business rules must live in lib/server/services.
- Supabase table access must live in lib/server/repositories.

- DO NOT:
  - use Server Actions for business CRUD
  - query business tables directly from client components
  - put Supabase .from(...) calls in pages or UI components
  - duplicate DB logic between API routes and pages

- Server Components may call services directly for SSR reads when appropriate.
- Client Components must use lib/api.

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

Implemented:
1. Supabase Auth login
2. Session context using:
   auth.users → usuario → usuario_tenant → tenant
   auth.users → usuario → usuario_rol → rol
3. Protected dashboard routes
4. RLS basic policies for usuario, usuario_tenant, usuario_rol, rol, tenant, cliente and persona
5. Tenant CRUD migrated to API/service/repository architecture
6. Initial cliente listing started

Current focus:
- Cliente module
- Build it step by step using the same architecture:
  UI → lib/api → app/api → service → repository → Supabase

Next step:
- Replace the temporary create-cliente button with a proper CreateClienteForm.

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

- Supabase queries for business tables must live in lib/server/repositories.
- Services orchestrate business rules and call repositories.
- API routes call services.
- Client components call lib/api helpers.
- Pages should compose components and may call services only if they are Server Components.

- Authentication may use Supabase Auth directly through lib/supabase/server or lib/supabase/client.
- Business data must not be queried directly from client components.

# Prompt Execution Rules

- For each task, implement only the requested step
- Do NOT continue with the next step automatically
- After implementing a step, stop and wait for review

# File / Folder Discipline

- Respect the existing project structure.
- Do NOT move files unless explicitly requested.
- Do NOT rename files, folders, routes, or imports unless explicitly requested.

- Domain UI components live in:
  components/modules/<domain>/

- Generic reusable UI components live in:
  components/ui/

- Layout components live in:
  components/layout/

- Frontend API helpers live in:
  lib/api/

- Server business logic lives in:
  lib/server/

- Supabase clients live in:
  lib/supabase/

- Auth helpers live in:
  lib/auth/