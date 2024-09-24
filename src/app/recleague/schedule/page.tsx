"use server";
import ScheduleUI from "./ScheduleUI";
import { api } from "@/app/utils/helpers";

export default async function Standings() {
  let error = null;
  let standing = null;
  let schedule = null;

  try {
    const standingResp = await fetch(
      api + "/recleague/list/all/teams/Spring%20Series%20-%20Las%20Vegas"
    );
    standing = await standingResp.json();

    const scheduleResp = await fetch(api + "/recleague/list/schedule/");
    schedule = await scheduleResp.json();
  } catch (error) {
    console.error("Error fetching teams list: ", error);
    error = error;
  }

  return (
    <main>
      <ScheduleUI
        teamStanding={standing?.data || null}
        scheduleList={schedule?.data || null}
      />
    </main>
  );
}
