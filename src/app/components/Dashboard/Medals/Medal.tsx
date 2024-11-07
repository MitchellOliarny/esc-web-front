import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { formatDateYearShort } from "@/app/utils/helpers";
import { FaCheck, FaLock } from "react-icons/fa";

interface MedalsProps {
    medalInfo: any;
    progress: any;
}

const Medal = ({ medalInfo, progress }: MedalsProps) => {

    const [showPopup, setShowPopUp] = useState('hidden');
    const [showLightBox, setShowLightBox] = useState('hidden');

    const [currentStatus, setCurrentStatus] = useState(0);
    const [childMedals, setChildMedals] = useState({});
    const [displayMedal, setDisplayMedal] = useState(0);


    const bucket = "https://files.esportsclubs.gg/";

    useEffect(() => {
        if (progress) {
            for (const x in progress.tiers) {

                if (progress.tiers[x].isComplete == true) {
                    continue;
                }

                if (progress.tiers[x].isComplete == false) {
                    setDisplayMedal(Number(x));
                    break;
                }

                if (progress.tiers.length == x) {
                    setDisplayMedal(4);
                }
            }

        }
    }, [progress, medalInfo])

    if (!medalInfo?.name) {
        return (<div></div>)
    }

    return (
        <>

            <div className="w-full h-auto mt-8 back-graphite game-row-border rounded-lg">
                <div className="h-60 medal-row rounded-t-lg cursor-pointer" onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '') }}>
                    <img src={displayMedal != 0 ?
                        bucket + medalInfo?.name + '_' + displayMedal + '.png'
                        : bucket + medalInfo?.name + '_1' + '.png'
                    }
                        alt={medalInfo?.name + '_' + displayMedal}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                        }}
                        className={`${displayMedal == 0 ? 'blur-sm grayscale' : ''} h-full w-max m-auto p-4 pl-8`}></img>
                    <div className="col-span-4 p-8 h-full">
                        <div className="grid grid-cols-3 grid-rows-1 w-full font-bold">
                            <div className="col-span-2 flex gap-4">
                                <h2 className="text-3xl text-frost">{medalInfo?.medal_name}</h2>
                                <div className="back-slate text-frost self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center">{medalInfo?.medal_tiers ? Object.keys(medalInfo?.medal_tiers).length : 1} Tiers</div>
                            </div>
                            {/* Dropdown Here */}
                        </div>
                        <p className="text-ash text-base py-2 pr-10">{medalInfo?.medal_description}</p>
                        <div className="py-8">
                            <div className="w-full cut-corner-45-special">
                                <progress
                                    className={`${displayMedal == 4 ? 'progress-voltage' : 'progress-rust'} w-full h-3`}
                                    color="secondary"
                                    value={displayMedal}
                                    max={Object.keys(medalInfo.medal_tiers).length}
                                ></progress>
                            </div>
                            <div className="w-full inline-flex justify-between px-2">
                                <h2 className="font-bold text-frost text-lg">{((displayMedal / Object.keys(medalInfo.medal_tiers).length) * 100).toFixed(1)} %</h2>
                                <h2 className="font-bold text-lg"><span className={`${displayMedal == 4 ? 'text-voltage' : 'text-gold'} text-xl`}>{(displayMedal)}</span> <span className="text-ash text-base">/ {(Object.keys(medalInfo.medal_tiers).length)}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${showPopup} h-auto game-row-border-top overflow-hidden py-4`}>
                    {
                        Object.keys(medalInfo?.medal_tiers).map((value, key) => {
                            return (
                                <div className="h-[8em] w-full medal-row-tier my-2" key={medalInfo?.name + value}>
                                    <div className="relative mr-16">
                                        <hr className="medal-tier-line-up"></hr>
                                        <img src={
                                            bucket + medalInfo?.name + '_' + value + '.png'

                                        }
                                            alt={medalInfo?.name + '_' + value}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                                            }}
                                            className={`${displayMedal < Number(value) ? 'blur-sm grayscale' : ''} h-full w-max m-auto p-4 pl-8 z-10 relative`}>
                                        </img>
                                        <hr className="medal-tier-line-side"></hr>
                                        {
                                            progress.tiers && progress.tiers[key].isComplete ?

                                                <div className="medal-tier-complete">
                                                    <FaCheck className="text-slate m-auto w-3 h-3" />
                                                </div>
                                                :
                                                <div className="medal-tier-locked">
                                                    <FaLock className="text-ash m-auto w-3 h-3" />
                                                </div>
                                        }
                                    </div>
                                    <div className="col-span-4 p-4 h-full">
                                        <div className="grid grid-cols-4 grid-rows-1">
                                            <div className="col-span-3 w-full font-bold">
                                                <div className="flex gap-4">
                                                    <h2 className="text-lg text-frost">{medalInfo?.medal_name + " " + value}</h2>
                                                </div>
                                                <p className="text-ash text-sm py-2 pr-10">{medalInfo?.medal_description.replace('XXX', medalInfo?.medal_tiers[value].condition)}</p>
                                            </div>
                                            <div className="px-4 my-auto text-right">
                                                <p className="text-ash font-bold">Earned</p>
                                                <p className="text-frost font-bold">{progress.tiers && progress.tiers[key].date_obtained ? formatDateYearShort(progress.tiers[key].date_obtained) : 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-full cut-corner-45-special">
                                                <progress
                                                    className={`${progress.tiers && progress.tiers[key].isComplete ? 'progress-voltage' : 'progress-rust'} w-full h-3`}
                                                    color="secondary"
                                                    value={progress.tiers && progress.tiers[key].isComplete ? medalInfo?.medal_tiers[value].condition : progress.progress}
                                                    max={medalInfo?.medal_tiers[value].condition}
                                                ></progress>
                                            </div>
                                            <div className="w-full inline-flex justify-between px-4">
                                                <h2 className="font-bold text-frost text-base">{(((progress.tiers && progress.tiers[key].isComplete ? medalInfo?.medal_tiers[value].condition : progress.progress) / (medalInfo?.medal_tiers[value].condition)) * 100).toFixed(1)} %</h2>
                                                <h2 className="font-bold text-base"><span className={`${progress.tiers && progress.tiers[key].isComplete ? 'text-voltage' : 'text-gold'} text-xl`}>{(progress.tiers && progress.tiers[key].isComplete ? medalInfo?.medal_tiers[value].condition : progress.progress)}</span> <span className="text-ash text-base">/ {(medalInfo?.medal_tiers[value].condition)}</span></h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="h-14 flex back-darkslate rounded-b-lg game-row-border-top w-full justify-between px-4">
                    <div>
                        {/* Earners */}
                    </div>
                    <div className="px-4 my-auto text-right">
                        <p className="text-ash font-bold">Earned</p>
                        <p className="text-frost font-bold">{progress.tiers && progress?.tiers[displayMedal - 1]?.date_obtained ? formatDateYearShort(progress.tiers[displayMedal - 1].date_obtained) : 'N/A'}</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Medal;
