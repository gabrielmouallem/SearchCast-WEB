import { MongoClient } from "mongodb";
import { NextRequest } from "next/server";

const uri = process.env.NEXT_PUBLIC_MONGO_URI;

const client = new MongoClient(uri);

const typeOfResult = {
  text: "salve salve família salve aqui Ana gente",
  highlight: [
    {
      score: 0.4678944945335388,
      path: "text",
      texts: [
        {
          value: "salve salve família salve aqui Ana",
          type: "hit",
        },
        {
          value: " gente",
          type: "text",
        },
      ],
    },
  ],
};

type Result = typeof typeOfResult;

export async function GET(req: NextRequest) {
  try {
    console.log({ cookies: req.cookies.getAll() });
    await client.connect();

    const database = client.db("shortsSniper");
    const coll = database.collection("videoTranscriptions");

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    console.log({ query });

    // Split the query into individual words
    const queryWords = query
      .split(" ")
      .map((word) => word.trim())
      .filter(Boolean);

    // Define pipeline with fuzzy search and highlighting for each word in the query
    const agg = [
      {
        $search: {
          index: "transcription_text_search_index_v1",
          compound: {
            should: queryWords.map((word) => ({
              autocomplete: {
                query: word,
                path: "text",
              },
            })),
          },
          highlight: {
            path: "text",
          },
        },
      },
      { $limit: 1000 },
      {
        $project: { _id: 0, text: 1, highlight: { $meta: "searchHighlights" } },
      },
    ];

    // Run pipeline
    const result = (await coll.aggregate(agg).toArray()) as any as Result[];

    // Extract unique phrases that match the query from highlights
    const suggestionsSet = new Set<string>();
    result.forEach((doc) => {
      doc.highlight.forEach((highlight) => {
        highlight.texts.forEach((text) => {
          if (text.type === "hit") {
            const textValue = text.value;
            queryWords.forEach((itrWord) => {
              const word = itrWord.toLowerCase();
              const regex = new RegExp(`\\b\\w*${word}\\w*\\b`, "gi");
              let match;
              while ((match = regex.exec(textValue)) !== null) {
                // Extract a phrase around the matched word
                const phraseWords = textValue.toLocaleLowerCase().split(" ");
                const matchIndex = phraseWords.findIndex((w) =>
                  w.includes(match[0]),
                );
                const start = Math.max(0, matchIndex - 1); // Capture 1 word before the match
                let end = Math.min(
                  phraseWords.length,
                  matchIndex + (queryWords.length === 1 ? 2 : 1),
                ); // Capture 1 or 2 words after the match based on query length

                let phrase = phraseWords.slice(start, end).join(" ");

                // Sanitize the phrase to remove weird symbols and replace "\n" with a space
                phrase = phrase
                  .replace(/[^\p{L}\p{N}\s]/gu, "")
                  .replace(/\n/g, " ");
                suggestionsSet.add(phrase);
              }
            });
          }
        });
      });
    });

    const suggestions = Array.from(suggestionsSet).slice(0, 8);

    // Return results
    return new Response(JSON.stringify(suggestions), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client.close();
  }
}
