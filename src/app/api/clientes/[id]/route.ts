import { getServerContext } from "@/lib/server/context/getServerContext";
import { clienteService } from "@/lib/server/services/cliente.service";

// ✅ GET (FALTABA O ESTÁ MAL)
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    const data = await clienteService.getById(ctx, id);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ✅ PUT
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;
    const body = await req.json();

    await clienteService.update(ctx, id, body);

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const ctx = await getServerContext();
    const { id } = await params;

    await clienteService.delete(ctx, id);

    return Response.json({ success: true });
  } catch (error: any) {
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}