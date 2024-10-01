import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Initialize MongoDB client
const mongoUri = process.env.MONGO_URI!;
const client = new MongoClient(mongoUri);

// Main handler for expand-transcriptions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const videoId = searchParams.get("videoId");
    const startTime = parseFloat(searchParams.get("start") || "0");

    if (!videoId) {
      return NextResponse.json(
        { error: "videoId is required" },
        { status: 400 },
      );
    }

    await client.connect();
    const db = client.db("shortsSniper");
    const collection = db.collection("videoTranscriptions");

    const pipeline = [
      {
        $match: {
          "video._id": videoId,
          start: { $gt: startTime - 10, $lt: startTime + 10 },
        },
      },
      { $sort: { start: 1 } },
      {
        $group: {
          _id: "$video._id",
          merged_start: { $first: "$start" },
          merged_end: { $last: { $add: ["$start", "$duration"] } },
          merged_text: { $push: "$text" },
          merged_duration: { $sum: "$duration" },
        },
      },
      {
        $project: {
          _id: 0,
          start: "$merged_start",
          end: "$merged_end",
          text: {
            $reduce: {
              input: "$merged_text",
              initialValue: "",
              in: { $concat: ["$$value", " ", "$$this"] },
            },
          },
          duration: "$merged_duration",
        },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();

    await client.close();

    if (result.length > 0) {
      return NextResponse.json(result[0]);
    } else {
      return NextResponse.json(
        { error: "No transcriptions found or error in aggregation" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Expand transcription error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
