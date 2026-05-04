import { getServerContext } from "@/lib/server/context/getServerContext";
import { personaService } from "@/lib/server/services/persona.service";

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

    const data = await personaService.create(ctx, body);

    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 }
    );
  }
}
