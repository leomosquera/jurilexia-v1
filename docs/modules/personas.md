# Personas Module

## Purpose

The Personas module is the identity foundation of the platform.

It stores:

- individuals
- companies
- legal entities
- contact information
- addresses

The module is multi-tenant aware and follows strict identity validation rules.

---

# Persona Types

Supported persona types:

- humana
- juridica

---

## humana

Must persist ONLY:

- nombre
- apellido
- documento
- cuil
- sexo
- fecha_nacimiento

Must NOT persist:

- cuit

---

## juridica

Must persist ONLY:

- nombre
- cuit

Must NOT persist:

- apellido
- documento
- cuil
- sexo
- fecha_nacimiento

The backend service layer must strip irrelevant fields before persistence even if hidden values exist in frontend state.

---

# Identity Rules

## documento (DNI)

- unique per tenant
- optional uniqueness only when value exists
- validated using Argentine DNI format
- 7 or 8 digits

---

## cuil

- unique per tenant
- optional uniqueness only when value exists
- validated using Argentine checksum algorithm
- stored normalized

Allowed formats:

- 20-XXXXXXXX-X
- 23-XXXXXXXX-X
- 24-XXXXXXXX-X
- 27-XXXXXXXX-X

---

## cuit

- unique per tenant
- optional uniqueness only when value exists
- validated using Argentine checksum algorithm
- stored normalized

Allowed formats:

- 30-XXXXXXXX-X
- 33-XXXXXXXX-X
- 34-XXXXXXXX-X

---

# Multi-Tenant Rules

Identity uniqueness is scoped by:

- tenant_id + documento
- tenant_id + cuil
- tenant_id + cuit

The same identity may exist in different tenants.

---

# Contactos

Personas may contain nested contactos.

Supported channels:

- email
- telefono
- whatsapp
- web

---

# Phone UX

Phone and WhatsApp use:

- international country selector
- searchable combobox UX
- client-side country dataset
- libphonenumber-js

The implementation intentionally does NOT use:

- native select
- InputAffix
- server-side search

Reason:

The phone selector evolved into a complex interactive component that exceeds the intended InputAffix abstraction.

---

# Phone Storage Rules

Phone values are stored normalized in E.164 format.

Examples:

- +541131716974
- +5511999999999

pais_codigo stores ISO country code:

- AR
- BR
- US

---

# Nested CRUD UX

Contactos and domicilios use:

- SidePanel
- contextual nested CRUD UX
- independent form submission

Nested forms must NEVER trigger parent form submit.

---

# Error UX

Backend validation errors must map to field-level errors using:

- react-hook-form
- setError()

Examples:

- duplicate documento
- duplicate cuil
- duplicate cuit

Toasts may coexist as global async feedback.

---

# Overlay Rules

Nested entity editing uses:

- SidePanel

The Personas module must NOT introduce:

- custom overlays
- alternate modal systems
- fullscreen workflows

---

# Current UX Decisions

Use:

- compact enterprise forms
- bordered cards
- contextual helper text
- inline validation
- responsive form grids
- searchable country selector
- minimal visual noise

Inspired by:

- Linear
- Stripe
- Notion
- HubSpot