"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Filter from "@/app/components/Filters";
import { formatDate, formatTime } from "@/app/utils/helpers";
// import { Orbitron } from "next/font/google";
// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

interface ScheduleUIProps {
  scheduleList: ScheduleList[];
  teamStanding: Team[];
}

export default function ScheduleUI({
  scheduleList,
  teamStanding,
}: ScheduleUIProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [division, setDivision] = useState<string>("All Teams");

  const gameCounts = {} as any;

  const getTeamStandings = (teamName: string) => {
    const team = teamStanding.find((team) => team.name === teamName);
    return team ? `${team.wins}W - ${team.losses}L` : "N/A";
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDivision(e.target.value);
  };

  const filteredTeamsList =
    division === "All Teams"
      ? scheduleList
      : scheduleList.filter((game: ScheduleList) => game.league === division);

  // console.log(filteredTeamsList);

  return (
    <>
      <Filter onChange={handleDropdownChange} />
      <div className="py-10 px-6 2xl:!px-40 min-h-screen">
        <h1 className="text-white text-4xl font-bold uppercase tracking-widest">
          SCHEDULE
        </h1>

        {loading ? (
          <div className="skeleton rounded-md bg-[#132136]/50 mt-4 h-20"></div>
        ) : (
          <div>
            {filteredTeamsList.map((game: any, index: number, array: any) => {
              const gameDate = new Date(game.date);
              const currentDate = new Date();

              if (!gameCounts[game.date]) {
                gameCounts[game.date] = 1;
              } else {
                gameCounts[game.date]++;
              }

              const isLastGameForDate =
                index === array.length - 1 ||
                game.date !== array[index + 1].date;

              const shouldRenderDateHeader =
                index === 0 || game.date !== array[index - 1].date;

              const isLastGame = isLastGameForDate;
              return (
                <div key={index}>
                  {shouldRenderDateHeader && (
                    // This design will change, need to think of something to show past games
                    <h1
                      className={
                        gameDate < currentDate
                          ? `bg-[#5ECCBA]/20 border border-[#5ECCBA] w-fit px-6 py-4 mt-10 text-white text-2xl font-bold `
                          : `bg-[#5ECCBA]/50 border border-[#5ECCBA] w-fit px-6 py-4 mt-10 text-white text-2xl font-bold `
                      }
                    >
                      {formatDate(game.date)}
                    </h1>
                  )}

                  <div className={`pt-2 ${isLastGame ? "pb-20" : ""}`}>
                    <div className="grid grid-cols-12 py-5 border-b border-white items-center">
                      <div className="col-span-2">
                        <p
                          className={`GameTime text-white text-2xl font-bold `}
                        >
                          {formatTime(game.date)}
                        </p>
                      </div>
                      <div className="home-team col-span-4 grid grid-cols-4 items-center">
                        <div className="col-span-3 text-right">
                          <h2
                            className={`HomeTeam text-white font-medium text-2xl `}
                          >
                            {game.home_name}
                          </h2>
                          <p className="HomeStandings text-white">
                            {getTeamStandings(game.home_name)}
                          </p>
                          <p className="text-[#F5603C]">HOME TEAM</p>
                        </div>
                        <div className="flex justify-center">
                          <Image
                            height={1000}
                            width={1000}
                            src={
                              game.home_logo
                                ? `https://api.esportsclubs.gg/Styles/Images/Uploads/${game.home_logo}`
                                : "/default-team.png"
                            }
                            alt=""
                            className="HomeLogo w-16 h-16"
                          />
                        </div>
                      </div>
                      <div>
                        <p
                          className={`text-white font-orbitron font-bold text-xl flex justify-center `}
                        >
                          {/* Change this to what the score will be when the game is done */}
                          {currentDate > gameDate ? "0 : 0" : "VS"}
                        </p>
                      </div>
                      <div className="away-team col-span-4 grid grid-cols-4 items-center">
                        <div className="flex justify-center">
                          <Image
                            height={1000}
                            width={1000}
                            src={
                              game.away_logo
                                ? `https://api.esportsclubs.gg/Styles/Images/Uploads/${game.away_logo}`
                                : "/default-team.png"
                            }
                            alt=""
                            className="AwayLogo w-16 h-16"
                          />
                        </div>

                        <div className="col-start-2 col-span-3">
                          <h2
                            className={`AwayTeam text-white font-medium text-2xl `}
                          >
                            {game.away_name}
                          </h2>
                          <p className="AwayStandings text-white">
                            {getTeamStandings(game.away_name)}
                          </p>
                          <p className="text-[#5ECCBA]">AWAY TEAM</p>
                        </div>
                      </div>
                      <div>
                        <p
                          className={`gamecount text-white text-xl text-center font-bold `}
                        >
                          {"Game " + gameCounts[game.date]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
