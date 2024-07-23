import { createServerClient } from "@supabase/ssr";
import { google } from "googleapis";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.error(
      "No valid user to fetch calendars or error fetching user:",
      userError
    );
    return NextResponse.json({ error: "Unauthorized" });
  }

  const user = userData.user;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("provider_token, provider_refresh_token")
      .eq("id", user.id)
      .single();

    if (error) {
      throw new Error("Error fetching refresh token");
    }

    if (!data || !data.provider_refresh_token) {
      throw new Error("No refresh token found");
    }

    const providerToken = data.provider_token;
    const refreshToken = data.provider_refresh_token;

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error("Google client ID or client secret not set");
      throw new Error("Google client ID or client secret not set");
    }

    const auth = new google.auth.OAuth2(clientId, clientSecret);
    auth.setCredentials({
      access_token: providerToken,
      refresh_token: refreshToken,
    });

    // FUNCTIONALITY
    const { calendarId, events } = await req.json();

    const calendar = google.calendar({ version: "v3", auth });
    for (const event of events) {
      const { Quiz, Topics, Textbook, Date } = event;
      await calendar.events.insert({
        calendarId,
        requestBody: {
          summary: Quiz,
          description: `${Topics}\nTextbook Sections: ${Textbook}`,
          start: {
            dateTime: "2024-07-23T03:30:00-06:00"
          },
          end: {
            dateTime: "2024-07-23T04:30:00-06:00"
          },
        },
      });
    }

    return NextResponse.json({ message: "Events created successfully" });
  } catch (error) {
    console.error("Error creating calendar events:", error);
    return NextResponse.json({ error: "Failed to create calendar events" });
  }
}
