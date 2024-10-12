"use server";
import React from "react";
import Header from "./DashboardUI";
import DashboardFilter from "../components/Dashboard/DashboardFilter";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { api } from "../utils/helpers";
import { getAuthInfo } from "../utils/authHelpers";
//import { metadata } from "../layout";
import type { Metadata } from "next";
import { useSearchParams } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Dashboard",
    description:
      "Find a comprehensive look at your in-game VALORANT stats created using a combination of data-streams not offered anywhere else.",
  };
}

export default async function Dashboard(queryParams: any) {
  let userInfo = null;
  let userGames = null;
  let valMapsAndAgents = null;
  let valMedalsProgress = null;
  let valMedals = null;

  const cookieStore = cookies();
  const token = cookieStore.get("esc-auth");

  if (!token) {
    return redirect("/login");
  }

  const headers = {
    token: `Bearer ${token?.value}`,
  };

  const userInfoResp = await fetch(api + "/user/info", {
    method: "GET",
    headers,
    cache: "no-store",
  });
  userInfo = await userInfoResp.json();

  //console.log(userInfo)

  if (userInfo?.message == 'Invalid Session') {
    return redirect("/login");
  }

  const auth = await getAuthInfo();
  const userData = auth?.data;

  if (userData.length < 1) {
    return redirect("/login");
  }

  const userGameresp = await fetch(
    api + `/val/data/user/matches/competitive?${queryParams}`,
    {
      method: "GET",
      headers,
      cache: "no-store",
    }
  );

  //console.log(userGameresp)

  userGames = await userGameresp.json();
  

  // console.log("TEST", query);
  // console.log(userGames.data);

  const userMedalsProgress = await fetch(api + "/val/data/medals/progress", {
    method: "GET",
    headers,
    cache: "no-store",
  });
  //console.log(userMedals)
  valMedalsProgress = await userMedalsProgress.json();

  const userMedals = await fetch(api + "/val/data/medals", {
    method: "GET",
    headers,
    cache: "no-store",
  });
  //console.log(userMedals)
  valMedals = await userMedals.json();

  // VALORANT MAPS AND AGENTS
  let valMaps = null;
  let valAgents = null;

  const valMapsResp = await fetch(api + "/val/data/maps", {
    method: "GET",
  });

  const valAgentsResp = await fetch(api + "/val/data/agents", {
    method: "GET",
  });

  valMaps = await valMapsResp.json();
  valAgents = await valAgentsResp.json();
  // END OF VALORANT MAPS AND AGENTS
  let valAverages = null;
  if (userGames && userGames?.data?.length > 0) {
    const valorantAveragesEndpoint = userInfo.info.val_rank
      ? api +
      `/val/data/averages/` +
      userGames.data[0]?.season +
      `?rank=${userInfo.info.val_rank}`
      : api + `/val/data/averages/` + userGames.data[0].season + ``;
    const valAveragesResp = await fetch(valorantAveragesEndpoint, {
      method: "GET",
      headers,
      cache: "no-store",
    });
    valAverages = await valAveragesResp.json();
  }
  //console.log(valAverages);

  let Agents: { agent: string; games: number }[] = [];

  if (userGames.data) {
    for (const x of userGames.data) {
      if (Agents.some((agent) => agent.agent === x.agent)) {
        Agents.some((agent) => (agent.agent === x.agent ? agent.games++ : 0));
      } else {
        Agents.push({ agent: x.agent, games: 1 });
      }
    }
  }
  Agents.sort((a, b) => b.games - a.games);

  const studentsResp = await fetch(api + "/students", {
    method: "GET",
    headers,
    cache: "no-store",
  });
  const students = await studentsResp.json();

  // console.log(Agents)
  // console.log(GamesByDate)
  // console.log(auth)

  return (
    <>
      <Header
        userInfo={userInfo.info}
        userGames={userGames.data}
        valMaps={valMaps.data}
        valAgents={valAgents.data}
        userData={userData}
        valAverage={valAverages?.data}
        topAgents={Agents}
        medalProgress={valMedalsProgress}
        medals={valMedals}
        isAdmin={auth.data.isAdmin == 1 ? true : false}
        students={students.accounts ? students.accounts : []}
      />
    </>
  );
}
