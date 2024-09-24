"use client";
import Overview from "@/app/components/MatchOverview/Leaderboard/Overview";
import Timeline from "@/app/components/MatchOverview/Timeline/Timeline";
import React, { useEffect, useState } from "react";
import 'ldrs/bouncy'
import { formatDate, formatTime } from "@/app/utils/helpers";

export default function Header({

}: {

  }) {
  const [selectedMenu, setSelectedMenu] = useState<string>("Overview");


  const [players, setPlayers] = useState({ blue: [], red: [] })
  const [isLoadingLeaderboard, setisLoadingLeaderboard] = useState(true)
  const [isLoadingRounds, setisLoadingRounds] = useState(true)
  const [matchInfo, setMatchInfo] = useState({ map_name: '', id: '', date: formatDate('1/1/1999'), blue: 0, red: 0 })
  const [roundInfo, setRoundInfo] = useState({});

  useEffect(() => {
    const matchID = window.location.href.split('/')[window.location.href.split('/').length - 1];

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

        setMatchInfo({ id: data.data[0].map_id, blue: data.data[0].blue, red: data.data[0].red, date: formatDate(data.data[0].date), map_name: data.data[0].map })

        let temp = { blue: [], red: [], topScores: { red: {}, blue: {} } };

        data.data.map((value: any) => {

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
    setSelectedMenu(menu);
  };
  return (
    <>
      <div className="px-4 2xl:px-40 w-full max-w-[1800px] mx-auto">
        <div
          className="w-full rounded-lg"
          style={{
            backgroundImage:
              "url(https://media.valorant-api.com/maps/" + matchInfo.id + "/splash.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col items-center justify-center py-4 px-6 bg-black/40">
            <div className="mb-2">
              <h2 className="text-white text-5xl font-black tracking-[.2em]">
                {matchInfo.map_name.toUpperCase()}
              </h2>
              <p className="text-white text-lg font-bold text-center tracking-wider">
                {matchInfo.date}
              </p>
              <div className="flex items-center justify-center text-5xl font-black">
                <p className="text-[#5ECCBA]">
                  {matchInfo.blue} <span className="text-white">:&nbsp;</span>
                </p>
                <p className="text-[#F5603C]">{matchInfo.red}</p>
              </div>
            </div>
            <div className="flex items-center">
              <ul className="flex gap-4 font-bold text-lg">
                <li
                  onClick={() => handleSideBarClick("Overview")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${selectedMenu === "Overview" ? "bg-[#F5603C]" : ""
                    }`}
                >
                  Overview
                </li>
                <li
                  onClick={() => handleSideBarClick("Timeline")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${selectedMenu === "Timeline" ? "bg-[#F5603C]" : ""
                    }`}
                >
                  Timeline
                </li>
                <li
                  onClick={() => handleSideBarClick("Heatmap")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${selectedMenu === "Heatmap" ? "bg-[#F5603C]" : ""
                    }`}
                >
                  Heatmap
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 2xl:px-40 w-full max-w-[1800px] mx-auto min-h-screen">
        <h1 className="text-4xl py-4 font-bold">{selectedMenu}</h1>
        {renderContent()}
      </div>
    </>
  );
}
