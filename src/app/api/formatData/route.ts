import { NextResponse } from "next/server";

const accessKey = process.env.AI21_KEY as string;

export async function POST(req: Request) {
  try {
    const { data } = await req.json();

    const response = await fetch(
      "https://api.ai21.com/studio/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "jamba-instruct-preview",
          messages: [
            {
              role: "user",
              content: `You are a helpful assistant that formats data for calendar events. Format the following data for calendar events. The format should be a Title (quiz, homework, tests, and etc), Description (This could be information about where to find the Title such as textbook readings, topics covered, and etc. If there are multiple things that help describe the title, please combine them. Do not include any dates in the Description), and Due Date (Please ensure that the date is written in the 'yyyy-mm-dd' format. If a year is not provided, then use the current year and format it as 'yyyy-mm-dd'. Please do not include any column headers if found. For the response, just create a table following this format. Here is the data: ${data}`,
            },
          ],
          n: 1,
          max_tokens: 4096,
          temperature: 0.4,
        }),
      }
    );

    const formattedData = await response.json();

    console.log(formattedData.choices[0].message.content);

    return NextResponse.json({ formattedData });
  } catch (error) {
    console.error("Error formatting data:", error);
    return NextResponse.json({ error: "Error generating response from AI21" });
  }
}
