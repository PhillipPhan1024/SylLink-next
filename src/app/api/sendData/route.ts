import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { left, top, width, height } = await req.json();
    const right = left + width;
    const bottom = top + height;

    const newData = { left, top, right, bottom };

    console.log("Received data:", newData);

    const response = await fetch("http://localhost:3000/api/extractTables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error("Failed to extract tables");
    }

    const extractionResults = await response.json();

    const AI21Response = await fetch("http://localhost:3000/api/formatData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: extractionResults }),
    });

    if (!AI21Response.ok) {
      throw new Error("Failed to format data");
    }

    const { formattedData } = await AI21Response.json();

    return NextResponse.json({
      message: "Data received and tables extracted successfully",
      data: newData,
      extractionResults,
      // formattedData,
    });
  } catch (error) {
    console.error("Error receiving or forwarding data:", error);
    return NextResponse.json({ error: "Failed to receive or forward data" });
  }
}
