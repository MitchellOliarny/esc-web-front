"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { userSession } from "@/app/utils/authHelpers";
import { FaCheck, FaXmark, FaCrown } from "react-icons/fa6";
import toast from "react-hot-toast";
import subscribe from "@/app/settings/settingsActions/subscribe";
import manageSubscriptions from "@/app/settings/settingsActions/manageSubscriptions";

interface SubscriptionsProps {
    sub_status: boolean;
    sub_1_cost: number;
}
const Subscriptions = ({ sub_status, sub_1_cost }: SubscriptionsProps) => {


    const HandleSubscriptionClick = async (name: String) => {
        const res = await subscribe(name);
        if (res.success) {
            toast.success(res.message)
            if (res.link) {
                //@ts-ignore
                window.open(res.link, '_blank').focus();
            }
        }
        else {
            toast.error(res.message);
        }
    }

    const HandleSubscriptionManageClick = async () => {
        const res = await manageSubscriptions();
        if (res.success) {
            toast.success(res.message)
            if (res.link) {
                //@ts-ignore
                window.open(res.link, '_blank').focus();
            }
        }
        else {
            toast.error(res.message);
        }
    }

    return (
        <>
            <div className="rounded-lg h-full back-graphite">
                <div className="grid grid-cols-3 items-center p-4">

                    <div className={`grid grid-rows-4 mt-5 rounded-md border-3 h-[34em] m-2 py-4 ${sub_status ? 'back-sub' : ''}`}>
                        <div className="grid row-span-2 m-auto content-center">
                        <p className="m-4 justify-self-center text-3xl font-bold">ESC+ Member</p>
                        <FaCrown size={'5em'} className={`justify-self-center ${sub_status ? 'text-voltage': 'text-frost'}`} />
                        <p className="m-4 justify-self-center text-2xl font-bold border-b">${(sub_1_cost/100).toFixed(2)} / Month</p>
                        </div>
                        <div className="row-span-1 ml-6 justify-self-center self-center text-lg font-bold h-auto">
                            <ul className="h-full list-disc m-4">
                                <li>Access to Premium Medals</li>
                                <li>FREE entry to all Weekly Events</li>
                            </ul>
                        </div>
                        <div className="mx-4 h-full content-center">
                            {
                                //@ts-ignore
                                sub_status ?
                                    <div className="grid grid-rows-2 mx-4 my-4 h-full">
                                        <button className="btn border-0 text-white font-bold text-xl rounded-full bg-[#36ab98] hover:bg-[#5ECCBA] w-full">
                                            <FaCheck />
                                        </button>
                                        <button className="btn border-0 text-white font-bold text-xl rounded-full bg-[#27a9cd] hover:bg-[#2093b3] w-full" onClick={() => HandleSubscriptionManageClick()}>
                                            Manage Subscription
                                        </button>
                                    </div>
                                    :
                                    <button className="btn border-0 text-white font-bold text-xl rounded-full bg-[#F5603C] hover:bg-[#AC442A] w-full hover:scale-105" onClick={() => HandleSubscriptionClick('esc_member')}>
                                        Subscribe
                                    </button>
                            }
                        </div>
                    </div>
                    <div className="flex mt-5 rounded-md border-3 h-[34em] m-2 py-4 justify-center align-middle">
                        <p className="my-auto font-bold text-xl">Coming Soon</p>
                    </div>
                    <div className="flex mt-5 rounded-md border-3 h-[34em] m-2 py-4 justify-center align-middle">
                        <p className="my-auto font-bold text-xl">Coming Soon</p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Subscriptions;
