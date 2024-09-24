import React, { useEffect, useState } from "react";
import PlayerBox from "./PlayerBox";
import { leapfrog } from "ldrs";

export default function Overview({
  isLoading,
  players,
}: {
  isLoading: boolean;
  players: { 'red': any[], 'blue': any[] };
}) {
  leapfrog.register();
  return (
    <>
      <div>
        <p className="text-2xl text-white font-bold mt-4">Leaderboard</p>
        <div style={{ display: isLoading ? 'flex' : 'none', fontSize: '2em', alignContent: 'flex-end', flexWrap: 'wrap-reverse' }}>Loading
          <l-leapfrog
            size="45"
            speed="1.75"
            color="#F5603C"
          ></l-leapfrog>
        </div>
        <div style={!isLoading ? { display: '' } : { display: 'none' }}>
          {Object.keys(players).map((team) => {
            const color = team == 'blue' ? '#5ECCBA' : '#F5603C';
            if (team == 'blue' || team == 'red') {
              return (
                <div key={team} className="mt-2">
                  <div className="grid grid-cols-12 items-center" style={{ margin: '.5% 0%' }}>
                    <div className="grid grid-cols-5 items-center" style={{ gridColumn: '4 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`col-span-2 text-xl text-[${color}] font-black`}>
                        {team.toUpperCase()} TEAM
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Average Combat Score'}>
                        ACS
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Kills / Deaths / Assists'}>
                        K/D/A
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'K/D Difference'}>
                        +/-
                      </p>
                    </div>
                    <div className="grid grid-cols-4 items-center" style={{ gridColumn: '3 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Headshot Percentage'}>
                        HS%
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Damage Delta (Net Damage each Round)'}>
                        DD∆
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Average Damage each Round'}>
                        AD/R
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Round Percentage a Kill, Assist, Survive, or Trade occured'}>
                        KAST%
                      </p>
                    </div>
                    <div className="grid grid-cols-4 items-center" style={{ gridColumn: '2 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'First Kills'}>
                        FK
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'First Deaths'}>
                        FD
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'First Kills & Deaths Difference'}>
                        +/-
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Mulitkills (2+ kills in a round)'}>
                        MK
                      </p>
                    </div>
                    <div className="grid grid-cols-4 items-center" style={{ gridColumn: '3 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Use Count of left-most ability'}>
                        Ability 1
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Use Count of left-middle ability'}>
                        Ability 2
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Use Count of right-middle ability'}>
                        Signature
                      </p>
                      <p className={`flex justify-center text-lg text-[${color}] font-bold tooltip`} data-tip={'Use Count of Ultimate ability'}>
                        Ultimate
                      </p>
                    </div>
                  </div>

                  {
                    //@ts-ignore
                    players[team.toLowerCase()].map((value) => {
                      return (
                        //@ts-ignore
                        <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} agent_name={value.agent} kast={value.kast} stats={value.stats} f_kills={value.f_kills_deaths} topScores={players.topScores[value.team]} team_color={color} highlight_color={'#ffdc28'} />
                      )
                    })}
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  );
}
