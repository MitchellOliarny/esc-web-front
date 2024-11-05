import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";

interface MedalsProps {
    medalInfo: any;
    progress: any;
}

const Medal = ({ medalInfo, progress }: MedalsProps) => {

    const [showPopup, setShowPopUp] = useState('hidden');
    const [showLightBox, setShowLightBox] = useState('hidden');

    const [currentStatus, setCurrentStatus] = useState(0);
    const [childMedals, setChildMedals] = useState({});
    const [displayMedal, setDisplayMedal] = useState(5);

    const bucket = "https://files.esportsclubs.gg/";

    useEffect(()=> {
        for (const x in progress.tiers) {

            if(progress.tiers[x].isComplete == true) {
                continue;
            }

            if(progress.tiers[x].isComplete == false) {
                setDisplayMedal(Number(x));
                break;
            }
        }
    },[progress])



        return (
            <>
                <div className="w-full h-60 mt-8 back-graphite game-row-border rounded-lg">
                    <div className="h-[80%] medal-row rounded-t-lg">
                        <img src={displayMedal != 0 ? 
                                bucket + medalInfo.name + '_' + displayMedal + '.png'
                                : bucket + medalInfo.name + '_1' + '.png'
                            } alt={medalInfo.name + displayMedal} className={`${displayMedal == 0 ? 'brightness-0' : ''} h-full w-max m-auto`}></img>
                        <div className="col-span-3 p-8 h-full">
                            <div className="grid grid-cols-3 grid-rows-1 w-full font-bold">
                                <h2 className="text-3xl text-frost">{medalInfo.medal_name}</h2>
                                <div className="back-slate text-frost self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center">{Object.keys(medalInfo.medal_tiers).length} Tiers</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-[20%] back-darkslate rounded-b-lg game-row-border-top">

                    </div>
                </div>
            </>
        );
    };

    export default Medal;
