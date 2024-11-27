"use client"
import React, { useEffect, useState } from "react";
import { FaRegUser, FaTrophy, FaCalendarCheck, FaUser } from "react-icons/fa";
import { CalcRankName, GetFile, GetPlacementName } from "@/app/utils/helpers";
import ReactCountryFlag from "react-country-flag"

interface EventTileProps {
    value: any;
    color: string;
    position: number;
    game_limit: number;
    prize: string;
}


export default function EventParticipant({ value, color, position, game_limit, prize }: EventTileProps) {

    const background = value?.val_banner;

    return (
        <>
            <div className={`w-full relative mx-auto my-2 font-bold items-center xl:text-xl md:text-sm rounded-lg back-graphite min-h-20 leaderboard-grid game-row-border overflow-hidden`}>
                {/* False div for placement */}
                <div></div>
                <div className={`${position == 1 ? 'first' : position == 2 ? 'second' : position == 3 ? 'third' : 'text-frost'} absolute h-full w-36 flex`}>
                    <p className={`my-auto ml-8`}>{GetPlacementName(position)}</p>
                </div>
                <div className="flex border-right pr-4 my-auto h-full">
                    <div className="flex ml-10 my-auto">
                        <div className="xl:w-10 md:w-6 xl:h-10 md:h-6 my-auto">
                        {value.profile_picture ?
                            <img src={GetFile(value.profile_picture)} className="w-full h-full rounded-full object-cover my-auto"></img>
                            :
                            <FaUser className="text-ash w-auto h-full m-auto"/>
                        }
                        </div>
                        <div className="block ml-2 my-auto">
                            <p>{value.username}</p>
                            <p className="text-ash xl:text-sm md:text-xs">#{value.tag}</p>
                        </div>
                    </div>
                    <ReactCountryFlag
                        countryCode={value.country}
                        svg
                        className="ml-auto my-auto"
                        style={{
                            width: '2em',
                            height: '1.5em'
                        }}
                        title={value.country}
                    />
                </div>
                <div className="flex my-auto border-right h-full">
                        <p className="m-auto">{value.score}</p>
                </div>
                <div className="flex my-auto border-right h-full">
                        <p className="m-auto">{value.game_count} <span className="text-ash">/ {game_limit || 'Unlimited'}</span> </p>
                </div>
                <div className="flex my-auto h-full">
                        <img className="my-auto mx-8 w-8 h-8" src={`https://api.esportsclubs.gg/images/ranks/${value.val_rank}`}></img>
                        <p className="my-auto">{CalcRankName(value.val_rank).charAt(0).toLocaleUpperCase() + CalcRankName(value.val_rank).slice(1)} {(value.val_rank % 3)+1}</p>
                </div>
                <div className="flex my-auto h-full ml-auto mr-10">
                        <p className="my-auto text-win">{prize}</p>
                </div>
            </div >
        </>
    );
}
