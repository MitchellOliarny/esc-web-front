import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import PlayerBox from "./PlayerBox";

export default function Minimap({
    roundInfo,
    players,
    map_id,
}: {
    roundInfo: any;
    players: any;
    map_id: string;
}) {

    const [playerRoundStats, setPlayerRoundStats] = useState({})

    useEffect(()=> {
        let temp = {}
        //set up a player slot
        roundInfo.player_stats.map((value: any, index: number)=>{
            //@ts-ignore
            temp[value.player_puuid] = value;
            //@ts-ignore
            temp[value.player_puuid].assists = 0;
            //@ts-ignore
            temp[value.player_puuid].deaths = 0;
        })

        //Find any unknown stats
        roundInfo.player_stats.map((value: any, index: number)=>{
    
            if(value.kill_events.length > 0) {
                value.kill_events.map((kill: any)=>{
                    if(kill.assistants.length > 0) {
                        kill.assistants.map((assist: any)=>{
                            //@ts-ignore
                            temp[assist.assistant_puuid].assists += 1
                        })
                    }
                    //@ts-ignore
                    temp[kill.victim_puuid].deaths += 1;
                })
            }
        })
        //@ts-ignore
        setPlayerRoundStats(temp);
    }, [roundInfo])

    console.log(roundInfo)

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', width: '100%', height: 'fill-available' }}>
                <div style={{borderLeft: '5px solid #5ECCBA'}}>
                    {
                        //@ts-ignore
                        players['blue'].map((value) => {
                            return (
                                //@ts-ignore
                                <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} team_color={'#5ECCBA'} roundStats={playerRoundStats[value.puuid]} />
                            )
                        })}
                </div>
                <div style={{width: '100%', height: '100%', display: 'flex'}}>
                    <img src={`https://media.valorant-api.com/maps/${map_id}/displayicon.png`} alt={map_id} className="minimap-filter"/>
                </div>
                <div style={{borderRight: '5px solid #F5603C'}}>
                    {
                        //@ts-ignore
                        players['red'].map((value) => {
                            return (
                                //@ts-ignore
                                <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} team_color={'#F5603C'} roundStats={playerRoundStats[value.puuid]}/>
                            )
                        })}
                </div>
            </div>
        </>
    );
}
