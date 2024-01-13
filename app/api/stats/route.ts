import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const client = await clientPromise;
  const collection = client.db("pikolino").collection("stats");

  const test = await collection.findOne({ name: "Masha" });

  return NextResponse.json({ status: "success", data: test });
}
