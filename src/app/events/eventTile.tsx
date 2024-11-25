"use client"
import React, { useEffect, useState } from "react";
import { formatDateYear, formatTime, formatDate, timeTo, CalcRankName, GetFile } from "../utils/helpers";
import { FaUser, FaTrophy, FaCalendarCheck, FaBullseye, FaStopwatch, FaUsers, FaHourglass, FaHourglassHalf, FaStar, FaCheck, FaCoins } from "react-icons/fa";
import { FaCheckToSlot } from "react-icons/fa6";
import toast from "react-hot-toast";
import doJoinEvent from "./doJoinEvent";

interface EventTileProps {
    value: any;
    ended: boolean;
}


export default function EventTile({ value, ended }: EventTileProps) {

    const live = new Date(value.start_date).getTime() <= Date.now() && Date.now() <= new Date(value.end_date).getTime();

    const [timer, setTimer] = useState("");
    const [buttonState, setButtonState] = useState(0);
    const [players, setPlayers] = useState(0);

    useEffect(() => {

        UpdateButton();

        setPlayers(value.players_entered || 0)

        const intervalId = setInterval(() => {
            const time = timeTo(value.end_date);

            setTimer(new Date(value.start_date).getTime() > Date.now() ? 'Registration Open' : new Date(value.end_date).getTime() < Date.now() ? 'Event Ended' : time.text);
        }, 1000); // 1000 milliseconds = 1 second

        return () => clearInterval(intervalId);

    }, [value])

    const UpdateButton = () => {
        if (new Date(value.end_date).getTime() < Date.now()) {
            setButtonState(3)
        }
        else if (value.user && new Date(value.start_date).getTime() < Date.now()) {
            setButtonState(2)
        }
        else if (value.user) {
            setButtonState(1)
        }
        else {
            setButtonState(0)
        }
    }

    const TryJoinEvent = async () => {
        //@ts-ignore
        const result = await doJoinEvent(value.id);
        console.log(result)
        if (result.success) {
            toast.success(result.msg)
            if (!result.link) {
                if (live) {
                    setButtonState(2)
                }
                else {
                    setButtonState(1)
                }
                //@ts-ignore
                setPlayers(players + 1);
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

    return (
        <>
            <div key={value.name} className={`grid font-bold relative items-center text-xl back-graphite h-auto min-h-52 cursor-pointer rounded-lg game-row-border`}
            >
                <div className="h-[-webkit-fill-available] min-h-60 rounded-t-lg relative"
                    onClick={() => {
                        window.open(
                            '/events/' + value.name,
                            //'_blank' // <- This is what makes it open in a new window.
                        );
                    }}>
                    <div className={`absolute rounded-t-lg event-gradient h-full w-full z-10`}></div>
                    <div
                        className={`h-full w-full rounded-t-lg z-1 ${ended ? 'grayscale-[1]' : ''}`}
                        style={{
                            backgroundImage: `url('${value.thumbnail ? GetFile(value.thumbnail) : '/homepage-hero.png'}')`,
                            backgroundSize: 'cover',
                        }}></div>
                </div>
                <div className={`z-20 flex gap-2 absolute font-bold text-base justify-self-start self-start -top-3 left-10`}>
                    <div className="rounded-lg px-2"
                        style={{
                            backgroundColor: ended ? '#9BA3AE' : live ? '#FA6E6E' : '#41B9FD',
                            border: ended ? '#9BA3AE40 2px solid' : live ? '#FA6E6E40 2px solid' : '#41B9FD40 2px solid'
                        }}>
                        {ended ? 'COMPLETED' : live ? 'LIVE' : 'UPCOMING'}
                    </div>
                    {
                        value.user ?
                        <div className="rounded-lg px-2"
                        style={{
                            backgroundColor: '#41B9FD',
                            border: '#41B9FD40 2px solid'
                        }}>
                        JOINED
                    </div>
                        : ''
                    }
                </div>
                {
                    value.prize_pool ?
                        <div className={`absolute z-20 prize-glow flex text-sm rounded-lg justify-self-end self-start py-3 px-4 m-4 ${ended ? 'grayscale-[1]' : ''}`}
                            style={{
                                backgroundColor: '#21945A',
                                border: '#51D793 2px solid'
                            }}>
                            <FaCoins className="my-auto mr-2" />
                            {
                                value.prize_type == 'even_split' ?
                                    "Top " + value.winners + " - $" + (value.prize_pool / value.winners) + ' each!'
                                    : value.winners + " Winners - $" + (value.prize_pool) + ' pool!'
                            }
                        </div> : ""
                }
                <div className="relative grid h-64 px-6"
                    onClick={() => {
                        window.open(
                            '/events/' + value.name,
                            //'_blank' // <- This is what makes it open in a new window.
                        );
                    }}>
                    <h2 className="z-20 absolute w-full text-left font-bolder text-4xl -top-6 px-6">{value.name}</h2>
                    <p className="mt-8 mx-1 font-medium text-base text-ash text-ellipsis h-12 w-full overflow-hidden display-[-webkit-box]" style={{ WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>{value.description}</p>

                    <div className="grid my-auto py-2 mt-2 px-2 gap-2 self-end">
                        <div className="inline-flex items-center">
                            <FaBullseye size={'1.25em'} className={`${ended ? 'text-ash' : 'text-voltage'}`} />
                            <div className="ml-4">
                                <p className="text-ash text-lg">Objective</p>
                                <p className="text-xl text-frost">{value.objective}</p>
                            </div>
                        </div>

                        <div className="mt-4 inline-flex items-center">
                            <FaStopwatch size={'1.25em'} className={`${ended ? 'text-ash' : 'text-voltage'}`} />
                            <div className="ml-4">
                                <p className="text-ash text-lg">Time Remaining</p>
                                <p className="text-xl text-frost">{timer}</p>
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
                <div className="relative h-[-webkit-fill-available] px-4 back-darkslate game-row-border-top"
                    onClick={() => {
                        window.open(
                            '/events/' + value.name,
                            //'_blank' // <- This is what makes it open in a new window.
                        );
                    }}>
                    <div className="grid grid-cols-2 px-4 py-8 gap-8">
                        <div className="inline-flex gap-4">
                            <FaUsers size={'1em'} className="text-ash my-auto" />
                            <div>
                                <p className="text-ash text-xs">Participants Allowed</p>
                                <p className="text-base text-frost">{value.team_limit || (ended ? "" : players + '/') + "Unlimited"}</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-4">
                            <FaHourglassHalf size={'1em'} className="text-ash my-auto" />
                            <div>
                                <p className="text-ash text-xs">Game Limit</p>
                                <p className="text-base text-frost">{value.game_limit || "Unlimited"}</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-4">
                            <FaStar size={'1em'} className="text-ash my-auto" />
                            <div>
                                <p className="text-ash text-xs">Ranks Allowed</p>
                                <p className="text-base text-frost whitespace-nowrap">{(value.min_rank == 0 && value.max_rank == 27 ? 'All Ranks' : CalcRankName(value.min_rank).charAt(0).toLocaleUpperCase() + CalcRankName(value.min_rank).slice(1) + " - " + CalcRankName(value.max_rank).charAt(0).toLocaleUpperCase() + CalcRankName(value.max_rank).slice(1))}</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-4">
                            <FaCheckToSlot size={'1em'} className="text-ash my-auto" />
                            <div>
                                <p className="text-ash text-xs">Eligibility</p>
                                <p className="text-base text-frost">{value.entry_fee ? "Members Only" : "Public"}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-full min-h-20 px-4 back-darkslate game-row-border-top rounded-b-lg">
                    {
                        buttonState !== 0 ?

                            buttonState == 1 ?

                                <div className="flex mx-auto h-full my-auto w-full p-4 text-xs gap-4 justify-center">
                                    <button type="button" className="grid text-lg px-8 py-2 font-bold back-voltage rounded-lg hover:scale-105" ><h2 className="flex">Joined <FaCheck className="my-auto ml-2" /></h2></button>
                                    <button type="button" onClick={() => {
                                        window.open(
                                            '/events/' + value.name,
                                            '_blank' // <- This is what makes it open in a new window.
                                        );
                                    }} className="grid text-lg px-6 py-1 my-auto font-bold text-voltage rounded-lg hover:scale-105" ><h2>More Info</h2></button>
                                </div>

                                :
                                buttonState == 3 ?
                                    <div className="flex w-full h-full p-4 text-sm gap-4 my-auto">
                                        <div className="flex my-auto">
                                            <img className="object-cover h-8 w-8 rounded-full" src={value.leader.pfp ? GetFile(value.leader.pfp) : "/dashboard/transparent-esc-score_square.png"}></img>
                                            <p className="ml-2 my-auto">{value.leader.username}#{value.leader.tag}</p>
                                        </div>
                                        <hr className="border-none back-slate w-0.5 h-8 my-auto"></hr>
                                        <p className="my-auto text-ash">Winner</p>
                                        <p className="my-auto text-frost ml-auto">Score: {value.leader.score}</p>
                                    </div>

                                    :

                                    <div className="flex w-full h-full p-4 text-sm gap-4 my-auto">
                                        <div className="flex my-auto">
                                            <img className="object-cover h-8 w-8 rounded-full" src={GetFile(value.leader.pfp)}></img>
                                            <p className="ml-2 my-auto">{value.leader.username}#{value.leader.tag}</p>
                                        </div>
                                        <hr className="border-none back-slate w-0.5 h-8 my-auto"></hr>
                                        <p className="my-auto text-ash">Current Leader</p>
                                        <p className="my-auto text-frost ml-auto">Score: {value.leader.score}</p>
                                    </div>


                            :
                            <div className="flex mx-auto w-full h-full p-4 text-xs gap-4 justify-center my-auto">
                                <button type="button" onClick={() => { TryJoinEvent() }} className="grid text-lg px-8 py-2 font-bold back-rust rounded-lg hover:scale-105" ><h2>Join Now</h2></button>
                                <button type="button" onClick={() => {
                                    window.open(
                                        '/events/' + value.name,
                                        //'_blank' // <- This is what makes it open in a new window.
                                    );
                                }} className="grid text-lg px-6 py-1 my-auto font-bold text-voltage rounded-lg hover:scale-105" ><h2>More Info</h2></button>
                            </div>
                    }
                </div>
            </div >
        </>
    );
}
