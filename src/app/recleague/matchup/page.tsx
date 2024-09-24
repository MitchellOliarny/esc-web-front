"use server";

import MatchupUI from "./MatchupUI";

export default async function Matchup() {
  let error = null;
  let json = null;
  try {
    const response = await fetch(
      "https://api.esportsclubs.gg/recleague/list/all/teams/Spring%20Series%20-%20Las%20Vegas"
    );
    json = await response.json();
  } catch (error) {
    console.error("Error fetching teams list: ", error);
    error = error;
  }

  return (
    <main>
      <MatchupUI teamList={json.data} />
    </main>
  );
}
