import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { formatDateYearShort } from "@/app/utils/helpers";

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

                if(progress.tiers[x].tier == 5) {
                    setDisplayMedal(5);
                }
            }
        }
    }, [progress, medalInfo])



    return (
        <>

            <div className="w-full h-auto mt-8 back-graphite game-row-border rounded-lg">
                <div className="h-60 medal-row rounded-t-lg cursor-pointer" onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '') }}>
                    <img src={displayMedal != 0 ?
                        bucket + medalInfo.name + '_' + displayMedal + '.png'
                        : bucket + medalInfo.name + '_1' + '.png'
                    }
                        alt={medalInfo.name + '_' + displayMedal}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src="/dashboard/transparent-esc-score_square.png";
                          }}
                        className={`${displayMedal == 0 ? 'blur-sm grayscale' : ''} h-full w-max m-auto p-4 pl-8`}></img>
                    <div className="col-span-4 p-8 h-full">
                        <div className="grid grid-cols-3 grid-rows-1 w-full font-bold">
                            <div className="col-span-2 flex gap-4">
                                <h2 className="text-3xl text-frost">{medalInfo.medal_name}</h2>
                                <div className="back-slate text-frost self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center">{medalInfo.medal_tiers ? Object.keys(medalInfo.medal_tiers).length : 1} Tiers</div>
                            </div>
                            {/* Dropdown Here */}
                        </div>
                        <p className="text-ash text-base py-2 pr-10">{medalInfo.medal_description}</p>
                        <div className="py-8">
                            <div className="w-full cut-corner-45-special">
                                <progress
                                    className={`${displayMedal == 5 ? 'progress-voltage' : 'progress-rust'} w-full h-3`}
                                    color="secondary"
                                    value={progress.progress}
                                    max={displayMedal == 5 ? medalInfo.medal_tiers[4].condition : medalInfo.medal_tiers[displayMedal + 1].condition}
                                ></progress>
                            </div>
                            <div className="w-full inline-flex justify-between px-4">
                                <h2 className="font-bold text-frost text-lg">{((progress.progress / (medalInfo.medal_tiers[displayMedal == 5 ? 4 : displayMedal + 1].condition)) * 100).toFixed(1)} %</h2>
                                <h2 className="font-bold text-lg"><span className={`${displayMedal == 5 ? 'text-voltage' : 'text-gold'} text-xl`}>{(progress.progress)}</span> <span className="text-ash text-base">/ {((displayMedal == 5 ? medalInfo.medal_tiers[4].condition : medalInfo.medal_tiers[displayMedal + 1].condition))}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${showPopup} h-[40em] game-row-border-top`}>

                </div>
                <div className="h-14 flex back-darkslate rounded-b-lg game-row-border-top w-full justify-between px-4">
                    <div>
                        {/* Earners */}
                    </div>
                    <div className="px-4 my-auto text-right">
                        <p className="text-ash font-bold">Earned</p>
                        <p className="text-frost font-bold">{progress.tiers && progress.tiers[displayMedal == 5 ? 4 : displayMedal].date_obtained ? formatDateYearShort(progress.tiers[displayMedal].date_obtained) : 'N/A'}</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Medal;
