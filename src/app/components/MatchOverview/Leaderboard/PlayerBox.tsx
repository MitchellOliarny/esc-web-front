import React, { useState } from "react";
import Image from "next/image";
import { after } from "node:test";
import { FaGem } from "react-icons/fa";

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

  isPopped: boolean
  isUser: boolean
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
  isPopped,
  isUser
}: GameProps) => {

  const [popup, setPopUp] = useState(isPopped)
  return (
    <div className={`h-auto rounded-lg cursor-pointer my-2 min-w-[1000px] w-auto `} onClick={()=>{setPopUp(popup ? false : true)}}>
      <div className={`h-24 grid grid-cols-9 items-center text-lg ${isUser ? 'user-back-match': 'back-graphite'} ${popup ? 'rounded-t-lg' : 'rounded-lg'} game-row-border overflow-hidden xl:text-[1em] text-[0.8em]`}>
        <div className="grid grid-cols-5 items-center game-row-border-right" style={{ gridColumn: '4 span' }}>
          <div className="col-span-4 flex justify-center h-full">
            <div className="flex flex-row gap-4 text-center h-full" style={{ width: '-webkit-fill-available', whiteSpace: 'nowrap' }}>
              <div className="flex items-center h-full gap-4">
                <Image
                  alt="rank"
                  className="w-auto h-24 bottom-0 rounded-bl-lg"
                  src={`https://media.valorant-api.com/agents/${agent}/displayicon.png`}
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
              <div className="inline-flex flex-col justify-center">
                <p className="font-bold text-left text-frost text-lg">{name && tag ? name : agent_name}</p>
                <p className="font-bold text-left text-ash text-sm">{name && tag ? '#' + tag : agent_name}</p>
              </div>

            </div>
          </div>
          <div className={`h-full flex justify-start content-center flex-wrap ${topScores.combat_score.puuid.includes(puuid) ? 'highscore-back' : ''}`}>
            <p className={`flex  font-bold`}>{stats.combat_score.toFixed(2)}</p>
          </div>
        </div>
        <div className="grid items-center mb-2 game-row-border-right h-full" style={{ gridColumn: '1 span', margin: '1%' }}>

          <p className="flex font-bold mx-4">{stats.kills} / {stats.deaths} / {stats.assists}</p>


        </div>
        <div className="grid items-center mb-2 game-row-border-right h-full" style={{ gridColumn: '1 span', margin: '1%' }}>

          <p className="flex  font-bold mx-4" style={topScores.hs_percent.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.hs_percent.toFixed(2)}%</p>


        </div>
        <div className="grid items-center mb-2 game-row-border-right h-full" style={{ gridColumn: '1 span', margin: '1%' }}>

          <p className="flex  font-bold mx-4" style={topScores.dmgdelta.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.dmgdelta > 0 ? '+' : ''}{stats.dmgdelta.toFixed(2)}</p>


        </div>
        <div className="grid items-center mb-2 game-row-border-right h-full" style={{ gridColumn: '1 span', margin: '1%' }}>

          <p className="flex  font-bold mx-4" style={topScores.adr.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.adr.toFixed(2)}</p>


        </div>
        <div className="grid items-center mb-2 h-full" style={{ gridColumn: '1 span', margin: '1%' }}>
          <p className="flex  font-bold mx-4" style={topScores.kast.puuid.includes(puuid) ? { color: highlight_color } : {}}>{kast.toFixed(2)}%</p>
        </div>

       
        </div>

        <div className={` ${popup ? 'block' : 'hidden'} h-8 rounded-b-lg game-row-border-special2 grid grid-cols-12 back-darkslate 2xl:text-[1em] text-[0.6em] min-w-[1000px]`}>
          <div className="col-span-5 w-full flex flex-row items-center gap-4 px-2">
                  <FaGem
                  color="#41B9FD"
                  height="1em"
                  width="auto"
                  />
                  <p className="font-bold xl:text-sm text-xs">ESC Personal Performance Reports Coming Soon...</p>
                </div>
          <div className="flex h-full justify-center gap-2 content-center flex-wrap game-row-border-right">
            <p className="text-ash self-center">FK</p>
            <p className="flex justify-center font-bold tooltip text-frost xl:text-lg text-sm" data-tip={"FK to Round Win / Total FKs"}>{f_kills.fKillRWin} / {f_kills.fKills}</p>
          </div>
          <div className="flex h-full justify-center gap-2 content-center flex-wrap game-row-border-right">
            <p className="text-ash self-center">FD</p>
            <p className="flex justify-center font-bold tooltip text-frost xl:text-lg text-sm" data-tip={"FD to Round Win / Total FDs"}>{f_kills.fDeaths - f_kills.fDeathRLoss} / {f_kills.fDeaths}</p>
          </div>
          <div className="flex h-full justify-center gap-2 content-center flex-wrap game-row-border-right">
            <p className="text-ash self-center">MK</p>
            <p className="flex justify-center font-bold tooltip text-frost xl:text-lg text-sm" data-tip={"Rounds were a 2k+ was achieved"}>{stats.multikills}</p>
          </div>
          <div className="flex h-full justify-center gap-2 content-center flex-wrap game-row-border-right">
            <p className="text-ash self-center">Ability 1</p>
            <p className="flex justify-center font-bold tooltip text-frost xl:text-lg text-sm" data-tip={"Far Left Ability"}>{stats.ability_casts.grenade}</p>
          </div>
          <div className="flex h-full justify-center gap-2 content-center flex-wrap game-row-border-right">
            <p className="text-ash self-center">Ability 2</p>
            <p className="flex justify-center font-bold tooltip text-frost xl:text-lg text-sm" data-tip={"Middle Left Ability"}>{stats.ability_casts.ability1}</p>
          </div>
          <div className="flex h-full justify-center gap-2 content-center flex-wrap game-row-border-right">
            <p className="text-ash self-center">Signature</p>
            <p className="flex justify-center font-bold tooltip text-frost xl:text-lg text-sm" data-tip={"Middle Right Ability"}>{stats.ability_casts.ability2}</p>
          </div>
          <div className="flex h-full justify-center gap-2 content-center flex-wrap">
            <p className="text-ash self-center">Ultimate</p>
            <p className="flex justify-center font-bold tooltip text-frost xl:text-lg text-sm" data-tip={"Far Right Ability"}>{stats.ability_casts.ultimate}</p>
          </div>
        </div>

        {/* <div className="grid grid-cols-5 items-center bg-[#1E2835] rounded-md mb-2" style={{ gridColumn: '4 span', height: '90%', margin: '1%' }}>

        <div className="col-span-2 flex justify-center">
          <div className="flex flex-col text-center" style={{ width: '-webkit-fill-available', maxWidth: '80%', whiteSpace: 'nowrap' }}>
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
            <p className="font-bold" style={{ textAlign: 'left' }}>{name && tag ? name + '#' + tag : agent_name}</p>
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
        <p className="flex justify-center font-bold" style={topScores.multikills.puuid.includes(puuid) ? { color: highlight_color } : {}}>{ }{stats.multikills}</p>
      </div>
      <div className="grid grid-cols-4 items-center bg-[#1E2835] rounded-md mb-2" style={{ gridColumn: '3 span', height: '90%', margin: '1%' }}>
        <p className="flex justify-center font-bold" style={topScores.grenade.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.grenade}</p>
        <p className="flex justify-center font-bold" style={topScores.ability1.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.ability1}</p>
        <p className="flex justify-center font-bold" style={topScores.ability2.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.ability2}</p>
        <p className="flex justify-center font-bold" style={topScores.ultimate.puuid.includes(puuid) ? { color: highlight_color } : {}}>{stats.ability_casts.ultimate}</p>
      </div> */}

      </div>
      );
}

      export default PlayerBox;
