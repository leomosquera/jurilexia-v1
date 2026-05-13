import { getServerContext } from "@/lib/server/context/getServerContext";
import { clienteService } from "@/lib/server/services/cliente.service";
import { PersonaFieldError } from "@/lib/server/services/persona.service";

export async function POST(req: Request) {
  try {
    const ctx = await getServerContext();
    const body = await req.json();

    const result = await clienteService.create(ctx, body);

    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof PersonaFieldError) {
      return Response.json(
        { message: error.message, field: error.field, code: error.code },
        { status: 422 }
      );
    }

    const message = error instanceof Error ? error.message : "Error inesperado";
    return Response.json({ error: message }, { status: 500 });
  }
}