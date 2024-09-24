import React, { useEffect, useState } from "react";
import { FaX, FaExplosion, FaScrewdriverWrench, FaClock } from "react-icons/fa6";

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
            <div style={{ display: '-webkit-inline-box', overflowX: 'scroll', overflowY: 'hidden', width: '100%' }}>
                {
                    roundInfo.round_data.map((value: any, index: number) => {
                        return (
                            <div key={index} className={`round-tab ${index == currentRound ? 'round-tab-active' : ''}`} style={{ border: `2px solid ${value.winning_team == 'Blue' ? '#5ECCBA' : '#F5603C'}`}} onClick={()=>{setRound(index)}}>
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
