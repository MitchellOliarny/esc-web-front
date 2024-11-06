import React, { useState } from "react";
import Medal from "./Medal";
import MedalShowcase from "./MedalShowcase";

interface ValorantMedalsProps {
    medals: any;
    medalsProgress: any;
}

const ValorantMedals = ({ medals, medalsProgress }: ValorantMedalsProps) => {

    const [medalCategory, setMedalCategory] = useState("all");
    const [medalList, setMedalList] = useState(medals.data);

    const ClickCategoryCard = (category: string) => {
        if (category == 'all') {
            setMedalList(medals.data);
        }
        else {
            setMedalList(medals.data[category]);
        }
        setMedalCategory(category)
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
                <MedalShowcase medals={medalList} medalsProgress={medalsProgress.data.progress} category={medalCategory}/>
            </div>
        </div>
    );
};

export default ValorantMedals;
