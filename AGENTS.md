# JurilexIA — AI Execution Rules

# Read First

Before implementing anything:

1. Read:
   - docs/architecture/jurilexia-architecture-v1.md
   - AGENTS.md

2. Respect the existing architecture strictly.

3. Prefer consistency over creativity.

---

# Execution Rules

- Implement ONLY the requested scope
- Do NOT continue with additional steps automatically
- Stop after each implementation step for review
- Ask before making architectural decisions
- Ask before introducing new patterns
- Ask before creating parallel systems

---

# UI Kit Protection

The existing UI Kit is the visual source of truth.

DO NOT:

- refactor UI Kit components
- restyle existing primitives
- change spacing systems
- change variants
- change naming conventions
- modify internal behavior

Unless explicitly requested.

If a required UI pattern does not exist:
- ASK before creating it

---

# File & Folder Discipline

Respect the existing project structure.

DO NOT:

- move files
- rename folders
- rename routes
- reorganize architecture
- introduce new root-level patterns

Unless explicitly requested.

---

# Component Placement Rules

## Generic reusable UI

Must live in:

```txt
components/ui/
```

Examples:

- buttons
- cards
- overlays
- modals
- side-panels
- tables
- form controls

---

## Layout components

Must live in:

```txt
components/layout/
```

Examples:

- sidebar
- header
- layout containers
- navigation

---

## Business/domain components

Must live in:

```txt
components/modules/<domain>/
```

Examples:

```txt
components/modules/personas/
components/modules/clientes/
components/modules/expedientes/
```

---

# Data Flow Rules

Business data MUST follow:

```txt
UI
→ lib/api
→ app/api
→ services
→ repositories
→ Supabase
```

---

# Forbidden Patterns

DO NOT:

- query business tables directly from UI
- place Supabase queries inside components
- duplicate repository logic
- place business logic inside pages
- use Server Actions for business CRUDs
- mix auth logic with business logic

---

# API Rules

- API routes must remain thin controllers
- Business logic belongs to services
- Persistence belongs to repositories
- Client Components must use lib/api helpers

---

# Auth Rules

- Supabase session is the single source of truth
- Do NOT create custom session systems
- Tenant context must remain explicit
- Always assume multi-tenant architecture

---

# CRUD Rules

Routes must use Spanish naming.

Allowed:

```txt
/crear
/[id]
```

Not allowed:

```txt
/new
/edit
/editar
```

---

# Form Rules

Forms must use:

- react-hook-form
- zod
- zodResolver

Validation mode:

```txt
onBlur
```

Validation UX:

- compact errors
- helper text below fields
- no tooltip validation

---

# UX Rules

The product follows:

- minimal UI
- compact spacing
- bordered cards
- neutral palette
- data-dense layouts
- Notion/GitHub/Linear inspired UX

Avoid:

- oversized spacing
- heavy shadows
- visually noisy UI
- unnecessary animations

---

# Overlay Rules

Use:

- Modal → confirmations/destructive actions
- SidePanel → nested CRUDs/contextual forms
- Toast → async feedback

Do NOT invent alternate overlay systems.

---

# Scope Control

DO NOT:

- anticipate future features
- add hidden functionality
- create extra abstractions
- over-engineer implementations
- introduce premature abstractions

Prioritize:

- consistency
- clarity
- incremental progress
- reuse of existing patterns