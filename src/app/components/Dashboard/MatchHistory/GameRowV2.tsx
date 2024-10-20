import React from "react";
import Image from "next/image";
import { FaBoltLightning, FaGem } from "react-icons/fa6";
import { FaDatabase } from "react-icons/fa";

interface SmallMatchHistoryUIProps {
  mapId: string;
  agentId: string;
  rank: number;
  mapName: string;
  playerTeam: number;
  enemyTeam: number;
  lbPosition: string;
  headshotPercentage: string;
  acs: string;
  adr: number;
  kills: number;
  deaths: number;
  assists: number;
  kastPercentage: string;
  first_kills: number;
  first_deaths: number;
  multi_kills: number;
  clutches: number;
  ability1: number;
  ability2: number;
  grenade: number;
  ultimate: number;
  credit_score: string | number;
  esc_score: string | number;
  mmr_change: number;
  showRank: boolean;
  game_type: string;
  time_since: string;
}

const GameRowV2 = ({
  mapId,
  agentId,
  rank,
  mapName,
  playerTeam,
  enemyTeam,
  lbPosition,
  headshotPercentage,
  acs,
  adr,
  kills,
  deaths,
  assists,
  kastPercentage,
  first_kills,
  first_deaths,
  multi_kills,
  clutches,
  ability1,
  ability2,
  grenade,
  ultimate,
  credit_score,
  esc_score,
  mmr_change,
  showRank,
  game_type,
  time_since
}: SmallMatchHistoryUIProps) => {
  return (
    <>
      <div className="my-8">
        <div
          className="h-20 rounded-t-lg game-row-border-special"
          style={{
            backgroundImage: `url(https://media.valorant-api.com/maps/${mapId}/splash.png)`,
            backgroundSize: "40%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
          }}
        >
          <div
            className={`relative rounded-t-lg grid grid-cols-12 items-center h-full ${playerTeam > enemyTeam
                ? "game-row-win"
                : playerTeam < enemyTeam
                  ? "game-row-loss"
                  : "game-row-draw"
              }`}
          >

            <Image
              src={`https://media.valorant-api.com/agents/${agentId}/displayicon.png`}
              width={1000}
              height={1000}
              alt=""
              className="w-24 bottom-0 object-cover flex justify-center absolute"
            />

            <div className="w-1/2"></div>

            <div className={`flex flex-col items-center -ml-4 ${showRank ? '' : 'hidden'}`}>
              <Image
                width={1000}
                height={1000}
                alt=""
                src={`/valorant/ranks/${rank}.png`}
                className="w-10 h-auto flex justify-center drop-shadow-lg"
              />
              <p
                className={`font-[800] ${!mmr_change
                    ? "text-[#CACACA]"
                    : mmr_change > 0
                      ? "text-win"
                      : "text-loss"
                  }`}
              >
                {mmr_change
                  ? (mmr_change > 0 ? "+" : "") + mmr_change
                  : "≠"}
              </p>
            </div>

            <div className="col-span-2">
              <p className="font-black text-frost uppercase text-lg leading-none">
                {mapName}
              </p>
              <p className="font-bold text-sm text-ash">
                {game_type} • {time_since}
              </p>

            </div>

            <div className="flex flex-col items-center -ml-10">
              <div>
                <p className="text-[#5ECCBA] font-black text-xl leading-none">
                  {playerTeam}
                  <span className="text-frost"> : </span>
                  <span className="text-[#F5603C]">{enemyTeam}</span>
                </p>
              </div>
              <div
                className={`bg-gradient-to-r mt-2 ${lbPosition === "1st"
                    ? "back-mvp"
                    : lbPosition === "2nd"
                      ? "back-2nd"
                      : lbPosition === "3rd"
                        ? "back-3rd"
                        : "back-obsidian"
                  } rounded-md mx-2 px-2 mt-1 font-bold`}
              >
                <p>{lbPosition} Place</p>
              </div>
            </div>

            <div className="flex col-span-4 justify-start">
            <div className="flex gap-2">
              <FaBoltLightning 
                color="#5ECCBA"
                className="h-8 w-auto m-auto"
              />
              <div>
                <p className="font-[550] text-sm text-ash leading-none mt-1">
                  Mechanic Score
                </p>
                <p className="text-xl font-[600] text-voltage leading-none tracking-wider mt-1">
                  {esc_score}
                  <span className="text-white text-base">/100</span>
                </p>
              </div>
            </div>

            <div className="flex gap-2 ml-4">
              <FaDatabase
                color="#5ECCBA"
                className="h-8 w-auto m-auto"
              />
              <div>
                <p className="font-[550] text-sm text-ash leading-none mt-1">
                  Credit Score
                </p>
                <p className="text-xl font-[600] text-voltage leading-none tracking-wider mt-1">
                  {esc_score}
                  <span className="text-white text-base">/100</span>
                </p>
              </div>
            </div>

            </div>

            <div className="col-start-10 col-span-3 flex justify-between px-4">
              <div>
                <p className="font-black text-sm text-ash leading-none">
                  K / D / A
                </p>
                <p className="text-frost font-black">
                  {kills} / {deaths} / {assists}
                </p>
              </div>

              <div>
                <p className="font-black text-sm text-ash leading-none">ACS</p>
                <p className="text-frost font-black">{acs}</p>
              </div>

              <div>
                <p className="font-black text-sm text-ash leading-none">HS%</p>
                <p className="text-frost font-black">{headshotPercentage}%</p>
              </div>

              <div>
                <p className="font-black text-sm text-ash leading-none">KAST%</p>
                <p className="text-frost font-black">{kastPercentage}%</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-8 back-darkslate rounded-b-lg grid grid-cols-12 game-row-border">
                <div className="col-span-4 w-full flex flex-row items-center gap-4 px-2">
                  <FaGem
                  color="#41B9FD"
                  height="1em"
                  width="auto"
                  />
                  <p className="font-bold text-sm">ESC Game Reports Coming Soon...</p>
                </div>
                <div className="grid grid-cols-5 col-span-5 w-full h-full items-center justify-between pr-4">
                  <div className="flex flex-row gap-4 game-row-border-right px-2 h-full">
                    <p className="text-ash text-xs font-[550] m-auto">AD/R</p>
                    <span className="font-frost text-base font-bold m-auto">{adr}</span>
                  </div>
                  <div className="flex flex-row gap-4 game-row-border-right px-2 h-full">
                    <p className="text-ash text-xs font-[550] m-auto">First Kills</p>
                    <span className="font-frost text-base font-bold m-auto">{first_kills}</span>
                  </div>
                  <div className="flex flex-row gap-4 game-row-border-right px-2 h-full">
                    <p className="text-ash text-xs font-[550] m-auto whitespace-nowrap">First Deaths</p>
                    <span className="font-frost text-base font-bold m-auto">{first_deaths}</span>
                  </div>
                  <div className="flex flex-row gap-4 game-row-border-right px-2 h-full">
                    <p className="text-ash text-xs font-[550] m-auto">Multikills</p>
                    <span className="font-frost text-base font-bold m-auto">{multi_kills}</span>
                  </div>
                  <div className="flex flex-row gap-4 game-row-border-right px-2 h-full">
                    <p className="text-ash text-xs font-[550] m-auto">Clutches</p>
                    <span className="font-frost text-base font-bold m-auto">{clutches}</span>
                  </div>
                </div>
                <div className="col-span-3 w-full flex flex-row items-center justify-between py-1 px-2">
                  <p className="text-ash text-sm font-[550] whitespace-nowrap">Ability Usage</p>
                  <div className="flex items-center gap-1">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability1/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-6 h-6 object-cover brightness-75"
                    />
                    <p className="font-bold">{ability1}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability2/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-6 h-6 object-cover brightness-75"
                    />
                    <p className="font-bold">{ability2}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/grenade/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-6 h-6 object-cover brightness-75"
                    />
                    <p className="font-bold">{grenade}</p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/ultimate/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-6 h-6 object-cover brightness-75"
                    />
                    <p className="font-bold">{ultimate}</p>
                  </div>
                </div>
        </div>
      </div>
    </>
  );
};
1;

export default GameRowV2;
