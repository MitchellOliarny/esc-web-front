"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OverviewUI from "../components/Dashboard/Overview/OverviewUI";
import MatchHistoryUI from "../components/Dashboard/MatchHistory/MatchHistoryUI";
import StatisticsUI from "../components/Dashboard/Statistics/StatisticsUI";
import AgentsUI from "../components/Dashboard/Agents/AgentsUI";
import ValorantMedals from "../components/Dashboard/Medals/ValorantMedals";
import Image from "next/image";
import { Progress } from "@nextui-org/react";
import DashboardFilter from "../components/Dashboard/DashboardFilter";
import { FaExclamationCircle } from "react-icons/fa";

interface DashboardUIProps {
  userInfo: UserInfo;
  userGames: UserGames[];
  valMaps: ValMaps[];
  valAgents: ValAgents[];
  userData: {
    valorant_banner: string;
    isStudent: number;
  };
  valAverage: ValAverage[];
  topAgents: Agents[];
  medalProgress: Object;
  medals: Object;
  isAdmin: boolean;
  students: [];
}

export default function Header({
  userInfo,
  userGames,
  valMaps,
  valAgents,
  userData,
  valAverage,
  topAgents,
  medalProgress,
  medals,
  isAdmin,
  students
}: DashboardUIProps) {

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const [selectedMenu, setSelectedMenu] = useState<string>(view ? view : 'overview');
  const [valGames, setValGames] = useState<UserGames[]>(userGames);
  const [newTopAgents, setNewTopAgents] = useState<Agents[]>(topAgents);
  const [valAverages, setValAverages] = useState<ValAverage[]>(valAverage);
  const [gamemode, setGamemode] = useState('Competitive')

  // useEffect(()=>{
  //   if(view) {
  //     setSelectedMenu(view);
  //   }
  //   console.log(view);
  // },[view])
  // console.log(topAgents);
  // console.log(userInfo);

  // FOR TOP AGENT
  let agentGames: { [key: string]: [] } = {};
  for (const x in newTopAgents) {
    // @ts-ignore
    agentGames[newTopAgents[x].agent] = [];
  }

  for (const x in valGames) {
    // @ts-ignore
    agentGames[valGames[x].agent]?.push(valGames[x]);
  }

  const topAgent = agentGames[newTopAgents[0]?.agent];
  // console.log(topAgent);
  const topAgentDetails: any = topAgent?.slice(0, 1)[0];
  const topAgentName = topAgentDetails?.agent;

  const renderContent = () => {
    switch (selectedMenu) {
      case "statistics":
        return (
          <StatisticsUI
            userInfo={userInfo}
            userGames={valGames}
            valAverage={valAverages}
            userData={userData}
          />
        );
      case "match-history":
        return (
          <MatchHistoryUI
            userGames={valGames}
            valMaps={valMaps}
            valAgents={valAgents}
            gamemode={gamemode}
          />
        );
      case "agents":
        return (
          <AgentsUI
            agentGames={agentGames}
            topAgents={newTopAgents}
            valAverage={valAverages}
          />
        );
      case "medals":
        return (
          <ValorantMedals medalsProgress={medalProgress} medals={medals}/>
        )
      default:
        return (
          <OverviewUI
            userInfo={userInfo}
            userGames={valGames}
            valMaps={valMaps}
            valAgents={valAgents}
            valAverage={valAverages}
            userData={userData}
            topAgentGames={topAgent}
            topAgentId={topAgentDetails?.agent_id}
            topAgentName={topAgentName}
            isAdmin={isAdmin}
            gamemode={gamemode}
            onSearch={(newGames: any) => {
              setValGames(newGames.games ? newGames.games : '');
              setNewTopAgents(newGames.agents ? newGames.agents : '' );
              setValAverages(newGames.averages ? newGames.averages : '')
              setGamemode(newGames.gamemode || 'Competitive')
            }}
          />
        );
    }
  };

  const handleSideBarClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  //console.log(valGames)

  return (
    <>
      <div className="px-4 2xl:px-40 w-full max-w-[1800px] mx-auto">
        <div
          className="w-full rounded-lg"
          style={{
            backgroundImage:
            valGames
                ? `url(${valGames[0]?.val_banner})`
                : "url(https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-between pt-40 pb-6 px-6 bg-black/40">
            <div>
              {valGames?.length > 0 && (
                <div className="flex gap-2">
                  <Image
                    src={`https://api.esportsclubs.gg/images/ranks/${
                      valGames[0]?.mmr_change?.rank
                        ? valGames[0]?.mmr_change?.rank
                        : "0"
                    }`}
                    className="w-auto h-14 drop-shadow-lg"
                    alt="user rank"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col w-full">
                    <p className="text-2xl text-center font-bold">
                      {valGames[0]?.mmr_change?.new_mmr ? valGames[0]?.mmr_change?.new_mmr : 0}
                      <span className="text-lg">
                        {valGames[0]?.match_rank >= 24 ? "RR" : "/100"}
                      </span>
                    </p>
                    <div className="w-full">
                      <progress
                        className="progress w-full h-3 bg-[#2E4556]"
                        color="secondary"
                        value={valGames[0]?.mmr_change?.new_mmr}
                        max={100}
                      ></progress>
                    </div>
                  </div>
                </div>
              )}
              <h1 className="font-bold text-4xl">
                {/* @ts-ignore */}
                {valGames ? valGames[0]?.username : ''}
                <span className="text-[#F5603C] text-3xl">
                  {/* @ts-ignore */}#{valGames ? valGames[0]?.tag : ''}
                </span>
              </h1>
            </div>
            <div className="flex items-end">
              <ul className="flex gap-4 font-bold text-lg">
                <li
                  onClick={() => handleSideBarClick("overview")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${
                    selectedMenu === "overview" ? "bg-[#F5603C]" : ""
                  }`}
                >
                  Overview
                </li>
                <li
                  onClick={() => handleSideBarClick("statistics")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${
                    selectedMenu === "statistics" ? "bg-[#F5603C]" : ""
                  }`}
                >
                  Statistics
                </li>
                <li
                  onClick={() => handleSideBarClick("match-history")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${
                    selectedMenu === "match-history" ? "bg-[#F5603C]" : ""
                  }`}
                >
                  Match History
                </li>
                <li
                  onClick={() => handleSideBarClick("agents")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${
                    selectedMenu === "agents" ? "bg-[#F5603C]" : ""
                  }`}
                >
                  Agents
                </li>
                {/* <li
                  onClick={() => handleSideBarClick("medals")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${
                    selectedMenu === "medals" ? "bg-[#F5603C]" : ""
                  }`}
                >
                  Medals
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 2xl:px-40 w-full max-w-[1800px] mx-auto min-h-screen">
        <DashboardFilter
          valMaps={valMaps}
          valAgents={valAgents}
          userGames={valGames}
          isAdmin={isAdmin}
          users={students}
          onSearch={(newGames: any) => {
            setValGames(newGames.games);
            setNewTopAgents(newGames.agents);
            setValAverages(newGames.averages);
            setGamemode(newGames.gamemode || 'Competitive')
          }}
        />
        <h1 className="inline-flex text-4xl py-4 font-bold w-full">{selectedMenu.toLocaleUpperCase().replace('-', ' ')} <p className="inline-flex mx-4 text-sm"> <FaExclamationCircle color="#FF6F4D" className="mx-4"/> Website is still Work-In-Progress - Report any issues in the ESC Discord</p> </h1>
        {renderContent()}
      </div>
    </>
  );
}
