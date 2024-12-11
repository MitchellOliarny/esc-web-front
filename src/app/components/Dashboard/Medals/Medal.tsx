import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { formatDateYearShort } from "@/app/utils/helpers";
import { FaCaretRight, FaCaretDown, FaEllipsisH, FaCheck, FaLock } from "react-icons/fa";

interface MedalsProps {
    medalInfo: any;
    progress: any;
    user_earners: any;
    change_display_medal: any;
    isPremiumUser: boolean;
    isMobile: boolean;
}

const Medal = ({ medalInfo, progress, user_earners, change_display_medal, isPremiumUser, isMobile }: MedalsProps) => {

    const [showPopup, setShowPopUp] = useState('hidden');
    const [showLightBox, setShowLightBox] = useState('hidden');

    const [currentStatus, setCurrentStatus] = useState(0);
    const [childMedals, setChildMedals] = useState({});
    const [displayMedal, setDisplayMedal] = useState(0);
    const [firstEarner, setFirstEarner] = useState('N/A');

    const new_medal = (new Date(medalInfo.date).getTime() + (7 * 24 * 60 * 60 * 1000)) > Date.now();

    const bucket = "https://files.esportsclubs.gg/";

    useEffect(() => {
        if (progress) {

            if (progress.tiers && progress.tiers[progress.tiers.length - 1].isComplete == true) {
                setDisplayMedal(progress.tiers.length);
            }
            else {

                for (const x in progress.tiers) {

                    if (progress.tiers[x].isComplete == true) {
                        continue;
                    }

                    if (progress.tiers[x].isComplete == false) {
                        setDisplayMedal(Number(x));
                        break;
                    }
                }
            }

        }
        //Testing on lower tier
        // setFirstEarner(medalInfo?.medal_tiers['2']?.first_earner?.earner)
        setFirstEarner(medalInfo?.medal_tiers[Object.keys(medalInfo?.medal_tiers)[Object.keys(medalInfo?.medal_tiers).length - 1]]?.first_earner?.earner)
    })

    if (!medalInfo?.name) {
        return (<div></div>)
    }

    const ChangeMedal = (name: string, position: number) => {
        if (displayMedal == 0) {
            return;
        }
        change_display_medal(name, position)
        setShowLightBox('hidden')
    }

    return (
        <>
            {!isMobile ?
                <div className="w-full h-auto mt-8 back-graphite game-row-border rounded-lg">
                    <div className="h-60 medal-row rounded-t-lg relative">
                        <div className={`z-20 flex gap-2 absolute font-bold text-base justify-self-start self-start -top-3 left-[7rem]`}>
                            {new_medal ?
                                <div className="rounded-lg px-2"
                                    style={{
                                        backgroundColor: '#41B9FD',
                                        boxShadow: '0px 0px 0px 3px #41B9FD40'
                                    }}>
                                    <p>
                                        {'NEW'}
                                    </p>
                                </div>
                                : ''}
                        </div>
                        <img src={displayMedal !== 0 ?
                            bucket + medalInfo?.name + '_' + displayMedal
                            : bucket + medalInfo?.name + '_1'
                        }
                            alt={medalInfo?.name + '_' + (displayMedal ? displayMedal : 1)}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                            }}
                            className={`${displayMedal == 0 ? 'blur-sm grayscale' : ''} h-full w-max m-auto p-4 pl-8`}
                            onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '') }}
                        ></img>
                        <div className="col-span-4 p-8 h-full">
                            <div className="grid grid-cols-3 grid-rows-1 w-full font-bold">
                                <div className="col-span-2 flex gap-4">
                                    <h2 className="text-3xl text-frost">{medalInfo?.medal_name}</h2>
                                    <div className="back-slate text-frost self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center">{medalInfo?.medal_tiers ? Object.keys(medalInfo?.medal_tiers).length : 1} Tiers</div>
                                    <div className={`${displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? 'text-voltage' : 'text-rust'} back-slate self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center`}>{progress.progress} Total</div>
                                </div>
                                <div className="flex content-center justify-end flex-wrap relative">
                                    <FaEllipsisH className="text-ash h-6 w-auto my-auto ellipsis-hover cursor-pointer" onClick={() => {
                                        showLightBox == '' ? setShowLightBox('hidden') : setShowLightBox('')
                                    }} />
                                    <div className={`${showLightBox} finline-flex absolute h-auto w-auto back-darkslate rounded-lg p-4 gap-2 -left-8 top-2 z-10`}>
                                        <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={() => { ChangeMedal(medalInfo?.name + '_' + (displayMedal), 0) }}>Show in Showcase #1</p>
                                        <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={() => { ChangeMedal(medalInfo?.name + '_' + (displayMedal), 1) }}>Show in Showcase #2</p>
                                        <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={() => { ChangeMedal(medalInfo?.name + '_' + (displayMedal), 2) }}>Show in Showcase #3</p>
                                    </div>
                                    <div className="back-slate w-10 h-10 ml-6 rounded-lg content-center carot-hover cursor-pointer" onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '') }}>
                                        {
                                            showPopup == '' ? <FaCaretDown className="text-ash m-auto" /> : <FaCaretRight className="text-ash m-auto" />
                                        }
                                    </div>
                                </div>
                            </div>
                            <p className="text-ash text-base py-2 pr-10">{medalInfo?.medal_description.replace('XXX', '').replace(' times', '')}</p>
                            {
                                !isPremiumUser && medalInfo.isPremium == 1 ?
                                    <div className="py-8 flex gap-4 cursor-pointer" onClick={() => { window.location.href = "/settings?view=Subscriptions" }}>
                                        <FaLock className="text-ash h-16 w-auto" />
                                        <div className="my-auto">
                                            <p className="font-bold text-2xl">Premium Medal</p>
                                            <p className="text-voltage text-lg">Click here to Unlock All Premium Medals!</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="py-8">
                                        <div className="w-full cut-corner-45-special">
                                            <progress
                                                className={`${displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? 'progress-voltage' : 'progress-rust'} w-full h-3`}
                                                color="secondary"
                                                value={displayMedal}
                                                max={Object.keys(medalInfo.medal_tiers).length}
                                            ></progress>
                                        </div>
                                        <div className="w-full inline-flex justify-between px-2">
                                            <h2 className="font-bold text-frost text-lg">{(((displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? Object.keys(medalInfo?.medal_tiers).length : displayMedal) / Object.keys(medalInfo.medal_tiers).length) * 100).toFixed(1)} %</h2>
                                            <h2 className="font-bold text-lg"><span className={`${displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? 'text-voltage' : 'text-gold'} text-xl`}>{(displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? Object.keys(medalInfo?.medal_tiers).length : displayMedal)}</span> <span className="text-ash text-base">/ {(Object.keys(medalInfo.medal_tiers).length)}</span></h2>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className={`${showPopup} h-auto game-row-border-top overflow-hidden py-4 ${!isPremiumUser && medalInfo.isPremium == 1 ? 'blur-md' : ''}`}>
                        {
                            Object.keys(medalInfo?.medal_tiers).map((value, key) => {
                                return (
                                    <div className="h-[8em] w-full medal-row-tier my-2" key={medalInfo?.name + value}>
                                        <div className="relative mr-16">
                                            <hr className="medal-tier-line-up"></hr>
                                            <img src={
                                                bucket + medalInfo?.name + '_' + value

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
                                                        <h2 className="text-lg text-frost">{medalInfo?.medal_name + " Tier " + value}</h2>
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
                                                    <h2 className="font-bold text-base"><span className={`${progress.tiers && progress.tiers[key].isComplete ? 'text-voltage' : 'text-gold'} text-xl`}>{(progress.tiers && medalInfo?.medal_tiers[value].condition < progress.progress ? medalInfo?.medal_tiers[value].condition : progress.progress)}</span> <span className="text-ash text-base">/ {(medalInfo?.medal_tiers[value].condition)}</span></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="h-14 flex back-darkslate rounded-b-lg game-row-border-top w-full justify-between px-4 text-sm">
                        <div className="px-4 my-auto inline-flex gap-2">
                            {/* Earners */}
                            {/* <div className="my-auto text-left">
                            <p className="text-ash font-bold">Tier 5 First Earner</p>
                            <p className="text-frost font-bold text-base">{firstEarner || 'Not Claimed'}</p> */}
                            {/* <img src="/dashboard/transparent-esc-score_square.png" className="h-full"></img> */}
                            {/* </div>
                        <hr className="w-[0.05em] h-[2em] border-none back-slate my-auto mx-2 "></hr> */}
                            <p className="text-frost font-bold my-auto text-base">{(medalInfo.medal_tiers[displayMedal ? displayMedal + '' : '1'] && medalInfo.medal_tiers[displayMedal ? displayMedal + '' : '1'].population_earned ? Number(medalInfo.medal_tiers[displayMedal ? displayMedal + '' : '1'].population_earned) : 0.0).toFixed(1)}% <span className="text-ash text-sm">players own this medal</span></p>
                        </div>
                        <div className="px-4 my-auto text-right">
                            <p className="text-ash font-bold">Earned</p>
                            <p className="text-frost font-bold text-base">{progress.tiers && progress?.tiers[displayMedal - 1]?.date_obtained ? formatDateYearShort(progress.tiers[displayMedal - 1].date_obtained) : 'N/A'}</p>
                        </div>
                    </div>
                </div>


                :

                // MOBILE
                <div className="w-full h-auto mt-8 back-graphite game-row-border rounded-lg">
                    <div className="h-90 rounded-t-lg relative">
                        <div className={`z-20 flex gap-2 absolute font-bold text-base justify-self-start self-start -top-3 left-[1.5rem]`}>
                            {new_medal ?
                                <div className="rounded-lg px-2"
                                    style={{
                                        backgroundColor: '#41B9FD',
                                        boxShadow: '0px 0px 0px 3px #41B9FD40'
                                    }}>
                                    <p>
                                        {'NEW'}
                                    </p>
                                </div>
                                : ''}
                        </div>
                        <img src={displayMedal !== 0 ?
                            bucket + medalInfo?.name + '_' + displayMedal
                            : bucket + medalInfo?.name + '_1'
                        }
                            alt={medalInfo?.name + '_' + (displayMedal ? displayMedal : 1)}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                            }}
                            className={`${displayMedal == 0 ? 'blur-sm grayscale' : ''} h-48 w-max m-auto p-4 pl-8`}
                            onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '') }}
                        ></img>

                        <div className="absolute self-start top-0 m-6">
                            <FaEllipsisH className=" text-ash h-6 w-auto my-auto ellipsis-hover cursor-pointer" onClick={() => {
                                showLightBox == '' ? setShowLightBox('hidden') : setShowLightBox('')
                            }} />
                            <div className={`${showLightBox} finline-flex absolute h-auto w-48 back-darkslate rounded-lg p-4 gap-2 top-6 z-10`}>
                                <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={() => { ChangeMedal(medalInfo?.name + '_' + (displayMedal), 0) }}>Show in Showcase #1</p>
                                <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={() => { ChangeMedal(medalInfo?.name + '_' + (displayMedal), 1) }}>Show in Showcase #2</p>
                                <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={() => { ChangeMedal(medalInfo?.name + '_' + (displayMedal), 2) }}>Show in Showcase #3</p>
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 back-slate w-10 h-10 m-6 rounded-lg content-center carot-hover cursor-pointer" onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '') }}>
                            {
                                showPopup == '' ? <FaCaretDown className="text-ash m-auto" /> : <FaCaretRight className="text-ash m-auto" />
                            }
                        </div>

                        <div className="col-span-4 px-4 h-auto">
                            <div className="flex content-center justify-center flex-wrap w-full font-bold relative mx-auto">
                                <div className="flex flex-col content-center gap-4">
                                    <h2 className="text-3xl text-frost">{medalInfo?.medal_name}</h2>
                                    <div className="flex flex-row gap-4 justify-center">
                                    <div className="back-slate text-frost self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center">{medalInfo?.medal_tiers ? Object.keys(medalInfo?.medal_tiers).length : 1} Tiers</div>
                                    <div className={`${displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? 'text-voltage' : 'text-rust'} back-slate self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center`}>{progress.progress} Total</div>
                                    </div>
                                </div>

                            </div>
                            <p className="text-ash text-base py-2 px-4 text-center">{medalInfo?.medal_description.replace('XXX', '').replace(' times', '')}</p>
                            {
                                !isPremiumUser && medalInfo.isPremium == 1 ?
                                    <div className="py-8 flex flex-col gap-4 cursor-pointer" onClick={() => { window.location.href = "/settings?view=Subscriptions" }}>
                                        <FaLock className="text-ash h-16 w-auto" />
                                        <div className="my-auto text-center">
                                            <p className="font-bold text-2xl">Premium Medal</p>
                                            <p className="text-voltage text-lg">Click here to Unlock All Premium Medals!</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="py-8">
                                        <div className="w-full cut-corner-45-special">
                                            <progress
                                                className={`${displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? 'progress-voltage' : 'progress-rust'} w-full h-3`}
                                                color="secondary"
                                                value={displayMedal}
                                                max={Object.keys(medalInfo.medal_tiers).length}
                                            ></progress>
                                        </div>
                                        <div className="w-full inline-flex justify-between px-2">
                                            <h2 className="font-bold text-frost text-lg">{(((displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? Object.keys(medalInfo?.medal_tiers).length : displayMedal) / Object.keys(medalInfo.medal_tiers).length) * 100).toFixed(1)} %</h2>
                                            <h2 className="font-bold text-lg"><span className={`${displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? 'text-voltage' : 'text-gold'} text-xl`}>{(displayMedal >= Object.keys(medalInfo?.medal_tiers).length ? Object.keys(medalInfo?.medal_tiers).length : displayMedal)}</span> <span className="text-ash text-base">/ {(Object.keys(medalInfo.medal_tiers).length)}</span></h2>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                    <div className={`${showPopup} h-auto game-row-border-top overflow-hidden py-2 pb-8 ${!isPremiumUser && medalInfo.isPremium == 1 ? 'blur-md' : ''}`}>
                        {
                            Object.keys(medalInfo?.medal_tiers).map((value, key) => {
                                return (
                                    <div className="h-[8em] w-full medal-row-tier mt-4 mb-8" key={medalInfo?.name + value}>
                                        <div className="relative mr-4">
                                            <hr className="medal-tier-line-up"></hr>
                                            <img src={
                                                bucket + medalInfo?.name + '_' + value

                                            }
                                                alt={medalInfo?.name + '_' + value}
                                                onError={({ currentTarget }) => {
                                                    currentTarget.onerror = null; // prevents looping
                                                    currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                                                }}
                                                className={`${displayMedal < Number(value) ? 'blur-sm grayscale' : ''} h-auto w-max m-auto p-4 pl-8 z-10 relative scale-[1.75] translate-x-[-.5rem] translate-y-7`}>
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
                                            <div className="flex flex-col">
                                                <div className="w-full font-bold">
                                                    <div className="flex gap-4">
                                                        <h2 className="text-base font-bold text-frost">{medalInfo?.medal_name + " Tier " + value}</h2>
                                                    </div>
                                                    <p className="text-ash text-xs py-2 pr-10">{medalInfo?.medal_description.replace('XXX', medalInfo?.medal_tiers[value].condition)}</p>
                                                </div>
                                                <div className="w-full my-auto text-left">
                                                    <p className="text-ash font-bold text-xs">Earned</p>
                                                    <p className="text-frost font-bold text-sm">{progress.tiers && progress.tiers[key].date_obtained ? formatDateYearShort(progress.tiers[key].date_obtained) : 'N/A'}</p>
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
                                                    <h2 className="font-bold text-frost text-sm">{(((progress.tiers && progress.tiers[key].isComplete ? medalInfo?.medal_tiers[value].condition : progress.progress) / (medalInfo?.medal_tiers[value].condition)) * 100).toFixed(1)} %</h2>
                                                    <h2 className="font-bold text-sm"><span className={`${progress.tiers && progress.tiers[key].isComplete ? 'text-voltage' : 'text-gold'} text-xl`}>{(progress.tiers && medalInfo?.medal_tiers[value].condition < progress.progress ? medalInfo?.medal_tiers[value].condition : progress.progress)}</span> <span className="text-ash text-base">/ {(medalInfo?.medal_tiers[value].condition)}</span></h2>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="h-14 flex back-darkslate rounded-b-lg game-row-border-top w-full justify-between px-4 text-sm">
                        <div className="px-4 my-auto inline-flex gap-2">
                            {/* Earners */}
                            {/* <div className="my-auto text-left">
                    <p className="text-ash font-bold">Tier 5 First Earner</p>
                    <p className="text-frost font-bold text-base">{firstEarner || 'Not Claimed'}</p> */}
                            {/* <img src="/dashboard/transparent-esc-score_square.png" className="h-full"></img> */}
                            {/* </div>
                <hr className="w-[0.05em] h-[2em] border-none back-slate my-auto mx-2 "></hr> */}
                            <p className="text-frost font-bold my-auto text-sm">{(medalInfo.medal_tiers[displayMedal ? displayMedal + '' : '1'] && medalInfo.medal_tiers[displayMedal ? displayMedal + '' : '1'].population_earned ? Number(medalInfo.medal_tiers[displayMedal ? displayMedal + '' : '1'].population_earned) : 0.0).toFixed(1)}% <span className="text-ash text-sm">players own this medal</span></p>
                        </div>
                        <div className="px-4 my-auto text-right">
                            <p className="text-ash font-bold text-sm">Earned</p>
                            <p className="text-frost font-bold text-sm">{progress.tiers && progress?.tiers[displayMedal - 1]?.date_obtained ? formatDateYearShort(progress.tiers[displayMedal - 1].date_obtained) : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Medal;
