export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const masha = await prisma.character.findFirst({
    where: { name: "Masha" },
  });
  if (masha?.itemCount !== undefined && masha.itemCount < 5) {
    const updated = await prisma.character.update({
      where: { id: masha?.id },
      data: {
        itemCount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ status: "success", data: updated });
  }

  return NextResponse.json({ status: "success", data: null });
}
