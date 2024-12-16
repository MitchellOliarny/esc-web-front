import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaX } from "react-icons/fa6";
import PlayerBox from "./PlayerBox";
import { FaCaretDown, FaCaretRight, FaCaretUp } from "react-icons/fa";
import Switch from "react-switch";

export default function Minimap({
    roundInfo,
    players,
    map_id,
    eventInfo,
    mapInfo,
}: {
    roundInfo: any;
    players: any;
    map_id: string;
    eventInfo: any;
    mapInfo: any;
}) {

    const [playerRoundStats, setPlayerRoundStats] = useState({});
    const [mapXY, setMapXY] = useState({ x: 0, y: 0 });
    const [showAllPlayers, setShowAllPlayers] = useState(true)

    useEffect(() => {


        let temp = {}
        //set up a player slot
        roundInfo.player_stats.map((value: any, index: number) => {
            //@ts-ignore
            temp[value.player_puuid] = value;
            //@ts-ignore
            temp[value.player_puuid].assists = 0;
            //@ts-ignore
            temp[value.player_puuid].deaths = 0;
        })

        //Find any unknown stats
        roundInfo.player_stats.map((value: any, index: number) => {

            if (value.kill_events.length > 0) {
                value.kill_events.map((kill: any) => {
                    if (kill.assistants.length > 0) {
                        kill.assistants.map((assist: any) => {
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

        const handleResize = () => {
            //@ts-ignore
            const x = document.getElementById('coordGrid').getBoundingClientRect().height;
            //@ts-ignore
            const y = document.getElementById('coordGrid').getBoundingClientRect().width;

            setMapXY({ x: x, y: y });
        };

        //window.addEventListener('resize', handleResize);

        handleResize();
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [roundInfo])

    console.log(eventInfo)
    console.log(players)

    return (
        <>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr 1fr' }} className="w-full h-full m-2">
                <div className="flex flex-col matchRowLeftBorderBlue">
                    {
                        //@ts-ignore
                        players['blue'].map((value) => {
                            return (
                                //@ts-ignore
                                <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} team_color={'#5ECCBA'} roundStats={playerRoundStats[value.puuid]} />
                            )
                        })}
                </div>
                <div id='coordGrid' className="flex w-[36em] h-[36em] m-auto relative">
                    <div className="absolute w-auto h-8 z-20 right-[-5em] top-[-5em] flex flex-row content-center gap-4">
                        <Switch type="checkbox" checked={showAllPlayers} onChange={setShowAllPlayers} className="w-auto h-8" onColor={"#5eccba"}/>
                        <p className="font-bold font-frost whitespace-nowrap my-auto">Show All Players</p>
                    </div>
                    <div className="absolute w-full h-full">
                        {
                            eventInfo.victim_puuid && eventInfo.victim_puuid !== eventInfo.killer_puuid ?
                                <div key={eventInfo.victim_puuid} className={`w-10 h-10 absolute translate-x-[-1.25em] translate-y-[-1.25em]`} 
                                style={{ left: `${(eventInfo.victim_death_location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(eventInfo.victim_death_location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                    <img src={`https://media.valorant-api.com/agents/${players.all[eventInfo.victim_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content z-20 ${eventInfo.victim_team == 'Blue' ? 'border-blue' : 'border-red'} grayscale-[1]`}></img>
                                </div>
                                : ''
                        }
                        {
                            eventInfo.killer_puuid ?
                                eventInfo.player_locations_on_kill.map((value: any) => {
                                    if (value.player_puuid == eventInfo.killer_puuid) {
                                        return (
                                            <div key={value.player_puuid} className={`w-10 h-10 absolute z-20 translate-x-[-1.25em] translate-y-[-1.25em]`} style={{ left: `${(value.location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(value.location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                                <div className={`absolute flex items-center justify-center w-full h-full`} style={{transform: `rotate(${value.view_radians}rad)`}}>
                                                    <FaCaretUp className={`absolute top-[-15px] text-gold`}/>
                                                </div>
                                                <img src={`https://media.valorant-api.com/agents/${players.all[eventInfo.killer_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content border-gold`}></img>
                                            </div>
                                        )
                                    }
                                })
                                : ''
                        }
                        {
                            eventInfo.event == 'kill' && showAllPlayers ?
                                eventInfo.player_locations_on_kill.map((value: any) => {
                                    if (value.player_puuid !== eventInfo.killer_puuid) {
                                        return (
                                            <div key={value.player_puuid} className={`w-8 h-8 absolute translate-x-[-1em] translate-y-[-1em]`} style={{ left: `${(value.location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(value.location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                                <div className={`absolute flex items-center justify-center w-full h-full`} style={{transform: `rotate(${value.view_radians}rad)`}}>
                                                    <FaCaretUp className={`absolute top-[-15px] ${value.player_team == 'Blue' ? 'text-voltage' : 'text-rust'}`}/>
                                                </div>
                                                <img src={`https://media.valorant-api.com/agents/${players.all[value.player_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content ${value.player_team == 'Blue' ? 'border-blue' : 'border-red'}`}></img>
                                            </div>
                                        )
                                    }
                                })
                                : ''
                        }
                    </div>
                    <img src={`https://media.valorant-api.com/maps/${map_id}/displayicon.png`} alt={map_id} className="h-full w-full" />
                </div>
                <div className="flex flex-col matchRowLeftBorderRed">
                    {
                        //@ts-ignore
                        players['red'].map((value) => {
                            return (
                                //@ts-ignore
                                <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} team_color={'#F5603C'} roundStats={playerRoundStats[value.puuid]} />
                            )
                        })}
                </div>
            </div>
        </>
    );
}
