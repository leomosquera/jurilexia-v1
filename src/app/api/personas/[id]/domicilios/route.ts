import { getServerContext } from "@/lib/server/context/getServerContext";
import { personaDomicilioService } from "@/lib/server/services/persona-domicilio.service";
import { domicilioSchema } from "@/lib/validation/schemas/persona-domicilio.schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    const data = await personaDomicilioService.getAll(ctx, id);
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 },
    );
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;
    const body = await req.json();

    const parsed = domicilioSchema.safeParse(body);
    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
        { status: 422 },
      );
    }

    const data = await personaDomicilioService.create(ctx, id, parsed.data);
    return Response.json(data, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 },
    );
  }
}
