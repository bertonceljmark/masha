import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const collection = client.db("pikolino").collection("stats");

  //if result hunger will be above -1 descrease hunger level by one
  const updated = await collection.findOneAndUpdate(
    { name: "Masha", hungerLevel: { $gt: 0 } },
    { $inc: { hungerLevel: -1 } },
    { returnDocument: "after" }
  );
  return NextResponse.json({ status: "success", data: updated });
}
