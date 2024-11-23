"use client"
import React, { useEffect, useState } from "react";
import { FaRegUser, FaTrophy, FaCalendarCheck } from "react-icons/fa";
import { GetFile, GetPlacementName } from "@/app/utils/helpers";

interface EventTileProps {
    value: any;
    color: string;
    position: number;
  }
  

export default function EventParticipant({value, color, position}: EventTileProps) {

    const background = value?.val_banner;

    return (
        <>
            <div className={`w-full mx-auto my-2 font-bold items-center text-xl rounded-lg back-graphite min-h-16 leaderboard-grid`}>
                <p className={`${position == 1 ? 'first' : position == 2 ? 'second' : position == 3 ? 'third' : 'text-frost'} text-center`}>{GetPlacementName(position)}</p>
                <div className="flex">
                    <div className="flex ml-10">
                    <img src={GetFile(value.profile_picture)} className="w-8 h-8 rounded-full object-cover my-auto"></img>
                    <div className="block ml-2">
                        <p>{value.username}</p>
                        <p className="text-ash text-sm">#{value.tag}</p>
                    </div>
                    </div>
                    <img alt={'flag'} className="ml-auto"></img>
                </div>
            </div >
        </>
    );
}
