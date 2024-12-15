import React, { useEffect, useState } from "react";
import { FaX, FaExplosion, FaScrewdriverWrench, FaClock } from "react-icons/fa6";
import Rounds from "./Rounds";
import Minimap from "./Minimap";
import RoundEvents from "./roundEvents";
import { leapfrog } from "ldrs";

export default function Timeline({
  isLoading,
  roundInfo,
  players,
}: {
  isLoading: boolean;
  roundInfo: any;
  players: any;
}) {
    leapfrog.register();
    const [currentRound, setCurrentRound] = useState(0);

    const round_end_icons = {
        Eliminated: <FaX size={'1.5em'}/>,
        Bomb_defused: <FaScrewdriverWrench size={'1.5em'}/>,
        Bomb_detonated: <FaExplosion size={'1.5em'}/>,
        Time_expired: <FaClock size={'1.5em'}/>
    }

  return (
    <>
      <div>
      <div style={{ display: isLoading ? 'flex' : 'none', fontSize: '2em', alignContent: 'flex-end', flexWrap: 'wrap-reverse' }}>Loading
          <l-leapfrog
            size="45"
            speed="1.75"
            color="#F5603C"
          ></l-leapfrog>
        </div>
        <div style={!isLoading ? { display: '' } : { display: 'none' }}>
            <div className="overflow-x-scroll thin-scrollbar">
                <p className="text-2xl text-white font-bold mt-4">Rounds</p>
                <Rounds roundInfo={roundInfo} setRound={setCurrentRound} currentRound={currentRound}/>
            </div>
            <div className="overflow-x-scroll thin-scrollbar">
                <p className="text-2xl text-white font-bold mt-4">Round Events</p>
                <RoundEvents roundInfo={roundInfo.round_data[currentRound]} currentRound={currentRound} players={players}/>
            </div>
            <div className="overflow-hidden">
                <p className="text-2xl text-white font-bold mt-4">Minimap Recreation</p>
                <Minimap roundInfo={roundInfo.round_data[currentRound]} players={players} map_id={roundInfo.map_id}/>
            </div>
        </div>
      </div>
    </>
  );
}
