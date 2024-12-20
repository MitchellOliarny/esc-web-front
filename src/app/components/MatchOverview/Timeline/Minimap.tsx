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
    selectHighlightUser,
    selected,
    user
}: {
    roundInfo: any;
    players: any;
    map_id: string;
    eventInfo: any;
    mapInfo: any;
    selectHighlightUser: any;
    selected: any;
    user: any;
}) {

    const [playerRoundStats, setPlayerRoundStats] = useState({});
    const [mapXY, setMapXY] = useState({ x: 0, y: 0 });
    const [showAllPlayers, setShowAllPlayers] = useState(true)
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [selectedPlayer, setSelectedPlayer] = useState(selected);

    const SelectHighlight = (puuid: string) => {
        setSelectedPlayer(puuid)
        //@ts-ignore
        selectHighlightUser(puuid)
    }

    useEffect(() => {
        setSelectedPlayer(selected)

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
            // const x = document.getElementById('coordGrid').getBoundingClientRect().height;
            // //@ts-ignore
            // const y = document.getElementById('coordGrid').getBoundingClientRect().width;

            // setMapXY({ x: x, y: y });

            setWindowWidth(window.innerWidth);

        };

        window.addEventListener('resize', handleResize);

        handleResize();
        // Cleanup the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [roundInfo, selected])

     console.log(eventInfo)
    //console.log(players)

    return (
        <>
            <div className="flex xl:flex-row flex-col w-full h-full m-2">
                <div className={`flex xl:flex-col flex-row w-auto gap-2 ${windowWidth < 1350 ? 'matchRowBottomBorderBlue overflow-x-scroll overflow-y-visible' : 'matchRowLeftBorderBlue'}`}>
                    {
                        //@ts-ignore
                        players['blue'].map((value) => {
                            return (
                                //@ts-ignore
                                <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} team_color={'#5ECCBA'} roundStats={playerRoundStats[value.puuid]} isMobile={windowWidth < 1350 ? true : false} isSelected={selectedPlayer == value.puuid} selectHighlightUser={SelectHighlight} />
                            )
                        })}
                </div>
                <div id='coordGrid' className="flex md:w-[36em] md:h-[36em] w-80 h-80 m-auto relative">
                    <div className="absolute w-auto h-8 z-20 2xl:right-[-5em] xl:right-[30%] md:right-[-3em] right-0 xl:top-[-2em] top-8 flex md:flex-row flex-col-reverse content-center gap-4">
                        <Switch type="checkbox" checked={showAllPlayers} onChange={setShowAllPlayers} className="w-auto md:h-8 h-4 ml-auto" onColor={"#5eccba"} />
                        <p className="font-bold font-frost whitespace-nowrap my-auto md:text-base text-xs">Show All Players</p>
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
                                                <div className={`absolute flex items-center justify-center w-full h-full`} style={{ transform: `rotate(${value.view_radians}rad)` }}>
                                                    <FaCaretUp className={`absolute top-[-15px] text-gold`} />
                                                </div>
                                                <img src={`https://media.valorant-api.com/agents/${players.all[eventInfo.killer_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content border-gold`}></img>
                                            </div>
                                        )
                                    }
                                })
                                : ''
                        }
                        {
                            eventInfo.event == 'plant' ?
                                eventInfo.player_locations_on_plant.map((value: any) => {
                                    if (value.player_puuid == eventInfo.planted_by.puuid) {
                                        return (
                                            <div key={value.player_puuid} className={`w-10 h-10 absolute z-20 translate-x-[-1.25em] translate-y-[-1.25em]`} style={{ left: `${(value.location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(value.location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                                <div className={`absolute flex items-center justify-center w-full h-full`} style={{ transform: `rotate(${value.view_radians}rad)` }}>
                                                    <FaCaretUp className={`absolute top-[-15px] text-gold`} />
                                                </div>
                                                <img src={`https://media.valorant-api.com/agents/${players.all[value.player_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content border-gold`}></img>
                                            </div>
                                        )
                                    }
                                })
                                : eventInfo.event == 'defuse' ?
                                eventInfo.player_locations_on_defuse.map((value: any) => {
                                    if (value.player_puuid == eventInfo.defused_by.puuid) {
                                        return (
                                            <div key={value.player_puuid} className={`w-10 h-10 absolute z-20 translate-x-[-1.25em] translate-y-[-1.25em]`} style={{ left: `${(value.location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(value.location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                                <div className={`absolute flex items-center justify-center w-full h-full`} style={{ transform: `rotate(${value.view_radians}rad)` }}>
                                                    <FaCaretUp className={`absolute top-[-15px] text-gold`} />
                                                </div>
                                                <img src={`https://media.valorant-api.com/agents/${players.all[value.player_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content border-gold`}></img>
                                            </div>
                                        )
                                    }
                                })
                            : ""
                        }
                        {
                            eventInfo.event == 'plant' ?
                                <div key={'plant'} className={`w-6 h-6 absolute translate-x-[-.75em] translate-y-[-.75em] z-30`}
                                    style={{ left: `${(eventInfo.plant_location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(eventInfo.plant_location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                    <img alt="spike" src={"https://trackercdn.com/cdn/tracker.gg/valorant/icons/modes/normal.png"} className={`rounded-full contain-content`}></img>
                                </div>
                                : eventInfo.event == 'defuse' ?
                                    <div key={'plant'} className={`w-6 h-6 absolute translate-x-[-.75em] translate-y-[-.75em] z-30`}
                                        style={{ left: `${(eventInfo.defuse_location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(eventInfo.defuse_location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                        <img alt="defuse" src={`https://imgsvc.trackercdn.com/url/max-width(36),quality(66)/https%3A%2F%2Ftrackercdn.com%2Fcdn%2Ftracker.gg%2Fvalorant%2Ficons%2Fdiffusewin1.png/image.png`} className={`rounded-full contain-content brightness-[3]`}></img>
                                    </div>
                                    : ""
                        }
                        {
                            eventInfo.event == 'kill' && showAllPlayers ?
                                eventInfo.player_locations_on_kill.map((value: any) => {
                                    if (value.player_puuid !== eventInfo.killer_puuid) {
                                        return (
                                            <div key={value.player_puuid} className={`w-8 h-8 absolute translate-x-[-1em] translate-y-[-1em]`} style={{ left: `${(value.location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(value.location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                                <div className={`absolute flex items-center justify-center w-full h-full`} style={{ transform: `rotate(${value.view_radians}rad)` }}>
                                                    <FaCaretUp className={`absolute top-[-15px] ${value.player_team == 'Blue' ? 'text-voltage' : 'text-rust'}`} />
                                                </div>
                                                <img src={`https://media.valorant-api.com/agents/${players.all[value.player_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content ${value.player_team == 'Blue' ? 'border-blue' : 'border-red'}`}></img>
                                            </div>
                                        )
                                    }
                                })
                                : eventInfo.event == 'plant' && showAllPlayers ?
                                    eventInfo.player_locations_on_plant.map((value: any) => {
                                        if (value.player_puuid !== eventInfo.planted_by.puuid) {
                                            return (
                                                <div key={value.player_puuid} className={`w-8 h-8 absolute translate-x-[-1em] translate-y-[-1em]`} style={{ left: `${(value.location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(value.location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                                    <div className={`absolute flex items-center justify-center w-full h-full`} style={{ transform: `rotate(${value.view_radians}rad)` }}>
                                                        <FaCaretUp className={`absolute top-[-15px] ${value.player_team == 'Blue' ? 'text-voltage' : 'text-rust'}`} />
                                                    </div>
                                                    <img src={`https://media.valorant-api.com/agents/${players.all[value.player_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content ${value.player_team == 'Blue' ? 'border-blue' : 'border-red'}`}></img>
                                                </div>
                                            )
                                        }
                                    })
                                    : eventInfo.event == 'defuse' && showAllPlayers ?
                                        eventInfo.player_locations_on_defuse.map((value: any) => {
                                            if (value.player_puuid !== eventInfo.defused_by.puuid) {
                                                return (
                                                    <div key={value.player_puuid} className={`w-8 h-8 absolute translate-x-[-1em] translate-y-[-1em]`} style={{ left: `${(value.location.y * (mapInfo.xMultiplier) + mapInfo.xScalarToAdd) * (100)}%`, top: `${(value.location.x * (mapInfo.yMultiplier) + mapInfo.yScalarToAdd) * (100)}%` }}>
                                                        <div className={`absolute flex items-center justify-center w-full h-full`} style={{ transform: `rotate(${value.view_radians}rad)` }}>
                                                            <FaCaretUp className={`absolute top-[-15px] ${value.player_team == 'Blue' ? 'text-voltage' : 'text-rust'}`} />
                                                        </div>
                                                        <img src={`https://media.valorant-api.com/agents/${players.all[value.player_puuid].agent_id}/displayicon.png`} className={`rounded-full contain-content ${value.player_team == 'Blue' ? 'border-blue' : 'border-red'}`}></img>
                                                    </div>
                                                )
                                            }
                                        })
                                        : ""
                        }
                    </div>
                    <img src={`https://media.valorant-api.com/maps/${map_id}/displayicon.png`} alt={map_id} className="h-full w-full" />
                </div>
                <div className={`flex xl:flex-col flex-row  gap-2 w-auto ${windowWidth < 1350 ? 'matchRowTopBorderRed overflow-x-scroll overflow-y-visible' : 'matchRowRightBorderRed'} pr-8`}>
                    {
                        //@ts-ignore
                        players['red'].map((value) => {
                            return (
                                //@ts-ignore
                                <PlayerBox key={value.puuid} agent={value.agent_id} rank={value.match_rank} puuid={value.puuid} name={value.name} tag={value.tag} team_color={'#F5603C'} roundStats={playerRoundStats[value.puuid]} isMobile={windowWidth < 1350 ? true : false} isSelected={selectedPlayer == value.puuid} selectHighlightUser={SelectHighlight} />
                            )
                        })}
                </div>
            </div>
        </>
    );
}
