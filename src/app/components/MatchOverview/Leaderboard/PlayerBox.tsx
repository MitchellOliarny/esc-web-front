import React from "react";
import Image from "next/image";

interface GameProps {
  agent: number,
  rank: number,
  puuid: string,
  name: string,
  tag: string,
  agent_name: string,
  kast: number,
  team_color: string,
  highlight_color: string,

  topScores: any,

  stats: any,
  f_kills: any,
}

const PlayerBox = ({
  agent,
  rank,
  puuid,
  name,
  tag,
  agent_name,
  kast,
  stats,
  f_kills,
  team_color,
  highlight_color,

  topScores,

}: GameProps) => {

  return (
    <div className="grid grid-cols-12 items-center text-lg" style={{ borderLeft: team_color, borderLeftStyle: 'solid', borderLeftWidth: '5px' }}>
      <div className="grid grid-cols-5 items-center bg-[#1E2835] rounded-md mb-2" style={{ gridColumn: '4 span', height: '90%', margin: '1%' }}>
        <div className="col-span-2 flex justify-center">
          <div className="flex flex-col text-center" style={{width: '-webkit-fill-available', maxWidth: '80%', whiteSpace: 'nowrap'}}>
            <div className="flex items-center">
              <Image
                alt="rank"
                className="w-auto h-8"
                src={`https://media.valorant-api.com/agents/${agent}/killfeedportrait.png`}
                height={100}
                width={100}
              />
              <Image
                alt="rank"
                className="w-auto h-14"
                src={`https://api.esportsclubs.gg/images/ranks/${rank}`}
                height={100}
                width={100}
              />
            </div>
            <p className="font-bold" style={{textAlign: 'left'}}>{name && tag ? name + '#' + tag : agent_name}</p>
          </div>
        </div>
        <p className="flex justify-center font-bold" style={topScores.combat_score.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.combat_score.toFixed(2)}</p>
        <p className="flex justify-center font-bold">{stats.kills}/{stats.deaths}/{stats.assists}</p>
        <p className="flex justify-center font-bold" style={topScores.kd_difference.puuid.includes(puuid) ? { color: highlight_color } : {}} >{stats.kills - stats.deaths > -1 ? '+' : ''}{stats.kills - stats.deaths}</p>
      </div>
      <div className="grid grid-cols-4 items-center bg-[#1E2835] rounded-md mb-2" style={{ gridColumn: '3 span', height: '90%', margin: '1%' }}>
        <p className="flex justify-center font-bold" style={topScores.hs_percent.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.hs_percent.toFixed(2)}%</p>
        <p className="flex justify-center font-bold" style={topScores.dmgdelta.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.dmgdelta > 0 ? '+' : ''}{stats.dmgdelta.toFixed(2)}</p>
        <p className="flex justify-center font-bold" style={topScores.adr.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.adr.toFixed(2)}</p>
        <p className="flex justify-center font-bold" style={topScores.kast.puuid.includes(puuid) ? { color: highlight_color } : {}}>{kast.toFixed(2)}%</p>
      </div>
      <div className="grid grid-cols-4 items-center bg-[#1E2835] rounded-md mb-2" style={{ gridColumn: '2 span', height: '90%', margin: '1%' }}>
        <p className="flex justify-center font-bold tooltip" style={topScores.fKills.puuid.includes(puuid) ? { color: highlight_color } : {}} data-tip={"FK to Round Win / Total FKs"}>{f_kills.fKillRWin}/{f_kills.fKills}</p>
        <p className="flex justify-center font-bold tooltip" style={topScores.fDeaths.puuid.includes(puuid) ? { color: highlight_color } : {}} data-tip={"FD to Round Win / Total FDs"}>{f_kills.fDeaths - f_kills.fDeathRLoss}/{f_kills.fDeaths}</p>
        <p className="flex justify-center font-bold" style={topScores.fk_fd_difference.puuid.includes(puuid) ? { color: highlight_color } : {}}>{f_kills.fKills - f_kills.fDeaths > -1 ? '+' : ''}{f_kills.fKills - f_kills.fDeaths}</p>
        <p className="flex justify-center font-bold" style={topScores.multikills.puuid.includes(puuid) ? { color: highlight_color } : {}}>{}{stats.multikills}</p>
      </div>
      <div className="grid grid-cols-4 items-center bg-[#1E2835] rounded-md mb-2" style={{ gridColumn: '3 span', height: '90%', margin: '1%' }}>
        <p className="flex justify-center font-bold" style={topScores.grenade.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.grenade}</p>
        <p className="flex justify-center font-bold" style={topScores.ability1.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.ability1}</p>
        <p className="flex justify-center font-bold" style={topScores.ability2.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.ability2}</p>
        <p className="flex justify-center font-bold" style={topScores.ultimate.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.ultimate}</p>
      </div>
    </div>
  );
}

export default PlayerBox;
