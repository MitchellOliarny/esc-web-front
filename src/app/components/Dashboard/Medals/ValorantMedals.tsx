import React, { useState } from "react";
import Medal from "./Medal";
import MedalShowcase from "./MedalShowcase";
import { FaXmark } from "react-icons/fa6";

interface ValorantMedalsProps {
    medals: any;
    medalsProgress: any;
}

const ValorantMedals = ({ medals, medalsProgress }: ValorantMedalsProps) => {

    const [showCards, setShowCards] = useState('grid');
    const [showMedals, setShowMedals] = useState('hidden');
    const [medalCategory, setMedalCategory] = useState('');

    const ClickCategoryCard = (category: string) => {
        setShowCards('hidden');
        setShowMedals('');
        setMedalCategory(category);
    }

    const ShowCards = () => {
        setShowCards('grid');
        setShowMedals('hidden');
        setMedalCategory('');
    }

    console.log(medalsProgress)


    return (
        <>
            <div className={`${showCards} grid-cols-3 gap-4 h-full`}>
                <div onClick={() => ClickCategoryCard('agent_medals')} style={{height: '750px', backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'pointer', display: 'flex', borderRadius: '0.5em'}}>
                   <h2 style={{margin: 'auto', fontSize: '2em', fontWeight: 'bold'}}>Agents</h2> 
                </div>
                <div onClick={() => ClickCategoryCard('weapon_medals')} style={{height: '750px', backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'pointer', display: 'flex', borderRadius: '0.5em'}}>
                   <h2 style={{margin: 'auto', fontSize: '2em', fontWeight: 'bold'}}>Weapons</h2> 
                </div>
                <div onClick={() => ClickCategoryCard('game_event_medals')} style={{height: '750px', backgroundColor: 'rgba(0, 0, 0, 0.5)', cursor: 'pointer', display: 'flex', borderRadius: '0.5em'}}>
                   <h2 style={{margin: 'auto', fontSize: '2em', fontWeight: 'bold'}}>Game Events</h2> 
                </div>
            </div>

            <div className={`${showMedals} grid-rows-4 gap-4 h-full`}>
                <FaXmark size={'3em'} onClick={() => ShowCards()} style={{ cursor: 'pointer', justifySelf: 'end', position: 'absolute', margin: '0% -5%' }} />
                <MedalShowcase medals={medals.data[medalCategory]} medalsProgress={medalsProgress.data.progress[medalCategory]} category={medalCategory}/>
            </div>
        </>
    );
};

export default ValorantMedals;
