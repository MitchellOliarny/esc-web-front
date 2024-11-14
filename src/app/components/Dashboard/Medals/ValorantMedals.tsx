import React, { useEffect, useState } from "react";
import MedalShowcase from "./MedalShowcase";
import { Method } from "axios";

interface ValorantMedalsProps {
    medals: any;
    medalsProgress: any;
    change_display_medal: any;
}

const ValorantMedals = ({ medals, medalsProgress, change_display_medal }: ValorantMedalsProps) => {

    const [medalCategory, setMedalCategory] = useState("all");
    const [medalList, setMedalList] = useState({});
    const [parentList, setParentList] = useState({});

    const ClickCategoryCard = (category: string) => {
        if (category == 'all') {
            ResetToAllMedals();
        }
        else {
            setMedalList(medals.data[category]);
        }
        setMedalCategory(category)
    }

    useEffect(()=>{
        ResetToAllMedals();
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
        console.log(temp)
        console.log(medalsProgress)
        console.log(temp_parent)
    }

    //console.log(medals)


    return (
        <div className="flex mt-10 gap-x-20">
            <div className={`grid gap-8 h-full w-[20%]`}>
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
            </div>

            <div className={`flex gap-4 h-full w-[80%]`}>
                <MedalShowcase medals={medalList} medalsProgress={medalsProgress.data.progress} category={medalCategory} parentList={parentList} change_display_medal={change_display_medal}/>
            </div>
        </div>
    );
};

export default ValorantMedals;
