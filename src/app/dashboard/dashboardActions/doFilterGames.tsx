"use server";
import { api } from "../../utils/helpers";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function doFilterGames(queryParams: any, mode: string) {
  let success = false;
  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");
  let newUserGames = null;

  const headers = {
    token: `Bearer ${token?.value}`,
  };

  // console.log(queryParams)

  const response = await fetch(
    api + `/val/data/user/matches/${mode ? mode : 'Competitive'}?${queryParams}`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );
  newUserGames = await response.json();

  let Agents: { agent: string; games: number }[] = [];

  if (newUserGames.data) {
    for (const x of newUserGames.data) {
      if (Agents.some((agent) => agent.agent === x.agent)) {
        Agents.some((agent) => (agent.agent === x.agent ? agent.games++ : 0));
      } else {
        Agents.push({ agent: x.agent, games: 1 });
      }
    }
  }
  Agents.sort((a, b) => b.games - a.games);
  let valAverages = null;

  console.log(newUserGames)

  if((!mode || mode == 'Competitive') && !newUserGames.message) {
  const valorantAveragesEndpoint = newUserGames.data[0].match_rank ?
    api + `/val/data/averages/` + newUserGames.data[0]?.season + `?rank=${newUserGames.data[0].match_rank}`
    :
    api + `/val/data/averages/` + newUserGames.data[0]?.season + ``;

  const valAveragesResp = await fetch(valorantAveragesEndpoint, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  valAverages = await valAveragesResp.json();
}

  if (response.ok) {
    success = true;
    revalidatePath("/dashboard");
    // console.log("Games filtered successfully!");
  } else {
    success = false;
    // console.log("ERROR: Please try again later");
  }
  return { games: newUserGames.data, agents: Agents, averages: valAverages?.data, gamemode: mode, success: success };
}
