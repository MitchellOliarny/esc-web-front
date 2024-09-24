"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userSession } from "@/app/utils/authHelpers";
import { FaCheck, FaXmark, FaCrown } from "react-icons/fa6";
import toast from "react-hot-toast";
import { FaCrow } from "react-icons/fa";

interface SubscriptionsProps {

}
const Subscriptions = ({ }: SubscriptionsProps) => {

    const [info, setInfo] = useState(null);

    useEffect(() => {
        //@ts-ignore
        const session = userSession().then((value) => setInfo(value));

    }, [])

    //console.log(info)


    return (
        <>
            <div className="mt-5 rounded-md ml-10 h-full">
                <div className="grid grid-cols-3 items-center p-4 h-full">

                    <div className="grid grid-rows-6 mt-5 rounded-md border-3 h-full m-2">
                        <p className="m-4 justify-self-center text-3xl font-bold">Member</p>
                        <FaCrown size={'5em'} className="justify-self-center" />
                        <p className="m-4 justify-self-center text-2xl font-bold border-b">$4.99 / Month</p>
                        <div className="row-span-2 ml-6 justify-self-center text-lg font-bold">
                            <ul className="h-full list-disc m-4">
                                <li>Access to Premium Medals</li>
                                <li>FREE entry to all Weekly Events</li>
                            </ul>
                        </div>
                        <div className="mx-4">
                        {
                            //@ts-ignore
                            info?.isStudent == 1 ?
                                <button className="btn text-white font-bold text-xl rounded-full bg-[#36ab98] hover:bg-[#5ECCBA] w-full">
                                    <FaCheck />
                                </button>
                                :
                                <Link href="#">
                                    <button className="btn text-white font-bold text-xl rounded-full bg-[#F5603C] hover:bg-[#AC442A] w-full hover:scale-105">
                                        Subscribe
                                    </button>
                                </Link>
                        }
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Subscriptions;
