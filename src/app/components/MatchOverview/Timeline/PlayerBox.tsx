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
    isMobile,
}: {
    agent: string;
    rank: number;
    name: string;
    tag: string;
    puuid: string;
    team_color: string;
    roundStats: any;
    isMobile: boolean;
}) {

    return (
        <>
            {!isMobile ?
                <div className="w-[24em] ml-2 h-auto max-h-32 text-sm rounded-lg contain-content game-row-border flex flex-col">
                    <div className="w-full h-[50%] flex flex-row back-graphite content-center flex-nowrap">
                        <Image
                            alt="agent"
                            className="w-auto h-full"
                            src={`https://media.valorant-api.com/agents/${agent}/displayicon.png`}
                            height={100}
                            width={100}
                        />
                        <div className="flex flex-row p-2 content-center items-start gap-2">
                            <Image
                                alt="rank"
                                className="w-auto h-8 my-auto"
                                src={`https://api.esportsclubs.gg/images/ranks/${rank}`}
                                height={100}
                                width={100}
                            />
                            <div className="flex flex-col whitespace-nowrap">
                                <p className="h-6 text-frost font-bold">{name}</p>
                                <p className="h-6 text-ash text-sm">{'#' + tag}</p>
                            </div>
                        </div>
                        <div className="flex items-center ml-auto p-2" style={{ contain: 'content' }}>
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
                                style={{ marginLeft: '10px' }}
                            />
                        </div>
                    </div>
                    <div className="flex h-[50%] flex-row w-full back-darkslate game-row-border-top p-3 justify-between">
                        <div className="flex flex-col">
                            <p className="stat-header text-left">K / D / A</p>
                            <p className="stat-content">{roundStats?.kills} / {roundStats?.deaths} / {roundStats?.assists}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="stat-header text-left">DMG</p>
                            <p className="stat-content">{roundStats?.damage}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="stat-header text-left">Creds Spent</p>
                            <p className="stat-content">{roundStats?.economy.spent}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="stat-header text-left">Bank Creds</p>
                            <p className="stat-content">{roundStats?.economy.remaining}</p>
                        </div>
                    </div>

                </div>
                :
                <div className="w-[10em] flex-shrink-0 h-auto text-sm rounded-lg contain-content game-row-border flex flex-col">
                    <div className="w-full h-auto flex flex-col back-graphite content-center flex-nowrap">
                        <div className="flex flex-row gap-2 h-12">
                            <Image
                                alt="agent"
                                className="w-auto h-full"
                                src={`https://media.valorant-api.com/agents/${agent}/displayicon.png`}
                                height={100}
                                width={100}
                            />
                            <div className="flex flex-col whitespace-nowrap justify-center">
                                <p className="text-frost font-bold text-sm">{name}</p>
                                <div className="flex flex-row">
                                    <p className="text-ash text-xs">{'#' + tag}</p>
                                    <Image
                                        alt="rank"
                                        className="w-auto h-4 my-auto ml-1"
                                        src={`https://api.esportsclubs.gg/images/ranks/${rank}`}
                                        height={100}
                                        width={100}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center ml-auto p-2 h-12" style={{ contain: 'content' }}>
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
                                style={{ marginLeft: '10px' }}
                            />
                        </div>
                    </div>
                    <div className="flex h-auto flex-col w-full back-darkslate game-row-border-top p-3 justify-between">
                        <div className="flex flex-col">
                            <p className="stat-header text-left">K / D / A</p>
                            <p className="stat-content">{roundStats?.kills} / {roundStats?.deaths} / {roundStats?.assists}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="stat-header text-left">DMG</p>
                            <p className="stat-content">{roundStats?.damage}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="stat-header text-left">Creds Spent</p>
                            <p className="stat-content">{roundStats?.economy.spent}</p>
                        </div>
                        <div className="flex flex-col">
                            <p className="stat-header text-left">Bank Creds</p>
                            <p className="stat-content">{roundStats?.economy.remaining}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
