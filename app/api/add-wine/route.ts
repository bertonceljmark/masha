import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db("pikolino").collection("stats");

  const updated = await collection.findOneAndUpdate(
    { name: "Masha", itemCount: { $lt: 8 } },
    { $inc: { itemCount: 1 } },
    { returnDocument: "after" }
  );

  return NextResponse.json({ status: "success", data: updated });
}
