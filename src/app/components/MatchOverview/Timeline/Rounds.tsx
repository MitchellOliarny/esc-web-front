import React, { useEffect, useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { FaX, FaExplosion, FaScrewdriverWrench, FaClock, FaArrowsRotate } from "react-icons/fa6";

export default function Rounds({
    roundInfo,
    setRound,
    currentRound,
    selected_stats,
    player_round_stats,
}: {
    roundInfo: any;
    setRound: any;
    currentRound: number;
    selected_stats: any;
    player_round_stats: any;
}) {

    const round_end_icons = {
        'Eliminated_Red': <img src={'/icons/elim_red.png'}></img>,
        'Eliminated_Blue': <img src={'/icons/elim_blue.png'}></img>,
        'Bomb defused_Red': <img src={'/icons/defuse_red.png'}></img>,
        'Bomb defused_Blue': <img src={'/icons/defuse_blue.png'}></img>,
        'Bomb detonated_Red': <FaExplosion size={'1em'} />,
        'Bomb detonated_Blue': <FaExplosion size={'1em'} />,
        'Round timer expired_Red': <FaClock size={'1em'} />,
        'Round timer expired_Blue': <FaClock size={'1em'} />,
    }

    const GetRoundIcon = (endType: string, team: string) => {
        //@ts-ignore
        return round_end_icons[endType + '_' + team];
    }

    console.log(selected_stats)
    console.log(player_round_stats);

    return (
        <>
            <div className="flex flex-row gap-1 w-full min-w-fit">
                {
                    roundInfo.round_data.map((value: any, index: number) => {
                        if (index == 12) {
                            return (
                                <>
                                    <FaArrowsRotate className="my-auto h-8 w-8" />
                                    <div key={index} className={`relative round-tab w-16 h-28 ${index == currentRound ? 'round-tab-active' : ''}`} style={{ boxShadow: `inset 0px -83px 40px -75px  ${value.winning_team == 'Blue' ? '#5ECCBAb8' : '#F5603Cb8'}` }} onClick={() => { setRound(index) }}>
                                        <p className="font-bold text-center"><span className="text-ash text-sm">Round</span><br></br>{index + 1}</p>
                                        <div className="flex flex-col h-8 gap-1">
                                            <div className="flex flex-row justify-center">
                                                {
                                                    Array.from({ length: player_round_stats[index] ? player_round_stats[index][selected_stats]?.kills : 0 }).map((index, key) => {
                                                        return (
                                                            <img key={selected_stats+index+"kill"} alt="kill" src="/icons/kill.png"></img>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className="flex flex-row justify-center">
                                                {
                                                    Array.from({ length: player_round_stats[index] ? player_round_stats[index][selected_stats]?.deaths : 0 }).map((index, key) => {
                                                        return (
                                                            <img key={selected_stats+index+"death"} alt="kill" src="/icons/death.png"></img>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className={`absolute ${value.winning_team == 'Blue' ? 'text-voltage' : 'text-rust'} -bottom-2`}>
                                            {
                                                //@ts-ignore
                                                GetRoundIcon(value.end_type, value.winning_team)
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        return (
                            <div key={index} className={`relative round-tab w-16 h-28 ${index == currentRound ? 'round-tab-active' : ''}`} style={{ boxShadow: `inset 0px -83px 40px -75px  ${value.winning_team == 'Blue' ? '#5ECCBAb8' : '#F5603Cb8'}` }} onClick={() => { setRound(index) }}>
                                <p className="font-bold text-center"><span className="text-ash text-sm">Round</span><br></br>{index + 1}</p>
                                <div className="flex flex-col h-8 gap-1">
                                    <div className="flex flex-row justify-center">
                                        {
                                            Array.from({ length: player_round_stats[index] ? player_round_stats[index][selected_stats]?.kills : 0 }).map((index, key) => {
                                                return (
                                                    <img key={selected_stats+index+"kill"} alt="kill" src="/icons/kill.png"></img>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="flex flex-row justify-center">
                                        {
                                            Array.from({ length: player_round_stats[index] ? player_round_stats[index][selected_stats]?.deaths : 0 }).map((index, key) => {
                                                return (
                                                    <img key={selected_stats+index+"death"} alt="kill" src="/icons/death.png"></img>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className={`absolute ${value.winning_team == 'Blue' ? 'text-voltage' : 'text-rust'} -bottom-2`}>
                                    {
                                        //@ts-ignore
                                        GetRoundIcon(value.end_type, value.winning_team)
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
