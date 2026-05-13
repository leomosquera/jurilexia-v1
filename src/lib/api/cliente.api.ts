import { PersonaApiError } from "./personas";

async function parseErrorResponse(res: Response, fallback: string): Promise<never> {
  const body = await res.json().catch(() => ({}));
  if (body.field && body.code && body.message) {
    throw new PersonaApiError(body.message, body.field, body.code);
  }
  throw new Error(body.error || fallback);
}

// ─────────────────────────────
// GET cliente
// ─────────────────────────────
export async function getCliente(id: string) {
  const res = await fetch(`/api/clientes/${id}`);

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al obtener cliente");
  }

  return res.json();
}

// ─────────────────────────────
// CREATE cliente
// ─────────────────────────────
export async function createCliente(payload: {
  tipo: string;
  nombre: string;
  apellido?: string | null;
  documento?: string | null;
  cuil?: string | null;
  cuit?: string | null;
  sexo?: string | null;
  fecha_nacimiento?: string | null;
  contactos?: Array<{
    canal: string;
    categoria: string;
    valor: string;
    descripcion?: string | null;
    predeterminado: boolean;
    verificado: boolean;
    pais_codigo: string;
  }>;
  domicilios?: Array<{
    categoria: string;
    calle: string;
    numero?: string | null;
    piso?: string | null;
    departamento?: string | null;
    barrio?: string | null;
    localidad_id?: string | null;
    codigo_postal?: string | null;
    descripcion?: string | null;
    predeterminado: boolean;
    activo: boolean;
  }>;
}) {
  const res = await fetch("/api/clientes", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    await parseErrorResponse(res, "Error al crear cliente");
  }

  return res.json();
}

// ─────────────────────────────
// UPDATE cliente
// ─────────────────────────────
export async function updateCliente(
  id: string,
  payload: {
    tipo: string;
    nombre: string;
    apellido?: string | null;
    documento?: string | null;
    cuil?: string | null;
    cuit?: string | null;
    sexo?: string | null;
    fecha_nacimiento?: string | null;
  }
) {
  const res = await fetch(`/api/clientes/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    await parseErrorResponse(res, "Error al actualizar cliente");
  }
}

// ─────────────────────────────
// DELETE cliente
// ─────────────────────────────
export async function deleteCliente(id: string) {
  const res = await fetch(`/api/clientes/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al eliminar cliente");
  }
}
