import { getOpenAIResponse } from "@/lib/openai";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const messages = data.messages;

  const reply = await getOpenAIResponse(messages);

  return NextResponse.json({ reply });
}
