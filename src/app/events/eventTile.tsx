"use client"
import React, { useEffect, useState } from "react";
import { formatDateYear, formatTime, formatDate } from "../utils/helpers";
import { FaUser, FaTrophy, FaCalendarCheck } from "react-icons/fa";

interface EventTileProps {
    value: any;
    ended: boolean;
  }
  

export default function EventTile({value, ended}: EventTileProps) {

    const live = new Date(value.start_date).getTime() <= Date.now() && Date.now() <= new Date(value.end_date).getTime();

    return (
        <>
            <div key={value.name} className={`grid font-bold items-center text-xl rounded-lg bg-[#102b3d] min-h-52 p-2 cursor-pointer`}
            style={{
                backgroundImage: `url('${value.thumbnaill ?  value.thumbnail : '/homepage-hero.png'}')`,
                backgroundSize: 'cover',
            }}
                 onClick={() => {
                    window.open(
                      '/events/'+value.name,
                      '_blank' // <- This is what makes it open in a new window.
                    );
                  }}
            >
                <div className={`absolute rounded-lg justify-self-end self-end p-1`} style={{backgroundColor: ended ? 'red' : live ? '#F5603C' : '#5ECCBA'}}>
                    {ended ? 'ENDED' : live ? 'LIVE' : 'STARTING SOON'}
                </div>
                <h2 className="self-center w-full text-center font-bold text-2xl">{value.name}</h2>
                <div className="inline-flex items-center">
                    <FaCalendarCheck size={'1.5em'}/>
                    <p className="ml-2 text-[.85em]">{formatDate(value.start_date)} | {formatTime(value.start_date)} - <br></br>{formatDate(value.end_date)} | {formatTime(value.end_date)}</p>
                </div>
                <div className="inline-flex items-center">
                    <FaUser size={'1.5em'}/>
                    <p className="ml-2">{value.team_limit || 'Unlimited'}</p>
                </div>
                <div className="inline-flex items-center">
                    <FaTrophy color={'#F5603C'} size={'2em'} />
                    <p className="ml-2 text-[#F5603C]">${value.prize_pool}</p>
                </div>
            </div >
        </>
    );
}
