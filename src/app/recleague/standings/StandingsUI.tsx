"use client";
import React, { useState } from "react";
import Image from "next/image";
import Filter from "@/app/components/Filters";

interface StandingsUIProps {
  teamsList: Team[];
}

export default function StandingsUI({ teamsList }: StandingsUIProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [division, setDivision] = useState<string>("All Teams");

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDivision(e.target.value);
  };

  const filteredTeamsList =
    division === "All Teams"
      ? teamsList
      : teamsList.filter((team: Team) => team.league === division);

  filteredTeamsList.sort(
    (a: Team, b: Team) =>
      b.rounds_for - b.rounds_against - (a.rounds_for - a.rounds_against)
  );
  return (
    <main>
      <Filter onChange={handleDropdownChange} />
      <section className="pt-10 py-20 px-6 2xl:!px-40 min-h-screen">
        <h1 className="text-white text-4xl font-bold uppercase tracking-widest">
          STANDINGS
        </h1>
        <div className="grid grid-cols-6 lg:grid-cols-12 items-center mt-4">
          <p className="text-white flex justify-center font-medium tracking-wider">
            Rank
          </p>
          <p className="text-white col-span-2 lg:col-span-8 font-medium tracking-wider">
            Team Name
          </p>
          <p className="text-white flex justify-center font-medium tracking-wider">
            Wins
          </p>
          <p className="text-white flex justify-center font-medium tracking-wider">
            Losses
          </p>
          <p className="text-white text-center flex justify-center font-medium tracking-wider">
            Round +/-
          </p>
        </div>

        {loading ? (
          <div className="skeleton rounded-md bg-[#132136]/50 mt-4 h-20"></div>
        ) : (
          <div>
            {filteredTeamsList.map((team: Team, index: number) => (
              <div
                key={index}
                id="RecStanding_TeamListOrigin"
                className="cursor-pointer grid grid-cols-6 lg:grid-cols-12 items-center my-4 bg-[#132136] py-3 border border-white rounded-md"
              >
                <p className="text-white flex justify-center font-medium tracking-wider font-orbitron text-xl">
                  {index + 1}
                </p>
                <div className="flex col-span-2 lg:col-span-8 items-center">
                  <Image
                    height={1000}
                    width={1000}
                    className="recteam_logo w-12 h-12 mr-3 hidden lg:block"
                    src={team.logo ? `https://api.esportsclubs.gg/Styles/Images/Uploads/${team.logo}` : "/default-team.png"}
                    alt="Team Logo"
                  />
                  <p className="recteam_name text-white font-medium tracking-wider text-xl font-orbitron">
                    {team.name}
                  </p>
                </div>
                <p className="recteam_wins text-white flex justify-center font-medium tracking-wider text-xl font-orbitron">
                  {team.wins}
                </p>
                <p className="recteam_losses text-white flex justify-center font-medium tracking-wider text-xl font-orbitron">
                  {team.losses}
                </p>
                <p className="recteam_rounddiff text-white flex justify-center font-medium tracking-wider text-xl font-orbitron">
                  {team.rounds_for - team.rounds_against}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
