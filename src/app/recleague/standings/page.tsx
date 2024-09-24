"use server";
import StandingsUI from "./StandingsUI";
import { api } from "@/app/utils/helpers";
export default async function Standings() {
  let error = null;
  let json = null;
  try {
    const response = await fetch(
      api + "/recleague/list/all/teams/Spring%20Series%20-%20Las%20Vegas"
    );
    json = await response.json();
  } catch (error) {
    console.error("Error fetching teams list: ", error);
    error = error;
  }

//   console.log("json", json);

  return (
    <main>
      <StandingsUI teamsList={json.data} />
    </main>
  );
}
