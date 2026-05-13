import { getServerContext } from "@/lib/server/context/getServerContext";
import { personaService, PersonaFieldError } from "@/lib/server/services/persona.service";
import { updatePersonaSchema } from "@/lib/validation/schemas/persona.schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    const data = await personaService.getById(ctx, id);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const body = await req.json();
    const { id } = await params;

    const parsed = updatePersonaSchema.safeParse(body);
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      return Response.json(
        { error: issue?.message ?? "Datos inválidos" },
        { status: 400 }
      );
    }

    await personaService.update(ctx, id, parsed.data);

    return Response.json({ success: true });
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

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    await personaService.delete(ctx, id);

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}
