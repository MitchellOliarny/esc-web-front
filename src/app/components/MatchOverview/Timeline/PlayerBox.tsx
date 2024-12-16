import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaX } from "react-icons/fa6";

export default function Minimap({
    agent,
    rank,
    name,
    tag,
    puuid,
    team_color,
    roundStats,
}: {
    agent: string;
    rank: number;
    name: string;
    tag: string;
    puuid: string;
    team_color: string;
    roundStats: any;
}) {

    return (
        <>
            <div className="grid pb-2 w-[75%] ml-2 h-32 text-sm round-tab">
                <p className="col-span-3 h-6 stat-content">{name + '#' + tag}</p>
                <div className="flex gap-2 items-center">
                    <Image
                        alt="agent"
                        className="w-auto h-8"
                        src={`https://media.valorant-api.com/agents/${agent}/displayicon.png`}
                        height={100}
                        width={100}
                    />
                    <Image
                        alt="rank"
                        className="w-auto h-8"
                        src={`https://api.esportsclubs.gg/images/ranks/${rank}`}
                        height={100}
                        width={100}
                    />
                </div>
                <div className="grid items-center">
                    <p className="stat-header">K / D / A</p>
                    <p className="stat-content">{roundStats?.kills} / {roundStats?.deaths} / {roundStats?.assists}</p>
                </div>
                <div className="grid items-center">
                    <p className="stat-header">DMG</p>
                    <p className="stat-content">{roundStats?.damage}</p>
                </div>
                <div className="flex items-center" style={{contain: 'content'}}>
                    {roundStats?.economy.armor.assets.display_icon ? 
                    <img
                        alt="armor"
                        className="w-auto h-6"
                        src={roundStats?.economy.armor.assets.display_icon}
                    />
                    :
                    ''
                    }
                    <img
                        alt="weapon"
                        className="w-auto h-6"
                        src={roundStats?.economy.weapon.assets.display_icon}
                        style={{marginLeft: '10px'}}
                    />
                </div>
                <div className="grid items-center">
                    <p className="stat-header">Creds Spent</p>
                    <p className="stat-content">{roundStats?.economy.spent}</p>
                </div>
                <div className="grid items-center">
                    <p className="stat-header">Bank Creds</p>
                    <p className="stat-content">{roundStats?.economy.remaining}</p>
                </div>
            </div>
        </>
    );
}
