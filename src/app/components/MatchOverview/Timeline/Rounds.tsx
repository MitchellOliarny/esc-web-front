import React, { useEffect, useState } from "react";
import { FaRecycle } from "react-icons/fa";
import { FaX, FaExplosion, FaScrewdriverWrench, FaClock, FaArrowsRotate } from "react-icons/fa6";

export default function Rounds({
    roundInfo,
    setRound,
    currentRound
}: {
    roundInfo: any;
    setRound: any;
    currentRound: number;
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

    const GetRoundIcon = (endType: string, team: string)=>{
        //@ts-ignore
        return round_end_icons[endType+'_'+team];
    }

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
