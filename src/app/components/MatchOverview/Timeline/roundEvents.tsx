import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaSkullCrossbones } from "react-icons/fa";
import { FaScrewdriverWrench } from "react-icons/fa6";

export default function RoundEvents({
    roundInfo,
    currentRound,
    currentEvent,
    setEvent,
    setEventInfo,
    players
}: {
    roundInfo: any;
    currentRound: number;
    currentEvent: number;
    setEvent: any;
    setEventInfo: any;
    players: any;
}) {

    const [events, setEvents] = useState([]);

    useEffect(() => {
       // console.log(roundInfo)
       // console.log(players)

        let temp = [];
        for (const x in roundInfo.player_stats) {
            for (const i in roundInfo.player_stats[x].kill_events) {
                roundInfo.player_stats[x].kill_events[i].event = 'kill'
                temp.push(roundInfo.player_stats[x].kill_events[i])
            }
        }
        if (roundInfo.defuse_events.defuse_time_in_round) {
            roundInfo.defuse_events.event = 'defuse';
            roundInfo.defuse_events.kill_time_in_round = roundInfo.defuse_events.defuse_time_in_round
            temp.push(roundInfo.defuse_events)
        }
        if (roundInfo.plant_events.plant_time_in_round) {
            roundInfo.plant_events.event = 'plant'
            roundInfo.plant_events.kill_time_in_round = roundInfo.plant_events.plant_time_in_round
            temp.push(roundInfo.plant_events)
        }
        temp.sort((a, b) =>
            a.kill_time_in_round - b.kill_time_in_round
        )
        //@ts-ignore
        setEvents(temp)
        setEventInfo(temp[0]);
    }, [roundInfo])

    const convertMillisecondsToMinSec = (milliseconds: number) => {
        const minutes = Math.floor(milliseconds / 60000); // Convert to minutes
        const seconds = Math.floor((milliseconds % 60000) / 1000); // Get remaining seconds
        return `${minutes}:${seconds.toString().padStart(2, '0')}`; // Format as min:sec
    }

    const SelectEvent = (index: number) => {
        setEvent(index);
        setEventInfo(events[index]);
    }

    return (
        <>
            <div className="flex flex-row w-full min-w-fit">
                {
                    events.map((value: any, index: number) => {

                        let killer = null;
                        let victim = null;

                        if (value.event == 'defuse') {
                            for (const x in players[value.defused_by.team.toLowerCase()]) {
                                if (value.defused_by.puuid == players[value.defused_by.team.toLowerCase()][x].puuid) {
                                    killer = players[value.defused_by.team.toLowerCase()][x];
                                    break;
                                }
                            }
                        }
                        else if (value.event == 'plant') {
                            for (const x in players[value.planted_by.team.toLowerCase()]) {
                                if (value.planted_by.puuid == players[value.planted_by.team.toLowerCase()][x].puuid) {
                                    killer = players[value.planted_by.team.toLowerCase()][x];
                                    break;
                                }
                            }
                        }
                        else {
                            for (const x in players[value.victim_team.toLowerCase()]) {
                                if (value.victim_puuid == players[value.victim_team.toLowerCase()][x].puuid) {
                                    victim = players[value.victim_team.toLowerCase()][x];
                                    break;
                                }
                            }
                            for (const x in players[value.killer_team.toLowerCase()]) {
                                if (value.killer_puuid == players[value.killer_team.toLowerCase()][x].puuid) {
                                    killer = players[value.killer_team.toLowerCase()][x];
                                    break;
                                }
                            }
                        }

                        return (
                            <div key={index} className={`round-tab w-48 h-20 justify-center ${index == currentEvent ? 'round-tab-active' : ''}`} style={{ border: `2px solid ${value.killer_team == 'Blue' ? '#5ECCBA' : '#F5603C'}` }} onClick={()=>SelectEvent(index)}>
                                {/* Event Icons */}
                                <div className="flex flex-row gap-2 justify-self-center m-[inherit]">
                                    <Image
                                        alt="agent"
                                        className="w-auto h-8"
                                        src={`https://media.valorant-api.com/agents/${killer.agent_id}/displayicon.png`}
                                        height={100}
                                        width={100}
                                    />
                                    {
                                        value.event == 'defuse' ? <img alt="spike" src={`https://imgsvc.trackercdn.com/url/max-width(36),quality(66)/https%3A%2F%2Ftrackercdn.com%2Fcdn%2Ftracker.gg%2Fvalorant%2Ficons%2Fdiffusewin1.png/image.png`} height={100} width={100} className="h-auto w-8 my-auto brightness-[3]"/> : value.event == 'plant' ? <img alt="spike" src={"https://trackercdn.com/cdn/tracker.gg/valorant/icons/modes/normal.png"} height={100} width={100} className="h-auto w-8 my-auto"/> :
                                        value.damage_weapon_assets ?
                                            <img src={value.damage_weapon_assets.killfeed_icon} className="-scale-x-100 h-auto w-[50%] my-auto"></img>
                                            :
                                            <FaSkullCrossbones className="h-auto w-8 my-auto" />
                                    }
                                    {
                                    victim ?
                                    <Image
                                        alt="agent"
                                        className="w-auto h-8"
                                        src={`https://media.valorant-api.com/agents/${victim.agent_id}/displayicon.png`}
                                        height={100}
                                        width={100}
                                    /> : ''
                                    }
                                </div>
                                <div>
                                    <p className="font-bold font-frost w-20 !mr-0 stat-percent-box">{

                                        convertMillisecondsToMinSec(value.kill_time_in_round)

                                    } </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
