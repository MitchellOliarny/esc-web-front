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
        Eliminated: <FaX size={'1.5em'} />,
        'Bomb defused': <FaScrewdriverWrench size={'1.5em'} />,
        'Bomb detonated': <FaExplosion size={'1.5em'} />,
        'Round timer expired': <FaClock size={'1.5em'} />
    }

    return (
        <>
            <div className="flex flex-row w-full min-w-fit">
                {
                    roundInfo.round_data.map((value: any, index: number) => {
                        if(index == 12) {
                            return (
                                <>
                                <FaArrowsRotate className="my-auto h-8 w-8"/>
                                <div key={index} className={`round-tab w-20 h-28 ${index == currentRound ? 'round-tab-active' : ''}`} style={{ border: `2px solid ${value.winning_team == 'Blue' ? '#5ECCBA' : '#F5603C'}`}} onClick={()=>{setRound(index)}}>
                                    <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{index + 1}</p>
                                    {
                                        //@ts-ignore
                                        round_end_icons[(value.end_type)]
                                    }
                                </div>
                                </>
                            ) 
                        }
                        return (
                            <div key={index} className={`round-tab w-20 h-28 ${index == currentRound ? 'round-tab-active' : ''}`} style={{ border: `2px solid ${value.winning_team == 'Blue' ? '#5ECCBA' : '#F5603C'}`}} onClick={()=>{setRound(index)}}>
                                <p style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{index + 1}</p>
                                {
                                    //@ts-ignore
                                    round_end_icons[(value.end_type)]
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
