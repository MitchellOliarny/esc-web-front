"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import MedalEventForm from "./medalEventForm";
import MedalForm from "./medalForm";

// import { Orbitron } from "next/font/google";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import doSubmitMedalEvent from "./actions/doSubmitMedalEvent";
import { convertTimeToUTC } from "@/app/utils/helpers";
// const orbitron = Orbitron({
//   subsets: ["latin"],
//   display: "swap",
//   adjustFontFallback: false,
// });

const Forms = (medals: any, medal_details: any) => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedForm, setSelectedForm] = useState('');

    useEffect(() => {
        console.log(medals)
    }, [selectedForm])

    const goBack = () => {
        //@ts-ignore
        setSelectedForm(null)
    }


    const HandleChangeForm = () => {
        switch (selectedForm) {
            case 'medal_event':
                return (
                    //@ts-ignore
                    <MedalEventForm valMedals={medals.medals.data} goBack={goBack} />
                )
            case 'medal_form':
                //@ts-ignore
                return (<MedalForm valMedals={medals.medals.data} details={medals.medal_details.data} weapons={medals.weapons.data} agents={medals.agents.data} maps={medals.maps.data} goBack={goBack} />)
            default:
                //@ts-ignore
                setSelectedForm(null)
                break;
        }
    }



    return (
        <>
            {
                !selectedForm ?
                    <div className="flex flex-wrap h-screen gap-8">
                        <div className="back-darkslate rounded-lg h-48 w-72 flex cursor-pointer" onClick={() => setSelectedForm('medal_event')}><p className="m-auto font-bold text-xl">Medal Event Form</p></div>
                        <div className="back-darkslate rounded-lg h-48 w-72 flex cursor-pointer" onClick={() => setSelectedForm('medal_form')}><p className="m-auto font-bold text-xl">Medal Form</p></div>
                    </div>
                    :
                    HandleChangeForm()
            }
        </>
    );
};

export default Forms;
