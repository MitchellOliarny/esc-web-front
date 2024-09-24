"use server";
import { api } from "../../utils/helpers";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default async function doFindGames() {
  let success = false;
  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");
  let newUserGames = null;

  const headers = {
    token: `Bearer ${token?.value}`,
  };

  const lastTriggerTime = cookieStore.get("findGamesTimer");

  if (!lastTriggerTime || Date.now() - Number(lastTriggerTime) > 300000) {


    const response = await fetch(api + "/val/data/user/find-games", {
      method: "PUT",
      headers,
      cache: "no-store",
    });


    newUserGames = await response.json();
    let valAverages = null;

    let Agents: { agent: string; games: number }[] = [];

    if (newUserGames.data) {
      for (const x of newUserGames.data) {
        if (Agents.some((agent) => agent.agent === x.agent)) {
          Agents.some((agent) => (agent.agent === x.agent ? agent.games++ : 0));
        } else {
          Agents.push({ agent: x.agent, games: 1 });
        }
      }


      Agents.sort((a, b) => b.games - a.games);

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
      return {agents: Agents.length > 0 ? Agents : null, averages: valAverages?.data, success: success, error_message: newUserGames.message };
    } else {
      success = false;
      return {agents: null, averages: null, success: success, error_message: newUserGames.message };
    }

  }
  else {
    return { success: false, error_message: 'Refresh Timed Out. Try again in 5 minutes.' }
  }

}
