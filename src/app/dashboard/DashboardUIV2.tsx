"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import OverviewUI from "../components/Dashboard/Overview/OverviewUI";
import MatchHistoryUI from "../components/Dashboard/MatchHistory/MatchHistoryUI";
import StatisticsUI from "../components/Dashboard/Statistics/StatisticsUI";
import AgentsUI from "../components/Dashboard/Agents/AgentsUI";
import ValorantMedals from "../components/Dashboard/Medals/ValorantMedals";
import Image from "next/image";
import DashboardFilter from "../components/Dashboard/DashboardFilter";
import doChangeDisplayMedal from "./dashboardActions/doChangeDisplayMedal";
import toast from "react-hot-toast";
import { FaCirclePlus } from "react-icons/fa6";
import { CreateMedalToolTip } from "../utils/helpers";

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

  const bucket = "https://files.esportsclubs.gg/";

  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const [selectedMenu, setSelectedMenu] = useState<string>(view ? view : 'overview');
  const [valGames, setValGames] = useState<UserGames[]>(userGames);
  const [newTopAgents, setNewTopAgents] = useState<Agents[]>(topAgents);
  const [valAverages, setValAverages] = useState<ValAverage[]>(valAverage);
  const [gamemode, setGamemode] = useState('Competitive');
  const [medalNotif, setMedalNotif] = useState(0);

  const [displayMedals, setDisplayMedals] = useState([])

  useEffect(() => {
    if (view) {
      handleSideBarClick(view);
    }
    // @ts-ignore
    if (medalProgress.data.display_medals) {
      let temp = [];
      // @ts-ignore
      for (let x = 0; x < 3; x++) {
        // @ts-ignore
        if(medalProgress.data.display_medals[x]) {
        // @ts-ignore
          temp.push(bucket + (medalProgress.data.display_medals[x]) + '.png')
        }
        else {
          temp.push('');
        }
      }
      // @ts-ignore
      setDisplayMedals(temp);
      console.log(temp)
    }
  }, [view])
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
            valAgents={valAgents}
            maps={valMaps}
          />
        );
      case "medals":
        return (
          <ValorantMedals medalsProgress={medalProgress} medals={medals} change_display_medal={ChangeDisplayMedal} />
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
    moveBarToElement(menu);
    setSelectedMenu(menu);
  };

  const handleSideBarHover = (menu: string) => {
    moveBarToElement(menu);
  };

  const handleSideBarBack = () => {
    moveBarToElement(selectedMenu);
  }

  const ChangeDisplayMedal = async (medal_name: string, position: number) => {
    let temp = [...displayMedals];
    //@ts-ignore
    temp[position] = bucket + medal_name + '.png';

    const res = await doChangeDisplayMedal(medal_name, position);
    if (!res.success) {
      toast.error(res.message);
      return;
    }
    toast.success(res.message);
    setDisplayMedals(temp);
    return;
  }

  const moveBarToElement = (menu: string) => {
    let nav = document.querySelector('ul.dashnav')
    let item = document.getElementById(menu);
    //@ts-ignore
    if (item) { nav?.style.setProperty('--move-bar', (item.offsetLeft + (item.offsetWidth / 2)) - (document.getElementById('nav-bar')?.offsetWidth / 2) + 'px') }
  }

  //console.log(valGames)

  return (
    <>
      <div className="px-4 w-full max-w-[1800px] mx-auto h-auto">
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
            <div className="w-full h-24 flex gap-4 mb-2">
              {
                displayMedals.map((medal, index) => {
                  if (medal) {
                    return (
                      <div className="tooltip" data-tip={CreateMedalToolTip(medal)} key={CreateMedalToolTip(medal)}>
                      <img src={medal}
                        className="h-full"
                        alt={medal}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                        }}
                      ></img>
                      </div>
                    )
                  }
                  else {
                    return (
                      <FaCirclePlus key={index} className="h-full w-12 mx-4 opacity-80 cursor-pointer text-ash tooltip" data-tip="Click to Showcase Medals" onClick={()=>{handleSideBarClick('medals')}}/>
                    )
                  }
                })
              }

            </div>
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
                        {valGames[0]?.mmr_change?.new_mmr && valGames[0]?.match_rank < 24 ? 100 - valGames[0]?.mmr_change?.new_mmr + ' RR to rank up' : ''}
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
              <ul className="dashnav flex gap-4 font-bold text-lg w-full pb-2">
                <li
                  id="overview"
                  onClick={(e) => handleSideBarClick("overview")}
                  onMouseOver={() => handleSideBarHover("overview")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "overview" ? "active" : ""
                    }`}
                >
                  Overview
                </li>
                <li
                  id="statistics"
                  onClick={(e) => handleSideBarClick("statistics")}
                  onMouseOver={() => handleSideBarHover("statistics")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "statistics" ? "active" : ""
                    }`}
                >
                  Statistics
                </li>
                <li
                  id="match-history"
                  onClick={(e) => handleSideBarClick("match-history")}
                  onMouseOver={() => handleSideBarHover("match-history")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "match-history" ? "active" : ""
                    }`}
                >
                  Match History
                </li>
                <li
                  id="agents"
                  onClick={(e) => handleSideBarClick("agents")}
                  onMouseOver={() => handleSideBarHover("agents")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "agents" ? "active" : ""
                    }`}
                >
                  Agents
                </li>
                <li
                  id="medals"
                  onClick={(e) => handleSideBarClick("medals")}
                  onMouseOver={() => handleSideBarHover("medals")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out text-ash ${selectedMenu === "medals" ? "active" : ""
                    }`}
                >
                  Medals
                  {medalNotif > 0 ?
                    <div className="medal-notif grid absolute self-start justify-self-end back-rust w-5 h-5 text-frost rounded-md border-[#F5603C40] translate-x-[25px] translate-y-[-10px]">
                      <p className="absolute text-sm font-extrabold">{medalNotif}</p>
                    </div>
                    : ''}
                </li>
                <hr id='nav-bar' className="back-rust w-[50px] h-[3px] nav-move-bar"></hr>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 w-full max-w-[1800px] mx-auto min-h-screen">
        {
          selectedMenu !== 'medals' ?
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
            /> : ''
        }
        {/* <h1 className="inline-flex text-4xl py-4 font-bold w-full">{selectedMenu.toLocaleUpperCase().replace('-', ' ')} <p className="inline-flex mx-4 text-sm"> <FaExclamationCircle color="#FF6F4D" className="mx-4" /> Website is still Work-In-Progress - Report any issues in the ESC Discord</p> </h1> */}
        {renderContent()}
      </div>
    </>
  );
}
