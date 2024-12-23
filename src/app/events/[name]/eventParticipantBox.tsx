"use client"
import React, { useEffect, useState } from "react";
import { FaRegUser, FaTrophy, FaCalendarCheck, FaUser } from "react-icons/fa";
import { CalcRankName, GetFile, GetPlacementName } from "@/app/utils/helpers";
import { useMediaQuery } from 'react-responsive';
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
    const isBelowLg = useMediaQuery({ maxWidth: 1350 });
    

    return (
        <>
            <div className={`w-full relative mx-auto my-2 font-bold items-center xl:text-xl md:text-sm text-[0.75em] rounded-lg back-graphite min-h-20 leaderboard-grid game-row-border overflow-hidden`}>
                {/* False div for placement */}
                <div></div>
                <div className={`${position == 1 ? 'first' : position == 2 ? 'second' : position == 3 ? 'third' : 'text-frost'} absolute h-full w-36 flex`}>
                    <p className={`my-auto lg:ml-8 ml-4`}>{GetPlacementName(position)}</p>
                </div>
                <div className="flex border-right lg:pr-4 pr-2 lg:ml-0 ml-[-1.5em] my-auto h-full">
                    <div className="flex ml-10 my-auto">
                        <div className="xl:w-10 md:w-6 sm:w-4 xl:h-10 md:h-6 sm:h-4 my-auto">
                        {value.profile_picture ?
                            <img src={GetFile(value.profile_picture)} className="w-full h-full rounded-full object-cover my-auto md:block hidden"></img>
                            :
                            <FaUser className="text-ash w-auto h-full m-auto md:block hidden"/>
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
                        <p className="m-auto">{value.game_count} <span className="text-ash">/ {game_limit || (isBelowLg ? "∞" : 'Unlimited')}</span> </p>
                </div>
                <div className="flex my-auto h-full">
                        <img className="my-auto lg:mx-8 mx-4 w-8 h-8" src={`https://api.esportsclubs.gg/images/ranks/${value.val_rank}`}></img>
                        {!isBelowLg ?
                        <p className="my-auto">{CalcRankName(value.val_rank).charAt(0).toLocaleUpperCase() + CalcRankName(value.val_rank).slice(1)} {(value.val_rank % 3)+1}</p>
                        : ''}
                </div>
                <div className="flex my-auto h-full ml-auto lg:mr-10 mr-4">
                        <p className="my-auto text-win">{prize}</p>
                </div>
            </div >
        </>
    );
}
