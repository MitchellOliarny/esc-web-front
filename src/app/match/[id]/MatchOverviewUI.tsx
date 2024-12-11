"use client";
import Overview from "@/app/components/MatchOverview/Leaderboard/Overview";
import Timeline from "@/app/components/MatchOverview/Timeline/Timeline";
import React, { useActionState, useEffect, useState } from "react";
import 'ldrs/bouncy'
import { formatDate, formatDateYear, formatTime } from "@/app/utils/helpers";

export default function Header({
  user
}: {
  user: any
}) {
  const [selectedMenu, setSelectedMenu] = useState<string>("Overview");


  const [players, setPlayers] = useState({ blue: [], red: [] })
  const [isLoadingLeaderboard, setisLoadingLeaderboard] = useState(true)
  const [isLoadingRounds, setisLoadingRounds] = useState(true)
  const [matchInfo, setMatchInfo] = useState({ map_name: '', id: '', date: '1/1/1999', blue: 0, red: 0 })
  const [roundInfo, setRoundInfo] = useState({});
  const [userMatchData, setUserMatchData] = useState(null);

  useEffect(() => {
    const matchID = window.location.href.split('/')[window.location.href.split('/').length - 1];

    console.log(user)

    fetch((process.env.NEXT_PUBLIC_API_URL + '/val/data/match/' + matchID + '/leaderboard'), {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        //removes loading text
        setisLoadingLeaderboard(false);

        setMatchInfo({ id: data.data[0].map_id, blue: data.data[0].blue, red: data.data[0].red, date: data.data[0].date, map_name: data.data[0].map })

        let temp = { blue: [], red: [], topScores: { red: {}, blue: {} } };

        data.data.map((value: any) => {

          if(value.puuid == user.puuid) {
            console.log(value)
            setUserMatchData(value)
          }

          let multikills = 0;
          for (const x in value.multikills) {
            if (x != '1k') {
              multikills += value.multikills[x];
            }
          }

          value.stats.multikills = multikills;

          //@ts-ignore
          temp[value.team].push(value);


          //@ts-ignore
          if (!temp.topScores[value.team].multikills || temp.topScores[value.team].multikills.score < multikills) {
            //@ts-ignore
            temp.topScores[value.team].multikills = { puuid: [value.puuid], score: multikills }
          }
          //@ts-ignore
          else if (temp.topScores[value.team].multikills.score == multikills) {
            //@ts-ignore
            temp.topScores[value.team].multikills.puuid.push(value.puuid)
          }

          //@ts-ignore
          if (!temp.topScores[value.team].kast || temp.topScores[value.team].kast.score < value.kast) {
            //@ts-ignore
            temp.topScores[value.team].kast = { puuid: [value.puuid], score: value.kast }
          }
          //@ts-ignore
          else if (temp.topScores[value.team].kast.score == value.kast) {
            //@ts-ignore
            temp.topScores[value.team].kast.puuid.push(value.puuid)
          }

          const FindStatTopScore = (array: object) => {
            for (const x in array) {
              //@ts-ignore
              if (typeof array[x] == 'object') {
                //@ts-ignore
                FindStatTopScore(array[x]);
                continue;
              }

              if (x == 'deaths') {

                //@ts-ignore
                if (!temp.topScores[value.team][x] || temp.topScores[value.team][x].score > array[x]) {
                  //@ts-ignore
                  temp.topScores[value.team][x] = { puuid: [value.puuid], score: array[x] }
                }
                //@ts-ignore
                else if (temp.topScores[value.team][x].score == array[x]) {
                  //@ts-ignore
                  temp.topScores[value.team][x].puuid.push(value.puuid)
                }

                //@ts-ignore
                if (!temp.topScores[value.team]['kd_difference'] || temp.topScores[value.team]['kd_difference'].score < (array['kills'] - array[x])) {
                  //@ts-ignore
                  temp.topScores[value.team]['kd_difference'] = { puuid: [value.puuid], score: (array['kills'] - array[x]) }
                }
                //@ts-ignore
                else if (temp.topScores[value.team]['kd_difference'].score == (array['kills'] - array[x])) {
                  //@ts-ignore
                  temp.topScores[value.team]['kd_difference'].puuid.push(value.puuid)
                }

                continue;
              }

              if (x == 'fDeaths') {

                //@ts-ignore
                if (!temp.topScores[value.team][x] || temp.topScores[value.team][x].score > array[x]) {
                  //@ts-ignore
                  temp.topScores[value.team][x] = { puuid: [value.puuid], score: array[x] }
                }
                //@ts-ignore
                else if (temp.topScores[value.team][x].score == array[x]) {
                  //@ts-ignore
                  temp.topScores[value.team][x].puuid.push(value.puuid)
                }

                //@ts-ignore
                if (!temp.topScores[value.team]['fk_fd_difference'] || temp.topScores[value.team]['fk_fd_difference'].score < (array['fKills'] - array[x])) {
                  //@ts-ignore
                  temp.topScores[value.team]['fk_fd_difference'] = { puuid: [value.puuid], score: (array['fKills'] - array[x]) }
                }
                //@ts-ignore
                else if (temp.topScores[value.team]['fk_fd_difference'].score == (array['fKills'] - array[x])) {
                  //@ts-ignore
                  temp.topScores[value.team]['fk_fd_difference'].puuid.push(value.puuid)
                }
                continue;
              }

              //@ts-ignore
              if (!temp.topScores[value.team][x] || temp.topScores[value.team][x].score < array[x]) {
                //@ts-ignore
                temp.topScores[value.team][x] = { puuid: [value.puuid], score: array[x] }
              }
              //@ts-ignore
              else if (temp.topScores[value.team][x].score == array[x]) {
                //@ts-ignore
                temp.topScores[value.team][x].puuid.push(value.puuid)
              }
            }
          }

          //@ts-ignore
          FindStatTopScore(value.stats);
          FindStatTopScore(value.f_kills_deaths);

        })
        //@ts-ignore
        temp.red.sort((a, b) => b.stats.combat_score - a.stats.combat_score);
        //@ts-ignore
        temp.blue.sort((a, b) => b.stats.combat_score - a.stats.combat_score);
        setPlayers(temp);
      });

    fetch((process.env.NEXT_PUBLIC_API_URL + '/val/data/match/' + matchID + '/rounds'), {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setisLoadingRounds(false);
        console.log(data.match[0]);
        setRoundInfo(data.match[0]);
      })
  }, [])

  const renderContent = () => {
    switch (selectedMenu) {
      case "Overview":
        return (
          <Overview isLoading={isLoadingLeaderboard} players={players} />
        );
      case "Timeline":
        return <Timeline isLoading={isLoadingRounds} roundInfo={roundInfo} players={players} />;
      case "Heatmap":
        return <></>;
      default:
        return "";
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

  const moveBarToElement = (menu: string) => {
    let nav = document.querySelector('ul.dashnav')
    let item = document.getElementById(menu);
    //@ts-ignore
    if (item) { nav?.style.setProperty('--move-bar', (item.offsetLeft + (item.offsetWidth / 2)) - (document.getElementById('nav-bar')?.offsetWidth / 2) + 'px') }
  }

  return (
    <>
      <div className="px-4 w-full lg:pr-8 pr-2 max-w-[1800px] mx-auto">
        <div
          className="w-full rounded-lg h-72 relative"
          style={{
            backgroundImage:
              "url(https://media.valorant-api.com/maps/" + matchInfo.id + "/splash.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full match-grid h-full px-6 bg-black/50 rounded-lg">
            <div className="w-full grid self-end px-4 gap-2 mb-4">
              <div className="flex lg:gap-8 gap-2 lg:flex-row flex-col">
                <h2 className="text-white lg:text-5xl text-3xl font-black tracking-[.2em]">
                  {matchInfo.map_name.toUpperCase()}
                </h2>
                <div className="flex items-center  lg:text-5xl text-3xl font-black">
                  <p className="text-[#5ECCBA]">
                    {matchInfo.blue} <span className="text-white">:&nbsp;</span>
                  </p>
                  <p className="text-[#F5603C]">{matchInfo.red}</p>
                </div>
                </div>
                <p className="text-ash text-xl font-bold tracking-wider">
                  {//@ts-ignore
                  formatDateYear(matchInfo.date)}
                </p>
                
            </div>
            <div className="absolute lg:self-end self-start lg:justify-self-end justify-self-start lg:justify-end justify-start lg:content-end content-start flex-wrap flex-row lg:w-[50%] w-full h-full flex overflow-hidden gap-4 m-2">
              {
                userMatchData ?
                //@ts-ignore
                Object.keys(userMatchData.medal_progress).map((medal, index) => {
                  return (
                    //@ts-ignore
                    userMatchData.medal_progress[medal].tiers.map((value, index) => {
                    
                      if (value.isComplete) {
                        return (
                          <div className="tooltip lg:h-24 h-16" data-tip={medal.replace('_', " ")+" Tier " + value.tier} key={medal+value.tier}>
                          <img src={"https://files.esportsclubs.gg/"+medal+"_"+value.tier}
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
                    }
                  ))
                }) : ''
              }

            </div>
            <div className="flex items-end">
              <ul className="dashnav flex gap-4 font-bold text-lg w-full pb-2">
                <li
                  id="overview"
                  onClick={(e) => handleSideBarClick("overview")}
                  onMouseOver={() => handleSideBarHover("overview")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "Overview" ? "active" : ""
                    }`}
                >
                  Overview
                </li>
                {/* <li
                  id="Timeline"
                  onClick={(e) => handleSideBarClick("Timeline")}
                  onMouseOver={() => handleSideBarHover("Timeline")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "Timeline" ? "active" : ""
                    }`}
                >
                  Timeline
                </li>
                <li
                  id="Heatmap"
                  onClick={(e) => handleSideBarClick("Heatmap")}
                  onMouseOver={() => handleSideBarHover("Heatmap")}
                  onMouseOut={() => handleSideBarBack()}
                  className={`grid cursor-pointer py-2 px-4 transition-all ease-in-out text-ash ${selectedMenu === "Heatmap" ? "active" : ""
                    }`}
                >
                  Heatmap
                </li> */}
                <hr id='nav-bar' className="back-rust w-[50px] h-[3px] nav-move-bar"></hr>
              </ul>
            </div>
          </div>
        </div>
      </div >
      <div className="px-4 py-4 pr-8 w-full max-w-[1800px] mx-auto min-h-screen">
        {renderContent()}
      </div>
    </>
  );
}
