export const dynamic = "force-dynamic";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const masha = await prisma.character.findFirst({
    where: { name: "Masha" },
  });

  console.log(masha);
  return NextResponse.json({ status: "success", data: masha });
}
