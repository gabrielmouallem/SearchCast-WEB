import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Initialize MongoDB client
const mongoUri = process.env.MONGO_URI!;
const client = new MongoClient(mongoUri);

// Utility functions
enum OrderByOptions {
  PUBLISH_DATE_ASC = "video.publishDate.asc",
  PUBLISH_DATE_DESC = "video.publishDate.desc",
  VIEW_COUNT_ASC = "video.viewCount.asc",
  VIEW_COUNT_DESC = "video.viewCount.desc",
}

const ALLOWED_ORDER_BY_OPTIONS = new Set(Object.values(OrderByOptions));

function sanitizeAndConvertOrderBy(orderByStr: string): {
  [key: string]: 1 | -1;
} {
  let orderByOption = OrderByOptions.PUBLISH_DATE_ASC;
  if (ALLOWED_ORDER_BY_OPTIONS.has(orderByStr as OrderByOptions)) {
    orderByOption = orderByStr as OrderByOptions;
  }

  const [_, field, order] = orderByOption.split(".");
  const mongoOrder = order === "asc" ? 1 : -1;

  return { [field]: mongoOrder };
}

function formatTextToDoubleQuotes(text: string): string {
  return text
    .split(" ")
    .map((word) => `"${word}"`)
    .join(" ");
}

// Main handler for search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const text = searchParams.get("text") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("per_page") || "10", 10);
    const stringifiedOrderBy =
      searchParams.get("order_by") || OrderByOptions.PUBLISH_DATE_ASC;
    const orderBy = sanitizeAndConvertOrderBy(stringifiedOrderBy);

    const formattedText = formatTextToDoubleQuotes(text);
    const skip = (page - 1) * perPage;

    await client.connect();
    const db = client.db("shortsSniper");
    const collection = db.collection("videoTranscriptions");

    const commonPipeline = [
      {
        $match: {
          $text: { $search: formattedText },
        },
      },
      { $addFields: { "video.viewCount": { $toInt: "$video.viewCount" } } },
      {
        $group: {
          _id: "$video._id",
          transcriptions: {
            $push: {
              text: "$text",
              start: "$start",
              duration: "$duration",
            },
          },
          video: { $first: "$video" },
        },
      },
    ];

    const resultsPipeline = [
      ...commonPipeline,
      { $sort: orderBy },
      { $skip: skip },
      { $limit: perPage },
      {
        $group: {
          _id: null,
          results: { $push: "$$ROOT" },
        },
      },
      { $project: { _id: 0, results: 1 } },
    ];

    const countPipeline = [...commonPipeline, { $count: "count" }];

    const [resultData, countData] = await Promise.all([
      collection.aggregate(resultsPipeline).toArray(),
      collection.aggregate(countPipeline).toArray(),
    ]);

    const results = resultData[0]?.results || [];
    const count = countData[0]?.count || 0;

    await client.close();

    return NextResponse.json({
      results,
      count,
      page,
      perPage,
      totalPages: Math.ceil(count / perPage),
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
