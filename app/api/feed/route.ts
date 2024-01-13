import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const masha = await prisma.character.findFirst({
    where: { name: "Masha" },
  });

  const updated = await prisma.character.update({
    where: { id: masha?.id, itemCount: { gt: 0 } },
    data: {
      itemCount: {
        increment: -1,
      },
      hungerLevel: {
        increment: 1,
      },
      lastFed: {
        set: new Date(),
      },
    },
  });

  return NextResponse.json({ status: "success", data: updated });
}
