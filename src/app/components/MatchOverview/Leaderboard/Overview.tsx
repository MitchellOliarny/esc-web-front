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
                <div key={team} className="mt-6">
                  <div className="grid grid-cols-9 items-center" style={{ margin: '.5% 0%' }}>
                    <div className="grid grid-cols-5 items-center" style={{ gridColumn: '4 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`col-span-4 text-xl text-[${color}] font-black`}>
                        {team.toUpperCase()} TEAM
                      </p>
                      <p className={`flex justify-start text-lg text-ash  font-bold tooltip`} data-tip={'Average Combat Score'}>
                        ACS
                      </p>
                    </div>
                    <div className="grid items-center" style={{ gridColumn: '1 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-left text-lg text-ash  font-bold tooltip mx-4`} data-tip={'Kills / Deaths / Assists'}>
                        K / D / A
                      </p>
                    </div>
                    <div className="grid  items-center" style={{ gridColumn: '1 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-left text-lg text-ash  font-bold tooltip mx-4`} data-tip={'Percent of connected shots on head'}>
                        HS%
                      </p>
                    </div>
                    <div className="grid items-center" style={{ gridColumn: '1 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-left text-lg text-ash font-bold tooltip mx-4`} data-tip={'Net Damage each Round'}>
                        DD∆
                      </p>
                    </div>
                    <div className="grid items-center" style={{ gridColumn: '1 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-left text-lg text-ash font-bold tooltip mx-4`} data-tip={'Average Damage Dealt each Round'}>
                        AD/R
                      </p>
                    </div>
                    <div className="grid  items-center" style={{ gridColumn: '1 span', height: '90%', margin: '1%', cursor: 'default' }}>
                      <p className={`flex justify-left text-lg text-ash font-bold tooltip mx-4`} data-tip={'Percent of Rounds a Kill, Assist, Survive, or Trade Occured'}>
                        KAST%
                      </p>
                    </div>
                  </div>
                  <div className={`${team == 'blue' ? 'matchRowLeftBorderBlue' : 'matchRowLeftBorderRed'}`}>  
                  {
                    //@ts-ignore
                    players[team.toLowerCase()].map((value, index) => {
                      return (
                        //@ts-ignore
                        <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} agent_name={value.agent} kast={value.kast} stats={value.stats} f_kills={value.f_kills_deaths} topScores={players.topScores[value.team]} team_color={team} highlight_color={'#FFE57B'} isPopped={index==0 && team=='blue' ? true: false} />
                      )
                    })}
                    </div>
                </div>
              )
            }
          })}
        </div>
      </div>
    </>
  );
}
