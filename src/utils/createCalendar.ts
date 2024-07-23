import { Auth, google } from "googleapis";

async function createCalendar(auth: Auth.OAuth2Client, summary: string) {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.calendars.insert({
    requestBody: {
      summary,
    },
  });
  return res.data;
}

export { createCalendar };
