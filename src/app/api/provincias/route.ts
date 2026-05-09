import { getServerContext } from "@/lib/server/context/getServerContext";
import { provinciaService } from "@/lib/server/services/provincia.service";

export async function GET() {
  try {
    const ctx = await getServerContext();
    const data = await provinciaService.getAll(ctx);
    return Response.json(data);
  } catch (error: any) {
    return Response.json(
      { error: error.message ?? "Error interno" },
      { status: 500 },
    );
  }
}
