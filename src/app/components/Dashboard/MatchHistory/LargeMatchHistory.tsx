import React from "react";
import Image from "next/image";

interface LargeMatchHistoryUIProps {
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
  adr: string;
  first_kills: number;
  first_deaths: number;
  kastPercentage: string;
  multi_kills: number;
  clutches: number;
  ability1: number;
  ability2: number;
  grenade: number;
  ultimate: number;
  esc_score: string | number;
  credit_score: string | number;
  mmr_change: number;
  showRank: boolean;
}

const LargeMatchHistory = ({
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
  adr,
  first_kills,
  first_deaths,
  kastPercentage,
  multi_kills,
  clutches,
  ability1,
  ability2,
  grenade,
  ultimate,
  esc_score,
  credit_score,
  mmr_change,
  showRank,
}: LargeMatchHistoryUIProps) => {

  return (
    <>
      <div>
        <div
          className="rounded-lg"
          style={{
            backgroundImage: `url(https://media.valorant-api.com/maps/${mapId}/splash.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div
          style={{overflowY: 'hidden', overflowX: 'visible'}}
            className={`rounded-lg flex justify-between items-center bg-gradient-to-r ${
              playerTeam > enemyTeam
                ? "from-[#5ECCBA]/75"
                : playerTeam < enemyTeam
                ? "from-[#F5603C]/75"
                : "from-white/60"
            } from-0% to-black/80 to-20% p-2`}
          >
            <Image
             style={{overflowY: 'hidden', overflowX: 'visible'}}
              src={`https://media.valorant-api.com/agents/${agentId}/fullportrait.png`}
              width={1000}
              height={1000}
              alt=""
              className="ml-16 lg:w-20 w-8 lg:h-40 h-32 object-cover scale-[2.5] translate-y-20 lg:translate-x-0 translate-x-[-2em]"
            />

            <div className="flex flex-col items-center">
              <div className={`flex items-center gap-0.5 ${showRank ? '' : 'hidden'}`}>
                <Image
                  width={1000}
                  height={1000}
                  alt=""
                  src={`/valorant/ranks/${rank}.png`}
                  className="w-12 h-auto drop-shadow-lg"
                />
                <p
                  className={`font-bold ${
                    !mmr_change
                      ? "text-[#ABABAB]"
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
              <p className="font-black uppercase text-lg leading-none my-1">
                {mapName}
              </p>
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
                <p className="text-center">{lbPosition} Place</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="font-black text-[#B8B8B8] leading-none">HS%</p>
                <p className="text-white font-black">{headshotPercentage}%</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">ACS</p>
                <p className="text-white font-black">{acs}</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">
                  K / D / A
                </p>
                <p className="text-white font-black">
                  {kills} / {deaths} / {assists}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="font-black text-[#B8B8B8] leading-none">AD/R</p>
                <p className="text-white font-black">{adr}</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">
                  First Kills
                </p>
                <p className="text-white font-black">{first_kills}</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">
                  First Deaths
                </p>
                <p className="text-white font-black">{first_deaths}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                <p className="font-black text-[#B8B8B8] leading-none">KAST%</p>
                <p className="text-white font-black">{kastPercentage}%</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">
                  Multi Kills
                </p>
                <p className="text-white font-black">{multi_kills}</p>
              </div>

              <div>
                <p className="font-black text-[#B8B8B8] leading-none">
                  Clutches
                </p>
                <p className="text-white font-black">{clutches}</p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <p className="font-black text-[#B8B8B8] leading-none mb-2">
                  Ability Usage
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability1/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-8 h-8 object-cover"
                    />
                    <p className="font-bold">{ability1}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/ability2/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-8 h-8 object-cover"
                    />
                    <p className="font-bold">{ability2}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/grenade/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-8 h-8 object-cover"
                    />
                    <p className="font-bold">{grenade}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <Image
                      src={`https://media.valorant-api.com/agents/${agentId}/abilities/ultimate/displayicon.png`}
                      height={1000}
                      width={1000}
                      alt=""
                      className="w-8 h-8 object-cover"
                    />
                    <p className="font-bold">{ultimate}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex gap-2">
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

                <div className="flex gap-2">
                  <Image
                    src="/dashboard/score-star.png"
                    alt=""
                    width={1000}
                    height={1000}
                    className="h-12 w-auto"
                  />
                  <div>
                    <p className="font-black text-[#B8B8B8] leading-none mb-1">
                      Credit Score
                    </p>
                    <p className="text-2xl font-bold text-[#4DFFDD] leading-none">
                      {credit_score}
                      <span className="text-white text-base">/100</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
1;

export default LargeMatchHistory;
