import React from "react";
import Image from "next/image";

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
  kills: number;
  deaths: number;
  assists: number;
  kastPercentage: string;
  esc_score: string | number;
  mmr_change: number;
  showRank: boolean;
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
  kills,
  deaths,
  assists,
  kastPercentage,
  esc_score,
  mmr_change,
  showRank,
}: SmallMatchHistoryUIProps) => {
  return (
    <>
      <div>
        <div
          className="rounded-lg h-20 my-8"
          style={{
            backgroundImage: `url(https://media.valorant-api.com/maps/${mapId}/splash.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div
            className={`relative rounded-lg grid grid-cols-11 items-center h-full ${
              playerTeam > enemyTeam
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

            <div className={`flex flex-col items-center -ml-4 ${showRank ? '' : 'hidden'}`}>
              <Image
                width={1000}
                height={1000}
                alt=""
                src={`/valorant/ranks/${rank}.png`}
                className="w-12 h-auto flex justify-center drop-shadow-lg"
              />
              <p
                className={`font-bold ${
                  !mmr_change
                    ? "text-[#CACACA]"
                    : mmr_change > 0
                    ? "text-[#5ECCBA]"
                    : "text-[#F5603C]"
                }`}
              >
                {mmr_change
                  ? (mmr_change > 0 ? "+" : "") + mmr_change
                  : "≠"}
              </p>
            </div>

            <p className="font-black uppercase text-lg leading-none ml-2">
              {mapName}
            </p>

            <div className="flex flex-col items-center col-span-2">
              <div>
                <p className="text-[#5ECCBA] font-black text-xl leading-none">
                  {playerTeam} :{" "}
                  <span className="text-[#F5603C]">{enemyTeam}</span>
                </p>
              </div>
              <div
                className={`bg-gradient-to-r ${
                  lbPosition === "1st"
                    ? "from-[#F5C620] to-[#BA981D]"
                    : lbPosition === "2nd"
                    ? "from-[#c0c0c0] to-[#a9a9a9]"
                    : lbPosition === "3rd"
                    ? "from-[#E3AF66] to-[#A37E49]"
                    : "from-[#adb2bb] to-[#6b6f78]"
                } rounded-md px-2 mt-1 font-bold`}
              >
                <p>{lbPosition} Place</p>
              </div>
            </div>

            <div className="flex gap-2 col-span-2">
              <Image
                src="/dashboard/score-star.png"
                alt=""
                width={1000}
                height={1000}
                className="h-12 w-auto"
              />
              <div>
                <p className="font-black text-[#B8B8B8] leading-none mb-1">
                  Mechanic Score
                </p>
                <p className="text-2xl font-bold text-[#4DFFDD] leading-none">
                  {esc_score}
                  <span className="text-white text-base">/100</span>
                </p>
              </div>
            </div>

            <div className="col-start-8 col-span-4 flex justify-between px-4">
              <div>
                <p className="font-black text-[#B8B8B8] leading-none">
                  K / D / A
                </p>
                <p className="text-white font-black">
                  {kills} / {deaths} / {assists}
                </p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">ACS</p>
                <p className="text-white font-black">{acs}</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">HS%</p>
                <p className="text-white font-black">{headshotPercentage}%</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">KAST%</p>
                <p className="text-white font-black">{kastPercentage}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
1;

export default GameRowV2;
