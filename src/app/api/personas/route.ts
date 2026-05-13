import { getServerContext } from "@/lib/server/context/getServerContext";
import { personaService, PersonaFieldError } from "@/lib/server/services/persona.service";
import { createPersonaSchema } from "@/lib/validation/schemas/persona.schema";

export async function GET() {
  try {
    const ctx = await getServerContext();
    const data = await personaService.getAll(ctx);
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const ctx = await getServerContext();
    const body = await req.json();

    const { contactos, domicilios, ...personaBody } = body;

    const parsed = createPersonaSchema.safeParse(personaBody);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return Response.json(
        { error: issue?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }

    const data = await personaService.create(ctx, {
      ...parsed.data,
      contactos,
      domicilios,
    });

    return Response.json(data);
  } catch (error: any) {
    if (error instanceof PersonaFieldError) {
      return Response.json(
        { code: error.code, field: error.field, message: error.message },
        { status: 409 }
      );
    }
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}
