import { NextResponse } from "next/server";
import ContextualAnswer from "ai21-sdk/dist/contextualAnswers";

const accessKey = process.env.AI21_KEY as string;

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const contextualAnswer = new ContextualAnswer(accessKey);

    const context =
      "You are a helpful assistant that formats data for calendar events.";
    const question = `Format the following data for calendar events: ${data}`;
    let res = "";

    contextualAnswer
      .getContextualAnswer(context, question)
      .then((result) => res = result);

    const formattedData = res;

    return NextResponse.json({ formattedData });
  } catch (error) {
    console.error("Error formatting data:", error);
    return NextResponse.json({ error: "Error generating response from AI21" });
  }
}
