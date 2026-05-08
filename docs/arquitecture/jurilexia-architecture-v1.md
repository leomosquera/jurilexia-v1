# JurilexIA — Architecture v1

> This document is the architectural source of truth for JurilexIA.
>
> All implementations, features and UI patterns must respect this architecture unless explicitly approved otherwise.

## Overview

JurilexIA is a multi-tenant SaaS platform built with:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Supabase

## Purpose

This document exists to:

- maintain architectural consistency
- provide onboarding context
- guide AI-assisted development
- reduce structural drift
- standardize UX and development patterns

The platform is designed around:

- reusable UI systems
- modular business architecture
- clean separation of concerns
- scalable CRUD patterns
- contextual UX
- high information density
- minimal and professional interface design

The project follows a structured architecture intended to scale across:

- personas
- clientes
- expedientes
- tareas
- comentarios
- responsables
- nested CRUDs
- configurable workflows

---

# Core Principles

## UI First

The UI Kit is the visual source of truth.

Reusable UI primitives must be prioritized before creating feature-specific implementations.

---

## Separation of Concerns

The project strictly separates:

- UI
- layout
- modules
- services
- repositories
- infrastructure

Business logic must never live inside UI components.

---

## Reusability

Whenever possible:

- forms should be reusable
- tables should follow shared UX patterns
- overlays should share behavior
- validation should reuse schemas
- modules should compose existing primitives

---

## Composition Over Duplication

Pages compose modules.

Modules compose UI primitives.

Avoid creating duplicated patterns or alternate implementations.

---

## Multi-Tenant By Default

The platform assumes users may belong to multiple tenants.

Tenant context must always be explicit.

Tenant logic must never be hardcoded.

---

## Step-by-Step Development

Development must happen incrementally.

For every feature:

1. analyze architecture
2. validate placement
3. validate API
4. implement minimal scope
5. review
6. continue

---

# Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Backend

- Supabase
- PostgreSQL
- App Router API Routes

---

## Forms & Validation

- react-hook-form
- zod
- @hookform/resolvers

---

## Styling

- Tailwind CSS
- minimal design system
- reusable UI primitives

---

# Project Structure

```txt
src/
├── app/
├── components/
├── lib/
├── middleware.ts
```

---

## Current UI Status

Stable:
- tables
- cards
- forms
- dropdowns
- modal system
- toast system

In Progress:
- SidePanel UX System
- nested CRUD UX
- overlay consistency

---

# Future Direction

The platform is expected to evolve toward:

- advanced expediente management
- collaborative workflows
- timelines
- comments
- assignments
- contextual overlays
- configurable workflows
- advanced permission systems