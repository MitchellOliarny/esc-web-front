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
  const [gamemode, setGamemode] = useState('Competitive');
  const [medalNotif, setMedalNotif] = useState(0);

  useEffect(()=>{
    if(view) {
      handleSideBarClick(view);
    }
    console.log(view);
  },[view])
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
          <ValorantMedals medalsProgress={medalProgress} medals={medals} />
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
              setNewTopAgents(newGames.agents ? newGames.agents : '');
              setValAverages(newGames.averages ? newGames.averages : '')
              setGamemode(newGames.gamemode || 'Competitive')
            }}
          />
        );
    }
  };

  const handleSideBarClick = (menu: string) => {
    //@ts-ignore
    document.getElementById(menu).appendChild(document.getElementById('nav-bar'));
    setSelectedMenu(menu);
  };

  //console.log(valGames)

  return (
    <>
      <div className="px-4 2xl:px-40 w-full max-w-[1800px] mx-auto h-auto">
        <div
          className="w-full rounded-lg h-[25rem]"
          style={{
            backgroundImage:
              valGames
                ? `url(${valGames[0]?.val_banner})`
                : "url(https://media.valorant-api.com/playercards/9fb348bc-41a0-91ad-8a3e-818035c4e561/wideart.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col justify-end pt-40 pb-0 px-6 h-full rounded-lg"
            style={{ backgroundImage: 'linear-gradient(0deg, #14181E, 80%, transparent)' }}
          >
            <div className="w-full grid grid-cols-2 pb-8">
              <h1 className="grid font-[800] text-5xl text-frost px-4">
                {/* @ts-ignore */}
                {valGames ? valGames[0]?.username : ''}
                <br className="gap-0"></br>
                <span className="text-ash text-2xl font-bold">
                  {/* @ts-ignore */}#{valGames ? valGames[0]?.tag : ''}
                </span>
              </h1>
              {valGames?.length > 0 && (
                <div className="flex gap-4 w-[60%] justify-self-end self-end text-frost">
                  <Image
                    src={`https://api.esportsclubs.gg/images/ranks/${valGames[0]?.mmr_change?.rank
                        ? valGames[0]?.mmr_change?.rank
                        : "0"
                      }`}
                    className="w-auto h-14 drop-shadow-lg"
                    alt="user rank"
                    width={100}
                    height={100}
                  />
                  <div className="flex flex-col w-full">
                    <div className="grid grid-cols-2 w-full">
                      <p className="pl-2 text-lg text-left font-[700]">
                        {valGames[0]?.mmr_change?.new_mmr ? valGames[0]?.mmr_change?.new_mmr : 0}
                        <span className="text-lg text-ash">
                          {valGames[0]?.match_rank >= 24 ? "RR" : "/100 RR"}
                        </span>
                      </p>
                      <p className="pl-2 text-sm text-ash text-right font-bold self-center justify-self-end">
                        {valGames[0]?.mmr_change?.new_mmr && valGames[0]?.match_rank < 24 ? 100 - valGames[0]?.mmr_change?.new_mmr + ' RR to rank up' : 0}
                      </p>
                    </div>
                    <div className="w-full cut-corner-45">
                      <progress
                        className="progress-voltage w-full h-3"
                        color="secondary"
                        value={valGames[0]?.mmr_change?.new_mmr}
                        max={100}
                      ></progress>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-end">
              <ul className="flex gap-4 font-bold text-lg w-full pb-2">
                <li
                id="overview"
                  onClick={(e) => handleSideBarClick("overview")}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "overview" ? "text-frost glow-text-white" : ""
                    }`}
                >
                  Overview
                  <hr id='nav-bar' className="back-rust w-[50px] h-[3px] nav-move-bar"></hr>
                </li>
                <li
                id="statistics"
                  onClick={(e) => handleSideBarClick("statistics")}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "statistics" ? "text-frost glow-text-white" : ""
                    }`}
                >
                  Statistics
                </li>
                <li
                id="match-history"
                  onClick={(e) => handleSideBarClick("match-history")}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "match-history" ? "text-frost glow-text-white" : ""
                    }`}
                >
                  Match History
                </li>
                <li
                id="agents"
                  onClick={(e) => handleSideBarClick("agents")}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "agents" ? "text-frost glow-text-white" : ""
                    }`}
                >
                  Agents
                </li>
                <li
                 id="medals"
                  onClick={(e) => handleSideBarClick("medals")}
                  className={`grid cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out text-ash ${
                    selectedMenu === "medals" ? "text-frost glow-text-white" : ""
                  }`}
                >
                  Medals
                  {medalNotif > 0 ? 
                  <div className="medal-notif grid absolute self-start justify-self-end back-rust w-5 h-5 text-frost rounded-md border-[#F5603C40] translate-x-[25px] translate-y-[-10px]">
                   <p className="absolute text-sm font-extrabold">{medalNotif}</p>
                  </div> 
                  : ''}
                </li>
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
        <h1 className="inline-flex text-4xl py-4 font-bold w-full">{selectedMenu.toLocaleUpperCase().replace('-', ' ')} <p className="inline-flex mx-4 text-sm"> <FaExclamationCircle color="#FF6F4D" className="mx-4" /> Website is still Work-In-Progress - Report any issues in the ESC Discord</p> </h1>
        {renderContent()}
      </div>
    </>
  );
}