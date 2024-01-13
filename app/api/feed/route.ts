import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db("pikolino").collection("stats");

  //decrease itemCount by one
  const updated = await collection.findOneAndUpdate(
    { name: "Masha" },
    { $inc: { hungerLevel: 1, itemCount: -1 }, $set: { lastFed: new Date() } },
    { returnDocument: "after" }
  );

  return NextResponse.json({ status: "success", data: updated });
}
