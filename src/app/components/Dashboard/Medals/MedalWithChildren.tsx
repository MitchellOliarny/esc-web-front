import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
import Image from "next/image";
import { formatDateYearShort } from "@/app/utils/helpers";
import { FaCaretRight, FaCaretDown, FaEllipsisH, FaCheck, FaLock } from "react-icons/fa";

interface MedalsProps {
    medalInfo: any;
    progress: any;
    children_medals: any;
    all_children: any;
    child_progress: any;
    user_earners: any;
    change_display_medal: any;
}

const MedalWithChildren = ({ medalInfo, progress, children_medals, all_children, child_progress, user_earners, change_display_medal }: MedalsProps) => {

    const [showPopup, setShowPopUp] = useState('hidden');
    const [showLightBox, setShowLightBox] = useState('hidden');

    const [currentStatus, setCurrentStatus] = useState(0);
    const [childMedals, setChildMedals] = useState({});
    const [displayMedal, setDisplayMedal] = useState(0);
    const [firstEarner, setFirstEarner] = useState('N/A');

    const [childTierCount, setChildTierCount] = useState(0);


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
                    setDisplayMedal(5);
                }
            }
        }
        setFirstEarner(medalInfo?.medal_tiers[Object.keys(medalInfo?.medal_tiers)[Object.keys(medalInfo?.medal_tiers).length - 1]]?.first_earner?.earner)
        if(children_medals) {
            let temp = 0
            for (const x in children_medals) {
                temp += Object.keys(children_medals[x].medal_tiers).length
            }
            setChildTierCount(temp);
        }
    }, [progress, medalInfo])

    
    const ChangeMedal = (name: string, position: number) => {
        if(displayMedal == 0) {
            return;
        }
        change_display_medal(name, position) 
        setShowLightBox('hidden')
    }

    if (!medalInfo?.name) {
        return (<div></div>)
    }

    return (
        <>

            <div className="w-full h-auto mt-8 back-graphite game-row-border rounded-lg">
                <div className="h-60 medal-row rounded-t-lg">
                    <img src={displayMedal != 0 ?
                        bucket + medalInfo?.name + '_' + displayMedal + '.png'
                        : bucket + medalInfo?.name + '_1' + '.png'
                    }
                        alt={medalInfo?.name + '_' + displayMedal}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                        }}
                        className={`${displayMedal == 0 ? 'blur-sm grayscale' : ''} h-full w-max m-auto p-4 pl-8 cursor-pointer`}
                        onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '')}}
                        >

                    </img>
                    <div className="col-span-4 p-8 h-full">
                        <div className="grid grid-cols-3 grid-rows-1 w-full font-bold">
                            <div className="col-span-2 flex gap-4">
                                <h2 className="text-3xl text-frost">{medalInfo?.medal_name}</h2>
                                <div className="back-slate text-frost self-center justify-self-start h-6 w-auto px-2 rounded-lg content-center justify-center">{children_medals ? children_medals.length : 'N/A'} Medals</div>
                            </div>
                            <div className="flex content-center justify-end flex-wrap relative z-10">
                                <FaEllipsisH className="text-ash h-6 w-auto my-auto ellipsis-hover cursor-pointer" onClick={()=>{
                                    showLightBox == '' ? setShowLightBox('hidden') : setShowLightBox('')
                                }} />
                                <div className={`${showLightBox} finline-flex absolute h-auto w-auto back-darkslate rounded-lg p-4 gap-2 -left-8 top-2 z-10`}>
                                    <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={()=>{ChangeMedal(medalInfo?.name+'_'+(displayMedal), 0)}}>Show in Showcase #1</p>
                                    <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={()=>{ChangeMedal(medalInfo?.name+'_'+(displayMedal), 1)}}>Show in Showcase #2</p>
                                    <p className={`display-button ${!displayMedal ? 'button-inactive' : 'display-button-hover'}`} onClick={()=>{ChangeMedal(medalInfo?.name+'_'+(displayMedal), 2)}}>Show in Showcase #3</p>
                                </div>
                                <div className="back-slate w-10 h-10 ml-6 rounded-lg content-center carot-hover cursor-pointer" onClick={() => { setShowPopUp(showPopup == '' ? 'hidden' : '')}}>
                                    {
                                        showPopup == '' ? <FaCaretDown className="text-ash m-auto" /> : <FaCaretRight className="text-ash m-auto" />
                                    }
                                </div>
                            </div>
                        </div>
                        <p className="text-ash text-base py-2 pr-10">{medalInfo?.medal_description}</p>
                        <p className="text-ash text-base py-2 pr-10">A new mastery tier medal is unlocked for every 20% complete</p>
                        <div className="py-4">
                            <div className="w-full cut-corner-45-special">
                                <progress
                                    className={`${displayMedal == 5 ? 'progress-voltage' : 'progress-rust'} w-full h-3`}
                                    color="secondary"
                                    value={
                                        progress.progress 
                                        //displayMedal
                                        }
                                    max={
                                        childTierCount
                                       // Object.keys(medalInfo.medal_tiers).length
                                    }
                                ></progress>
                            </div>
                            <div className="w-full inline-flex justify-between px-2">
                                <h2 className="font-bold text-frost text-lg">{
                                    ((progress.progress / childTierCount) * 100).toFixed(1)
                                    //((displayMedal / Object.keys(medalInfo.medal_tiers).length) * 100).toFixed(1)
                                    } 
                                    
                                    %</h2>
                                <h2 className="font-bold text-lg"><span className={`${displayMedal == 5 ? 'text-voltage' : 'text-gold'} text-xl`}>{(progress.progress)}</span> <span className="text-ash text-base">/ {(childTierCount)}</span></h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${showPopup} h-auto game-row-border-top overflow-hidden py-4`}>
                    {
                        children_medals?.map((child: any, key: number) => {


                            let c_progress = child_progress[child?.name];
                            let tier = 0;
                            let children_tiers = 0;
                            if (c_progress) {
                                for (const x in c_progress.tiers) {
                                    if (!c_progress.tiers[Number(x)].isComplete) {
                                        break;
                                    }
                                    else {
                                        tier = Number(c_progress.tiers[Number(x)].tier);
                                    }
                                }
                            }
                            else {
                                c_progress = {
                                    progress: 0
                                }
                            }

                            if(all_children[child?.name]) {
                                for(const x in all_children[child?.name]) {
                                    children_tiers += Object.keys(all_children[child?.name][x].medal_tiers).length;
                                }
                            }

                            return (
                                <div className="h-[8em] w-full medal-row-tier my-2" key={child?.name + key}>
                                    <div className="relative mr-16">
                                        <hr className="medal-tier-line-up"></hr>
                                        <img src={
                                            bucket + child?.name + '_' + (tier == 0 ? 1 : tier) + '.png'

                                        }
                                            alt={child?.name + '_' + tier}
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null; // prevents looping
                                                currentTarget.src = "/dashboard/transparent-esc-score_square.png";
                                            }}
                                            className={`${tier == 0 ? 'blur-sm grayscale' : ''} h-full w-max m-auto p-4 pl-8 z-10 relative`}>
                                        </img>
                                        <hr className="medal-tier-line-side"></hr>
                                        {
                                            tier >= 4 ?

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
                                                <div className="col-span-2 flex gap-4">
                                                    <h2 className="text-xl text-frost">{child?.medal_name}</h2>
                                                    <div className="back-slate text-frost self-center justify-self-start h-5 w-auto px-2 rounded-lg content-center justify-center text-sm font-bold">{
                                                    
                                                    all_children[child?.name] ? 
                                                    all_children[child?.name].length + ' Medals'
                                                    :
                                                    child?.medal_tiers ? Object.keys(child?.medal_tiers).length + ' Tiers' : 'N/A'}
                                                    
                                                    </div>
                                                </div>
                                                <p className="text-ash text-sm py-2 pr-10">{child?.medal_description}</p>
                                            </div>
                                            <div className="px-4 my-auto text-right">
                                                <p className="text-ash font-bold">Earned</p>
                                                <p className="text-frost font-bold">{tier !== 0 && c_progress.tiers && c_progress.tiers[tier - 1].date_obtained ? formatDateYearShort(c_progress.tiers[tier - 1].date_obtained) : 'N/A'}</p>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="w-full cut-corner-45-special">
                                                <progress
                                                    className={`${tier >= 4 ? 'progress-voltage' : 'progress-rust'} w-full h-3`}
                                                    color="secondary"
                                                    value={children_tiers ? c_progress.progress : tier}
                                                    max={children_tiers ? children_tiers : Object.keys(child?.medal_tiers).length}
                                                ></progress>
                                            </div>
                                            <div className="w-full inline-flex justify-between px-4">
                                                <h2 className="font-bold text-frost text-base">{ children_tiers ? ((c_progress.progress / children_tiers)*100).toFixed(1) :  ((tier / Object.keys(child?.medal_tiers).length) * 100).toFixed(1)} %</h2>
                                                <h2 className="font-bold text-base"><span className={`${tier >= 4 ? 'text-voltage' : 'text-gold'} text-xl`}>{children_tiers ? c_progress.progress : tier}</span> <span className="text-ash text-base">/ {children_tiers ? children_tiers : (Object.keys(child?.medal_tiers).length)}</span></h2>
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
                        <p className="text-frost font-bold my-auto text-base">{Number(medalInfo.medal_tiers[displayMedal ? displayMedal+'': '1'].population_earned).toFixed(1)}% <span className="text-ash text-sm">players own this medal</span></p>
                    </div>
                    <div className="px-4 my-auto text-right">
                        <p className="text-ash font-bold">Earned</p>
                        <p className="text-frost font-bold text-base">{progress.tiers && progress?.tiers[displayMedal - 1]?.date_obtained ? formatDateYearShort(progress.tiers[displayMedal - 1].date_obtained) : 'N/A'}</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MedalWithChildren;
