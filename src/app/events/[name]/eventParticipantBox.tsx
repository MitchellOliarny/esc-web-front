"use client"
import React, { useEffect, useState } from "react";
import { FaRegUser, FaTrophy, FaCalendarCheck } from "react-icons/fa";

interface EventTileProps {
    value: any;
    color: string;
    position: number;
  }
  

export default function EventParticipant({value, color, position}: EventTileProps) {

    const background = value?.valorant_banner;

    return (
        <>
            <div className={`mx-auto my-2 font-bold items-center text-xl rounded-lg bg-[#102b3d] min-h-32 w-[90%] cursor-pointer`} style={{backgroundImage: 'url('+background+')', border: color ? '3px solid ' + color : 'none'}}>
                <div className="bg-black/70 grid grid-cols-4 w-full h-full p-4 rounded-lg">
                    <h2 className={`text-2xl col-span-3 my-auto mx-2 `} style={{color: color ? color : 'white'}}>{position + '. ' +value.riot_name + '#' + value.riot_tag}</h2>
                    <h2 className={`text-3xl col-span-1 m-auto`} style={{color: color ? color : 'white'}}>{value.score}</h2>
                </div>
            </div >
        </>
    );
}
