import React, { useEffect, useState } from "react";
import MedalShowcase from "./MedalShowcase";

interface ValorantMedalsProps {
    medals: any;
    medalsProgress: any;
    change_display_medal: any;
    isAdmin: boolean
    isPremiumUser: boolean;
}

const ValorantMedals = ({ medals, medalsProgress, change_display_medal, isAdmin, isPremiumUser }: ValorantMedalsProps) => {

    const [medalCategory, setMedalCategory] = useState("all");
    const [medalList, setMedalList] = useState({});
    const [parentList, setParentList] = useState({});

    const ClickCategoryCard = (category: string) => {
        if (category == 'all') {
            ResetToAllMedals();
        }
        else if(category == 'admin_medals') {
            setMedalList(medals.admin)
        }
        else {
            setMedalList(medals.data[category]);
        }
        setMedalCategory(category)
    }

    useEffect(()=>{
        ClickCategoryCard(medalCategory);
        console.log(medals)
    },[medals])


    const ResetToAllMedals = () => {
        let temp = {}
        let temp_parent = {};
        for (const x in medals.data) {
            for (const i in medals.data[x]) {
                //@ts-ignore
                temp[i] = medals.data[x][i];

                //If medal has parent, add to object
                if(medals.data[x][i].parent) {
                    //@ts-ignore
                    temp_parent[medals.data[x][i].parent] ? temp_parent[medals.data[x][i].parent].push(medals.data[x][i]) : temp_parent[medals.data[x][i].parent] = [medals.data[x][i]]
                }
            }
        }
        setMedalList(temp);
        setParentList(temp_parent);
        //console.log(temp)
        console.log(medalsProgress)
        //console.log(temp_parent)
    }

    //console.log(medals)


    return (
        <div className="flex lg:flex-row flex-col mt-10 gap-x-20">
            <div className={`flex lg:flex-col flex:row lg:gap-6 gap-4 h-full w-[15%] lg:text-base text-xs`}>
                <div onClick={() => ClickCategoryCard('all')} className={`medal-nav-button ${medalCategory == 'all' ? 'medal-nav-active' : ''}`}>
                    <h2 className="text-left">All Medals</h2>
                </div>
                <div onClick={() => ClickCategoryCard('agent_medals')} className={`medal-nav-button ${medalCategory == 'agent_medals' ? 'medal-nav-active' : ''}`}>
                    <h2 className="text-left">Agents</h2>
                </div>
                <div onClick={() => ClickCategoryCard('weapon_medals')} className={`medal-nav-button ${medalCategory == 'weapon_medals' ? 'medal-nav-active' : ''}`}>
                    <h2 className="text-left">Weapons</h2>
                </div>
                <div onClick={() => ClickCategoryCard('game_event_medals')} className={`medal-nav-button ${medalCategory == 'game_event_medals' ? 'medal-nav-active' : ''}`}>
                    <h2 className="text-left">Game Events</h2>
                </div>
                {
                    isAdmin ? 
                    <div onClick={() => ClickCategoryCard('admin_medals')} className={`medal-nav-button ${medalCategory == 'admin_medals' ? 'medal-nav-active' : ''}`}>
                    <h2 className="text-left">Admin Medals</h2>
                        </div>
                    : ''
                }
            </div>

            <div className={`flex gap-4 h-full lg:w-[80%] w-full`}>
                <MedalShowcase medals={medalList} medalsProgress={medalsProgress.data.progress} category={medalCategory} parentList={parentList} change_display_medal={change_display_medal} isPremiumUser={isPremiumUser}/>
            </div>
        </div>
    );
};

export default ValorantMedals;
