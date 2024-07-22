import { createClient } from "@/utils/supabase/server";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

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

    const calendar = google.calendar({ version: "v3", auth });

    const response = await calendar.calendarList.list();
    return NextResponse.json(response.data.items);
  } catch (error) {
    console.error("Error fetching calendar list:", error);
    return NextResponse.json({ error: "Failed to fetch calendar list" });
  }
}
