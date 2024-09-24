"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

// import { Orbitron } from "next/font/google";
// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

interface MatchupUIProps {
  teamList: Team[];
}

export default function MatchupUI({ teamList }: MatchupUIProps) {
  const [firstTeam, setFirstTeam] = useState<number>();
  const [secondTeam, setSecondTeam] = useState<number>();
  const handleTeamSelection = (teamId: number) => {
    if (!firstTeam && teamId !== secondTeam) {
      setFirstTeam(teamId);
      return;
    }
    if (!secondTeam && teamId !== firstTeam) {
      setSecondTeam(teamId);
      return;
    }
    if (
      (!secondTeam && teamId === firstTeam) ||
      (!firstTeam && teamId === secondTeam)
    ) {
      const teamName1 = teamList.find((team) => team.id === firstTeam)?.name;
      const teamName2 = teamList.find((team) => team.id === secondTeam)?.name;
      toast.error(
        secondTeam
          ? `${teamName2} is already selected. Please select another team.`
          : `${teamName1} is already selected. Please select another team.`,
        {
          style: {
            width: "fit-content",
            borderRadius: "10px",
            background: "#AC442A",
            color: "#fff",
          },
        }
      );
    } else {
      toast.error("You can only select two teams.", {
        style: {
          width: "fit-content",
          borderRadius: "10px",
          background: "#AC442A",
          color: "#fff",
        },
      });
    }
  };
  return (
    <>
      <div className="2xl:px-40 w-full max-w-[1800px] mx-auto">
        <div className="py-10">
          <div id="RecLeague_MatchupHeaderText" className="p-4 text-center">
            <h1
              className={`text-6xl font-black text-[#5ECCBA]`}
            >
              TEAM MATCHUP
            </h1>
            <p className="tracking-wider text-[#5ECCBA]">
              select 2 teams to compare
            </p>
          </div>
        </div>

        <div id="RecLeague_MatchupTeamSelection" className="py-14 text-center">
          <h2
            className={`text-3xl font-bold font-orbitron text-white`}
          >
            SELECTED TEAMS:
          </h2>
          <div className="flex items-center justify-center align-middle gap-5 mt-4">
            <Image
              alt=""
              width={1000}
              height={1000}
              id="selectedTeam_1"
              className="w-24 h-24 bg-black cursor-pointer rounded-md"
              onClick={() => setFirstTeam(null as any)}
              src={
                firstTeam
                  ? `https://api.esportsclubs.gg/Styles/Images/Uploads/${
                      teamList.find((team) => team.id === firstTeam)?.logo
                    }`
                  : "/default-team.png"
              }
            ></Image>
            <p
              className={`text-xl font-orbitron font-bold`}
            >
              VS.
            </p>
            <Image
              alt=""
              width={1000}
              height={1000}
              id="selectedTeam_2"
              className="w-24 h-24 bg-black cursor-pointer rounded-md"
              onClick={() => setSecondTeam(null as any)}
              src={
                secondTeam
                  ? `https://api.esportsclubs.gg/Styles/Images/Uploads/${
                      teamList.find((team) => team.id === secondTeam)?.logo
                    }`
                  : "/default-team.png"
              }
            ></Image>
          </div>
          <button
            id="matchup_button"
            className={
              firstTeam && secondTeam !== null
                ? "items-center justify-center align-middle btn bg-[#F5603C] hover:bg-[#AC442A] text-white mt-10 mb-10"
                : "items-center justify-center align-middle btn btn-disabled !text-white/40 !bg-[#1D2F44] mt-10 mb-10"
            }
          >
            Matchup / Compare
          </button>

          <div
            id="RecLeague_MatchupTeamList1"
            className="mt-20 flex items-center justify-center align-middle"
          >
            <div id="team_container" className="grid grid-cols-3 gap-16">
              {teamList.map((team) => (
                <ul key={team.id}>
                  <li>
                    <Image
                      alt=""
                      src={`https://api.esportsclubs.gg/Styles/Images/Uploads/${team.logo}`}
                      height={1000}
                      width={1000}
                      className="h-32 w-32 bg-black/20 hover:ring ring-[#F5603C]/60 transition-all cursor-pointer"
                      onClick={() => handleTeamSelection(team.id as number)}
                    ></Image>
                  </li>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
