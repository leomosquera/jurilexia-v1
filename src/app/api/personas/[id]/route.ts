import { getServerContext } from "@/lib/server/context/getServerContext";
import { personaService } from "@/lib/server/services/persona.service";

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

    await personaService.update(ctx, id, body);

    return Response.json({ success: true });
  } catch (error: any) {
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
