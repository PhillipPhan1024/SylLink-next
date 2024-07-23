import { Auth, google } from "googleapis";

async function checkIfCalendarExists(auth: Auth.OAuth2Client, summary: string) {
  const calendar = google.calendar({ version: "v3", auth });
  const res = await calendar.calendarList.list();
  const calendars = res.data.items;
  if (!calendars) {
    return false;
  }
  return calendars.some((calendar) => calendar.summary === summary);
}

export { checkIfCalendarExists };
