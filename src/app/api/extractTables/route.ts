import { extractTables } from "@krakz999/tabula-node";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const { left, top, right, bottom } = await req.json();

    const results = await extractTables(
      path.resolve("./public/Test_Syllabus.pdf"),
      {
        pages: "5",
        area: `${top},${left},${bottom},${right}`,
      }
    );
    console.log("Extract Tables: " + (results));
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error extracting tables:", error);
    return NextResponse.json({ error: "Failed to extract tables" });
  }
}
