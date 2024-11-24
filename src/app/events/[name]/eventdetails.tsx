"use client"
import React, { useEffect, useState } from "react";
import { leapfrog } from "ldrs";
import { FaCrosshairs, FaCheck, FaGlobe, FaList, FaMedal, FaRegCalendar, FaRegUser, FaTrophy, FaDice, FaChevronLeft, FaBullseye, FaStopwatch, FaUsers, FaHourglassHalf, FaStar, FaCalendarCheck, FaCoins } from "react-icons/fa";
import doFindEvent from "../doFindEvent"
import doJoinEvent from "../doJoinEvent";
import doFetchParticipants from "../doFetchParticipants";
import EventParticipant from "./eventParticipantBox";
import { formatDateYear, formatTime } from "@/app/utils/helpers";
import toast from "react-hot-toast";
import { CalcRankName } from "@/app/utils/helpers";
import Link from "next/link";
import { timeTo, GetFile } from "@/app/utils/helpers";
import { FaCalendarXmark, FaCheckToSlot } from "react-icons/fa6";

export default function EventDetails() {

    const [event, setEvent] = useState({ medal_condition: 'placeholder:placeholder', gamemodes: "[\"Placeholder\"]", regions: "[\"Placeholder\]", name: '', objective: '', description: '', min_rank: 0, max_rank: 27, entry_fee: 0, game_limit: 0 , start_date: '', end_date: '', winners: 0, prize_pool: 0, prize_type: ''});
    const [isLoading, setIsLoading] = useState(true);
    const [lbLoading, setLBLoading] = useState(true);
    const [timer, setTimer] = useState("");
    const [lb, setLB] = useState([])
    const [buttonState, setButtonState] = useState(0);
    leapfrog.register();

    const borders = ['#ffca00', '#dbcece', '#ff9f57', '#e9451d', '']

    useEffect(() => {
        const url_split = (window.location.href).split('/');
        const event_name = url_split[url_split.length - 1];

        let event_details = {};
        FetchEvent(event_name).then((event) => {
            event_details = event;
        });

        FetchEventParticipants(event_name);

        const intervalId = setInterval(() => {
            //@ts-ignore
            const time = timeTo(event_details.end_date);
            //@ts-ignore            
            setTimer(new Date(event_details.start_date).getTime() > Date.now() ? 'Registration Open' : new Date(event_details.end_date).getTime() < Date.now() ? 'Event Ended' : time.text);
        }, 1000); // 1000 milliseconds = 1 second

        return () => clearInterval(intervalId);
    }, [])

    const FetchEvent = async (eventname: any) => {
        const event_details = await doFindEvent(eventname);
        if (event_details.success) {
            setEvent(event_details.details.events[0]);
            if (new Date(event_details.details.events[0].end_date) <= new Date(Date.now())) {
                setButtonState(2);
            }
            else if (event_details.details.events[0].score >= 0) {
                setButtonState(3);
            }
            else if (event_details.user.esc_member == 1) {
                setButtonState(1)
            }
            // console.log(event_details.user)
            //  console.log(event_details.details)
            setIsLoading(false);
            return event_details.details.events[0]
        }
        setIsLoading(false);
    }

    const TryJoinEvent = async () => {
        //@ts-ignore
        const result = await doJoinEvent(event.id);
        console.log(result)
        if (result.success) {
            toast.success(result.msg)
            if (!result.link) {
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
                <div className="back-graphite flex w-fit h-12 mx-4 mb-4 p-2 rounded-lg cursor-pointer"
                    onClick={() => {
                        window.location.href = "/events"
                    }}
                >
                    <FaChevronLeft className="my-auto text-ash" />
                    <p className="my-auto font-bold text-lg mx-2">All Events</p>
                </div>
                <div className="px-4 w-full max-w-[1800px] mx-auto">
                    <div className="h-72 rounded-t-lg relative">
                        <div className="absolute rounded-t-lg map-gradient h-full w-full"></div>
                        <div
                            className={`h-full w-full rounded-t-lg`}
                            style={{
                                //@ts-ignore
                                backgroundImage: `url('${event.thumbnail ? GetFile(event.thumbnail) : '/homepage-hero.png'}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}></div>
                        {
                            //@ts-ignore
                            event.prize_pool ?
                                <div className={`absolute flex text-sm rounded-lg justify-self-end self-start py-2 px-2 m-4 z-10 bottom-6`}
                                    style={{
                                        backgroundColor: '#21945A',
                                        border: '#51D793 2px solid'
                                    }}>
                                    <FaCoins className="my-auto mr-2" />
                                    {
                            event.prize_type == 'even_split' ? 
                            "Top " + event.winners + " - $" + (event.prize_pool / event.winners) + ' each!'
                             : event.winners + " Winners - $" + (event.prize_pool) + ' pool!'
                            }
                                </div> : ""
                        }
                    </div>
                    <div className="relative grid h-auto px-4 back-graphite rounded-b-lg">
                        <h2 className="absolute w-full text-left font-bold text-4xl -top-6 px-4">{event.name}</h2>
                        <div className="my-6 mx-1 font-medium text-base text-ash text-wrap">
                            <p>{event.description}</p>
                            <br></br>
                            <p>
                                Games must START within the event time. Any games that start before or after will not count. Displayed time is automatically adjusted to local timezone.
                            </p>
                            <br></br>
                            <p>
                                <Link href="/settings?view=Subscriptions" target="_blank" className="text-[#5ECCBA] font-bold underline">ESC+ Membership</Link> provides Free Entry to all events like this.
                            </p>
                            {/* <br></br> */}
                            {/* <p>
                                Winners will be contacted via Discord. Discord account must be connected to your ESC account at the time of winning. <Link href="/settings?view=Connections" target="_blank" className="text-[#5ECCBA] font-bold underline">Connect Discord Here</Link>
                            </p> */}
                        </div>

                        <div className="absolute top-0 right-6 justify-self-end self-baseline py-4 translate-y-[-3em]">
                            {
                                //@ts-ignore
                                buttonState == 3 ?
                                    <button type="button" className="inline-flex text-xl px-12 py-4 font-bold game-row-border back-obsidian rounded-lg hover:scale-105" ><FaCheck className="my-auto mx-2 text-voltage" /> JOINED</button>
                                    :
                                    buttonState == 2 ?
                                        <button type="button" className="inline-flex text-xl px-12 py-4 font-bold bg-[#bd1616] rounded-lg hover:scale-105" >ENDED</button>
                                        :
                                        buttonState == 1 ?
                                            <button type="button" onClick={() => { TryJoinEvent() }} className="grid text-xl px-12 py-2 font-bold bg-[#F5603C] rounded-lg hover:scale-105" ><h2>JOIN EVENT</h2><span className="text-sm m-[0] text-[#dedede]">{
                                                //@ts-ignore
                                                'Join NOW w/ ESC+'
                                            }</span></button>
                                            :
                                            <button type="button" onClick={() => { TryJoinEvent() }} className="grid text-xl px-12 py-2 font-bold bg-[#F5603C] rounded-lg hover:scale-105" ><h2>JOIN EVENT</h2><span className="text-sm m-[0] text-[#dedede]">{
                                                //@ts-ignore
                                                event.entry_fee == 0 ? 'FREE ENTRY' : 'Requires ESC+'
                                            }</span></button>
                            }
                        </div>


                        <div className="flex my-auto py-4 px-2 gap-16 self-end font-bold">
                            <div className="inline-flex items-center">
                                <FaBullseye size={'1.75em'} className={`text-voltage`} />
                                <div className="ml-4">
                                    <p className="text-ash text-base">Objective</p>
                                    <p className="text-lg text-frost">{event.objective}</p>
                                </div>
                            </div>

                            <div className="inline-flex items-center">
                                <FaStopwatch size={'1.75em'} className={`text-voltage`} />
                                <div className="ml-4">
                                    <p className="text-ash text-base">Time Remaining</p>
                                    <p className="text-lg text-frost">{timer}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex px-4 py-8 gap-8 font-bold">
                            <div className="inline-flex gap-4">
                                <FaCalendarCheck size={'1.5em'} className="text-ash my-auto" />
                                <div>
                                    <p className="text-ash text-sm">Start Date</p>
                                    <p className="text-lg text-frost">{
                                        //@ts-ignore
                                        formatDateYear(event.start_date)}</p>
                                </div>
                            </div>
                            <hr className="back-slate w-0.5 h-12 border-none my-auto"></hr>
                            <div className="inline-flex gap-4">
                                <FaCalendarXmark size={'1.5em'} className="text-ash my-auto" />
                                <div>
                                    <p className="text-ash text-sm">End Date</p>
                                    <p className="text-lg text-frost">{
                                        //@ts-ignore
                                        formatDateYear(event.end_date)}</p>
                                </div>
                            </div>
                            <hr className="back-slate w-0.5 h-12 border-none my-auto"></hr>
                            <div className="inline-flex gap-4">
                                <FaUsers size={'1.5em'} className="text-ash my-auto" />
                                <div>
                                    <p className="text-ash text-sm">Participants Allowed</p>
                                    <p className="text-lg text-frost">{
                                        //@ts-ignore
                                        lb.length + '/'}{event.team_limit || "Unlimited"}</p>
                                </div>
                            </div>
                            <hr className="back-slate w-0.5 h-12 border-none my-auto"></hr>
                            <div className="inline-flex gap-4">
                                <FaHourglassHalf size={'1.5em'} className="text-ash my-auto" />
                                <div>
                                    <p className="text-ash text-sm">Game Limit</p>
                                    <p className="text-lg text-frost">{event.game_limit || "Unlimited"}</p>
                                </div>
                            </div>
                            <hr className="back-slate w-0.5 h-12 border-none my-auto"></hr>
                            <div className="inline-flex gap-4">
                                <FaStar size={'1.5em'} className="text-ash my-auto" />
                                <div>
                                    <p className="text-ash text-sm">Ranks Allowed</p>
                                    <p className="text-lg text-frost">{(event.min_rank == 0 && event.max_rank == 27 ? 'ANY' : CalcRankName(event.min_rank).toLocaleUpperCase() + " - " + CalcRankName(event.max_rank).toLocaleUpperCase())}</p>
                                </div>
                            </div>
                            <hr className="back-slate w-0.5 h-12 border-none my-auto"></hr>
                            <div className="inline-flex gap-4">
                                <FaCheckToSlot size={'1.5em'} className="text-ash my-auto" />
                                <div>
                                    <p className="text-ash text-sm">Eligibility</p>
                                    <p className="text-lg text-frost">{event.entry_fee ? "Members Only" : "Public"}</p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="inline-flex items-center">
                        <FaCalendarCheck size={'1.5em'} />
                        <p className="ml-2 text-[.85em]">{formatDate(value.start_date)} | {formatTime(value.start_date)} - <br></br>{formatDate(value.end_date)} | {formatTime(value.end_date)}</p>
                    </div>
                    <div className="inline-flex items-center">
                        <FaUser size={'1.5em'} />
                        <p className="ml-2">{value.team_limit || 'Unlimited'}</p>
                    </div>
                    <div className="inline-flex items-center">
                        <FaTrophy color={'#F5603C'} size={'2em'} />
                        <p className="ml-2 text-[#F5603C]">${value.prize_pool}</p>
                    </div> */}
                    </div>
                </div>
                
                <div className="grid px-4 py-4 w-full max-w-[1800px] mx-auto mt-4">
                    <div className="leaderboard-grid w-full text-ash text-sm text-center">
                        <p>Rank</p>
                        <p className="mr-auto ml-20">Player</p>
                        <p>Score</p>
                        <p>Games Played</p>
                        <p>Competitive Rank</p>
                        <p className="ml-auto mr-10">Current Prize</p>
                    </div>
                    <div className="inline-flex self-baseline py-4">
                        {
                            lb.length < 1 ?
                                <p className="mx-4 py-4 font-bold">0 users have joined this event</p>
                                :
                                lb.map((value, index) => {
                                    return (
                                        //@ts-ignore
                                        <EventParticipant key={value.username + value.tag} value={value} color={borders[4]} position={index + 1} game_limit={event.game_limit} prize={event.prize_type == 'cascade_split' ? '$'+event.prize_split_values[index] : event.prize_pool ? index < event.winners ? '$'+(event.prize_pool/event.winners) : '--': '--'}/>
                                    )
                                })
                        }
                    </div>
                </div>
            </>
        );
    }
}
