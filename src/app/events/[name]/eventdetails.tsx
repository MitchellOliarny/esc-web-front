"use client"
import React, { useEffect, useState } from "react";
import { leapfrog } from "ldrs";
import { FaBullseye, FaCheck, FaGlobe, FaList, FaMedal, FaRegCalendar, FaRegUser, FaTrophy } from "react-icons/fa";
import doFindEvent from "../doFindEvent"
import doJoinEvent from "../doJoinEvent";
import doFetchParticipants from "../doFetchParticipants";
import EventParticipant from "./eventParticipantBox";
import { formatDateYear, formatTime } from "@/app/utils/helpers";
import toast from "react-hot-toast";
import { CalcRankName } from "@/app/utils/helpers";
import Link from "next/link";

export default function EventDetails() {

    const [event, setEvent] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [lbLoading, setLBLoading] = useState(true);
    const [lb, setLB] = useState([])
    const [buttonState, setButtonState] = useState(0);
    leapfrog.register();

    const borders = ['#ffca00', '#dbcece', '#ff9f57', '#e9451d', '']

    useEffect(() => {
        const url_split = (window.location.href).split('/');
        const event_name = url_split[url_split.length - 1];

        FetchEvent(event_name);
        FetchEventParticipants(event_name)
    }, [])

    const FetchEvent = async (eventname: any) => {
        const event_details = await doFindEvent(eventname);
        if (event_details.success) {
            setEvent(event_details.details.events[0]);
            if(new Date(event_details.details.events[0].end_date) <= new Date(Date.now())) {
                setButtonState(2);
            }
            else if (event_details.details.events[0].score >= 0) {
                setButtonState(3);
            }
            else if (event_details.user.isStudent == 1) {
                setButtonState(1)
            }
            console.log(event_details.user)
            console.log(event_details.details)
        }
        setIsLoading(false);
    }

    const TryJoinEvent = async () => {
        //@ts-ignore
        const result = await doJoinEvent(event.id);
        console.log(result)
        if (result.success) {
            toast.success(result.msg)
            if(!result.link){
                setButtonState(3);
                //@ts-ignore
                FetchEventParticipants(event.name);
            }
            else {
                //@ts-ignore
                window.open(result.link, '_blank').focus();
            }
        }
        else {
            toast.error(result.msg)
        }
    }

    const FetchEventParticipants = async (event_name: string) => {
        //@ts-ignore
        const result = await doFetchParticipants(event_name);
        console.log(result)
        if (result.success) {
            setLB(result.participants);
        }
        setLBLoading(false);
    }



    if (isLoading) {
        return (
            <div style={{ display: 'flex', fontSize: '2em', alignContent: 'flex-end', flexWrap: 'wrap-reverse' }}>Loading
                <l-leapfrog
                    size="45"
                    speed="1.75"
                    color="#F5603C"
                ></l-leapfrog>
            </div>
        )
    }
    else {
        return (
            <>
                <div className="px-4 2xl:px-40 w-full max-w-[1800px] mx-auto">
                    <div
                        className="w-full rounded-lg"
                        style={{
                            backgroundImage:
                                `url(${
                                //@ts-ignore
                                event.thumbnail ? event.thumbnail 
                                : '/homepage/medals.png'})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="flex flex-col min-h-56 items-center justify-center py-4 px-6 bg-black/40">
                            <div className="mb-2">
                                <h2 className="text-white text-5xl font-black tracking-[.2em]">
                                    MEDAL MONDAYS
                                </h2>
                                <p className="text-white text-lg font-bold text-center tracking-wider">
                                    {//@ts-ignore
                                        event.medal_condition}
                                </p>
                            </div>
                            {/* <div className="flex items-center">
              <ul className="flex gap-4 font-bold text-lg">
                <li
                  onClick={() => handleSideBarClick("Overview")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${selectedMenu === "Overview" ? "bg-[#F5603C]" : ""
                    }`}
                >
                  Overview
                </li>
                <li
                  onClick={() => handleSideBarClick("Timeline")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${selectedMenu === "Timeline" ? "bg-[#F5603C]" : ""
                    }`}
                >
                  Timeline
                </li>
                <li
                  onClick={() => handleSideBarClick("Heatmap")}
                  className={`cursor-pointer py-2 px-4 rounded-full transition-all ease-in-out ${selectedMenu === "Heatmap" ? "bg-[#F5603C]" : ""
                    }`}
                >
                  Heatmap
                </li>
              </ul>
            </div> */}
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 px-4 py-4 2xl:px-40 w-full max-w-[1800px] mx-auto">
                    <h1 className="text-4xl py-4 font-bold">EVENT DETAILS</h1>
                    <div className="lg:justify-self-end self-baseline py-4">
                        {
                            //@ts-ignore
                            buttonState == 3 ?
                                <button type="button" className="inline-flex text-2xl px-6 py-4 font-bold bg-[#5ECCBA] rounded-lg hover:scale-105" >JOINED <FaCheck className="my-auto mx-2" /></button>
                                :
                                buttonState == 2 ?
                                <button type="button" className="inline-flex text-2xl px-6 py-4 font-bold bg-[#bd1616] rounded-lg hover:scale-105" >ENDED</button>
                                :
                                buttonState == 1 ?
                                    <button type="button" onClick={() => { TryJoinEvent() }} className="grid text-2xl px-6 py-2 font-bold bg-[#F5603C] rounded-lg hover:scale-105" ><h2>JOIN EVENT</h2><span className="text-sm m-[0] text-[#dedede]">{
                                        //@ts-ignore
                                        'Join NOW w/ ESC+'
                                    }</span></button>
                                    :
                                    <button type="button" onClick={() => { TryJoinEvent() }} className="grid text-2xl px-6 py-2 font-bold bg-[#F5603C] rounded-lg hover:scale-105" ><h2>JOIN EVENT</h2><span className="text-sm m-[0] text-[#dedede]">{
                                        //@ts-ignore
                                        event.entry_fee == 0 ? 'FREE ENTRY' : '$' + (event.entry_fee - 0.01) + ' or FREE w/ ESC+'
                                    }</span></button>
                        }
                    </div>
                    <div className="content-evenly">
                        <div className="inline-flex mb-4">
                            <FaRegCalendar size={'3em'} />
                            <p className="font-bold text-xl my-auto mx-4 text-[#F5603C]">{
                                //@ts-ignore
                                formatDateYear(event.start_date) + ' @ ' + formatTime(event.start_date) + '  '
                            }
                                <span className="font-medium text-lg text-white">until</span>
                                {
                                    //@ts-ignore
                                    '  ' + formatDateYear(event.end_date) + ' @ ' + formatTime(event.end_date)
                                }
                            </p>
                        </div>
                        <br></br>
                        <div className="inline-flex mb-4">
                            <FaRegUser size={'3em'} />
                            <p className="font-bold text-xl my-auto mx-4 text-white">{
                                //@ts-ignore
                                "" + (event.team_limit ? "LIMIT: "+ event.team_limit + ' Players' : 'NO LIMIT') + ' (' + lb.length + ' joined)'
                            }
                            </p>
                        </div>
                        <div className="inline-flex mb-4">
                            <FaBullseye size={'3em'} />
                            <p className="font-bold text-xl my-auto mx-4 text-white">{
                                //@ts-ignore
                                "Get as many " + ((event.medal_condition.split(':')[event.medal_condition.split(':').length - 1]).split('_')[0]).toLocaleUpperCase() + "(s) as possible!"
                            }
                            </p>
                        </div>
                        <div className="inline-flex mb-4">
                            <FaList size={'3em'} />
                            <p className="font-bold text-xl my-auto mx-4 text-white">{
                                //@ts-ignore
                                "Modes: " + JSON.parse(JSON.parse(event.gamemodes)).join(", ")
                            }
                            </p>
                        </div>
                        <div className="inline-flex mb-4">
                            <FaGlobe size={'3em'} />
                            <p className="font-bold text-xl my-auto mx-4 text-white">{
                                //@ts-ignore
                                "Regions: " + JSON.parse(JSON.parse(event.regions)).join(", ").toLocaleUpperCase()
                            }
                            </p>
                        </div>
                        <div className="inline-flex mb-4">
                            <FaMedal size={'3em'} />
                            <p className="font-bold text-xl my-auto mx-4 text-white">{
                                //@ts-ignore
                                "Ranks: " + (event.min_rank == 0 && event.max_rank == 27 ? 'ANY' : CalcRankName(event.min_rank).toLocaleUpperCase() + " - " + CalcRankName(event.max_rank).toLocaleUpperCase())
                            }
                            </p>
                        </div>
                        <br></br>
                        <div className="inline-flex mb-4">
                            <FaTrophy size={'3em'} color="#F5603C" />
                            <p className="font-bold text-xl my-auto mx-4 text-[#F5603C]">{
                                //@ts-ignore
                                "Top "+event.winners+" Players - $" + (event.prize_type == 'even_split' ? event.prize_pool / event.winners : event.prize_pool) + ' each!'
                            }
                            </p>
                        </div>
                    </div>
                    <div className="p-2 text-lg">
                        {
                            //@ts-ignore
                            event.description
                        }
                        <br></br>
                        <br></br>
                        <p>
                            Games must START within the event time. Any games that start before or after will not count. Displayed time is automatically adjusted to local timezone.
                        </p>
                        <br></br>
                        <p>
                            <Link href="/settings?view=Subscriptions" target="_blank" className="text-[#5ECCBA] font-bold underline">ESC+ Membership</Link> provides Free Entry to all events like this.
                        </p>
                        <br></br>
                        <p>
                            Winners will be contacted via Discord. Discord account must be connected to your ESC account at the time of winning. <Link href="/settings?view=Connections" target="_blank" className="text-[#5ECCBA] font-bold underline">Connect Discord Here</Link>
                        </p>
                    </div>
                </div>
                <div className="grid px-4 py-4 2xl:px-40 w-full max-w-[1800px] mx-auto">
                    <h1 className="text-4xl py-4 font-bold">LEADERBOARD {'('+lb.length+')'}</h1>
                    <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 self-baseline py-4">
                        {
                            lb.length < 1 ?
                                "0 users have joined this event"
                                :
                                lb.map((value, index) => {
                                    return (
                                        //@ts-ignore
                                        <EventParticipant key={value.riot_name+value.riot_tag} value={value} color={index < event.winners ? borders[index] ? borders[index] : borders[3] : borders[4]} position={index+1} />
                                    )
                                })
                        }
                    </div>
                </div>
            </>
        );
    }
}
